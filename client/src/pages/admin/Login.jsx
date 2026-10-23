import React, { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

export default function Login() {
  const { isAuthenticated, loading, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && isAuthenticated) {
    const redirectTo = location.state?.from?.pathname || '/admin'
    return <Navigate to={redirectTo} replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email, password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to sign in. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 relative overflow-hidden">
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-sm relative z-10">
        <div className="flex flex-col items-center mb-8 text-center">
          <span className="font-display font-black text-3xl tracking-tight">
            Codiqo<span className="text-primary">.</span>
          </span>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to manage your site</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-surface border border-border rounded-[28px] p-8 space-y-5 shadow-soft"
        >
          <label className="block">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Email
            </span>
            <input
              required
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@codiqo.in"
              className="mt-2 w-full bg-background border border-border rounded-2xl py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Password
            </span>
            <input
              required
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-2 w-full bg-background border border-border rounded-2xl py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm"
            />
          </label>

          {error && (
            <div className="text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-foreground text-background font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              'Signing in…'
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Sign in
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
