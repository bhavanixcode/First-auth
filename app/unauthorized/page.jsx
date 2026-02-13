'use client'

import { useAuth } from '@/context/auth-context'

export default function UnauthorizedPage() {
  const { user, logout } = useAuth()

  return (
    
      Access Denied

      
        You do not have permission to access this page.
      

      {user && (
        
          Your current role: {user.role}
        
      )}

      
        
          Go to Dashboard
        

        
          Logout
        
      
    
  )
}
