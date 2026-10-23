import React from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, ArrowRight } from 'lucide-react'

// Custom SVG WhatsApp icon for premium visual style
const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.004 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.89 5.83L2.06 22l4.31-1.13c1.55.85 3.33 1.13 5.63 1.13 5.52 0 10-4.48 10-10S17.52 2 12.004 2zm4.83 14.24c-.2.56-1.16 1.08-1.59 1.13-.41.05-.93.07-1.48-.1-2.19-.69-3.87-2.61-4.95-4.08-1.08-1.47-1.78-3.23-1.78-5.06 0-.91.48-1.41.81-1.74.26-.26.58-.33.84-.33.26 0 .53 0 .76.01.24.01.55-.09.85.64.31.75 1.06 2.58 1.15 2.76.09.18.15.39.03.62-.12.23-.27.4-.43.59-.16.19-.34.4-.48.54-.16.16-.33.34-.14.67.19.33.85 1.4 1.83 2.27.98.87 2.11 1.45 2.44 1.62.33.17.52.14.71-.08.19-.22.82-.96 1.04-1.29.22-.33.44-.28.74-.17.3.11 1.91.9 2.24 1.06.33.16.55.24.63.38.08.14.08.82-.12 1.38z"/>
  </svg>
)

/*
// CODE KEPT AS REQUESTED BUT COMMENTED OUT
// Zod validation schema matching Codiqo's exact spec
import { z } from 'zod'
const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().regex(/^[0-9+()\-\s]{7,20}$/, "Please enter a valid phone number"),
  type: z.string().trim().max(60).optional(),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(2000)
})
*/

export default function Contact({ settings }) {
  const { contactEmail, contactLocation, whatsappNumber, whatsappMessage } = settings
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  /*
  // CODE KEPT AS REQUESTED BUT COMMENTED OUT
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Static website',
    message: ''
  })

  const [status, setStatus] = useState({
    type: null, // 'success' | 'error' | null
    message: ''
  })

  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ type: null, message: '' })

    // Validate using Zod
    const validation = contactSchema.safeParse(formData)
    if (!validation.success) {
      const errorMsg = validation.error.issues[0].message
      setStatus({
        type: 'error',
        message: errorMsg
      })
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch("https://formspree.io/f/myklvvwa", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...validation.data,
          _subject: `New project enquiry from ${validation.data.name}`
        })
      })

      if (response.ok) {
        setStatus({
          type: 'success',
          message: "Thanks! We'll reply within 24 hours."
        })
        setFormData({
          name: '',
          email: '',
          phone: '',
          type: 'Static website',
          message: ''
        })
      } else {
        const data = await response.json().catch(() => ({}))
        const errorMsg = data?.errors?.[0]?.message || "Please try again or email yadhumanoj12@gmail.com directly."
        setStatus({
          type: 'error',
          message: errorMsg
        })
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: "Please check your network connection or email yadhumanoj12@gmail.com."
      })
    } finally {
      setSubmitting(false)
    }
  }
  */

  return (
    <section id="contact" className="py-24 lg:py-40 bg-foreground text-background relative overflow-hidden">
      {/* Decorative Blob Glow */}
      <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">

          {/* Left Column: Contact details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 text-left flex flex-col justify-between"
          >
            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-primary font-bold">Contact</span>
              <h2 className="mt-4 font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-tight text-balance text-background">
                Ready to Transform  <span className="text-primary">Your Vision.</span>
              </h2>
              <p className="mt-6 text-background/70 text-lg leading-relaxed max-w-md">
               Let's discuss how we can bring your ideas to life. Book a quick call with our team, and we'll guide you through the next steps.
              </p>
            </div>

            {/* Visual Action Link items */}
            <div className="mt-12 space-y-6">

              {/* Email item */}
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-4 group active:scale-95 transition-transform duration-200">
                <span className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center text-background group-hover:bg-primary group-hover:text-primary-foreground active:bg-primary active:text-primary-foreground transition-colors duration-300">
                  <Mail className="w-5 h-5" />
                </span>
                <span className="break-all">
                  <div className="text-[10px] text-background/50 uppercase tracking-widest font-semibold">Email</div>
                  <div className="font-display text-lg font-bold text-background">{contactEmail}</div>
                </span>
              </a>

              {/* Based In Location item */}
              <div className="flex items-center gap-4 cursor-default">
                <span className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center text-background">
                  <MapPin className="w-5 h-5" />
                </span>
                <span>
                  <div className="text-[10px] text-background/50 uppercase tracking-widest font-semibold">Based in</div>
                  <div className="font-display text-lg font-bold text-background">{contactLocation}</div>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: WhatsApp Redirect Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            whileHover={{ y: -6, borderColor: "rgba(16, 185, 129, 0.4)", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 25px rgba(16, 185, 129, 0.1)" }}
            className="lg:col-span-7 bg-gradient-to-br from-emerald-950/85 via-slate-950/95 to-emerald-950/40 border border-emerald-500/20 shadow-[0_15px_30px_-15px_rgba(0,0,0,0.8)] rounded-[32px] p-8 lg:p-12 flex flex-col justify-between min-h-[360px] relative overflow-hidden text-left transition-colors duration-300"
          >
            {/* Visual design glows */}
            <div className="absolute -right-20 -top-20 w-72 h-72 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Subtle Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="space-y-6 relative z-10">
              {/* Title & description */}
              <div className="space-y-3">
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                  Chat With Us on <span className="text-emerald-400">WhatsApp</span>
                </h3>
                <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                  Tap the button below to start a conversation. We typically respond within minutes.
                </p>
              </div>
            </div>

            {/* Premium WhatsApp Button */}
            <div className="pt-8 relative z-10">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-base hover:from-emerald-400 hover:to-green-500 shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_30px_rgba(16,185,129,0.6)] active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                <span>Message on WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </motion.div>

          {/*
          // ORIGINAL FORM RETAINED IN COMMENTS AS REQUESTED
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-800/85 border border-primary/20 shadow-soft rounded-[32px] p-8 lg:p-12 space-y-6 text-left"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <label className="block w-full">
                <span className="text-sm text-white/70 mb-2 block font-medium">Your name</span>
                <input
                  required
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                  maxLength={100}
                  className="w-full bg-white border border-white/20 rounded-3xl py-3 px-4 text-slate-950 placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-base"
                />
              </label>

              <label className="block w-full">
                <span className="text-sm text-white/70 mb-2 block font-medium">Email</span>
                <input
                  required
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email Address"
                  maxLength={255}
                  className="w-full bg-white border border-white/20 rounded-3xl py-3 px-4 text-slate-950 placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-base"
                />
              </label>

              <label className="block w-full">
                <span className="text-sm text-white/70 mb-2 block font-medium">Phone Number</span>
                <input
                  required
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter Your Phone Number"
                  maxLength={20}
                  className="w-full bg-white border border-white/20 rounded-3xl py-3 px-4 text-slate-950 placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-base"
                />
              </label>
            </div>

            <label className="block w-full">
              <span className="text-sm text-white/70 mb-2 block font-medium">Project type</span>
              <div className="relative">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-white border border-white/20 rounded-3xl py-3 px-4 text-slate-950 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer text-base"
                >
                  <option className="bg-foreground text-background">Static website</option>
                  <option className="bg-foreground text-background">Dynamic web app</option>
                  <option className="bg-foreground text-background">E-commerce</option>
                  <option className="bg-foreground text-background">Mobile app</option>
                  <option className="bg-foreground text-background">Custom build</option>
                  <option className="bg-foreground text-background">Redesign</option>
                  <option className="bg-foreground text-background">Not sure yet</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60">
                  ▼
                </div>
              </div>
            </label>

            <label className="block w-full">
              <span className="text-sm text-white/70 mb-2 block font-medium">Tell us about your project</span>
              <textarea
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                maxLength={2000}
                placeholder="A few lines about goals, audience and timeline…"
                className="w-full bg-white border border-white/20 rounded-3xl py-3 px-4 text-slate-950 placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none text-base"
              />
            </label>

            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl text-sm font-semibold border ${
                  status.type === 'success'
                    ? "bg-green-500/10 border-green-500/30 text-green-300"
                    : "bg-red-500/10 border-red-500/30 text-red-300"
                }`}
              >
                {status.message}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-glow active:scale-95 transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending…" : "Start a Project"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </motion.form>
          */}
        </div>
      </div>
    </section>
  )
}
