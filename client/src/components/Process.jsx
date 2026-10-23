import { motion } from 'framer-motion'

export default function Process({ steps = [] }) {
  return (
    <section id="process" className="py-24 lg:py-40 bg-foreground text-background relative overflow-hidden">
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 opacity-10 grid-pattern pointer-events-none" aria-hidden="true" />

      {/* Floating Purple Visual Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-20 text-left"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-primary font-bold">Process</span>
          <h2 className="mt-4 font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-tight text-balance text-background">
           From idea to{" "}
            <span className="text-primary">real-world impact.</span>
          </h2>
        </motion.div>

        {/* Process Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -8 }}
              whileTap={{ scale: 0.98 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-8 rounded-[32px] border border-white/10 text-left flex flex-col justify-between cursor-pointer bg-surface shadow-soft backdrop-blur-sm hover:border-primary/50"
            >
              <div>
                {/* Large Process Step Number */}
                <div className="font-display text-6xl lg:text-7xl font-black text-violet-400 mb-6">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Step Title */}
                <h3 className="font-display text-2xl font-bold mb-3 text-white">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
