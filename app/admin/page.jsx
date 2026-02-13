"use client"

import { ProtectedRoute } from "../components/protected-route"
import { useAuth } from "../context/auth-context"

export default function AdminPage() {
  return (
    <ProtectedRoute role="admin">
      <AdminContent />
    </ProtectedRoute>
  )
}

function AdminContent() {
  const { user } = useAuth()

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel</h1>

      <p>
        Welcome, {user?.username}! This page is only accessible to Admins.
      </p>

      <h2>Admin-Only Features</h2>
      <ul>
        <li>User management</li>
        <li>Audit logs</li>
        <li>Security settings</li>
      </ul>

      <button>Back to Dashboard</button>
    </div>
  )
}
