// Mock users for login simulation
export const MOCK_USERS = [
  { id: '1', username: 'admin', role: 'Admin', token: 'admin-token-123' },
  { id: '2', username: 'editor', role: 'Editor', token: 'editor-token-456' },
  { id: '3', username: 'viewer', role: 'Viewer', token: 'viewer-token-789' },
]

// Mock resources with different permission levels
export const MOCK_RESOURCES = [
  {
    id: 'r1',
    name: 'Public Dashboard',
    description: 'View-only analytics dashboard',
    status: 'active',
    minRoleRequired: 'Viewer',
    createdAt: '2024-01-15',
    metadata: {
      priority: 'low',
      tags: ['analytics', 'public'],
    },
  },
  {
    id: 'r2',
    name: 'Content Editor',
    description: 'Edit and publish content',
    status: 'active',
    minRoleRequired: 'Editor',
    createdAt: '2024-01-20',
    metadata: {
      priority: 'medium',
      tags: ['content', 'editing'],
    },
  },
  {
    id: 'r3',
    name: 'User Management',
    description: 'Manage user accounts and permissions',
    status: 'active',
    minRoleRequired: 'Admin',
    createdAt: '2024-02-01',
    metadata: {
      priority: 'high',
      tags: ['users', 'security'],
    },
  },
  {
    id: 'r4',
    name: 'System Settings',
    description: 'Configure system-wide settings',
    status: 'pending',
    minRoleRequired: 'Admin',
    createdAt: '2024-02-10',
    metadata: {
      priority: 'high',
      tags: ['system', 'config'],
    },
  },
  {
    id: 'r5',
    name: 'Report Generator',
    description: 'Generate and export reports',
    status: 'active',
    minRoleRequired: 'Editor',
    createdAt: '2024-02-15',
    metadata: {
      priority: 'medium',
      tags: ['reports', 'export'],
    },
  },
  {
    id: 'r6',
    name: 'Legacy Archive',
    description: 'Access archived data',
    status: 'archived',
    minRoleRequired: 'Viewer',
    createdAt: '2023-06-01',
    metadata: {
      priority: 'low',
      tags: ['archive', 'legacy'],
    },
  },
]

// Simulate API fetch with delay
export function fetchResources() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_RESOURCES)
    }, 800)
  })
}

// Simulate login API
export function authenticateUser(username) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = MOCK_USERS.find(
        (u) => u.username.toLowerCase() === username.toLowerCase()
      )
      resolve(user || null)
    }, 500)
  })
}
