import React, { useMemo, useState } from 'react'
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown, Star, Search } from 'lucide-react'
import Modal from '../../components/admin/ui/Modal'
import ConfirmDialog from '../../components/admin/ui/ConfirmDialog'
import Toggle from '../../components/admin/ui/Toggle'
import ProjectForm from '../../components/admin/forms/ProjectForm'
import { resolveAssetUrl } from '../../utils/resolveAssetUrl'
import {
  useProjectsList,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
  useToggleProject,
  useReorderProjects,
} from '../../hooks/useProjects'

export default function WorkPage() {
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null) // { mode: 'create' | 'edit', project? }
  const [pendingDelete, setPendingDelete] = useState(null)

  const { data, isLoading, isError } = useProjectsList({ search })
  const projects = useMemo(() => data?.items ?? [], [data])

  const createMutation = useCreateProject()
  const updateMutation = useUpdateProject()
  const deleteMutation = useDeleteProject()
  const toggleMutation = useToggleProject()
  const reorderMutation = useReorderProjects()

  const submitting = createMutation.isPending || updateMutation.isPending

  const handleSubmit = async (values) => {
    if (modal.mode === 'edit') {
      await updateMutation.mutateAsync({ id: modal.project._id, payload: values })
    } else {
      await createMutation.mutateAsync(values)
    }
    setModal(null)
  }

  const handleMove = (index, direction) => {
    const target = index + direction
    if (target < 0 || target >= projects.length) return
    const a = projects[index]
    const b = projects[target]
    reorderMutation.mutate([
      { id: a._id, order: b.order },
      { id: b._id, order: a.order },
    ])
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-black tracking-tight">Work</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Portfolio projects shown in the "Real-World Projects" grid.
          </p>
        </div>
        <button
          onClick={() => setModal({ mode: 'create' })}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background font-semibold hover:bg-primary hover:text-primary-foreground transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add project
        </button>
      </div>

      <div className="relative max-w-xs mb-6">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects…"
          className="w-full bg-surface border border-border rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary"
        />
      </div>

      <div className="border border-border rounded-[24px] overflow-hidden bg-surface">
        {isLoading ? (
          <div className="p-10 text-center text-sm text-muted-foreground">Loading projects…</div>
        ) : isError ? (
          <div className="p-10 text-center text-sm text-red-400">Couldn't load projects.</div>
        ) : projects.length === 0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground">
            No projects yet — add your first one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-3 font-semibold w-16">Order</th>
                  <th className="px-5 py-3 font-semibold">Project</th>
                  <th className="px-5 py-3 font-semibold">Year</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={project._id} className="border-b border-border last:border-b-0">
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
                          disabled={index === projects.length - 1}
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
                        <div
                          className={`w-14 h-10 rounded-lg overflow-hidden shrink-0 bg-gradient-to-br ${project.gradientFrom} ${project.gradientVia} ${project.gradientTo}`}
                        >
                          {project.imageUrl && (
                            <img
                              src={resolveAssetUrl(project.imageUrl)}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold flex items-center gap-1.5">
                            {project.title}
                            {project.isFeatured && (
                              <Star className="w-3.5 h-3.5 fill-primary text-primary shrink-0" />
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground truncate max-w-xs">{project.tag}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{project.year}</td>
                    <td className="px-5 py-4">
                      <Toggle
                        checked={project.isActive}
                        onChange={() => toggleMutation.mutate(project._id)}
                        label="Toggle active"
                      />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setModal({ mode: 'edit', project })}
                          className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-foreground transition-colors"
                          aria-label="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setPendingDelete(project)}
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
        title={modal?.mode === 'edit' ? 'Edit project' : 'Add project'}
      >
        {modal && (
          <ProjectForm
            defaultValues={modal.mode === 'edit' ? modal.project : undefined}
            onSubmit={handleSubmit}
            submitting={submitting}
            submitLabel={modal.mode === 'edit' ? 'Save changes' : 'Add project'}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete project?"
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
