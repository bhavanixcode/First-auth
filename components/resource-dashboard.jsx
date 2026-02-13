'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Resource } from '@/lib/types'
import { fetchResources } from '@/lib/mock-data'
import { useFilteredResources } from '@/hooks/use-filtered-resources'
import { useAuth } from '@/context/auth-context'
import { ResourceList } from './resource-list'

export function ResourceDashboard() {
  const { user, logout } = useAuth()
  const [resources, setResources] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showArchived, setShowArchived] = useState(false)

  // Fetch resources with simulated API delay (useEffect for data loading)
  useEffect(() => {
    let cancelled = false

    async function loadResources() {
      setIsLoading(true)
      const data = await fetchResources()
      if (!cancelled) {
        setResources(data)
        setIsLoading(false)
      }
    }

    loadResources()

    return () => {
      cancelled = true
    }
  }, [])

  // Use custom hook to filter resources by user role
  const { active, archived, locked } = useFilteredResources(resources)

  // Complex state update update of nested resource status
  const handleUpdateStatus = useCallback(
    (resourceId, newStatus'status']) => {
      setResources((prevResources) =>
        prevResources.map((resource) =>
          resource.id === resourceId
            ? { ...resource, status }
            
        )
      )
    },
    []
  )

  // Delete resource (Admin only)
  const handleDelete = useCallback((resourceId) => {
    setResources((prevResources) =>
      prevResources.filter((resource) => resource.id !== resourceId)
    )
  }, [])

  if (isLoading) {
    return (
      
        Loading resources...
        Simulating API fetch delay...
      
    )
  }

  return (
    
      {/* Header with user info */}
      
        
          Resource Dashboard
          
            Logged in as: {user?.username} ({user?.role})
          
        
        
          Logout
        
      

      {/* Role permissions summary */}
      
        Your Permissions ({user?.role}) resources at your level or below
          {user?.role !== 'Viewer' && Edit resource status}
          {user?.role === 'Admin' && Delete resources}
        
      

      {/* Toggle archived view */}
      
        
           setShowArchived(e.target.checked)}
          />{' '}
          Show Archived Resources ({archived.length})
        
      

      {/* Active Resources */}
      

      {/* Archived Resources (toggle) */}
      {showArchived && (
        
      )}

      {/* Locked Resources - visible but not accessible */}
      {locked.length > 0 && (
        
      )}
    
  )
}
