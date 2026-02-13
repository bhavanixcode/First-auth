'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/auth-context'
import { authenticateUser } from '../lib/mock-data'

export function LoginForm() {
  const { login } = useAuth()
  const router = useRouter()   // ✅ ADD THIS

  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const user = await authenticateUser(username)

    if (user) {
      login(user)
      router.push('/dashboard')   // ✅ NOW WORKS
    } else {
      setError('Invalid username. Try admin, editor, or viewer')
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <p>Enter a username to access the Resource Dashboard</p>

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="admin, editor, or viewer"
        disabled={isLoading}
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}
