import {
  LayoutDashboard,
  Sparkles,
  Layers,
  ListOrdered,
  Briefcase,
  ShieldCheck,
  Quote,
  UserCircle,
  HelpCircle,
  Menu,
  GalleryHorizontal,
  Settings,
  Users,
  Receipt,
} from 'lucide-react'

export const navSections = [
  {
    label: 'Overview',
    items: [{ label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true }],
  },
  {
    label: 'Homepage Sections',
    items: [
      { label: 'Hero', to: '/admin/hero', icon: Sparkles },
      { label: 'Services', to: '/admin/services', icon: Layers },
      { label: 'Process', to: '/admin/process', icon: ListOrdered },
      { label: 'Work', to: '/admin/work', icon: Briefcase },
      { label: 'Why Us', to: '/admin/why-us', icon: ShieldCheck },
      { label: 'Testimonials', to: '/admin/testimonials', icon: Quote },
      { label: 'Founder', to: '/admin/founder', icon: UserCircle },
      { label: 'FAQ', to: '/admin/faq', icon: HelpCircle },
      { label: 'Navbar Links', to: '/admin/navbar', icon: Menu },
      { label: 'Brands', to: '/admin/brands', icon: GalleryHorizontal },
    ],
  },
  {
    label: 'Business',
    items: [{ label: 'Invoices', to: '/admin/invoices', icon: Receipt }],
  },
  {
    label: 'System',
    items: [
      { label: 'Site Settings', to: '/admin/settings', icon: Settings },
      { label: 'Admin Users', to: '/admin/users', icon: Users, roles: ['superadmin'] },
    ],
  },
]
