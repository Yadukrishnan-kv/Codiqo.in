import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ICON_OPTIONS } from '../utils/iconOptions'

const NAV_CLEARANCE = 96 // px — keeps cards clear of the fixed navbar
const PEEK_STEP = 14 // px — each card sits slightly lower, leaving the one below peeking out

function ReasonCardBody({ reason }) {
  const Icon = ICON_OPTIONS[reason.icon]
  return (
    <div>
      {Icon && <Icon className="w-9 h-9 text-primary mb-8" />}
      <h3 className="font-display text-xl sm:text-2xl font-bold mb-3 text-foreground">
        {reason.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
        {reason.description}
      </p>
    </div>
  )
}

/* Scroll-driven stack: each card pins under the previous one, then the next
   card slides up and over it while it eases back in scale/opacity to read
   as a receding layer underneath. */
function StackCard({ reason, index, isLast }) {
  const trackRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end start'],
  })
  // Hold steady for most of the dwell, then ease back in the final stretch
  // as the next card arrives, so it reads as receding underneath it.
  const scale = useTransform(scrollYProgress, [0, 0.65, 1], [1, 1, 0.94])
  const y = useTransform(scrollYProgress, [0, 0.65, 1], [0, 0, -16])

  const top = NAV_CLEARANCE + index * PEEK_STEP

  return (
    <div
      ref={trackRef}
      style={{ height: isLast ? 'auto' : '100vh' }}
      className="relative"
    >
      <div
        className="sticky"
        style={{ top: `${top}px`, zIndex: index + 1 }}
      >
        <motion.div
          style={isLast ? undefined : { scale, y }}
          className="origin-top will-change-transform bg-background rounded-[28px] border border-border/80 shadow-2xl p-8 min-h-[260px] flex flex-col justify-between"
        >
          <ReasonCardBody reason={reason} />
        </motion.div>
      </div>
    </div>
  )
}

export default function WhyUs({ reasons = [] }) {
  return (
    <section id="why" className="py-24 lg:py-40 bg-surface">
      <div className="container mx-auto max-w-7xl px-6">

        {/* Header Block */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-sm uppercase tracking-[0.3em] text-primary font-bold">Why Codiqo</span>
          <h2 className="mt-4 font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-tight text-balance text-foreground">
           What sets {" "}
            <span className="gradient-text">us apart.</span>
          </h2>
        </div>

        {/* Mobile: scroll-linked sticky stack — each card pins, then the next
            slides up over it. From md up: clean hairline-border grid. */}
        <div className="md:hidden relative">
          {reasons.map((reason, index) => (
            <StackCard
              key={reason._id}
              reason={reason}
              index={index}
              isLast={index === reasons.length - 1}
            />
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-2 md:gap-px md:bg-border/40 md:rounded-[32px] md:overflow-hidden md:border md:border-border/40 md:shadow-soft lg:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = ICON_OPTIONS[reason.icon]
            return (
              <div
                key={reason._id}
                className="bg-background p-8 lg:p-12 hover:bg-foreground hover:text-background transition-all duration-500 group cursor-default text-left flex flex-col justify-between min-h-[250px]"
              >
                <div>
                  {Icon && (
                    <Icon className="w-9 h-9 text-primary mb-8 group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
                  )}
                  <h3 className="font-display text-xl sm:text-2xl font-bold mb-3 text-foreground group-hover:text-background transition-colors duration-500">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-background/70 leading-relaxed text-sm sm:text-base transition-colors duration-500">
                    {reason.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
