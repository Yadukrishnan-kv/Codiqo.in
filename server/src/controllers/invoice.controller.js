import PDFDocument from 'pdfkit'
import Invoice from '../models/Invoice.js'
import SiteSettings from '../models/SiteSettings.js'
import { generateInvoicePdf } from '../utils/generateInvoicePdf.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ok, ApiError } from '../utils/apiResponse.js'

async function nextInvoiceNumber() {
  const year = new Date().getFullYear()
  const prefix = `INV-${year}-`
  const last = await Invoice.findOne({ invoiceNumber: new RegExp(`^${prefix}`) }).sort({ invoiceNumber: -1 })
  const lastSeq = last ? Number(last.invoiceNumber.slice(prefix.length)) || 0 : 0
  return `${prefix}${String(lastSeq + 1).padStart(4, '0')}`
}

const getAll = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1)
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 25))
  const filter = {}

  if (req.query.status) filter.status = req.query.status

  if (req.query.search) {
    const regex = new RegExp(req.query.search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
    filter.$or = [{ invoiceNumber: regex }, { 'client.name': regex }, { 'client.company': regex }]
  }

  const [items, total] = await Promise.all([
    Invoice.find(filter)
      .sort({ issueDate: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Invoice.countDocuments(filter),
  ])

  ok(res, { items, total, page, limit, pages: Math.max(1, Math.ceil(total / limit)) })
})

const getOne = asyncHandler(async (req, res) => {
  const item = await Invoice.findById(req.params.id)
  if (!item) throw new ApiError(404, 'Invoice not found')
  ok(res, { item })
})

const create = asyncHandler(async (req, res) => {
  const invoiceNumber = await nextInvoiceNumber()
  const item = await Invoice.create({ ...req.body, invoiceNumber, createdBy: req.admin._id })
  ok(res, { item }, 201)
})

const update = asyncHandler(async (req, res) => {
  const existing = await Invoice.findById(req.params.id)
  if (!existing) throw new ApiError(404, 'Invoice not found')
  Object.assign(existing, req.body)
  await existing.save()
  ok(res, { item: existing })
})

const updateStatus = asyncHandler(async (req, res) => {
  const item = await Invoice.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  )
  if (!item) throw new ApiError(404, 'Invoice not found')
  ok(res, { item })
})

const remove = asyncHandler(async (req, res) => {
  const item = await Invoice.findByIdAndDelete(req.params.id)
  if (!item) throw new ApiError(404, 'Invoice not found')
  ok(res, { deleted: true, item })
})

const downloadPdf = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id)
  if (!invoice) throw new ApiError(404, 'Invoice not found')

  const siteSettings = await SiteSettings.findOne()

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename="${invoice.invoiceNumber}.pdf"`)

  const doc = new PDFDocument({ size: 'A4', margin: 50 })
  doc.pipe(res)
  generateInvoicePdf(doc, { invoice, siteSettings })
  doc.end()
})

export default { getAll, getOne, create, update, updateStatus, remove, downloadPdf }
