// User roles with hierarchy > Editor > Viewer
export type UserRole = 'Admin' | 'Editor' | 'Viewer'

export interface User {
  id
  username
  role
  token
}

export interface Resource {
  id
  name
  description
  status: 'active' | 'archived' | 'pending'
  minRoleRequired
  createdAt
  metadata: {
    priority: 'low' | 'medium' | 'high'
    tags
  }
}

// Role hierarchy for permission checks
export const ROLE_HIERARCHY = {
  Viewer,
  Editor,
  Admin,
}

// Check if user has required permission level
export function hasPermission(userRole, requiredRole) {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole]
}
