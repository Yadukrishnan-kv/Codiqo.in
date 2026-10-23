import axiosClient from './axiosClient'

const base = '/invoices'

export async function fetchInvoices(params = {}) {
  const { data } = await axiosClient.get(base, { params })
  return data.data
}

export async function fetchInvoice(id) {
  const { data } = await axiosClient.get(`${base}/${id}`)
  return data.data.item
}

export async function createInvoice(payload) {
  const { data } = await axiosClient.post(base, payload)
  return data.data.item
}

export async function updateInvoice(id, payload) {
  const { data } = await axiosClient.put(`${base}/${id}`, payload)
  return data.data.item
}

export async function updateInvoiceStatus(id, status) {
  const { data } = await axiosClient.patch(`${base}/${id}/status`, { status })
  return data.data.item
}

export async function deleteInvoice(id) {
  await axiosClient.delete(`${base}/${id}`)
}

export async function downloadInvoicePdf(id, invoiceNumber) {
  const { data } = await axiosClient.get(`${base}/${id}/pdf`, { responseType: 'blob' })
  const url = window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' }))
  const link = document.createElement('a')
  link.href = url
  link.download = `${invoiceNumber || 'invoice'}.pdf`
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)
}
