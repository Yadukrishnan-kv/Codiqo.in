import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/public/Home'
import Login from '../pages/admin/Login'
import Dashboard from '../pages/admin/Dashboard'
import HeroPage from '../pages/admin/HeroPage'
import WorkPage from '../pages/admin/WorkPage'
import ServicesPage from '../pages/admin/ServicesPage'
import ProcessPage from '../pages/admin/ProcessPage'
import WhyUsPage from '../pages/admin/WhyUsPage'
import TestimonialsPage from '../pages/admin/TestimonialsPage'
import FounderPage from '../pages/admin/FounderPage'
import FaqPage from '../pages/admin/FaqPage'
import NavbarPage from '../pages/admin/NavbarPage'
import BrandsPage from '../pages/admin/BrandsPage'
import SiteSettingsPage from '../pages/admin/SiteSettingsPage'
import InvoicesPage from '../pages/admin/InvoicesPage'
import AdminUsersPage from '../pages/admin/AdminUsersPage'
import AdminLayout from '../components/admin/layout/AdminLayout'
import ProtectedRoute from '../components/admin/layout/ProtectedRoute'
import RequireRole from '../components/admin/layout/RequireRole'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/admin/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
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
