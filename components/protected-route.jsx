"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "../context/auth-context"

export function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (loading) return

    if (!user) {
      router.replace("/login")
      return
    }

    if (role && user.role !== role) {
      router.replace("/unauthorized")
    }
  }, [user, loading, role, router, pathname])

  if (loading) {
    return <p>Checking permissions...</p>
  }

  return children
}
