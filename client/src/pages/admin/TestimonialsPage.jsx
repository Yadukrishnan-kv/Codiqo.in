import React, { useMemo, useState } from 'react'
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown, Search, Star } from 'lucide-react'
import Modal from '../../components/admin/ui/Modal'
import ConfirmDialog from '../../components/admin/ui/ConfirmDialog'
import Toggle from '../../components/admin/ui/Toggle'
import TestimonialForm from '../../components/admin/forms/TestimonialForm'
import { resolveAssetUrl } from '../../utils/resolveAssetUrl'
import {
  useTestimonialsList,
  useCreateTestimonial,
  useUpdateTestimonial,
  useDeleteTestimonial,
  useToggleTestimonial,
  useReorderTestimonials,
} from '../../hooks/useTestimonials'

export default function TestimonialsPage() {
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)

  const { data, isLoading, isError } = useTestimonialsList({ search })
  const testimonials = useMemo(() => data?.items ?? [], [data])

  const createMutation = useCreateTestimonial()
  const updateMutation = useUpdateTestimonial()
  const deleteMutation = useDeleteTestimonial()
  const toggleMutation = useToggleTestimonial()
  const reorderMutation = useReorderTestimonials()

  const submitting = createMutation.isPending || updateMutation.isPending

  const handleSubmit = async (values) => {
    if (modal.mode === 'edit') {
      await updateMutation.mutateAsync({ id: modal.testimonial._id, payload: values })
    } else {
      await createMutation.mutateAsync(values)
    }
    setModal(null)
  }

  const handleMove = (index, direction) => {
    const target = index + direction
    if (target < 0 || target >= testimonials.length) return
    const a = testimonials[index]
    const b = testimonials[target]
    reorderMutation.mutate([
      { id: a._id, order: b.order },
      { id: b._id, order: a.order },
    ])
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-black tracking-tight">Testimonials</h1>
          <p className="mt-1 text-sm text-muted-foreground">Client quotes shown on the homepage.</p>
        </div>
        <button
          onClick={() => setModal({ mode: 'create' })}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background font-semibold hover:bg-primary hover:text-primary-foreground transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add testimonial
        </button>
      </div>

      <div className="relative max-w-xs mb-6">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search testimonials…"
          className="w-full bg-surface border border-border rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary"
        />
      </div>

      <div className="border border-border rounded-[24px] overflow-hidden bg-surface">
        {isLoading ? (
          <div className="p-10 text-center text-sm text-muted-foreground">Loading testimonials…</div>
        ) : isError ? (
          <div className="p-10 text-center text-sm text-red-400">Couldn't load testimonials.</div>
        ) : testimonials.length === 0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground">
            No testimonials yet — add your first one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[680px]">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-3 font-semibold w-16">Order</th>
                  <th className="px-5 py-3 font-semibold">Author</th>
                  <th className="px-5 py-3 font-semibold">Rating</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((t, index) => (
                  <tr key={t._id} className="border-b border-border last:border-b-0">
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
                          disabled={index === testimonials.length - 1}
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
                        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                          {t.avatarUrl ? (
                            <img src={resolveAssetUrl(t.avatarUrl)} alt="" className="w-full h-full object-cover" />
                          ) : (
                            t.name[0]?.toUpperCase()
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold">{t.name}</div>
                          <div className="text-xs text-muted-foreground truncate max-w-xs">{t.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < t.rating ? 'fill-primary text-primary' : 'text-border'}`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Toggle
                        checked={t.isActive}
                        onChange={() => toggleMutation.mutate(t._id)}
                        label="Toggle active"
                      />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setModal({ mode: 'edit', testimonial: t })}
                          className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-foreground transition-colors"
                          aria-label="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setPendingDelete(t)}
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
        onClose={() => setModal(null)}
        title={modal?.mode === 'edit' ? 'Edit testimonial' : 'Add testimonial'}
      >
        {modal && (
          <TestimonialForm
            defaultValues={modal.mode === 'edit' ? modal.testimonial : undefined}
            onSubmit={handleSubmit}
            submitting={submitting}
            submitLabel={modal.mode === 'edit' ? 'Save changes' : 'Add testimonial'}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete testimonial?"
        message={`The testimonial from "${pendingDelete?.name}" will be permanently removed.`}
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
