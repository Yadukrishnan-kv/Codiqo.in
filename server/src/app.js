import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
import hpp from 'hpp'
import { env } from './config/env.js'
import routes from './routes/index.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

// Required behind a reverse proxy (Render/Railway/Vercel) so req.ip reflects
// the real client rather than the proxy — this is what the rate limiter
// keys on and what audit log entries record. Only trusted in production:
// enabling it without an actual proxy in front would let a client spoof
// X-Forwarded-For and forge its own IP.
if (env.isProduction) {
  app.set('trust proxy', 1)
}

app.use(helmet())
app.use(
  cors({
    origin: env.clientOrigin,
    credentials: true,
  })
)
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(mongoSanitize())
app.use(hpp())
app.use(morgan(env.isProduction ? 'combined' : 'dev'))

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api', apiLimiter)

// Helmet's default Cross-Origin-Resource-Policy (same-origin) blocks the
// client — on a different origin — from rendering these images in <img>
// tags, so uploaded assets explicitly opt in to cross-origin loading.
app.use('/uploads', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
  next()
})
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.use('/api/v1', routes)

app.use(notFound)
app.use(errorHandler)

export default app
