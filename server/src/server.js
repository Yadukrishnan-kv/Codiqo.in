import app from './app.js'
import { env } from './config/env.js'
import { connectDB } from './config/db.js'

async function start() {
  try {
    await connectDB()
    app.listen(env.port, () => {
      console.log(`[server] Codiqo API listening on port ${env.port} (${env.nodeEnv})`)
    })
  } catch (err) {
    console.error('[server] Failed to start:', err.message)
    process.exit(1)
  }
}

start()
