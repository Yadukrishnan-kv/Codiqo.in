import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Hero({ hero }) {
  const {
    badgeText,
    headingLine1,
    headingLine2,
    headingLine3,
    paragraph,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    widgetTopLeft,
    widgetBottomLeft,
    widgetTopRight,
    widgetBottomRight,
  } = hero

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-background"
    >
      {/* Decorative Grid Pattern */}
      <div
        className="absolute inset-0 grid-pattern opacity-60 pointer-events-none"
        aria-hidden="true"
      />

      {/* Glowing Purple Blurs */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto max-w-7xl px-6 relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        {/* Left Column Content */}
        <div className="lg:col-span-7 flex flex-col text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex self-start items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/60 backdrop-blur text-xs sm:text-sm text-muted-foreground mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span>{badgeText}</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight text-foreground text-balance"
          >
            {headingLine1}
            <br />
            {headingLine2}
            <br />
            <span className="relative inline-block mt-2">
              <span className="gradient-text">{headingLine3}</span>
              <span className="absolute -right-4 top-2 w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-primary" />
            </span>
          </motion.h1>

          {/* Paragraph Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-8 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl text-balance leading-relaxed"
          >
            {paragraph}{" "}
          </motion.p>

          {/* Action Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href={primaryCtaHref}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-glow active:scale-95 active:bg-primary/90"
            >
              {primaryCtaLabel}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-active:translate-x-1 transition-transform duration-300" />
            </a>

            <a
              href={secondaryCtaHref}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border hover:border-foreground active:scale-95 transition-transform duration-300 font-semibold"
            >
              {secondaryCtaLabel}
            </a>
          </motion.div>
        </div>

        {/* Right Column Visual Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="lg:col-span-5 relative w-full aspect-square max-w-[480px] lg:max-w-none mx-auto lg:ml-auto px-2 sm:px-0"
        >
          {/* Main Visual Display Card */}
          <div className="relative w-full h-full rounded-[32px] overflow-hidden shadow-elegant border border-border/40 bg-surface flex items-center justify-center">
            {/* Visual Abstract Design */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent" />

            {/* Geometric Glowing Orbital Visual (Replaces static image assets beautifully!) */}
            <div className="relative w-72 h-72 rounded-full border border-primary/20 flex items-center justify-center animate-pulse">
              <div className="absolute w-56 h-56 rounded-full border border-dashed border-primary/30 rotate-45" />
              <div className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-purple-600/5 blur-xl" />
              <div className="relative w-30 h-28 rounded-full border-2 border-primary bg-background flex flex-col items-center justify-center p-4 shadow-glow">
                <span className="font-display font-black text-xl text-primary">
                  Codiqo
                </span>
              </div>
            </div>
          </div>

          {/* Floating Widget 1: Performance */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-2 top-6 sm:-left-6 sm:top-12 bg-background/90 backdrop-blur border border-border rounded-2xl p-3 sm:p-4 shadow-soft cursor-pointer"
          >
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest whitespace-nowrap">
              {widgetTopLeft}
            </div>
          </motion.div>
           <motion.div
            animate={{ y: [0, 12, 0] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-2 bottom-4 sm:-left-6 sm:bottom-12 bg-foreground text-background rounded-2xl p-3 sm:p-4 shadow-glow cursor-pointer"
          >
            <div className="text-[10px] text-background/80 uppercase tracking-widest whitespace-nowrap">
              {widgetBottomLeft}
            </div>
          </motion.div>

            <motion.div
            animate={{ y: [0, -12, 0] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-2 top-6 sm:-right-6 sm:top-12 bg-foreground text-background rounded-2xl p-3 sm:p-4 shadow-glow cursor-pointer"
          >
            <div className="text-[10px] text-background/80 uppercase tracking-widest whitespace-nowrap">
              {widgetTopRight}
            </div>
          </motion.div>

          {/* Floating Widget 2: SEO */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute right-2 bottom-4 sm:-right-4 sm:bottom-12 bg-background/90 backdrop-blur border border-border rounded-2xl p-3 sm:p-4 shadow-soft cursor-pointer"
          >
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest whitespace-nowrap">
              {widgetBottomRight}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
