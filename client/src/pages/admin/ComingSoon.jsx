import React from 'react'
import { Construction } from 'lucide-react'

export default function ComingSoon({ title }) {
  return (
    <div className="h-full min-h-[50vh] flex flex-col items-center justify-center text-center border border-dashed border-border rounded-[28px] p-12">
      <Construction className="w-8 h-8 text-primary mb-4" />
      <h1 className="font-display text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        This module's CRUD screen is scaffolded in the build plan and ships in a later phase.
      </p>
    </div>
  )
}
