// src/hooks/useProgress.js
import { useState, useEffect, useRef, useCallback } from 'react'
import { saveProgress, subscribeProgress } from '../firebase'

const LS_KEY = surahKey => `quran_progress_${surahKey}`

export function useProgress(user, surahKey) {
  const [memorized, setMemorized] = useState({})
  const [syncing,   setSyncing]   = useState(false)
  const saveTimer = useRef(null)

  useEffect(() => {
    if (!surahKey) return
    // Reset when switching surahs
    setMemorized({})

    if (user) {
      setSyncing(true)
      const unsub = subscribeProgress(user.uid, surahKey, data => {
        setMemorized(data || {})
        setSyncing(false)
      })
      return unsub
    } else {
      try {
        const saved = localStorage.getItem(LS_KEY(surahKey))
        if (saved) setMemorized(JSON.parse(saved) || {})
      } catch (_) {}
    }
  }, [user, surahKey])

  const persist = useCallback((next) => {
    if (!surahKey) return
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      if (user) {
        setSyncing(true)
        saveProgress(user.uid, surahKey, next).finally(() => setSyncing(false))
      } else {
        try { localStorage.setItem(LS_KEY(surahKey), JSON.stringify(next)) } catch (_) {}
      }
    }, 800)
  }, [user, surahKey])

  const toggle = useCallback((key) => {
    setMemorized(prev => {
      const next = { ...(prev || {}), [key]: !(prev || {})[key] }
      persist(next)
      return next
    })
  }, [persist])

  const markSection = useCallback((keys, done) => {
    setMemorized(prev => {
      const next = { ...(prev || {}) }
      keys.forEach(k => { next[k] = done })
      persist(next)
      return next
    })
  }, [persist])

  return { memorized: memorized || {}, toggle, markSection, syncing }
}
