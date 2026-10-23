import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ImageUploader from '../ui/ImageUploader'
import Toggle from '../ui/Toggle'
import TagListField from './TagListField'
import { Field, inputClass, textareaClass } from './formPrimitives'

const TABS = [
  { key: 'general', label: 'General' },
  { key: 'contact', label: 'Contact' },
  { key: 'seo', label: 'SEO' },
  { key: 'social', label: 'Social' },
  { key: 'sections', label: 'Sections' },
]

const SECTION_LABELS = {
  logoTicker: 'Logo Ticker (Trusted by)',
  services: 'Services',
  process: 'Process',
  work: 'Work',
  whyUs: 'Why Us',
  testimonials: 'Testimonials',
  founder: 'Founder',
  faq: 'FAQ',
  contact: 'Contact',
}

const schema = z.object({
  siteName: z.string().trim().min(1, 'Required').max(60),
  tagline: z.string().trim().max(120).optional(),
  logoText: z.string().trim().min(1, 'Required').max(30),
  logoImageUrl: z.string().trim().optional(),
  footerDescription: z.string().trim().max(300).optional(),

  seoDescription: z.string().trim().max(300).optional(),
  seoKeywords: z.array(z.object({ value: z.string().trim().min(1).max(40) })).max(20),
  jsonLdServiceTypes: z.array(z.object({ value: z.string().trim().min(1).max(60) })).max(20),
  jsonLdAreaServed: z.string().trim().max(60).optional(),
  jsonLdTelephone: z.string().trim().max(30).optional(),
  jsonLdEmail: z.string().trim().max(120).optional(),

  contactPhone: z.string().trim().max(30).optional(),
  contactEmail: z.string().trim().max(120).optional(),
  contactLocation: z.string().trim().max(120).optional(),
  whatsappNumber: z.string().trim().max(20).optional(),
  whatsappMessage: z.string().trim().max(300).optional(),

  socialInstagram: z.string().trim().max(200).optional(),
  socialLinkedin: z.string().trim().max(200).optional(),
  socialTwitter: z.string().trim().max(200).optional(),
  socialGithub: z.string().trim().max(200).optional(),

  sectionVisibility: z.object({
    logoTicker: z.boolean(),
    services: z.boolean(),
    process: z.boolean(),
    work: z.boolean(),
    whyUs: z.boolean(),
    testimonials: z.boolean(),
    founder: z.boolean(),
    faq: z.boolean(),
    contact: z.boolean(),
  }),
})

function toFormValues(doc) {
  if (!doc) return undefined
  return {
    ...doc,
    seoKeywords: (doc.seoKeywords || []).map((value) => ({ value })),
    jsonLdServiceTypes: (doc.jsonLdServiceTypes || []).map((value) => ({ value })),
  }
}

export default function SiteSettingsForm({ defaultValues, onSubmit, submitting }) {
  const [tab, setTab] = useState('general')

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: toFormValues(defaultValues),
  })

  useEffect(() => {
    if (defaultValues) reset(toFormValues(defaultValues))
  }, [defaultValues, reset])

  const submit = (values) => {
    onSubmit({
      ...values,
      seoKeywords: values.seoKeywords.map((k) => k.value),
      jsonLdServiceTypes: values.jsonLdServiceTypes.map((k) => k.value),
    })
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-2xl">
      <div className="flex items-center gap-1 bg-surface border border-border rounded-full p-1 w-fit mb-8 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              tab === t.key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={tab === 'general' ? 'space-y-5' : 'hidden'}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Site name" error={errors.siteName?.message}>
            <input {...register('siteName')} className={inputClass} />
          </Field>
          <Field label="Logo text" error={errors.logoText?.message}>
            <input {...register('logoText')} className={inputClass} />
          </Field>
        </div>
        <Field label="Tagline">
          <input {...register('tagline')} className={inputClass} />
        </Field>
        <Field label="Footer description">
          <textarea {...register('footerDescription')} rows={2} className={textareaClass} />
        </Field>
        <Field label="Logo image (optional — falls back to logo text)">
          <ImageUploader
            value={watch('logoImageUrl')}
            onChange={(url) => setValue('logoImageUrl', url, { shouldDirty: true })}
            aspect="aspect-square"
            className="w-24"
          />
        </Field>
      </div>

      <div className={tab === 'contact' ? 'space-y-5' : 'hidden'}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Phone">
            <input {...register('contactPhone')} className={inputClass} />
          </Field>
          <Field label="Email">
            <input {...register('contactEmail')} className={inputClass} />
          </Field>
        </div>
        <Field label="Location">
          <input {...register('contactLocation')} className={inputClass} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="WhatsApp number (digits only, with country code)">
            <input {...register('whatsappNumber')} className={inputClass} placeholder="919745706208" />
          </Field>
          <Field label="WhatsApp pre-filled message">
            <input {...register('whatsappMessage')} className={inputClass} />
          </Field>
        </div>
      </div>

      <div className={tab === 'seo' ? 'space-y-5' : 'hidden'}>
        <Field label="Meta description">
          <textarea {...register('seoDescription')} rows={2} className={textareaClass} />
        </Field>
        <TagListField
          control={control}
          register={register}
          name="seoKeywords"
          label="SEO keywords"
          placeholder="web development studio"
        />
        <TagListField
          control={control}
          register={register}
          name="jsonLdServiceTypes"
          label="Structured data (JSON-LD) service types"
          placeholder="Static Websites"
        />
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Area served">
            <input {...register('jsonLdAreaServed')} className={inputClass} />
          </Field>
          <Field label="JSON-LD phone">
            <input {...register('jsonLdTelephone')} className={inputClass} />
          </Field>
          <Field label="JSON-LD email">
            <input {...register('jsonLdEmail')} className={inputClass} />
          </Field>
        </div>
      </div>

      <div className={tab === 'social' ? 'space-y-5' : 'hidden'}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Instagram URL">
            <input {...register('socialInstagram')} className={inputClass} />
          </Field>
          <Field label="LinkedIn URL">
            <input {...register('socialLinkedin')} className={inputClass} />
          </Field>
          <Field label="Twitter / X URL">
            <input {...register('socialTwitter')} className={inputClass} />
          </Field>
          <Field label="GitHub URL">
            <input {...register('socialGithub')} className={inputClass} />
          </Field>
        </div>
      </div>

      <div className={tab === 'sections' ? 'space-y-1' : 'hidden'}>
        <p className="text-sm text-muted-foreground mb-4">
          Turn homepage sections on or off without touching any code.
        </p>
        {Object.entries(SECTION_LABELS).map(([key, label]) => (
          <div
            key={key}
            className="flex items-center justify-between py-3 border-b border-border last:border-b-0"
          >
            <span className="text-sm font-medium">{label}</span>
            <Toggle
              checked={watch(`sectionVisibility.${key}`)}
              onChange={(value) => setValue(`sectionVisibility.${key}`, value, { shouldDirty: true })}
              label={`Toggle ${label}`}
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-foreground text-background font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-60"
      >
        {submitting ? 'Saving…' : 'Save changes'}
      </button>
    </form>
  )
}
