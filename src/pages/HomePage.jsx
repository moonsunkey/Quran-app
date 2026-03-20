// src/pages/HomePage.jsx
import { Link } from 'react-router-dom'

// ── Surah catalogue ──────────────────────────────────────────────────────────
// Add new surahs here as you build them out.
// status: 'available' | 'coming-soon'
const SURAHS = [
  {
    id: 'al-waqia',
    number: 56,
    name: 'Al-Waqia',
    arabic: 'الواقعة',
    meaning: 'The Inevitable Event',
    ayahs: 96,
    difficulty: 'Intermediate',
    status: 'available',
    color: '#D4A843',
    description: 'A powerful Makki surah about the Day of Judgment and the three destinies of humanity.',
  },
  {
    id: 'al-mulk',
    number: 67,
    name: 'Al-Mulk',
    arabic: 'الملك',
    meaning: 'The Sovereignty',
    ayahs: 30,
    difficulty: 'Beginner',
    status: 'coming-soon',
    color: '#5B8FD4',
    description: 'A beloved short surah — the Prophet ﷺ recommended reciting it every night.',
  },
  {
    id: 'al-rahman',
    number: 55,
    name: 'Al-Rahman',
    arabic: 'الرحمان',
    meaning: 'The Most Merciful',
    ayahs: 78,
    difficulty: 'Beginner',
    status: 'coming-soon',
    color: '#4CAF8A',
    description: 'The "beauty of the Quran" — features the iconic repeating refrain about Allah\'s blessings.',
  },
  {
    id: 'yasin',
    number: 36,
    name: 'Ya-Sin',
    arabic: 'يس',
    meaning: 'Ya Sin',
    ayahs: 83,
    difficulty: 'Intermediate',
    status: 'coming-soon',
    color: '#9B59B6',
    description: 'Called "the heart of the Quran" — covers resurrection, signs of Allah, and accountability.',
  },
  {
    id: 'al-kahf',
    number: 18,
    name: 'Al-Kahf',
    arabic: 'الكهف',
    meaning: 'The Cave',
    ayahs: 110,
    difficulty: 'Advanced',
    status: 'coming-soon',
    color: '#E67E22',
    description: 'Recited on Fridays — four stories covering trials of faith, wealth, knowledge, and power.',
  },
]

const DIFF_COLOR = { Beginner:'#4CAF8A', Intermediate:'#D4A843', Advanced:'#C0504D' }

export default function HomePage({ user }) {
  return (
    <main style={{ maxWidth:860, margin:'0 auto', padding:'32px 16px' }}>

      {/* Hero */}
      <div style={{ textAlign:'center', marginBottom:40 }}>
        <div style={{ fontSize:40, marginBottom:12 }}>الـقـرآن</div>
        <h1 style={{ fontSize:22, color:'#D4A843', fontWeight:700, marginBottom:8 }}>
          Quran Memorization for New Muslims
        </h1>
        <p style={{ fontSize:14, color:'#7a6a52', maxWidth:520, margin:'0 auto', lineHeight:1.8 }}>
          Learn to recite surah by surah — with full Arabic text, syllable-by-syllable
          transliteration, English translation, and audio from Sheikh Al-Husary.
        </p>
        {!user && (
          <div style={{
            marginTop:16, display:'inline-block',
            background:'rgba(212,168,67,0.08)', border:'1px solid rgba(212,168,67,0.2)',
            borderRadius:8, padding:'10px 20px', fontSize:12, color:'#7a6a52',
          }}>
            💡 Sign in with Google to save your progress across all your devices
          </div>
        )}
      </div>

      {/* Surah grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:16 }}>
        {SURAHS.map(s => (
          <div key={s.id} style={{
            background: s.status==='available' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)',
            border: `1px solid ${s.status==='available' ? `rgba(${hexRgb(s.color)},0.3)` : 'rgba(255,255,255,0.07)'}`,
            borderRadius:12, overflow:'hidden',
            opacity: s.status==='available' ? 1 : 0.6,
            transition:'transform 0.15s, border-color 0.15s',
          }}>
            {/* Top bar */}
            <div style={{ height:3, background: s.status==='available' ? s.color : '#2a2a2a' }} />

            <div style={{ padding:'18px 20px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{
                      width:28, height:28, borderRadius:'50%',
                      border:`1.5px solid rgba(${hexRgb(s.color)},0.5)`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:10, color:s.color,
                    }}>{s.number}</div>
                    <div>
                      <div style={{ fontSize:15, color: s.status==='available' ? s.color : '#6a5a40', fontWeight:700 }}>{s.name}</div>
                      <div style={{ fontSize:10, color:'#6a5a40' }}>{s.meaning} · {s.ayahs} ayahs</div>
                    </div>
                  </div>
                </div>
                <div style={{ fontSize:22, color:'#ddd5c0', fontFamily:'Amiri,serif' }}>{s.arabic}</div>
              </div>

              <p style={{ fontSize:12, color:'#7a6a52', lineHeight:1.6, marginBottom:12 }}>{s.description}</p>

              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{
                  fontSize:10, padding:'3px 8px', borderRadius:10,
                  background:`rgba(${hexRgb(DIFF_COLOR[s.difficulty]||'#888'),0.1})`,
                  color: DIFF_COLOR[s.difficulty] || '#888',
                  border:`1px solid rgba(${hexRgb(DIFF_COLOR[s.difficulty]||'#888'),0.2})`,
                }}>{s.difficulty}</span>

                {s.status === 'available' ? (
                  <Link to={`/surah/${s.id}`} style={{
                    padding:'7px 16px', borderRadius:8,
                    background:`rgba(${hexRgb(s.color)},0.15)`,
                    border:`1px solid rgba(${hexRgb(s.color)},0.4)`,
                    color:s.color, fontSize:12, textDecoration:'none',
                    fontWeight:600, letterSpacing:0.3,
                    transition:'background 0.15s',
                  }}>Start Learning →</Link>
                ) : (
                  <span style={{ fontSize:11, color:'#4a3a28', background:'rgba(255,255,255,0.03)', padding:'5px 10px', borderRadius:6 }}>Coming soon</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div style={{ textAlign:'center', marginTop:40, fontSize:11, color:'#3a2a18', lineHeight:2 }}>
        Audio provided by everyayah.com · Recitation by Mahmoud Khalil Al-Husary<br/>
        May Allah make this a means of benefit. آمين
      </div>
    </main>
  )
}

function hexRgb(h) {
  if (!h || h.length < 7) return '180,180,180'
  const r=parseInt(h.slice(1,3),16), g=parseInt(h.slice(3,5),16), b=parseInt(h.slice(5,7),16)
  return `${r},${g},${b}`
}
