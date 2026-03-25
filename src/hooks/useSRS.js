// src/hooks/useSRS.js
// SM-2 spaced repetition algorithm (same as Anki)
// Stores per-ayah review data in localStorage + Firestore

import { useState, useEffect, useCallback } from 'react'
import { db } from '../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

// ── SM-2 core algorithm ───────────────────────────────────────────────────────
// grade: 0=Again, 1=Hard, 2=Okay, 3=Good, 4=Easy
export function sm2(card, grade) {
  let { interval = 1, easeFactor = 2.5, repetitions = 0 } = card

  if (grade < 2) {
    // Failed — reset
    repetitions = 0
    interval = 1
  } else {
    if (repetitions === 0) interval = 1
    else if (repetitions === 1) interval = 6
    else interval = Math.round(interval * easeFactor)
    repetitions += 1
  }

  // Adjust ease factor
  easeFactor = Math.max(1.3, easeFactor + 0.1 - (4 - grade) * (0.08 + (4 - grade) * 0.02))

  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + interval)

  return {
    interval,
    easeFactor,
    repetitions,
    dueDate: dueDate.toISOString().split('T')[0],
    lastGrade: grade,
    lastReviewed: new Date().toISOString().split('T')[0],
  }
}

// ── Storage helpers ───────────────────────────────────────────────────────────
const LOCAL_KEY = 'quran_srs_data'

function loadLocal() {
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}') } catch { return {} }
}

function saveLocal(data) {
  try { localStorage.setItem(LOCAL_KEY, JSON.stringify(data)) } catch {}
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useSRS(user) {
  const [cards, setCards] = useState({})
  const [loading, setLoading] = useState(true)

  // Load on mount
  useEffect(() => {
    async function load() {
      const local = loadLocal()
      if (user?.uid) {
        try {
          const snap = await getDoc(doc(db, 'users', user.uid, 'srs', 'cards'))
          if (snap.exists()) {
            const merged = { ...local, ...snap.data() }
            setCards(merged)
            saveLocal(merged)
            setLoading(false)
            return
          }
        } catch {}
      }
      setCards(local)
      setLoading(false)
    }
    load()
  }, [user?.uid])

  // Save to Firestore when cards change
  const saveCards = useCallback(async (newCards) => {
    saveLocal(newCards)
    if (user?.uid) {
      try {
        await setDoc(doc(db, 'users', user.uid, 'srs', 'cards'), newCards, { merge: true })
      } catch {}
    }
  }, [user?.uid])

  // Review an ayah
  const review = useCallback((ayahKey, grade) => {
    setCards(prev => {
      const updated = sm2(prev[ayahKey] || {}, grade)
      const next = { ...prev, [ayahKey]: updated }
      saveCards(next)
      return next
    })
  }, [saveCards])

  // Add an ayah to the SRS queue (call when user first marks ayah as done)
  const enqueue = useCallback((ayahKey) => {
    setCards(prev => {
      if (prev[ayahKey]) return prev  // already queued
      const card = {
        interval: 1,
        easeFactor: 2.5,
        repetitions: 0,
        dueDate: new Date().toISOString().split('T')[0],
        lastReviewed: null,
        lastGrade: null,
      }
      const next = { ...prev, [ayahKey]: card }
      saveCards(next)
      return next
    })
  }, [saveCards])

  // Get today's due cards
  const today = new Date().toISOString().split('T')[0]
  const dueCards = Object.entries(cards)
    .filter(([, c]) => c.dueDate <= today)
    .map(([key, card]) => ({ key, ...card }))
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))

  return { cards, dueCards, review, enqueue, loading }
}
