// src/pages/FeaturedAyahsPage.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FEATURED_AYAHS } from '../data/featuredAyahs'

function hexRgb(h) {
  if (!h || h.length < 7) return '180,180,180'
  return `${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`
}

function wordColor(tr) {
  if (!tr) return '#D4A843'
  if (/aa|ee|oo/.test(tr)) return '#81d4c0'
  if (/[SDTQH]|kh|gh|'/.test(tr)) return '#E6944A'
  return '#D4A843'
}

// Shared audio instance — allows stop from anywhere
let currentAudio = null

function playAudio(surah, ayah, onEnd) {
  if (currentAudio) {
    currentAudio.pause()
    currentAudio.currentTime = 0
    currentAudio = null
  }
  const s = String(surah).padStart(3, '0')
  const a = String(ayah).padStart(3, '0')
  const audio = new Audio(`https://everyayah.com/data/Husary_128kbps/${s}${a}.mp3`)
  audio.onended = () => { currentAudio = null; if (onEnd) onEnd() }
  audio.play().catch(e => console.error(e))
  currentAudio = audio
  return audio
}

function stopAudio() {
  if (currentAudio) {
    currentAudio.pause()
    currentAudio.currentTime = 0
    currentAudio = null
  }
}

function AyahPage({ ayah, lang }) {
  const [learned,  setLearned]  = useState(() => {
    try { return !!JSON.parse(localStorage.getItem('quran_featured_learned') || '{}')[ayah.id] } catch { return false }
  })
  const [showWords, setShowWords] = useState(false)
  const [playing,   setPlaying]   = useState(null)  // which ayah number is playing
  const rgb = hexRgb(ayah.color)

  const toggleLearned = () => {
    const next = !learned
    setLearned(next)
    try {
      const all = JSON.parse(localStorage.getItem('quran_featured_learned') || '{}')
      all[ayah.id] = next
      localStorage.setItem('quran_featured_learned', JSON.stringify(all))
    } catch {}
  }

  return (
    <div style={{ marginBottom: 56 }}>
      {/* Ayah header */}
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
        <div style={{ width:4, height:40, borderRadius:2, background:ayah.color, flexShrink:0 }} />
        <div>
          <div style={{ fontSize:18, color:ayah.color, fontWeight:700 }}>{ayah.name}</div>
          <div style={{ fontSize:12, color:'#6a5a40' }}>{ayah.ref}</div>
        </div>
        {learned && (
          <div style={{ marginLeft:'auto', fontSize:11, color:'#4CAF8A', background:'rgba(76,175,138,0.1)', padding:'3px 10px', borderRadius:20 }}>✓ Learned</div>
        )}
      </div>

      {/* Significance */}
      <div style={{ fontSize:13, color:'#7a6a52', lineHeight:1.8, marginBottom:24, padding:'12px 16px', background:'rgba(255,255,255,0.02)', borderRadius:10, borderLeft:`3px solid rgba(${rgb},0.4)` }}>
        {lang === 'zh' ? ayah.significanceZh : lang === 'hi' ? ayah.significanceHi : ayah.significance}
      </div>

      {/* Audio buttons */}
      <div style={{ display:'flex', gap:8, marginBottom:24, flexWrap:'wrap', alignItems:'center' }}>
        {(Array.isArray(ayah.audioAyah) ? ayah.audioAyah : [ayah.audioAyah]).map((a, i) => (
          <button key={i}
            onClick={() => {
              if (playing === a) { stopAudio(); setPlaying(null) }
              else { playAudio(ayah.audioSurah, a, () => setPlaying(null)); setPlaying(a) }
            }}
            style={{ padding:'8px 18px', borderRadius:20, border:`1px solid rgba(${rgb},${playing===a?0.7:0.4})`, background: playing===a ? `rgba(${rgb},0.25)` : `rgba(${rgb},0.1)`, color:ayah.color, fontSize:13, fontWeight:600, cursor:'pointer', transition:'all 0.15s' }}>
            {playing === a ? `⏹ Stop${ayah.audioAyah.length > 1 ? ` ${a}` : ''}` : `▶ ${ayah.audioAyah.length > 1 ? `Ayah ${a}` : 'Listen'}`}
          </button>
        ))}
      </div>

      {/* Lines breakdown */}
      <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
        {ayah.lines.map((line, i) => (
          <div key={i} style={{ background:'rgba(255,255,255,0.02)', border:`1px solid rgba(${rgb},0.12)`, borderRadius:10, padding:'16px 18px', borderLeft:`3px solid rgba(${rgb},0.5)` }}>
            {/* Arabic line */}
            <div style={{ fontSize:26, fontFamily:'Amiri,serif', color:'#f0e6d0', direction:'rtl', textAlign:'right', lineHeight:1.9, marginBottom:8 }}>
              {line.ar}
            </div>
            {/* Transliteration */}
            <div style={{ fontSize:13, fontStyle:'italic', lineHeight:1.7, marginBottom:8 }}>
              {line.tr.split('  ').map((w, wi) => (
                <span key={wi} style={{ color: wordColor(w) }}>{w.replace(/-/g,'')} </span>
              ))}
            </div>
            {/* Translation */}
            <div style={{ fontSize:13, color:'#a09070', lineHeight:1.6 }}>
              {lang === 'zh' ? line.zh : lang === 'hi' ? line.hi : line.en}
            </div>
            {lang === 'all' && (
              <>
                <div style={{ fontSize:12, color:'#4CAF8A', marginTop:4, lineHeight:1.6 }}>{line.zh}</div>
                <div style={{ fontSize:12, color:'#FF7043', marginTop:3, lineHeight:1.6 }}>{line.hi}</div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Word by word toggle */}
      {ayah.words && ayah.words.length > 0 && (
        <div style={{ marginTop:16 }}>
          <button onClick={() => setShowWords(w => !w)}
            style={{ padding:'7px 16px', borderRadius:20, border:`1px solid rgba(${rgb},0.3)`, background:'transparent', color:`rgba(${rgb},0.8)`, fontSize:12, cursor:'pointer', marginBottom:12 }}>
            {showWords ? '▲ Hide' : '▼ Key words'}
          </button>
          {showWords && (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(120px,1fr))', gap:8 }}>
              {ayah.words.map((w, i) => {
                const col = wordColor(w.tr)
                return (
                  <div key={i} style={{ background:`rgba(${hexRgb(col)},0.07)`, border:`1px solid rgba(${hexRgb(col)},0.25)`, borderRadius:8, padding:'8px 10px' }}>
                    <div dir="rtl" style={{ fontSize:20, color:'#f5ecd8', fontFamily:'Amiri,serif', textAlign:'right', lineHeight:1.6, marginBottom:4 }}>{w.ar}</div>
                    <div style={{ fontSize:11, color:col, fontStyle:'italic', marginBottom:4 }}>{w.tr}</div>
                    <div style={{ fontSize:11, color:'#7a6a52', marginBottom: w.root ? 6 : 0 }}>
                      {lang === 'zh' ? w.zh : lang === 'hi' ? w.hi : w.en}
                    </div>
                    {lang === 'all' && <><div style={{ fontSize:10, color:'#4CAF8A', marginTop:2 }}>{w.zh}</div><div style={{ fontSize:10, color:'#FF7043', marginTop:1 }}>{w.hi}</div></>}
                    {w.root && (
                      <div style={{ marginTop:6, paddingTop:6, borderTop:'1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ fontSize:9, color:'#9B59B6', letterSpacing:0.5, marginBottom:4 }}>
                          ROOT · <span style={{ fontFamily:'Amiri,serif', fontSize:11 }}>{w.root.l}</span>
                          {w.root.tr && <span style={{ color:'#81d4c0', fontStyle:'italic', marginLeft:4 }}>({w.root.tr})</span>}
                        </div>
                        {w.root.d.map((d, di) => (
                          <div key={di} style={{ fontSize:9, color:'#6a5a40', lineHeight:1.8 }}>
                            → <span style={{ color:'#a09070' }}>{d.tr}</span>
                            {d.ar && <span style={{ fontFamily:'Amiri,serif', color:'#6a5a40', marginLeft:4, fontSize:11 }}>{d.ar}</span>}
                            <span style={{ color:'#5a4a32', marginLeft:4 }}>— {d.en}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Mark learned */}
      <button onClick={toggleLearned}
        style={{ marginTop:16, padding:'9px 20px', borderRadius:9, border:`1px solid ${learned ? 'rgba(76,175,138,0.4)' : `rgba(${rgb},0.3)`}`, background: learned ? 'rgba(76,175,138,0.1)' : 'transparent', color: learned ? '#4CAF8A' : ayah.color, fontSize:12, fontWeight:600, cursor:'pointer' }}>
        {learned ? '✓ Learned' : 'Mark as learned'}
      </button>

      {/* Divider */}
      <div style={{ height:1, background:'rgba(255,255,255,0.06)', marginTop:40 }} />
    </div>
  )
}

export default function FeaturedAyahsPage() {
  const [lang, setLang] = useState('en')

  return (
    <div style={{ minHeight:'100vh', background:'#06101c', fontFamily:"'Lato',Georgia,serif", color:'#ddd5c0' }}>
      {/* Header */}
      <div style={{ background:'rgba(212,168,67,0.05)', borderBottom:'1px solid rgba(212,168,67,0.1)', padding:'16px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <Link to="/" style={{ fontSize:12, color:'#6a5a40', textDecoration:'none' }}>← Library</Link>
          <div style={{ width:1, height:16, background:'rgba(255,255,255,0.08)' }} />
          <div>
            <div style={{ fontSize:16, color:'#D4A843', fontWeight:700 }}>⭐ Featured Ayahs</div>
            <div style={{ fontSize:11, color:'#6a5a40' }}>Famous individual ayahs every Muslim should know</div>
          </div>
        </div>
        {/* Language toggle */}
        <div style={{ display:'flex', gap:4 }}>
          {[['en','EN'],['zh','中文'],['hi','हिंदी'],['all','All']].map(([l,label]) => (
            <button key={l} onClick={() => setLang(l)} style={{
              padding:'5px 12px', borderRadius:16, border:'none', cursor:'pointer', fontSize:11,
              background: lang===l ? 'rgba(212,168,67,0.2)' : 'rgba(255,255,255,0.04)',
              color: lang===l ? '#D4A843' : '#6a5a40', fontWeight: lang===l ? 700 : 400,
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth:680, margin:'0 auto', padding:'32px 20px' }}>
        {FEATURED_AYAHS.map(ayah => (
          <AyahPage key={ayah.id} ayah={ayah} lang={lang} />
        ))}
      </div>
    </div>
  )
}
