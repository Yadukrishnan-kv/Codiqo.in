import React, { useMemo, useState } from 'react'
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown, Search } from 'lucide-react'
import Modal from '../../components/admin/ui/Modal'
import ConfirmDialog from '../../components/admin/ui/ConfirmDialog'
import Toggle from '../../components/admin/ui/Toggle'
import ServiceForm from '../../components/admin/forms/ServiceForm'
import { ICON_OPTIONS } from '../../utils/iconOptions'
import {
  useServicesList,
  useCreateService,
  useUpdateService,
  useDeleteService,
  useToggleService,
  useReorderServices,
} from '../../hooks/useServices'

const TABS = [
  { key: 'main', label: 'Main services' },
  { key: 'sub', label: 'Sub services' },
]

export default function ServicesPage() {
  const [tab, setTab] = useState('main')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)

  const { data, isLoading, isError } = useServicesList({ type: tab, search })
  const services = useMemo(() => data?.items ?? [], [data])

  const createMutation = useCreateService()
  const updateMutation = useUpdateService()
  const deleteMutation = useDeleteService()
  const toggleMutation = useToggleService()
  const reorderMutation = useReorderServices()

  const submitting = createMutation.isPending || updateMutation.isPending

  const handleSubmit = async (values) => {
    if (modal.mode === 'edit') {
      await updateMutation.mutateAsync({ id: modal.service._id, payload: values })
    } else {
      await createMutation.mutateAsync(values)
    }
    setModal(null)
  }

  const handleMove = (index, direction) => {
    const target = index + direction
    if (target < 0 || target >= services.length) return
    const a = services[index]
    const b = services[target]
    reorderMutation.mutate([
      { id: a._id, order: b.order },
      { id: b._id, order: a.order },
    ])
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-black tracking-tight">Services</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            The main service cards and sub-service cards on the homepage.
          </p>
        </div>
        <button
          onClick={() => setModal({ mode: 'create' })}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background font-semibold hover:bg-primary hover:text-primary-foreground transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add {tab === 'main' ? 'main' : 'sub'} service
        </button>
      </div>

      <div className="flex items-center gap-1 bg-surface border border-border rounded-full p-1 w-fit mb-6">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              tab === t.key
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="relative max-w-xs mb-6">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search services…"
          className="w-full bg-surface border border-border rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary"
        />
      </div>

      <div className="border border-border rounded-[24px] overflow-hidden bg-surface">
        {isLoading ? (
          <div className="p-10 text-center text-sm text-muted-foreground">Loading services…</div>
        ) : isError ? (
          <div className="p-10 text-center text-sm text-red-400">Couldn't load services.</div>
        ) : services.length === 0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground">
            No {tab} services yet — add your first one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-3 font-semibold w-16">Order</th>
                  <th className="px-5 py-3 font-semibold">Service</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => {
                  const Icon = ICON_OPTIONS[service.icon]
                  return (
                    <tr key={service._id} className="border-b border-border last:border-b-0">
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-1">
                          <button
                            disabled={index === 0}
                            onClick={() => handleMove(index, -1)}
                            className="text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                            aria-label="Move up"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            disabled={index === services.length - 1}
                            onClick={() => handleMove(index, 1)}
                            className="text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                            aria-label="Move down"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            {Icon && <Icon className="w-5 h-5" />}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold">{service.title}</div>
                            <div className="text-xs text-muted-foreground truncate max-w-sm">
                              {service.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <Toggle
                          checked={service.isActive}
                          onChange={() => toggleMutation.mutate(service._id)}
                          label="Toggle active"
                        />
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setModal({ mode: 'edit', service })}
                            className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-foreground transition-colors"
                            aria-label="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setPendingDelete(service)}
                            className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-red-400 hover:text-red-400 transition-colors"
                            aria-label="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        open={Boolean(modal)}
        onClose={() => setModal(null)}
        title={modal?.mode === 'edit' ? 'Edit service' : `Add ${tab} service`}
      >
        {modal && (
          <ServiceForm
            type={tab}
            defaultValues={modal.mode === 'edit' ? modal.service : undefined}
            onSubmit={handleSubmit}
            submitting={submitting}
            submitLabel={modal.mode === 'edit' ? 'Save changes' : 'Add service'}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete service?"
        message={`"${pendingDelete?.title}" will be permanently removed from the site.`}
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
