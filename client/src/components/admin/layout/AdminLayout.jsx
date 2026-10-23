import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LogOut, Menu as MenuIcon, X } from 'lucide-react'
import { useAuth } from '../../../hooks/useAuth'
import { navSections } from './navConfig'

export default function AdminLayout() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-surface flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-border">
          <span className="font-display font-black text-xl tracking-tight">
            Codiqo<span className="text-primary">.</span>
            <span className="text-muted-foreground font-sans font-normal text-xs ml-2 align-middle">
              admin
            </span>
          </span>
          <button
            className="lg:hidden text-muted-foreground"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-6">
          {navSections.map((section) => (
            <div key={section.label}>
              <div className="px-3 mb-2 text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">
                {section.label}
              </div>
              <div className="space-y-1">
                {section.items
                  .filter((item) => !item.roles || item.roles.includes(admin?.role))
                  .map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-background'
                        }`
                      }
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {item.label}
                    </NavLink>
                  ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
              {admin?.name?.[0]?.toUpperCase() || '?'}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">{admin?.name}</div>
              <div className="text-xs text-muted-foreground capitalize truncate">{admin?.role}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold border border-border hover:border-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-20 border-b border-border flex items-center px-6 lg:px-10 gap-4">
          <button
            className="lg:hidden text-muted-foreground"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <div className="text-sm text-muted-foreground">
            Signed in as <span className="text-foreground font-medium">{admin?.email}</span>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
