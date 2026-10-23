import React from 'react'
import { Link } from 'react-router-dom'
import {
  Layers,
  ListOrdered,
  Briefcase,
  ShieldCheck,
  Quote,
  HelpCircle,
  Menu,
  GalleryHorizontal,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useDashboard } from '../../hooks/useDashboard'

const STAT_CARDS = [
  { key: 'services', label: 'Services', icon: Layers, to: '/admin/services' },
  { key: 'processSteps', label: 'Process Steps', icon: ListOrdered, to: '/admin/process' },
  { key: 'projects', label: 'Projects', icon: Briefcase, to: '/admin/work' },
  { key: 'whyUsReasons', label: 'Why Us Reasons', icon: ShieldCheck, to: '/admin/why-us' },
  { key: 'testimonials', label: 'Testimonials', icon: Quote, to: '/admin/testimonials' },
  { key: 'faqs', label: 'FAQs', icon: HelpCircle, to: '/admin/faq' },
  { key: 'navLinks', label: 'Navbar Links', icon: Menu, to: '/admin/navbar' },
  { key: 'brands', label: 'Brands', icon: GalleryHorizontal, to: '/admin/brands' },
]

function timeAgo(dateString) {
  const diffMs = Date.now() - new Date(dateString).getTime()
  const minutes = Math.round(diffMs / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.round(hours / 24)}d ago`
}

export default function Dashboard() {
  const { admin } = useAuth()
  const { data, isLoading, isError } = useDashboard()

  return (
    <div>
      <h1 className="font-display text-3xl font-black tracking-tight">
        Welcome back, {admin?.name?.split(' ')[0]}.
      </h1>
      <p className="mt-2 text-muted-foreground max-w-xl">
        You're signed in as <span className="text-foreground font-semibold capitalize">{admin?.role}</span>.
      </p>

      {isLoading ? (
        <div className="mt-10 text-sm text-muted-foreground">Loading…</div>
      ) : isError ? (
        <div className="mt-10 text-sm text-red-400">Couldn't load dashboard stats.</div>
      ) : (
        <>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STAT_CARDS.map((card) => (
              <Link
                key={card.key}
                to={card.to}
                className="bg-surface border border-border rounded-[24px] p-6 hover:border-primary/50 transition-colors group"
              >
                <card.icon className="w-5 h-5 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                <div className="font-display text-3xl font-black">{data.counts[card.key]}</div>
                <div className="mt-1 text-sm text-muted-foreground">{card.label}</div>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="font-display text-lg font-bold mb-4">Recent activity</h2>
            <div className="bg-surface border border-border rounded-[24px] overflow-hidden">
              {data.recentActivity.length === 0 ? (
                <div className="p-6 text-sm text-muted-foreground">Nothing yet — changes you make will show up here.</div>
              ) : (
                data.recentActivity.map((entry) => (
                  <div
                    key={entry._id}
                    className="flex items-center justify-between gap-4 px-6 py-4 border-b border-border last:border-b-0"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{entry.summary}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{entry.adminName}</div>
                    </div>
                    <div className="text-xs text-muted-foreground shrink-0">{timeAgo(entry.createdAt)}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
