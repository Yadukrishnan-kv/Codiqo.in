import React, { createContext, useCallback, useEffect, useState } from 'react'
import { loginRequest, logoutRequest, fetchCurrentAdmin } from '../api/auth.api'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const isAdminRoute = window.location.pathname.startsWith('/admin')
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(isAdminRoute)

  const refresh = useCallback(async () => {
    try {
      const current = await fetchCurrentAdmin()
      setAdmin(current)
    } catch {
      setAdmin(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Public pages never need a session — skip the doomed-to-401 check.
    if (isAdminRoute) refresh()
  }, [refresh, isAdminRoute])

  const login = useCallback(async (email, password) => {
    const loggedInAdmin = await loginRequest(email, password)
    setAdmin(loggedInAdmin)
    return loggedInAdmin
  }, [])

  const logout = useCallback(async () => {
    await logoutRequest()
    setAdmin(null)
  }, [])

  const value = { admin, loading, isAuthenticated: Boolean(admin), login, logout, refresh }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
