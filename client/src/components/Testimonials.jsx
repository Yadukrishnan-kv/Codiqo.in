import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { resolveAssetUrl } from '../utils/resolveAssetUrl'

export default function Testimonials({ testimonials = [] }) {
  return (
    <section className="py-24 lg:py-40 bg-background relative">
      <div className="container mx-auto max-w-7xl px-6">

        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16 text-left"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-primary font-bold">Testimonials</span>
          <h2 className="mt-4 font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-tight text-foreground">
            Words from founders.
          </h2>
        </motion.div>

        {/* Testimonials Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.figure
              key={t._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-surface border border-border/80 rounded-[32px] p-8 flex flex-col justify-between hover:shadow-elegant transition-all duration-500 text-left"
            >
              <div>
                {/* Star Rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < t.rating ? 'fill-primary text-primary' : 'text-border'}`}
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="text-lg sm:text-xl leading-relaxed font-display font-medium text-foreground">
                  "{t.quote}"
                </blockquote>
              </div>

              {/* Author Profile */}
              <figcaption className="mt-8 pt-6 border-t border-border/40 flex items-center gap-3">
                {t.avatarUrl && (
                  <img
                    src={resolveAssetUrl(t.avatarUrl)}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                )}
                <div>
                  <div className="font-bold text-foreground text-base">
                    {t.name}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    {t.role}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
