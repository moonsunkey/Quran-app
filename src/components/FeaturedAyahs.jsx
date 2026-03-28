// src/components/FeaturedAyahs.jsx
import { useState } from 'react'
import { FEATURED_AYAHS } from '../data/featuredAyahs'

function hexRgb(h) {
  if (!h || h.length < 7) return '180,180,180'
  return `${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`
}

function playAudio(surah, ayah) {
  const s = String(surah).padStart(3, '0')
  const a = String(ayah).padStart(3, '0')
  const url = `https://everyayah.com/data/Husary_128kbps/${s}${a}.mp3`
  const audio = new Audio(url)
  audio.play().catch(e => console.error('Audio error:', e))
}

function wordColor(tr) {
  if (!tr) return '#D4A843'
  if (/aa|ee|oo/.test(tr)) return '#81d4c0'
  if (/[SDTQH]|kh|gh|'/.test(tr)) return '#E6944A'
  return '#D4A843'
}

function AyahCard({ ayah, lang }) {
  const [expanded, setExpanded] = useState(false)
  const [learned,  setLearned]  = useState(() => {
    try { return !!JSON.parse(localStorage.getItem('quran_featured_learned') || '{}')[ayah.id] } catch { return false }
  })

  const rgb = hexRgb(ayah.color)

  const toggleLearned = (e) => {
    e.stopPropagation()
    const next = !learned
    setLearned(next)
    try {
      const all = JSON.parse(localStorage.getItem('quran_featured_learned') || '{}')
      all[ayah.id] = next
      localStorage.setItem('quran_featured_learned', JSON.stringify(all))
    } catch {}
  }

  return (
    <div style={{
      background: learned ? `rgba(${rgb},0.05)` : 'rgba(255,255,255,0.02)',
      border: `1px solid rgba(${rgb},${expanded ? 0.4 : 0.2})`,
      borderRadius: 14,
      overflow: 'hidden',
      transition: 'all 0.2s',
      borderTop: `3px solid ${ayah.color}`,
    }}>
      {/* Header */}
      <div
        onClick={() => setExpanded(e => !e)}
        style={{ padding:'16px 18px', cursor:'pointer', display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12 }}
      >
        <div style={{ flex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
            <div style={{ fontSize:14, color:ayah.color, fontWeight:700 }}>{ayah.name}</div>
            {learned && <span style={{ fontSize:9, color:'#4CAF8A', background:'rgba(76,175,138,0.1)', padding:'1px 7px', borderRadius:8 }}>✓ Learned</span>}
          </div>
          <div style={{ fontSize:11, color:'#6a5a40', marginBottom:6 }}>{ayah.ref}</div>
          <div style={{ fontSize:12, color:'#7a6a52', lineHeight:1.6 }}>{ayah.significance}</div>
        </div>
        <div style={{ flexShrink:0, display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6 }}>
          <div style={{ fontSize:22, fontFamily:'Amiri,serif', color:'#a09070', direction:'rtl' }}>
            {ayah.ar.split(' ').slice(0,3).join(' ')}…
          </div>
          <div style={{ fontSize:11, color:`rgba(${rgb},0.7)` }}>{expanded ? '▲ collapse' : '▼ expand'}</div>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div style={{ borderTop:`1px solid rgba(${rgb},0.15)`, padding:'16px 18px', background:'rgba(0,0,0,0.2)' }}>

            {/* Arabic + audio button */}
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12, marginBottom:14 }}>
            <div style={{ fontSize:24, fontFamily:'Amiri,serif', color:'#ddd5c0', direction:'rtl', textAlign:'right', lineHeight:2, flex:1 }}>
              {ayah.ar}
            </div>
            <div style={{ flexShrink:0, marginTop:8, display:'flex', flexDirection:'column', gap:6 }}>
              {(Array.isArray(ayah.audioAyah) ? ayah.audioAyah : [ayah.audioAyah]).map((a, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); playAudio(ayah.audioSurah, a) }}
                  style={{ padding:'7px 14px', borderRadius:20, border:`1px solid rgba(${rgb},0.4)`, background:`rgba(${rgb},0.12)`, color:ayah.color, fontSize:11, fontWeight:600, cursor:'pointer', whiteSpace:'nowrap' }}
                >▶ {Array.isArray(ayah.audioAyah) ? `Ayah ${a}` : 'Listen'}</button>
              ))}
            </div>
          </div>

          {/* Transliteration */}
          <div style={{ fontSize:13, fontStyle:'italic', lineHeight:1.9, marginBottom:12 }}>
            {ayah.tr.split('  ').map((w, i) => (
              <span key={i} style={{ color: wordColor(w) }}>{w.replace(/-/g,'')} </span>
            ))}
          </div>

          {/* Translation */}
          <div style={{ fontSize:13, color:'#a09070', lineHeight:1.8, marginBottom:8 }}>
            {lang === 'zh' ? ayah.zh : lang === 'hi' ? ayah.hi : ayah.en}
          </div>
          {lang === 'all' && (
            <>
              <div style={{ fontSize:12, color:'#4CAF8A', lineHeight:1.7, marginBottom:4 }}>{ayah.zh}</div>
              <div style={{ fontSize:12, color:'#FF7043', lineHeight:1.7, marginBottom:0 }}>{ayah.hi}</div>
            </>
          )}

          {/* Word-by-word breakdown */}
          {ayah.words && ayah.words.length > 0 && (
            <div style={{ marginTop:14, marginBottom:14 }}>
              <div style={{ fontSize:10, color:ayah.color, letterSpacing:1, marginBottom:10 }}>WORD BY WORD</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(120px,1fr))', gap:8 }}>
                {ayah.words.map((w, i) => {
                  const col = wordColor(w.tr)
                  return (
                    <div key={i} style={{ background:`rgba(${hexRgb(col)},0.07)`, border:`1px solid rgba(${hexRgb(col)},0.25)`, borderRadius:8, padding:'8px 10px' }}>
                      <div dir="rtl" style={{ fontSize:20, color:'#f5ecd8', fontFamily:'Amiri,serif', textAlign:'right', marginBottom:4, lineHeight:1.6 }}>{w.ar}</div>
                      <div style={{ fontSize:11, color:col, fontStyle:'italic', marginBottom:4 }}>{w.tr.replace(/-/g,'')}</div>
                      <div style={{ fontSize:11, color:'#7a6a52', lineHeight:1.4 }}>
                        {lang === 'zh' ? w.zh : lang === 'hi' ? w.hi : w.en}
                      </div>
                      {lang === 'all' && w.zh && <div style={{ fontSize:10, color:'#8fb8a0', marginTop:2 }}>{w.zh}</div>}
                      {lang === 'all' && w.hi && <div style={{ fontSize:10, color:'#FF7043', marginTop:1 }}>{w.hi}</div>}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Mark learned */}
          <button
            onClick={toggleLearned}
            style={{ width:'100%', padding:'9px', borderRadius:9, border:`1px solid ${learned ? 'rgba(76,175,138,0.4)' : `rgba(${rgb},0.3)`}`, background: learned ? 'rgba(76,175,138,0.1)' : `rgba(${rgb},0.08)`, color: learned ? '#4CAF8A' : ayah.color, fontSize:12, fontWeight:600, cursor:'pointer' }}
          >
            {learned ? '✓ Marked as learned' : 'Mark as learned'}
          </button>
        </div>
      )}
    </div>
  )
}

export default function FeaturedAyahs() {
  const [lang, setLang] = useState('en')

  return (
    <div style={{ maxWidth:860, margin:'0 auto 40px', padding:'0 16px' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16, flexWrap:'wrap', gap:10 }}>
        <div>
          <div style={{ fontSize:16, color:'#D4A843', fontWeight:700, marginBottom:2 }}>⭐ Featured Ayahs</div>
          <div style={{ fontSize:12, color:'#6a5a40' }}>Famous individual ayahs every Muslim should know</div>
        </div>
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

      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {FEATURED_AYAHS.map(ayah => (
          <AyahCard key={ayah.id} ayah={ayah} lang={lang} />
        ))}
      </div>
    </div>
  )
}
