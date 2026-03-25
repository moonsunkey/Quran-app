// src/components/VocabSection.jsx
import { useState, useMemo, useEffect } from 'react'
import { VOCAB, TYPE_LABELS } from '../data/quranVocab'

const TYPE_COLOR = {
  N:'#4CAF8A', V:'#D4A843', P:'#5B8FD4',
  PR:'#9B59B6', ADJ:'#E67E22', ADV:'#2ECC71'
}

function hexRgb(h) {
  if (!h || h.length < 7) return '180,180,180'
  return `${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`
}

function speakArabic(text) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(text)
  utt.lang = 'ar-SA'
  utt.rate = 0.8
  window.speechSynthesis.speak(utt)
}

function VocabCard({ word, lang, learned, onToggle }) {
  const [flipped, setFlipped] = useState(false)
  const col = TYPE_COLOR[word.type] || '#D4A843'
  const rgb = hexRgb(col)

  return (
    <div
      onClick={() => setFlipped(f => !f)}
      style={{
        background: learned
          ? `rgba(${hexRgb('#4CAF8A')},0.06)`
          : flipped ? `rgba(${rgb},0.06)` : 'rgba(255,255,255,0.02)',
        border: `1px solid ${learned ? 'rgba(76,175,138,0.3)' : flipped ? `rgba(${rgb},0.35)` : 'rgba(255,255,255,0.07)'}`,
        borderRadius:12, padding:'16px 14px', cursor:'pointer',
        transition:'all 0.2s', position:'relative',
        minHeight:120,
      }}
    >
      {/* Learned badge */}
      {learned && (
        <div style={{ position:'absolute', top:8, right:8, fontSize:10, color:'#4CAF8A' }}>✓</div>
      )}

      {/* Type badge */}
      <div style={{ position:'absolute', top:8, left:10, fontSize:9, color:col, background:`rgba(${rgb},0.1)`, padding:'1px 6px', borderRadius:8 }}>
        {TYPE_LABELS[word.type]}
      </div>

      {!flipped ? (
        // Front — Arabic + frequency
        <div style={{ textAlign:'center', paddingTop:14 }}>
          <div style={{ fontSize:32, fontFamily:'Amiri,serif', color:'#ddd5c0', lineHeight:1.4, marginBottom:6 }}>{word.ar}</div>
          <div style={{ fontSize:12, color: TYPE_COLOR[word.type] || '#D4A843', fontStyle:'italic' }}>
            {word.tr.replace(/-/g,'')}
          </div>
          <div style={{ fontSize:9, color:'#4a3a28', marginTop:6 }}>appears {word.count.toLocaleString()}× in Quran</div>
          <div style={{ fontSize:9, color:'#3a2a18', marginTop:4 }}>tap to reveal</div>
        </div>
      ) : (
        // Back — full breakdown
        <div style={{ paddingTop:10 }}>
          {/* Arabic + audio */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
            <div style={{ fontSize:22, fontFamily:'Amiri,serif', color:'#ddd5c0' }}>{word.ar}</div>
            <button
              onClick={e => { e.stopPropagation(); speakArabic(word.ar) }}
              style={{ background:`rgba(${rgb},0.15)`, border:`1px solid rgba(${rgb},0.3)`, borderRadius:20, padding:'4px 10px', color:col, fontSize:11, cursor:'pointer' }}
            >▶ Listen</button>
          </div>

          {/* Meanings */}
          <div style={{ fontSize:13, color:'#ddd5c0', fontWeight:600, marginBottom:2 }}>{word.en}</div>
          {lang === 'zh' || lang === 'all' ? <div style={{ fontSize:12, color:'#4CAF8A', marginBottom:1 }}>{word.zh}</div> : null}
          {lang === 'hi' || lang === 'all' ? <div style={{ fontSize:12, color:'#FF7043', marginBottom:1 }}>{word.hi}</div> : null}

          {/* Frequency */}
          <div style={{ fontSize:10, color:'#6a5a40', marginTop:6 }}>
            Appears <span style={{ color:col }}>{word.count.toLocaleString()}</span>× · {TYPE_LABELS[word.type]}
          </div>

          {/* Example */}
          {word.example && (
            <div style={{ marginTop:8, padding:'6px 10px', background:'rgba(255,255,255,0.03)', borderRadius:8, borderLeft:`2px solid rgba(${rgb},0.4)` }}>
              <div style={{ fontSize:9, color:'#6a5a40', marginBottom:3 }}>from {word.example.surah}</div>
              <div style={{ fontSize:14, fontFamily:'Amiri,serif', color:'#a09070', direction:'rtl', textAlign:'right' }}>{word.example.ar}</div>
            </div>
          )}

          {/* Mark learned */}
          <button
            onClick={e => { e.stopPropagation(); onToggle() }}
            style={{ marginTop:10, width:'100%', padding:'6px', borderRadius:8, border:`1px solid ${learned ? 'rgba(76,175,138,0.4)' : 'rgba(255,255,255,0.1)'}`, background: learned ? 'rgba(76,175,138,0.1)' : 'transparent', color: learned ? '#4CAF8A' : '#6a5a40', fontSize:11, cursor:'pointer' }}
          >{learned ? '✓ Learned' : 'Mark as learned'}</button>
        </div>
      )}
    </div>
  )
}

export default function VocabSection() {
  const [lang,     setLang]     = useState('en')
  const [filter,   setFilter]   = useState('all')  // all | N | V | P | PR | ADJ | learned
  const [search,   setSearch]   = useState('')
  const [learned,  setLearned]  = useState({})
  const [expanded, setExpanded] = useState(false)
  const [showCount, setShowCount] = useState(30)

  // Persist learned words
  useEffect(() => {
    try {
      const saved = localStorage.getItem('quran_vocab_learned')
      if (saved) setLearned(JSON.parse(saved))
    } catch {}
  }, [])

  const toggleLearned = (ar) => {
    setLearned(prev => {
      const next = { ...prev, [ar]: !prev[ar] }
      try { localStorage.setItem('quran_vocab_learned', JSON.stringify(next)) } catch {}
      return next
    })
  }

  const filtered = useMemo(() => {
    return VOCAB.filter(w => {
      if (filter === 'learned') return learned[w.ar]
      if (filter !== 'all' && w.type !== filter) return false
      if (search) {
        const s = search.toLowerCase()
        return w.ar.includes(search) ||
          w.en.toLowerCase().includes(s) ||
          w.zh.includes(search) ||
          w.hi.includes(search) ||
          w.tr.toLowerCase().includes(s)
      }
      return true
    })
  }, [filter, search, learned])

  const learnedCount = Object.values(learned).filter(Boolean).length
  const pct = Math.round((learnedCount / VOCAB.length) * 100)
  const visible = expanded ? filtered.slice(0, showCount) : filtered.slice(0, 6)

  return (
    <div style={{ maxWidth:860, margin:'0 auto 40px', padding:'0 16px' }}>
      {/* Section header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16, flexWrap:'wrap', gap:10 }}>
        <div>
          <div style={{ fontSize:16, color:'#D4A843', fontWeight:700, marginBottom:2 }}>
            📚 Core Quran Vocabulary
          </div>
          <div style={{ fontSize:12, color:'#6a5a40' }}>
            {VOCAB.length} words covering ~75% of the Quran · {learnedCount} learned ({pct}%)
          </div>
        </div>

        {/* Language toggle */}
        <div style={{ display:'flex', gap:4 }}>
          {[['en','EN'],['zh','中文'],['hi','हिंदी'],['all','All']].map(([l,label]) => (
            <button key={l} onClick={() => setLang(l)} style={{
              padding:'4px 10px', borderRadius:16, border:'none', cursor:'pointer', fontSize:11,
              background: lang===l ? 'rgba(212,168,67,0.2)' : 'rgba(255,255,255,0.04)',
              color: lang===l ? '#D4A843' : '#6a5a40',
              fontWeight: lang===l ? 700 : 400,
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height:3, background:'rgba(255,255,255,0.06)', borderRadius:2, marginBottom:14, overflow:'hidden' }}>
        <div style={{ width:`${pct}%`, height:'100%', background:'#4CAF8A', borderRadius:2, transition:'width 0.4s' }} />
      </div>

      {/* Filters + search */}
      <div style={{ display:'flex', gap:6, marginBottom:16, flexWrap:'wrap', alignItems:'center' }}>
        {[
          ['all','All'],
          ['N','Nouns'],
          ['V','Verbs'],
          ['P','Particles'],
          ['PR','Pronouns'],
          ['ADJ','Adjectives'],
          ['learned','✓ Learned'],
        ].map(([f,l]) => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding:'4px 11px', borderRadius:20, fontSize:11, cursor:'pointer',
            border:`1px solid ${filter===f ? (f==='learned'?'rgba(76,175,138,0.5)':'rgba(212,168,67,0.4)') : 'rgba(255,255,255,0.08)'}`,
            background: filter===f ? (f==='learned'?'rgba(76,175,138,0.1)':'rgba(212,168,67,0.08)') : 'transparent',
            color: filter===f ? (f==='learned'?'#4CAF8A':'#D4A843') : '#6a5a40',
          }}>{l}</button>
        ))}
        <input
          placeholder="Search…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginLeft:'auto', padding:'4px 11px', borderRadius:20, fontSize:11, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.04)', color:'#ddd5c0', outline:'none', width:130 }}
        />
      </div>

      {/* Cards grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:10 }}>
        {visible.map(word => (
          <VocabCard
            key={word.ar}
            word={word}
            lang={lang}
            learned={!!learned[word.ar]}
            onToggle={() => toggleLearned(word.ar)}
          />
        ))}
      </div>

      {/* Show more / less */}
      {filtered.length > 6 && (
        <div style={{ textAlign:'center', marginTop:16, display:'flex', gap:10, justifyContent:'center', alignItems:'center' }}>
          {!expanded ? (
            <button onClick={() => setExpanded(true)} style={{ padding:'8px 24px', borderRadius:10, border:'1px solid rgba(212,168,67,0.3)', background:'rgba(212,168,67,0.08)', color:'#D4A843', fontSize:13, cursor:'pointer' }}>
              Show all {filtered.length} words
            </button>
          ) : (
            <>
              {showCount < filtered.length && (
                <button onClick={() => setShowCount(n => n+30)} style={{ padding:'8px 20px', borderRadius:10, border:'1px solid rgba(212,168,67,0.3)', background:'rgba(212,168,67,0.08)', color:'#D4A843', fontSize:12, cursor:'pointer' }}>
                  Load 30 more
                </button>
              )}
              <button onClick={() => { setExpanded(false); setShowCount(30) }} style={{ padding:'8px 20px', borderRadius:10, border:'1px solid rgba(255,255,255,0.1)', background:'transparent', color:'#6a5a40', fontSize:12, cursor:'pointer' }}>
                Collapse
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
