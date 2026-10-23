import React from 'react'
import Navbar from '../../components/Navbar'
import Hero from '../../components/Hero'
import LogoTicker from '../../components/LogoTicker'
import Services from '../../components/Services'
import Process from '../../components/Process'
import Work from '../../components/Work'
import WhyUs from '../../components/WhyUs'
import Testimonials from '../../components/Testimonials'
import Founder from '../../components/Founder'
import FAQ from '../../components/FAQ'
import Contact from '../../components/Contact'
import Footer from '../../components/Footer'
import { useHomepage } from '../../hooks/useHomepage'

export default function Home() {
  const { data, isLoading, isError } = useHomepage()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="font-display font-black text-2xl text-foreground">
          Codiqo<span className="text-primary">.</span>
        </span>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-center px-6">
        <p className="text-muted-foreground">
          Something went wrong loading the page. Please refresh.
        </p>
      </div>
    )
  }

  const { hero, founder, settings, services, processSteps, projects, whyUsReasons, testimonials, faqs, navLinks, brands } =
    data
  const visibility = settings.sectionVisibility || {}

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <Navbar navLinks={navLinks} logoText={settings.logoText} logoImageUrl={settings.logoImageUrl} />

      <Hero hero={hero} />

      {visibility.logoTicker && <LogoTicker brands={brands} />}

      {visibility.services !== false && <Services main={services.main} sub={services.sub} />}

      {visibility.process !== false && <Process steps={processSteps} />}

      {visibility.work !== false && <Work projects={projects} />}

      {visibility.whyUs !== false && <WhyUs reasons={whyUsReasons} />}

      {visibility.testimonials !== false && <Testimonials testimonials={testimonials} />}

      {visibility.founder && <Founder founder={founder} />}

      {visibility.faq !== false && <FAQ faqs={faqs} />}

      {visibility.contact !== false && <Contact settings={settings} />}

      <Footer settings={settings} mainServices={services.main} />

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: settings.siteName,
          description: settings.seoDescription,
          url: 'https://codiqo.in',
          telephone: settings.jsonLdTelephone,
          email: settings.jsonLdEmail,
          areaServed: settings.jsonLdAreaServed,
          serviceType: settings.jsonLdServiceTypes,
        })}
      </script>
    </main>
  )
}
