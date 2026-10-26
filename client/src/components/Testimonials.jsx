import React, { useEffect, useRef, useState } from 'react'
import { Star } from 'lucide-react'
import { resolveAssetUrl } from '../utils/resolveAssetUrl'

export default function Testimonials({ testimonials = [] }) {
  const scrollerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const container = scrollerRef.current
    if (!container) return

    const items = Array.from(container.children)
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .reduce((best, entry) => (!best || entry.intersectionRatio > best.intersectionRatio ? entry : best), null)
        if (!mostVisible) return
        const index = items.indexOf(mostVisible.target)
        if (index !== -1) setActiveIndex(index)
      },
      { root: container, threshold: [0.5, 0.75, 1] }
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [testimonials.length])

  const scrollToIndex = (index) => {
    const container = scrollerRef.current
    const target = container?.children[index]
    target?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  return (
    <section className="py-24 lg:py-40 bg-background relative">
      <div className="container mx-auto max-w-7xl px-6">

        {/* Header Block */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-sm uppercase tracking-[0.3em] text-primary font-bold">Testimonials</span>
          <h2 className="mt-4 font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-tight text-foreground">
            Words from founders.
          </h2>
        </div>

        {/* Mobile: swipeable snap slider. From md up: normal 3-column grid. */}
        <div
          ref={scrollerRef}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-6 px-6 pb-2 gap-5 md:grid md:grid-cols-3 md:overflow-visible md:snap-none md:mx-0 md:px-0 md:pb-0 md:gap-6"
        >
          {testimonials.map((t) => (
            <figure
              key={t._id}
              className="snap-center shrink-0 w-full md:w-auto md:shrink bg-surface border border-border/80 rounded-[32px] p-8 flex flex-col justify-between hover:shadow-elegant transition-all duration-500 text-left"
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
            </figure>
          ))}
        </div>

        {/* Slide dots — mobile only */}
        {testimonials.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6 md:hidden">
            {testimonials.map((t, index) => (
              <button
                key={t._id}
                type="button"
                onClick={() => scrollToIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'w-6 bg-primary' : 'w-2 bg-border'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
