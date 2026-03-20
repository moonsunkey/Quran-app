import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'
import { SURAH_LIST } from '../data/surahList'
import { useState } from 'react'
import AuthModal from '../components/AuthModal'

const hexRgb = h => `${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`

const SECTION_COUNTS = { 56: 96 } // total ayahs per surah

export default function Home() {
  const { user }              = useAuth()
  const { progress }          = useProgress()
  const [showAuth, setShowAuth] = useState(false)

  const getCount = (n) => {
    const total = SECTION_COUNTS[n] || 0
    const done = Object.entries(progress)
      .filter(([k, v]) => v && k.includes('-'))
      .filter(([k]) => {
        // keys are like "opening-1", "sabiqun-11" — count them if from this surah
        // For now we count all keys for surah 56 (only available one)
        return n === 56
      }).length
    return { done, total }
  }

  return (
    <div style={{ maxWidth:920, margin:'0 auto', padding:'32px 16px' }}>
      {/* Hero */}
      <div style={{
        textAlign:'center', marginBottom:40,
        padding:'40px 24px',
        background:'linear-gradient(135deg,rgba(212,168,67,0.06),rgba(12,27,48,0))',
        border:'1px solid var(--gold-border)', borderRadius:20,
      }}>
        <div style={{ fontSize:40, marginBottom:8 }}>☽</div>
        <h1 style={{ fontSize:32, color:'var(--gold)', marginBottom:8, fontWeight:700 }}>Hifz Helper</h1>
        <div style={{ fontSize:16, color:'var(--text-dim)', marginBottom:4 }}>
          Learn the Quran surah by surah
        </div>
        <div style={{ fontSize:13, color:'var(--text-muted)', maxWidth:480, margin:'0 auto 24px' }}>
          Designed for new Muslims and non-Arabic speakers. Every ayah includes
          Arabic, syllable-by-syllable transliteration, translation, and audio.
        </div>
        {!user && (
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            <button className="btn btn-gold" onClick={() => setShowAuth(true)}>
              Sign Up Free — Save Progress
            </button>
            <Link to="/surah/56">
              <button className="btn btn-outline">Start without account →</button>
            </Link>
          </div>
        )}
        {user && (
          <div style={{ fontSize:13, color:'var(--text-dim)' }}>
            Welcome back, <span style={{ color:'var(--gold)' }}>{user.displayName || user.email?.split('@')[0]}</span> 👋
          </div>
        )}
      </div>

      {/* Features */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:12, marginBottom:40 }}>
        {[
          { icon:'🔤', title:'Transliteration', desc:'Every ayah broken into syllables — color-coded for long vowels and special sounds' },
          { icon:'🎙', title:'Audio Recitation', desc:'Al-Husary (slow & clear) — perfect for learning pronunciation alongside text' },
          { icon:'🧠', title:'Practice Mode', desc:'Hide Arabic, transliteration, or translation to test yourself' },
          { icon:'☁️', title:'Progress Sync', desc:'Sign in to save across phone, tablet, and desktop automatically' },
        ].map(f => (
          <div key={f.title} className="card" style={{ padding:'16px' }}>
            <div style={{ fontSize:22, marginBottom:8 }}>{f.icon}</div>
            <div style={{ fontSize:13, color:'var(--gold)', fontWeight:600, marginBottom:4 }}>{f.title}</div>
            <div style={{ fontSize:12, color:'var(--text-dim)', lineHeight:1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Surah list */}
      <div>
        <div style={{ fontSize:11, color:'var(--text-muted)', letterSpacing:2, marginBottom:16 }}>
          AVAILABLE SURAHS
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:12 }}>
          {SURAH_LIST.map(s => {
            const { done, total } = getCount(s.number)
            const pct = total ? Math.round(done / total * 100) : 0
            return (
              <div key={s.number} style={{
                background: s.available ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
                border:`1px solid ${s.available ? 'var(--gold-border)' : 'var(--border)'}`,
                borderRadius:12, padding:'16px 18px',
                opacity: s.available ? 1 : 0.5,
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
                  <div style={{
                    width:36, height:36, borderRadius:'50%', flexShrink:0,
                    border:'1.5px solid var(--gold-border)',
                    background:'var(--gold-dim)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:12, color:'var(--gold)',
                  }}>{s.number}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:15, color: s.available ? 'var(--text)' : 'var(--text-dim)', fontWeight:600 }}>
                      {s.name}
                    </div>
                    <div style={{ fontSize:11, color:'var(--text-muted)' }}>
                      {s.ayahs} ayahs · {s.meaning}
                    </div>
                  </div>
                  <div style={{ fontSize:18, color:'var(--text-dim)', fontFamily:'var(--font-arabic)' }}>{s.arabic}</div>
                </div>

                {s.available ? (
                  <>
                    <div style={{ height:3, background:'rgba(255,255,255,0.05)', borderRadius:2, marginBottom:8, overflow:'hidden' }}>
                      <div style={{ width:`${pct}%`, height:'100%', background:'var(--gold)', borderRadius:2, transition:'width 0.4s' }}/>
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <span style={{ fontSize:11, color:'var(--text-muted)' }}>{done}/{total} memorized</span>
                      <Link to={`/surah/${s.number}`}>
                        <button className="btn btn-gold" style={{ fontSize:11, padding:'6px 14px' }}>
                          {pct > 0 ? 'Continue →' : 'Start →'}
                        </button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize:11, color:'var(--text-muted)', fontStyle:'italic' }}>
                    Coming soon
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  )
}
