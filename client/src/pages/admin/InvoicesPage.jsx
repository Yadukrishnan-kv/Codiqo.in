import React, { useMemo, useState } from 'react'
import { Plus, Pencil, Trash2, Download, Search } from 'lucide-react'
import Modal from '../../components/admin/ui/Modal'
import ConfirmDialog from '../../components/admin/ui/ConfirmDialog'
import InvoiceForm from '../../components/admin/forms/InvoiceForm'
import { downloadInvoicePdf } from '../../api/invoices.api'
import {
  useInvoicesList,
  useCreateInvoice,
  useUpdateInvoice,
  useUpdateInvoiceStatus,
  useDeleteInvoice,
} from '../../hooks/useInvoices'

const STATUSES = ['draft', 'sent', 'paid', 'overdue', 'cancelled']

const STATUS_STYLES = {
  draft: 'bg-border text-muted-foreground',
  sent: 'bg-blue-500/10 text-blue-400',
  paid: 'bg-emerald-500/10 text-emerald-400',
  overdue: 'bg-red-500/10 text-red-400',
  cancelled: 'bg-neutral-500/10 text-neutral-400',
}

function formatMoney(amount, currency) {
  return `${currency} ${new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0)}`
}

function formatDate(date) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function InvoicesPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [modal, setModal] = useState(null) // { mode: 'create' | 'edit', invoice? }
  const [pendingDelete, setPendingDelete] = useState(null)
  const [error, setError] = useState('')
  const [downloadingId, setDownloadingId] = useState(null)

  const { data, isLoading, isError } = useInvoicesList({ search, status: statusFilter || undefined })
  const invoices = useMemo(() => data?.items ?? [], [data])

  const createMutation = useCreateInvoice()
  const updateMutation = useUpdateInvoice()
  const statusMutation = useUpdateInvoiceStatus()
  const deleteMutation = useDeleteInvoice()

  const submitting = createMutation.isPending || updateMutation.isPending

  const handleSubmit = async (values) => {
    setError('')
    try {
      if (modal.mode === 'edit') {
        await updateMutation.mutateAsync({ id: modal.invoice._id, payload: values })
      } else {
        await createMutation.mutateAsync(values)
      }
      setModal(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save invoice.')
    }
  }

  const handleDownload = async (invoice) => {
    setDownloadingId(invoice._id)
    try {
      await downloadInvoicePdf(invoice._id, invoice.invoiceNumber)
    } finally {
      setDownloadingId(null)
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-black tracking-tight">Invoices</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create, track and download invoices for your clients.</p>
        </div>
        <button
          onClick={() => setModal({ mode: 'create' })}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background font-semibold hover:bg-primary hover:text-primary-foreground transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          New invoice
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client or invoice #…"
            className="w-full bg-surface border border-border rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-surface border border-border rounded-full py-2.5 px-4 text-sm focus:outline-none focus:border-primary capitalize"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s[0].toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="border border-border rounded-[24px] overflow-hidden bg-surface">
        {isLoading ? (
          <div className="p-10 text-center text-sm text-muted-foreground">Loading invoices…</div>
        ) : isError ? (
          <div className="p-10 text-center text-sm text-red-400">Couldn't load invoices.</div>
        ) : invoices.length === 0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground">
            No invoices yet — create your first one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[820px]">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-3 font-semibold">Invoice</th>
                  <th className="px-5 py-3 font-semibold">Client</th>
                  <th className="px-5 py-3 font-semibold">Issued</th>
                  <th className="px-5 py-3 font-semibold">Due</th>
                  <th className="px-5 py-3 font-semibold text-right">Total</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice._id} className="border-b border-border last:border-b-0">
                    <td className="px-5 py-4 font-semibold">{invoice.invoiceNumber}</td>
                    <td className="px-5 py-4">
                      <div className="font-medium">{invoice.client?.name}</div>
                      {invoice.client?.company && (
                        <div className="text-xs text-muted-foreground">{invoice.client.company}</div>
                      )}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{formatDate(invoice.issueDate)}</td>
                    <td className="px-5 py-4 text-muted-foreground">{formatDate(invoice.dueDate)}</td>
                    <td className="px-5 py-4 text-right font-semibold">
                      {formatMoney(invoice.total, invoice.currency)}
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={invoice.status}
                        onChange={(e) => statusMutation.mutate({ id: invoice._id, status: e.target.value })}
                        className={`rounded-full py-1.5 px-3 text-xs font-semibold capitalize border-0 focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                          STATUS_STYLES[invoice.status] || STATUS_STYLES.draft
                        }`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s[0].toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleDownload(invoice)}
                          disabled={downloadingId === invoice._id}
                          className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-foreground transition-colors disabled:opacity-50"
                          aria-label="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setModal({ mode: 'edit', invoice })}
                          className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-foreground transition-colors"
                          aria-label="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setPendingDelete(invoice)}
                          className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-red-400 hover:text-red-400 transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        open={Boolean(modal)}
        onClose={() => {
          setModal(null)
          setError('')
        }}
        title={modal?.mode === 'edit' ? `Edit invoice ${modal.invoice.invoiceNumber}` : 'New invoice'}
        maxWidth="max-w-2xl"
      >
        {error && (
          <div className="mb-4 text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
            {error}
          </div>
        )}
        {modal && (
          <InvoiceForm
            defaultValues={modal.mode === 'edit' ? modal.invoice : undefined}
            onSubmit={handleSubmit}
            submitting={submitting}
            submitLabel={modal.mode === 'edit' ? 'Save changes' : 'Create invoice'}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete invoice?"
        message={`Invoice "${pendingDelete?.invoiceNumber}" will be permanently removed.`}
        submitting={deleteMutation.isPending}
        onCancel={() => setPendingDelete(null)}
        onConfirm={async () => {
          await deleteMutation.mutateAsync(pendingDelete._id)
          setPendingDelete(null)
        }}
      />
    </div>
  )
}
