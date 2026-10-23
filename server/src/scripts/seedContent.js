// One-off migration: moves the content that used to be hard-coded in the
// React components into their real collections, so the admin panel has
// something to edit and the public cutover doesn't regress to an empty
// homepage. Safe to re-run — each collection is only seeded if empty.
// Usage: npm run seed:content
import path from 'node:path'
import fs from 'node:fs'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import { uploadsDirPath } from '../middleware/upload.middleware.js'
import Service from '../models/Service.js'
import ProcessStep from '../models/ProcessStep.js'
import Project from '../models/Project.js'
import WhyUsReason from '../models/WhyUsReason.js'
import Testimonial from '../models/Testimonial.js'
import Faq from '../models/Faq.js'
import NavLink from '../models/NavLink.js'
import Brand from '../models/Brand.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CLIENT_ASSETS = path.join(__dirname, '..', '..', '..', 'client', 'src', 'assets')

function copyAssetToUploads(filename) {
  const ext = path.extname(filename)
  const destName = `${crypto.randomUUID()}${ext}`
  fs.copyFileSync(path.join(CLIENT_ASSETS, filename), path.join(uploadsDirPath, destName))
  return `/uploads/${destName}`
}

async function seedIfEmpty(Model, label, docs) {
  const count = await Model.countDocuments()
  if (count > 0) {
    console.log(`[seed] ${label}: already has ${count} document(s), skipping`)
    return
  }
  await Model.insertMany(docs)
  console.log(`[seed] ${label}: inserted ${docs.length} document(s)`)
}

async function seed() {
  await connectDB()

  await seedIfEmpty(Service, 'services', [
    {
      type: 'main',
      icon: 'PanelsTopLeft',
      title: 'Static Websites',
      description:
        'Fast, secure, and beautifully crafted static websites designed to showcase your brand, build credibility, and deliver an exceptional user experience.',
      bullets: ['Lightning-Fast Loading', 'Performance-First Architecture', 'Global Edge Network'],
      order: 0,
    },
    {
      type: 'main',
      icon: 'Database',
      title: 'Dynamic Web Apps',
      description:
        'Scalable full-stack platforms with real-time systems, secure auth, dashboards, and APIs — from booking systems to SaaS products. Built to grow with your business.',
      bullets: [
        'Secure authentication & user management',
        'Real-time data processing',
        'Admin dashboards for full control',
      ],
      order: 1,
    },
    {
      type: 'main',
      icon: 'Smartphone',
      title: 'Mobile App Development',
      description:
        'High-performance mobile applications built for seamless user experiences, strong performance, and scalable architecture across iOS and Android.',
      bullets: ['Cross-platform development', 'API & backend integration', 'Smooth native-like performance'],
      order: 2,
    },
    {
      type: 'main',
      icon: 'CodeXml',
      title: 'Custom Solutions',
      description:
        'We build custom web systems that adapt to your business — not the other way around. Scalable integrations, headless architectures, and automation that streamline operations.',
      bullets: ['Headless CMS architecture', 'Automated workflows', 'API integrations'],
      order: 3,
    },
    {
      type: 'sub',
      icon: 'ShoppingBag',
      title: 'E-Commerce',
      description: 'Online stores built for speed, simplicity, and higher conversions.',
      order: 0,
    },
    {
      type: 'sub',
      icon: 'Smartphone',
      title: 'Responsive Design',
      description: 'Seamless layouts that adapt perfectly to any device.',
      order: 1,
    },
    {
      type: 'sub',
      icon: 'Gauge',
      title: 'Performance Optimization',
      description: 'Faster load times, optimized queries, and improved application efficiency.',
      order: 2,
    },
  ])

  await seedIfEmpty(ProcessStep, 'process steps', [
    {
      title: 'Research',
      description: 'We analyze your market, users, and competitors to identify the best approach for your product.',
      order: 0,
    },
    {
      title: 'Plan',
      description: 'We structure the product flow, features, and architecture for a scalable solution.',
      order: 1,
    },
    {
      title: 'Develop',
      description: 'We design and develop fast, scalable, and modern full-stack applications.',
      order: 2,
    },
    {
      title: 'Launch',
      description: 'We deploy, optimize, and support your product for real-world performance.',
      order: 3,
    },
  ])

  const fitbiteImage = copyAssetToUploads('Fitbite.png')
  const happylandImage = copyAssetToUploads('Screenshot 2026-06-09 112813.png')

  await seedIfEmpty(Project, 'projects', [
    {
      title: 'Fitbite',
      tag: 'Where Nutrition Meets Results',
      year: '2026',
      url: 'https://fitbite-healthy-meals.vercel.app/',
      imageUrl: fitbiteImage,
      isFullImage: true,
      order: 0,
    },
    {
      title: 'Happyland Group',
      tag: 'Leading Destination Management Services & Luxury Travel in the UAE',
      year: '2026',
      url: 'https://happylandgroupventures.com/',
      imageUrl: happylandImage,
      isFullImage: true,
      order: 1,
    },
    {
      title: 'Vanguard',
      tag: 'Transportation & Logistics Services',
      year: '2025',
      url: 'https://codiqo.in/demo/Vanguard-logistics.html',
      gradientFrom: 'from-blue-950',
      gradientVia: 'via-slate-900',
      gradientTo: 'to-sky-950',
      order: 2,
    },
    {
      title: 'Veridian',
      tag: 'Medical Service Provider',
      year: '2025',
      url: 'https://codiqo.in/demo/veridian.html',
      gradientFrom: 'from-teal-950',
      gradientVia: 'via-cyan-900',
      gradientTo: 'to-emerald-950',
      order: 3,
    },
    {
      title: 'Tesla Accessories',
      tag: 'Smart Decarbonising for Engines',
      year: '2026',
      url: 'https://codiqo.in/clients/tesla',
      gradientFrom: 'from-neutral-950',
      gradientVia: 'via-stone-900',
      gradientTo: 'to-red-950',
      order: 4,
    },
    {
      title: 'VertexCorp',
      tag: 'Digital Solutions Organization',
      year: '2025',
      url: 'https://codiqo.in/demo/vertex.html',
      gradientFrom: 'from-indigo-950',
      gradientVia: 'via-purple-900',
      gradientTo: 'to-pink-950',
      order: 5,
    },
  ])

  await seedIfEmpty(WhyUsReason, 'why-us reasons', [
    {
      icon: 'Zap',
      title: 'Fast Delivery',
      description: 'We move quickly from idea to launch without unnecessary delays or complexity.',
      order: 0,
    },
    {
      icon: 'Gauge',
      title: 'High Performance',
      description: 'Every product is built for speed, smooth experience, and reliable real-world usage.',
      order: 1,
    },
    {
      icon: 'Palette',
      title: 'Clean Design',
      description: 'Simple, modern interfaces focused on clarity, usability, and strong first impressions.',
      order: 2,
    },
    {
      icon: 'Shield',
      title: 'Reliable Quality',
      description: 'Stable, well-structured builds that work consistently across devices and use cases.',
      order: 3,
    },
    {
      icon: 'ChartLine',
      title: 'Growth Focused',
      description: 'Built to support business goals like engagement, conversions, and long-term growth.',
      order: 4,
    },
    {
      icon: 'HeartHandshake',
      title: 'Easy Collaboration',
      description: 'Clear communication, smooth process, and support from start to delivery.',
      order: 5,
    },
  ])

  await seedIfEmpty(Testimonial, 'testimonials', [
    {
      quote:
        'Working with Codiqo was one of the best decisions for our business. The website is fast, professional, and has significantly improved our online presence',
      name: 'Vinayak T V',
      role: 'Founder, Fitbite',
      rating: 5,
      order: 0,
    },
    {
      quote:
        'From design to deployment, everything was handled perfectly. The attention to detail and user experience exceeded our expectations.',
      name: 'Benet Binu',
      role: 'Product Lead, Travel Bay',
      rating: 5,
      order: 1,
    },
    {
      quote:
        'We wanted a premium website that reflected our brand, and CodeCraft delivered exactly that. The final result feels modern, clean, and trustworthy.',
      name: 'Muhammad Shahan K',
      role: 'Founder, Shanu Kitchen',
      rating: 5,
      order: 2,
    },
  ])

  await seedIfEmpty(Faq, 'faqs', [
    {
      question: 'How long does a project usually take?',
      answer:
        'Static websites usually take 2–3 weeks. Web applications, mobile apps, and custom systems typically take 4–8 weeks depending on scope and complexity. After understanding your requirements, we provide a clear and accurate timeline.',
      order: 0,
    },
    {
      question: 'Do you provide support after launch?',
      answer:
        'Yes. Every project includes 30 days of post-launch support. After that, optional maintenance plans are available for updates, fixes, hosting, and performance monitoring.',
      order: 1,
    },
    {
      question: 'Can you work on existing websites?',
      answer:
        'Yes. We review your current setup, improve performance and design where needed, and upgrade the system without affecting existing content.',
      order: 2,
    },
    {
      question: 'What tools and technologies do you use?',
      answer:
        'We use modern web technologies like React, Next.js, Node, and Tailwind, along with scalable hosting and backend solutions depending on project needs. The stack is chosen based on performance and scalability, not trends.',
      order: 3,
    },
    {
      question: 'How much does a website cost?',
      answer:
        'Pricing depends on scope, features, and complexity. We build everything from websites to web applications, mobile apps, and custom systems, and provide a tailored quote after understanding your requirements.',
      order: 4,
    },
  ])

  await seedIfEmpty(NavLink, 'nav links', [
    { label: 'Services', href: '#services', order: 0 },
    { label: 'Process', href: '#process', order: 1 },
    { label: 'Work', href: '#work', order: 2 },
    { label: 'Why Us', href: '#why', order: 3 },
    { label: 'FAQ', href: '#faq', order: 4 },
    { label: 'Contact', href: '#contact', order: 5 },
  ])

  await seedIfEmpty(
    Brand,
    'brands',
    ['Nordic', 'Acme.co', 'Lumen', 'Volta', 'Pixelpath', 'Kinetic', 'Northstar', 'Ember', 'Mosaic', 'Vertex'].map(
      (name, order) => ({ name, order })
    )
  )

  await mongoose.disconnect()
  process.exit(0)
}

seed().catch((err) => {
  console.error('[seed] Failed:', err)
  process.exit(1)
})
