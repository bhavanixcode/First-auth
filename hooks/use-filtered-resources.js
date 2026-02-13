'use client'

import { useMemo } from 'react'
import type { Resource, UserRole } from '@/lib/types'
import { hasPermission } from '@/lib/types'
import { useAuth } from '@/context/auth-context'

interface FilteredResources {
  accessible
  locked
  active
  archived
}

// Custom hook resources based on user role from Context
export function useFilteredResources(resources) {
  const { user } = useAuth()
  const userRole | null = user?.role ?? null

  return useMemo(() => {
    const accessible = []
    const locked = []

    for (const resource of resources) {
      if (userRole && hasPermission(userRole, resource.minRoleRequired)) {
        accessible.push(resource)
      } else {
        locked.push(resource)
      }
    }

    // Further filter accessible resources by status
    const active = accessible.filter((r) => r.status === 'active')
    const archived = accessible.filter((r) => r.status === 'archived')

    return { accessible, locked, active, archived }
  }, [resources, userRole])
}
