import React from 'react'
import { Check } from 'lucide-react'
import SiteSettingsForm from '../../components/admin/forms/SiteSettingsForm'
import { useSiteSettings, useUpdateSiteSettings } from '../../hooks/useSiteSettings'
import { useSavedBanner } from '../../hooks/useSavedBanner'

export default function SiteSettingsPage() {
  const { data, isLoading, isError } = useSiteSettings()
  const updateMutation = useUpdateSiteSettings()
  const [saved, triggerSaved] = useSavedBanner()

  const handleSubmit = async (values) => {
    await updateMutation.mutateAsync(values)
    triggerSaved()
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-black tracking-tight">Site Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Global branding, contact details, SEO, social links, and section visibility.
          </p>
        </div>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            <Check className="w-4 h-4" />
            Saved
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="text-sm text-muted-foreground">Loading…</div>
      ) : isError ? (
        <div className="text-sm text-red-400">Couldn't load site settings.</div>
      ) : (
        <SiteSettingsForm defaultValues={data} onSubmit={handleSubmit} submitting={updateMutation.isPending} />
      )}
    </div>
  )
}
