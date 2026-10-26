import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/public/Home'
import ProtectedRoute from '../components/admin/layout/ProtectedRoute'
import RequireRole from '../components/admin/layout/RequireRole'

const Login = lazy(() => import('../pages/admin/Login'))
const Dashboard = lazy(() => import('../pages/admin/Dashboard'))
const HeroPage = lazy(() => import('../pages/admin/HeroPage'))
const WorkPage = lazy(() => import('../pages/admin/WorkPage'))
const ServicesPage = lazy(() => import('../pages/admin/ServicesPage'))
const ProcessPage = lazy(() => import('../pages/admin/ProcessPage'))
const WhyUsPage = lazy(() => import('../pages/admin/WhyUsPage'))
const TestimonialsPage = lazy(() => import('../pages/admin/TestimonialsPage'))
const FounderPage = lazy(() => import('../pages/admin/FounderPage'))
const FaqPage = lazy(() => import('../pages/admin/FaqPage'))
const NavbarPage = lazy(() => import('../pages/admin/NavbarPage'))
const BrandsPage = lazy(() => import('../pages/admin/BrandsPage'))
const SiteSettingsPage = lazy(() => import('../pages/admin/SiteSettingsPage'))
const InvoicesPage = lazy(() => import('../pages/admin/InvoicesPage'))
const AdminUsersPage = lazy(() => import('../pages/admin/AdminUsersPage'))
const AdminLayout = lazy(() => import('../components/admin/layout/AdminLayout'))

function AdminFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground text-sm">
      Loading…
    </div>
  )
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/admin/login"
        element={
          <Suspense fallback={<AdminFallback />}>
            <Login />
          </Suspense>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/admin"
          element={
            <Suspense fallback={<AdminFallback />}>
              <AdminLayout />
            </Suspense>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="hero" element={<HeroPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="process" element={<ProcessPage />} />
          <Route path="work" element={<WorkPage />} />
          <Route path="why-us" element={<WhyUsPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="founder" element={<FounderPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="navbar" element={<NavbarPage />} />
          <Route path="brands" element={<BrandsPage />} />
          <Route path="settings" element={<SiteSettingsPage />} />
          <Route path="invoices" element={<InvoicesPage />} />

          <Route element={<RequireRole roles={['superadmin']} />}>
            <Route path="users" element={<AdminUsersPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}
