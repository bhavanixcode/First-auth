'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth-context'
import { ResourceList } from '../../components/resource-list'
import { MOCK_RESOURCES } from '../../lib/mock-data'

export default function DashboardPage() {
  const { user } = useAuth()
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setResources(MOCK_RESOURCES)
      setLoading(false)
    }, 500)
  }, [])

  if (!user) return <p>Not logged in</p>

  if (loading) return <p>Loading resources...</p>

  return (
    <div>
      <h1>Resource Dashboard</h1>
      <p>Logged in as: {user.username} ({user.role})</p>

      <ResourceList
        resources={resources}
        user={user}
      />
    </div>
  )
}
