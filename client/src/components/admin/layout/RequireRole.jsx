import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'

export default function RequireRole({ roles }) {
  const { admin } = useAuth()

  if (!admin || !roles.includes(admin.role)) {
    return <Navigate to="/admin" replace />
  }

  return <Outlet />
}
