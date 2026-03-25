// src/components/Onboarding.jsx
// First-visit onboarding modal — shown once, dismissed forever

import { useState, useEffect } from 'react'

const STEPS = [
  {
    icon: '📖',
    title: 'Welcome to quranmemo.app',
    body: 'Built for new Muslims and non-Arabic speakers. Learn surah by surah — with Arabic, transliteration, and meaning in English, Chinese, or Hindi.',
    color: '#D4A843',
  },
  {
    icon: '▶',
    title: 'Listen, read, understand',
    body: 'Every ayah has audio from a master reciter, colour-coded transliteration, and a word-by-word breakdown. Tap any ayah to expand it.',
    color: '#4CAF8A',
  },
  {
    icon: '○',
    title: 'Mark ayahs as done',
    body: 'When you can recite an ayah without looking, tap ○ to mark it done. This adds it to your spaced repetition queue.',
    color: '#5B8FD4',
  },
  {
    icon: '🔁',
    title: 'Daily review keeps you from forgetting',
    body: 'Come back to the home page to see your daily review. The app schedules each ayah to return just before you forget it — using the same algorithm as Anki.',
    color: '#4CAF8A',
  },
  {
    icon: '◈',
    title: 'Chunk mode for long ayahs',
    body: 'Struggling with a long ayah? Turn on Chunk Mode in the Learn tab. It breaks each ayah into 2-4 word groups — the technique used by hafiz teachers.',
    color: '#9B59B6',
  },
]

export default function Onboarding({ onDone }) {
  const [step, setStep] = useState(0)

  const current = STEPS[step]
  const isLast  = step === STEPS.length - 1

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:200,
      background:'rgba(0,0,0,0.8)',
      display:'flex', alignItems:'center', justifyContent:'center',
      padding:20,
    }}>
      <div style={{
        background:'#0c1b30',
        border:`1px solid rgba(${current.color === '#D4A843' ? '212,168,67' : current.color === '#4CAF8A' ? '76,175,138' : current.color === '#5B8FD4' ? '91,143,212' : '155,89,182'},0.3)`,
        borderRadius:20,
        padding:'32px 28px',
        maxWidth:420,
        width:'100%',
        boxShadow:'0 20px 60px rgba(0,0,0,0.6)',
      }}>
        {/* Step dots */}
        <div style={{ display:'flex', gap:6, justifyContent:'center', marginBottom:24 }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{ width: i === step ? 20 : 6, height:6, borderRadius:3, background: i === step ? current.color : 'rgba(255,255,255,0.1)', transition:'all 0.3s' }} />
          ))}
        </div>

        {/* Icon */}
        <div style={{ textAlign:'center', fontSize:40, marginBottom:16 }}>{current.icon}</div>

        {/* Title */}
        <div style={{ fontSize:18, color:current.color, fontWeight:700, textAlign:'center', marginBottom:10 }}>
          {current.title}
        </div>

        {/* Body */}
        <div style={{ fontSize:13, color:'#a09070', lineHeight:1.8, textAlign:'center', marginBottom:28 }}>
          {current.body}
        </div>

        {/* Buttons */}
        <div style={{ display:'flex', gap:10 }}>
          {step > 0 && (
            <button onClick={() => setStep(s => s-1)} style={{ flex:1, padding:'10px', borderRadius:10, border:'1px solid rgba(255,255,255,0.1)', background:'transparent', color:'#6a5a40', fontSize:13, cursor:'pointer' }}>
              ← Back
            </button>
          )}
          <button
            onClick={() => isLast ? onDone() : setStep(s => s+1)}
            style={{ flex:2, padding:'10px', borderRadius:10, border:'none', background:current.color, color:'#06101c', fontSize:13, fontWeight:700, cursor:'pointer' }}
          >
            {isLast ? "Let's start →" : 'Next →'}
          </button>
        </div>

        {/* Skip */}
        {!isLast && (
          <div style={{ textAlign:'center', marginTop:12 }}>
            <button onClick={onDone} style={{ background:'none', border:'none', color:'#4a3a28', fontSize:11, cursor:'pointer' }}>
              Skip introduction
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
