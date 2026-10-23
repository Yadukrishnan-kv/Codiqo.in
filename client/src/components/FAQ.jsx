import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function FAQ({ faqs = [] }) {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24 lg:py-40 bg-surface">
      <div className="container mx-auto max-w-4xl px-6">

        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-primary font-bold">FAQ</span>
          <h2 className="mt-4 font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-tight text-foreground">
         Everything You Need to Know
          </h2>
        </motion.div>

        {/* Accordion Component */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index
            return (
              <motion.div
                key={faq._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`bg-background border rounded-2xl px-6 transition-all duration-300 ${
                  isOpen ? "border-primary/50 shadow-soft" : "border-border/80"
                }`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left font-display text-base sm:text-lg font-bold py-6 flex items-center justify-between text-foreground hover:no-underline focus:outline-none group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-muted-foreground group-hover:text-primary transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                {/* Collapsible Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="text-muted-foreground leading-relaxed pb-6 text-sm sm:text-base border-t border-border/40 pt-4 text-left">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
