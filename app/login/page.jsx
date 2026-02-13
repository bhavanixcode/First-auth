"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../context/auth-context"
import { LoginForm } from "../../components/login-form"

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div style={{ padding: "20px" }}>
        <p>Loading...</p>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div style={{ padding: "20px" }}>
        <p>Already logged in. Redirecting...</p>
      </div>
    )
  }

  return (
    <div style={{ padding: "20px" }}>
      <LoginForm />
    </div>
  )
}
