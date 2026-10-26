import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Layers } from 'lucide-react'
import { resolveAssetUrl } from '../utils/resolveAssetUrl'

export default function Work({ projects = [] }) {
  return (
    <section id="work" className="py-24 lg:py-40 bg-background relative">
      <div className="container mx-auto max-w-7xl px-6">

        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 text-left">
          <div>
            <span className="text-sm uppercase tracking-[0.3em] text-primary font-bold">Selected Work</span>
            <h2 className="mt-4 font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-tight text-foreground">
            Real-World Projects
            </h2>
          </div>

        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.a
              key={project._id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.98 }}
              className="group relative rounded-[32px] overflow-hidden block border border-border/40 bg-surface shadow-soft"
            >
              {/* Representational Visual Canvas — same height on every card */}
              <div
                className={`relative overflow-hidden bg-gradient-to-br ${project.gradientFrom} ${project.gradientVia} ${project.gradientTo} flex items-center justify-center transition-all duration-700 text-foreground/80 group-hover:text-primary-glow aspect-video ${
                  project.isFullImage ? '' : 'group-hover:scale-105'
                }`}
              >
                {project.isFullImage ? (
                  <img
                    src={resolveAssetUrl(project.imageUrl)}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-opacity duration-500"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 grid-pattern opacity-20" aria-hidden="true" />
                    <Layers className="w-1/3 h-1/3 opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                  </>
                )}
              </div>

              {/* Title — sits below the image, not overlaid on it */}
              <div className="p-6 md:px-6 md:py-5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-display text-2xl sm:text-3xl md:text-2xl font-black tracking-tight leading-none text-foreground truncate">
                    {project.title}
                  </h3>
                </div>

                <div className="w-10 h-10 md:w-8 md:h-8 rounded-full border border-border flex items-center justify-center shrink-0 transition-all duration-300 group-hover:rotate-45 group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground">
                  <ArrowUpRight className="w-5 h-5 md:w-4 md:h-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
