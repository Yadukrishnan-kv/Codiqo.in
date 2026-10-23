import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'
import { resolveAssetUrl } from '../utils/resolveAssetUrl'

export default function Navbar({ navLinks = [], logoText = 'Codiqo', logoImageUrl }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-softpy-4"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="container mx-auto max-w-7xl px-6 flex items-center justify-between h-20" aria-label="Primary">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2 group relative z-50">
          {logoImageUrl ? (
            <img src={resolveAssetUrl(logoImageUrl)} alt={logoText} className="h-8 w-auto" />
          ) : (
            <span className="h-8 w-auto flex items-center font-display font-bold text-[28px] tracking-tight text-foreground transition-colors duration-300">
              {logoText}
              <span className="text-primary group-hover:scale-125 transition-transform duration-300">.</span>
            </span>
          )}
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-1 bg-surface/40 backdrop-blur-md border border-border/30 rounded-full px-2 py-1.5">
          {navLinks.map((link) => (
            <li key={link._id}>
              <a
                href={link.href}
                className="px-5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group block"
              >
                {link.label}
                <span className="absolute left-5 right-5 -bottom-0.5 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* Right Action Button & Menu Icon */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-primary hover:text-primary-foreground hover:shadow-glow transition-all duration-300"
          >
            <Sparkles className="w-4 h-4" />
            Start a Project
          </a>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-full bg-surface border border-border/80 text-foreground hover:text-primary hover:border-primary/50 transition-colors z-50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-border shadow-elegant md:hidden z-40"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <li key={link._id}>
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-semibold text-muted-foreground hover:text-primary transition-colors block py-2 border-b border-border/40"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-glow transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Start your project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
