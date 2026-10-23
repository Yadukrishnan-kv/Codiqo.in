import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { ICON_OPTIONS } from "../utils/iconOptions";

export default function Founder({ founder }) {
  const {
    name,
    initials,
    establishedLabel,
    bioParagraph1,
    bioParagraph2,
    highlight1Icon,
    highlight1Label,
    highlight1Value,
    highlight2Icon,
    highlight2Label,
    highlight2Value,
    highlight3Icon,
    highlight3Label,
    highlight3Value,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
  } = founder

  const highlights = [
    { icon: ICON_OPTIONS[highlight1Icon], label: highlight1Label, value: highlight1Value },
    { icon: ICON_OPTIONS[highlight2Icon], label: highlight2Label, value: highlight2Value },
    { icon: ICON_OPTIONS[highlight3Icon], label: highlight3Label, value: highlight3Value },
  ]

  return (
    <section
      id="founder"
      className="relative py-24 lg:py-40 bg-background overflow-hidden"
    >
      {/* Visual background grids */}
      <div
        className="absolute inset-0 grid-pattern opacity-40 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        {/* Badge Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/60 backdrop-blur text-xs sm:text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Behind Codiqo</span>
          </span>
        </motion.div>

        {/* Content Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Visual initials graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="lg:col-span-5 relative w-full aspect-square max-w-[400px] mx-auto"
          >
            {/* Glowing Box */}
            <div className="relative w-full h-full rounded-[32px] bg-foreground text-background overflow-hidden shadow-elegant border border-border/40">
              {/* Internal neon blurs */}
              <div
                className="absolute -top-20 -right-20 w-64 h-64 bg-primary/40 rounded-full blur-3xl animate-blob pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-24 -left-24 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-blob pointer-events-none"
                style={{ animationDelay: "2s" }}
                aria-hidden="true"
              />

              {/* Floating micro geometries */}
              <motion.div
                animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-10 left-10 w-12 h-12 rounded-2xl bg-primary pointer-events-none"
                aria-hidden="true"
              />
              <motion.div
                animate={{ y: [0, 16, 0], rotate: [0, -8, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-12 right-10 w-10 h-10 rounded-full border-2 border-primary pointer-events-none"
                aria-hidden="true"
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute top-1/3 right-12 w-8 h-8 rotate-45 bg-background/10 backdrop-blur pointer-events-none"
                aria-hidden="true"
              />

              {/* Founder Name Initials Display */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span className="font-display font-black text-[10rem] sm:text-[11rem] leading-none tracking-tighter text-background">
                  {initials.replace('.', '')}<span className="text-primary font-bold">.</span>
                </span>
              </div>

              {/* Corner Labels */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-background/60 pointer-events-none">
                <span>Codiqo</span>
                <span>{establishedLabel}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative Biography */}
          <div className="lg:col-span-7 text-left">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="font-display font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-foreground text-balance"
            >
              {name.split(' ')[0]}{' '}
              <span className="gradient-text">{name.split(' ').slice(1).join(' ')}</span>
            </motion.h2>

            {/* Paragraph Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8 space-y-6 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl"
            >
              <p>{bioParagraph1}</p>
              {bioParagraph2 && <p>{bioParagraph2}</p>}
            </motion.div>

            {/* Sub Highlights grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl"
            >
              {highlights.map((highlight) => (
                <div
                  key={highlight.label}
                  className="rounded-2xl border border-border bg-surface p-4 hover:border-primary/50 transition-colors duration-300 group cursor-default"
                >
                  {highlight.icon && (
                    <highlight.icon className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
                  )}
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                    {highlight.label}
                  </div>
                  <div className="font-display font-black text-sm sm:text-base mt-1 text-foreground leading-tight">
                    {highlight.value}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Quick Actions Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href={primaryCtaHref}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background font-semibold hover:bg-primary hover:text-primary-foreground hover:shadow-glow transition-all duration-300"
              >
                {primaryCtaLabel}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href={secondaryCtaHref}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border hover:border-foreground transition-colors font-semibold"
              >
                {secondaryCtaLabel}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
