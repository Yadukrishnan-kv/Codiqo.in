import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export const AUTH_COOKIE_NAME = 'codiqo_admin_token'

export function generateToken(adminId) {
  return jwt.sign({ sub: adminId }, env.jwtSecret, { expiresIn: env.jwtExpiresIn })
}

export function authCookieOptions() {
  return {
    httpOnly: true,
    secure: env.isProduction,
    // Client (Vercel) and API (Render/Railway) live on different registrable
    // domains until a shared custom domain is set up, so the cookie needs
    // SameSite=None in production to survive the cross-site XHR request.
    sameSite: env.isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  }
}
