import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import PDFDocument from 'pdfkit'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const UPLOADS_DIR = path.join(__dirname, '..', '..', 'uploads')

const COLOR = {
  ink: '#1A1A1A',
  muted: '#666666',
  faint: '#999999',
  rule: '#1A1A1A',
  hairline: '#DDDDDD',
}

const STATUS_LABEL = {
  draft: 'Draft',
  sent: 'Sent',
  paid: 'Paid',
  overdue: 'Overdue',
  cancelled: 'Cancelled',
}

const CURRENCY_LOCALE = {
  INR: 'en-IN',
  USD: 'en-US',
  EUR: 'en-GB',
  GBP: 'en-GB',
}

function formatMoney(amount, currency) {
  const formatted = new Intl.NumberFormat(CURRENCY_LOCALE[currency] || 'en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0)
  return `${currency} ${formatted}`
}

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function resolveLogoPath(logoImageUrl) {
  if (!logoImageUrl || !logoImageUrl.startsWith('/uploads/')) return null
  const fullPath = path.join(UPLOADS_DIR, logoImageUrl.replace('/uploads/', ''))
  return fs.existsSync(fullPath) ? fullPath : null
}

// Builds the invoice PDF directly onto the response stream. Caller pipes it
// and ends the document once this returns — nothing here touches res.end().
export function generateInvoicePdf(doc, { invoice, siteSettings }) {
  const currency = invoice.currency || 'INR'
  const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right
  const left = doc.page.margins.left
  const right = left + pageWidth

  // Header: business identity (left) + invoice meta (right)
  const headerTop = doc.y
  const logoPath = resolveLogoPath(siteSettings?.logoImageUrl)
  let textX = left

  if (logoPath) {
    try {
      doc.image(logoPath, left, headerTop, { fit: [44, 44] })
      textX = left + 56
    } catch {
      textX = left
    }
  }

  doc.font('Helvetica-Bold').fontSize(18).fillColor(COLOR.ink).text(siteSettings?.siteName || 'Invoice', textX, headerTop)

  doc.font('Helvetica').fontSize(9).fillColor(COLOR.muted)
  const businessLines = [siteSettings?.contactLocation, siteSettings?.contactEmail, siteSettings?.contactPhone].filter(
    Boolean
  )
  let infoY = headerTop + 22
  businessLines.forEach((line) => {
    doc.text(line, textX, infoY)
    infoY = doc.y
  })
  const leftColumnBottom = infoY

  doc.font('Helvetica-Bold').fontSize(20).fillColor(COLOR.ink).text('INVOICE', left, headerTop, {
    width: pageWidth,
    align: 'right',
  })

  const metaRows = [
    ['Invoice #', invoice.invoiceNumber],
    ['Issue Date', formatDate(invoice.issueDate)],
    ['Due Date', formatDate(invoice.dueDate)],
    ['Status', STATUS_LABEL[invoice.status] || invoice.status],
  ]
  let metaY = doc.y + 10
  metaRows.forEach(([label, value]) => {
    doc.font('Helvetica').fontSize(9).fillColor(COLOR.muted).text(label, left, metaY, {
      width: pageWidth - 90,
      align: 'right',
    })
    doc.font('Helvetica-Bold').fontSize(9).fillColor(COLOR.ink).text(value, right - 90, metaY, {
      width: 90,
      align: 'right',
    })
    metaY += 15
  })

  doc.y = Math.max(leftColumnBottom, metaY)
  doc.moveDown(1.2)

  const dividerY = doc.y
  doc.moveTo(left, dividerY).lineTo(right, dividerY).strokeColor(COLOR.rule).lineWidth(1.25).stroke()
  doc.moveDown(1.2)

  // Bill-to
  const billTop = doc.y
  doc.font('Helvetica-Bold').fontSize(9).fillColor(COLOR.faint).text('BILL TO', left, billTop, {
    characterSpacing: 0.5,
  })
  doc.font('Helvetica-Bold').fontSize(12).fillColor(COLOR.ink).text(invoice.client.name, left, doc.y + 3)
  doc.font('Helvetica').fontSize(9.5).fillColor(COLOR.muted)
  ;[invoice.client.company, invoice.client.email, invoice.client.phone]
    .filter(Boolean)
    .forEach((line) => doc.text(line, left, doc.y + 1, { width: pageWidth * 0.6 }))

  doc.moveDown(1.6)

  // Items table
  const amountWidth = 120
  const colAmount = right - amountWidth
  const colDesc = left
  const descWidth = colAmount - colDesc - 10

  const tableTop = doc.y
  doc.font('Helvetica-Bold').fontSize(9).fillColor(COLOR.muted)
  doc.text('DESCRIPTION', colDesc, tableTop, { width: descWidth, characterSpacing: 0.5 })
  doc.text('AMOUNT', colAmount, tableTop, { width: amountWidth, align: 'right', characterSpacing: 0.5 })

  let y = tableTop + 16
  doc.moveTo(left, y).lineTo(right, y).strokeColor(COLOR.rule).lineWidth(1).stroke()
  y += 12

  invoice.items.forEach((item, index) => {
    const rowHeight = Math.max(16, doc.heightOfString(item.description, { width: descWidth, fontSize: 10.5 }))
    doc.font('Helvetica').fontSize(10.5).fillColor(COLOR.ink)
    doc.text(item.description, colDesc, y, { width: descWidth })
    doc.text(formatMoney(item.amount, currency), colAmount, y, { width: amountWidth, align: 'right' })
    y += rowHeight + 12
    if (index < invoice.items.length - 1) {
      doc.moveTo(left, y - 8).lineTo(right, y - 8).strokeColor(COLOR.hairline).lineWidth(0.75).stroke()
    }
  })

  doc.moveTo(left, y).lineTo(right, y).strokeColor(COLOR.rule).lineWidth(1).stroke()
  doc.y = y + 16

  // Total due
  const totalsWidth = 220
  const totalsX = right - totalsWidth
  const totalsY = doc.y
  doc
    .font('Helvetica-Bold')
    .fontSize(13)
    .fillColor(COLOR.ink)
    .text('Total Due', totalsX, totalsY, { width: totalsWidth, align: 'left' })
  doc
    .font('Helvetica-Bold')
    .fontSize(13)
    .fillColor(COLOR.ink)
    .text(formatMoney(invoice.total, currency), totalsX, totalsY, { width: totalsWidth, align: 'right' })

  doc.y = totalsY + 24
  doc.moveDown(2.4)

  // Notes + payment details
  if (invoice.notes || invoice.paymentInstructions) {
    const noteTop = doc.y
    const colWidth = invoice.notes && invoice.paymentInstructions ? (pageWidth - 20) / 2 : pageWidth

    if (invoice.notes) {
      doc.font('Helvetica-Bold').fontSize(9).fillColor(COLOR.faint).text('NOTES', left, noteTop)
      doc
        .font('Helvetica')
        .fontSize(9.5)
        .fillColor(COLOR.muted)
        .text(invoice.notes, left, doc.y + 3, { width: colWidth })
    }

    if (invoice.paymentInstructions) {
      const payX = invoice.notes ? left + colWidth + 20 : left
      doc.font('Helvetica-Bold').fontSize(9).fillColor(COLOR.faint).text('PAYMENT DETAILS', payX, noteTop)
      doc
        .font('Helvetica')
        .fontSize(9.5)
        .fillColor(COLOR.muted)
        .text(invoice.paymentInstructions, payX, doc.y + 3, { width: colWidth })
    }
  }

  // Footer
  const footerY = doc.page.height - doc.page.margins.bottom - 24
  doc.moveTo(left, footerY).lineTo(right, footerY).strokeColor(COLOR.hairline).lineWidth(1).stroke()
  doc
    .font('Helvetica')
    .fontSize(8.5)
    .fillColor(COLOR.faint)
    .text(`Thank you for your business — ${siteSettings?.siteName || ''}`.trim(), left, footerY + 8, {
      width: pageWidth,
      align: 'center',
    })
}
