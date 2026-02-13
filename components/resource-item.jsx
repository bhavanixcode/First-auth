'use client'

import { useAuth } from '../context/auth-context'

export function ResourceItem({
  resource,
  isLocked,
  onUpdateStatus,
  onDelete,
}) {
  const { user } = useAuth()
  const userRole = user ? user.role : null

  // Role checks (JS version)
  const canEdit = userRole === 'Editor' || userRole === 'Admin'
  const canDelete = userRole === 'Admin'

  function handleStatusChange(e) {
    if (onUpdateStatus && canEdit) {
      onUpdateStatus(resource.id, e.target.value)
    }
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <h3>
        {isLocked && '[LOCKED] '} {resource.name}
      </h3>

      <p>{resource.description}</p>

      <p>
        Status: <b>{resource.status}</b> | Requires: {resource.minRoleRequired}
      </p>

      <p>
        Priority: {resource.metadata.priority} | Tags:{' '}
        {resource.metadata.tags.join(', ')} | Created: {resource.createdAt}
      </p>

      {!isLocked && (
        <div>
          {/* Edit - Editor+ */}
          {canEdit && (
            <select
              value={resource.status}
              onChange={handleStatusChange}
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="archived">Archived</option>
            </select>
          )}

          {/* Delete - Admin only */}
          {canDelete && onDelete && (
            <button
              onClick={() => onDelete(resource.id)}
              style={{ marginLeft: '10px' }}
            >
              Delete
            </button>
          )}

          {!canEdit && <p>View only – Editor access required</p>}
        </div>
      )}
    </div>
  )
}
