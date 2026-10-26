import React from "react";
import { motion as m } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { ICON_OPTIONS } from "../utils/iconOptions";
import { resolveAssetUrl } from "../utils/resolveAssetUrl";

function formatPrice(price) {
  return new Intl.NumberFormat('en-IN').format(price || 0)
}

export default function Services({ main = [], sub = [], settings = {} }) {
  const services = [...main, ...sub]
  const whatsappNumber = settings?.whatsappNumber || ''

  return (
    <section id="services" className="py-24 lg:py-40 relative bg-background">
      {/* Decorative Blur Background Blob */}
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto max-w-7xl px-6">
        {/* Header Block */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-sm uppercase tracking-[0.3em] text-primary font-bold">
            Services
          </span>
          <h2 className="mt-4 font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-tight text-balance text-foreground">
            Everything your brand needs{" "}
            <span className="gradient-text">on the web.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            From high-converting landing pages to scalable web platforms, we
            help businesses attract customers, build trust, and grow online with
            confidence.{" "}
          </p>
        </div>

        {/* Services Pricing Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = ICON_OPTIONS[service.icon]
            const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              `Hi, I'm interested in the ${service.title} package.`
            )}`

            return (
              <m.div
                key={service._id}
                whileTap={{ scale: 0.98 }}
                className="bg-surface border border-border/80 rounded-[32px] overflow-hidden flex flex-col hover:shadow-elegant transition-all duration-500"
              >
                {/* Card Visual */}
                <div className="relative aspect-video overflow-hidden bg-primary/5 flex items-center justify-center">
                  {service.imageUrl ? (
                    <img
                      src={resolveAssetUrl(service.imageUrl)}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    Icon && <Icon className="w-12 h-12 text-primary" />
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 lg:p-8 flex flex-col flex-1 text-left">
                  {service.category && (
                    <span className="inline-block w-fit mb-3 px-3 py-1 rounded-full bg-muted text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                      {service.category}
                    </span>
                  )}

                  <h3 className="font-display text-xl sm:text-2xl font-black text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="font-display text-3xl sm:text-4xl font-black text-foreground">
                      ₹{formatPrice(service.price)}
                    </span>
                    {service.priceNote && (
                      <span className="text-xs text-muted-foreground">{service.priceNote}</span>
                    )}
                  </div>

                  {service.bullets?.length > 0 && (
                    <ul className="space-y-2.5 pt-6 mb-8 border-t border-border/60 flex-1">
                      {service.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-2.5 text-sm text-foreground">
                          <Check className="w-4 h-4 text-primary shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-foreground text-background font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    Enquire on WhatsApp
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </a>
                </div>
              </m.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
