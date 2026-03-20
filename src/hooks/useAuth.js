// src/hooks/useAuth.js
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, signIn, signUp, signOut } from '../firebase'

export function useAuth() {
  const [user,    setUser]    = useState(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u ?? null)
      setLoading(false)
    })
    return unsub
  }, [])

  return { user, loading, signIn, signUp, signOut }
}
