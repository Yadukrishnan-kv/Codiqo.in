import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import Modal from '../../components/admin/ui/Modal'
import Toggle from '../../components/admin/ui/Toggle'
import AdminUserForm from '../../components/admin/forms/AdminUserForm'
import { useAuth } from '../../hooks/useAuth'
import { useAdminsList, useCreateAdmin, useUpdateAdmin } from '../../hooks/useAdmins'

export default function AdminUsersPage() {
  const { admin: currentAdmin } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)
  const [error, setError] = useState('')

  const { data: admins, isLoading, isError } = useAdminsList()
  const createMutation = useCreateAdmin()
  const updateMutation = useUpdateAdmin()

  const handleCreate = async (values) => {
    setError('')
    try {
      await createMutation.mutateAsync(values)
      setModalOpen(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create admin.')
    }
  }

  const handleRoleChange = (id, role) => {
    updateMutation.mutate({ id, payload: { role } })
  }

  const handleToggleActive = (admin) => {
    updateMutation.mutate({ id: admin._id, payload: { isActive: !admin.isActive } })
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-black tracking-tight">Admin Users</h1>
          <p className="mt-1 text-sm text-muted-foreground">Who can sign in to this panel, and what they can do.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background font-semibold hover:bg-primary hover:text-primary-foreground transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Invite admin
        </button>
      </div>

      <div className="border border-border rounded-[24px] overflow-hidden bg-surface">
        {isLoading ? (
          <div className="p-10 text-center text-sm text-muted-foreground">Loading…</div>
        ) : isError ? (
          <div className="p-10 text-center text-sm text-red-400">Couldn't load admin users.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-3 font-semibold">Name</th>
                  <th className="px-5 py-3 font-semibold">Email</th>
                  <th className="px-5 py-3 font-semibold">Role</th>
                  <th className="px-5 py-3 font-semibold">Active</th>
                  <th className="px-5 py-3 font-semibold">Last login</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((a) => {
                  const isSelf = a.id === currentAdmin?.id
                  return (
                    <tr key={a.id} className="border-b border-border last:border-b-0">
                      <td className="px-5 py-4 font-semibold">
                        {a.name}
                        {isSelf && <span className="ml-2 text-xs text-muted-foreground font-normal">(you)</span>}
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">{a.email}</td>
                      <td className="px-5 py-4">
                        <select
                          value={a.role}
                          disabled={isSelf}
                          onChange={(e) => handleRoleChange(a.id, e.target.value)}
                          className="bg-background border border-border rounded-full py-1.5 px-3 text-xs font-semibold capitalize disabled:opacity-50 focus:outline-none focus:border-primary"
                        >
                          <option value="editor">Editor</option>
                          <option value="superadmin">Superadmin</option>
                        </select>
                      </td>
                      <td className="px-5 py-4">
                        <Toggle
                          checked={a.isActive}
                          onChange={() => !isSelf && handleToggleActive(a)}
                          label="Toggle active"
                        />
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">
                        {a.lastLoginAt ? new Date(a.lastLoginAt).toLocaleString() : 'Never'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Invite admin">
        {error && (
          <div className="mb-4 text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
            {error}
          </div>
        )}
        <AdminUserForm onSubmit={handleCreate} submitting={createMutation.isPending} />
      </Modal>
    </div>
  )
}
