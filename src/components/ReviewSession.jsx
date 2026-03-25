// src/components/ReviewSession.jsx
// Daily review session — SM-2 flashcard UI

import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const GRADE_BUTTONS = [
  { grade:0, label:'Again',  color:'#C0504D', sub:'< 1 min' },
  { grade:1, label:'Hard',   color:'#E67E22', sub:'~1 day' },
  { grade:2, label:'Good',   color:'#4CAF8A', sub:'few days' },
  { grade:3, label:'Easy',   color:'#5B8FD4', sub:'longer' },
]

function wordColor(tr) {
  if (!tr) return '#D4A843'
  if (/aa|ee|oo/.test(tr)) return '#81d4c0'
  if (/[SDTQH]|kh|gh|'/.test(tr)) return '#E6944A'
  return '#D4A843'
}

function TranslitDisplay({ tr }) {
  const words = tr.split('  ')
  return (
    <div style={{ fontSize:16, fontStyle:'italic', lineHeight:1.9, textAlign:'center', color:'#D4A843' }}>
      {words.map((w, i) => (
        <span key={i} style={{ color: wordColor(w) }}>
          {w.replace(/-/g,'')}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </div>
  )
}

export default function ReviewSession({ dueCards, allSections, onReview, onClose, langs }) {
  const [idx,      setIdx]      = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [done,     setDone]     = useState(false)
  const [stats,    setStats]    = useState({ again:0, hard:0, good:0, easy:0 })
  const audioRef = useRef(null)

  const card = dueCards[idx]

  // Find verse data from key like "section-1"
  const verseData = (() => {
    if (!card) return null
    // Key format: "sectionId-ayahN" e.g. "bismillah-1"
    // Find the last hyphen to split (section ids can contain hyphens)
    const lastDash = card.key.lastIndexOf('-')
    const secId = card.key.slice(0, lastDash)
    const n = parseInt(card.key.slice(lastDash + 1))
    // Search all surahs in allSections (SURAH_DATA_MAP)
    for (const surahData of Object.values(allSections)) {
      const sections = surahData.sections || surahData
      if (!Array.isArray(sections)) continue
      for (const sec of sections) {
        if (sec.id === secId) {
          const v = sec.verses.find(v => v.n === n)
          if (v) return { verse: v, section: sec }
        }
      }
    }
    return null
  })()

  const handleGrade = (grade) => {
    onReview(card.key, grade)
    const labels = ['again','hard','good','easy']
    setStats(s => ({ ...s, [labels[grade]]: s[labels[grade]] + 1 }))

    if (idx + 1 >= dueCards.length) {
      setDone(true)
    } else {
      setIdx(i => i + 1)
      setRevealed(false)
    }
  }

  if (done || dueCards.length === 0) {
    const total = stats.again + stats.hard + stats.good + stats.easy
    return (
      <div style={{ textAlign:'center', padding:'40px 20px' }}>
        <div style={{ fontSize:40, marginBottom:12 }}>✦</div>
        <div style={{ fontSize:20, color:'#D4A843', fontWeight:700, marginBottom:8 }}>
          Review complete
        </div>
        <div style={{ fontSize:13, color:'#6a5a40', marginBottom:24, lineHeight:1.8 }}>
          {total} ayahs reviewed today<br/>
          {stats.again > 0 && <span style={{ color:'#C0504D' }}>{stats.again} to repeat · </span>}
          {stats.good + stats.easy} remembered well
        </div>

        {/* Stats bar */}
        {total > 0 && (
          <div style={{ display:'flex', height:6, borderRadius:3, overflow:'hidden', maxWidth:300, margin:'0 auto 24px', gap:1 }}>
            {[['#C0504D',stats.again],['#E67E22',stats.hard],['#4CAF8A',stats.good],['#5B8FD4',stats.easy]].map(([c,v],i) => (
              v > 0 ? <div key={i} style={{ flex:v, background:c }} /> : null
            ))}
          </div>
        )}

        <button onClick={onClose} style={{ padding:'10px 28px', borderRadius:10, border:'1px solid rgba(212,168,67,0.3)', background:'rgba(212,168,67,0.1)', color:'#D4A843', fontSize:14, cursor:'pointer' }}>
          Back to library
        </button>
      </div>
    )
  }

  if (!verseData) {
    // Card exists in SRS but surah not loaded — skip
    handleGrade(2)
    return null
  }

  const { verse, section } = verseData
  const rgb = section.color.slice(1).match(/.{2}/g).map(h => parseInt(h,16)).join(',')

  return (
    <div style={{ maxWidth:560, margin:'0 auto', padding:'20px 16px' }}>
      {/* Progress */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
        <div style={{ fontSize:12, color:'#6a5a40' }}>{idx + 1} / {dueCards.length}</div>
        <div style={{ flex:1, height:3, background:'rgba(255,255,255,0.06)', borderRadius:2, margin:'0 12px', overflow:'hidden' }}>
          <div style={{ width:`${((idx) / dueCards.length) * 100}%`, height:'100%', background:section.color, transition:'width 0.3s' }} />
        </div>
        <button onClick={onClose} style={{ background:'none', border:'none', color:'#6a5a40', fontSize:16, cursor:'pointer' }}>×</button>
      </div>

      {/* Section label */}
      <div style={{ textAlign:'center', marginBottom:8 }}>
        <span style={{ fontSize:10, color:section.color, background:`rgba(${rgb},0.1)`, padding:'2px 10px', borderRadius:10 }}>
          {section.label} · Ayah {verse.n}
        </span>
      </div>

      {/* Card */}
      <div style={{ background:'rgba(255,255,255,0.02)', border:`1px solid rgba(${rgb},0.2)`, borderRadius:16, padding:'28px 20px', minHeight:240, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16, marginBottom:20 }}>

        {/* Arabic */}
        <div style={{ fontSize:28, fontFamily:'Amiri,serif', color:'#ddd5c0', textAlign:'center', direction:'rtl', lineHeight:1.8 }}>
          {verse.ar}
        </div>

        {/* Transliteration */}
        <TranslitDisplay tr={verse.tr} />

        {/* Reveal button or translation */}
        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            style={{ marginTop:8, padding:'10px 28px', borderRadius:10, border:`1px solid rgba(${rgb},0.4)`, background:`rgba(${rgb},0.1)`, color:section.color, fontSize:13, fontWeight:600, cursor:'pointer' }}
          >
            Reveal meaning
          </button>
        ) : (
          <div style={{ width:'100%', paddingTop:16, borderTop:'1px solid rgba(255,255,255,0.06)' }}>
            {/* English */}
            {(langs?.en !== false) && (
              <div style={{ fontSize:14, color:'#a09070', lineHeight:1.7, textAlign:'center', marginBottom:6 }}>{verse.en}</div>
            )}
            {/* Chinese */}
            {langs?.zh && (
              <div style={{ fontSize:13, color:'#4CAF8A', textAlign:'center', marginBottom:4 }}>{verse.zh}</div>
            )}
            {/* Hindi */}
            {langs?.hi && (
              <div style={{ fontSize:13, color:'#FF7043', textAlign:'center' }}>{verse.hi}</div>
            )}

            {/* Word-by-word hint */}
            {verse.words && (
              <div style={{ display:'flex', flexWrap:'wrap', gap:6, justifyContent:'center', marginTop:14 }}>
                {verse.words.map((w, i) => (
                  <div key={i} style={{ textAlign:'center', padding:'4px 8px', background:'rgba(255,255,255,0.03)', borderRadius:6, border:'1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize:13, fontFamily:'Amiri,serif', color:'#ddd5c0' }}>{w.ar}</div>
                    <div style={{ fontSize:9, color:'#6a5a40' }}>{w.en}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Grade buttons — only show after reveal */}
      {revealed && (
        <div>
          <div style={{ fontSize:10, color:'#6a5a40', textAlign:'center', marginBottom:10, letterSpacing:1 }}>HOW WELL DID YOU RECALL THIS?</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
            {GRADE_BUTTONS.map(btn => (
              <button
                key={btn.grade}
                onClick={() => handleGrade(btn.grade)}
                style={{
                  padding:'10px 6px', borderRadius:10,
                  border:`1px solid rgba(${btn.color.slice(1).match(/.{2}/g).map(h=>parseInt(h,16)).join(',')},0.4)`,
                  background:`rgba(${btn.color.slice(1).match(/.{2}/g).map(h=>parseInt(h,16)).join(',')},0.1)`,
                  color:btn.color, fontSize:13, fontWeight:600, cursor:'pointer',
                  display:'flex', flexDirection:'column', alignItems:'center', gap:2,
                }}
              >
                <span>{btn.label}</span>
                <span style={{ fontSize:9, opacity:0.7 }}>{btn.sub}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
