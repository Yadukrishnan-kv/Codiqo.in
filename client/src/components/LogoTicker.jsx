import React from 'react'
import { resolveAssetUrl } from '../utils/resolveAssetUrl'

export default function LogoTicker({ brands = [] }) {
  const looped = [...brands, ...brands, ...brands]

  return (
    <section className="py-12 border-y border-border/80 bg-surface/30 overflow-hidden relative">
      <div className="container mx-auto max-w-7xl px-6 mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold">
          Trusted by founders &amp; fast-moving teams
        </p>
      </div>

      {/* Infinite Scrolling Marquee Wrapper */}
      <div className="relative flex w-full overflow-hidden select-none">
        {/* Soft Left and Right Edge Masks for Premium Visual Fade */}
        <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Looping Row */}
        <div className="flex shrink-0 gap-16 pr-16 marquee">
          {looped.map((brand, index) => (
            <span
              key={`${brand._id}-${index}`}
              className="font-display text-2xl sm:text-3xl font-black text-muted-foreground/40 hover:text-foreground/80 transition-colors duration-300 whitespace-nowrap cursor-default flex items-center gap-2"
            >
              {brand.logoUrl ? (
                <img src={resolveAssetUrl(brand.logoUrl)} alt={brand.name} className="h-7 w-auto object-contain" />
              ) : (
                <>
                  {brand.name}
                  <span className="text-primary font-bold ml-0.5">.</span>
                </>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
