// One-off script to create (or update) the first superadmin account.
// Usage: ADMIN_NAME="Yadu" ADMIN_EMAIL=you@codiqo.in ADMIN_PASSWORD=strongpassword npm run seed:admin
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import Admin from '../models/Admin.js'

async function seed() {
  const name = process.env.ADMIN_NAME
  const email = process.env.ADMIN_EMAIL?.toLowerCase().trim()
  const password = process.env.ADMIN_PASSWORD

  if (!name || !email || !password) {
    console.error('Usage: ADMIN_NAME=... ADMIN_EMAIL=... ADMIN_PASSWORD=... npm run seed:admin')
    process.exit(1)
  }
  if (password.length < 8) {
    console.error('ADMIN_PASSWORD must be at least 8 characters')
    process.exit(1)
  }

  await connectDB()

  const existing = await Admin.findOne({ email }).select('+password')
  if (existing) {
    existing.name = name
    existing.password = password
    existing.role = 'superadmin'
    existing.isActive = true
    await existing.save()
    console.log(`[seed] Updated existing superadmin: ${email}`)
  } else {
    await Admin.create({ name, email, password, role: 'superadmin' })
    console.log(`[seed] Created superadmin: ${email}`)
  }

  await mongoose.disconnect()
  process.exit(0)
}

seed().catch((err) => {
  console.error('[seed] Failed:', err.message)
  process.exit(1)
})
