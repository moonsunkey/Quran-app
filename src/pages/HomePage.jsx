// src/pages/HomePage.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FeedbackModal from '../components/FeedbackModal'

const SURAHS = [
  // ── Core / most-recited ────────────────────────────────────────────────────
  { id:'al-fatiha',  number:1,   name:'Al-Fatiha',  arabic:'الفاتحة',      meaning:'The Opening',               ayahs:7,   difficulty:'Beginner',     status:'available',   color:'#4CAF8A', description:'The most recited surah — said in every rakat of every prayer, at least 17 times daily. Start here.' },
  { id:'al-ikhlas',  number:112, name:'Al-Ikhlas',  arabic:'الْإِخْلَاص',  meaning:'Sincerity',                 ayahs:4,   difficulty:'Beginner',     status:'available',   color:'#9C27B0', description:'Four lines defining Allah completely — worth one-third of the Quran in reward according to the Prophet ﷺ.' },
  { id:'al-falaq',   number:113, name:'Al-Falaq',   arabic:'الْفَلَق',      meaning:'The Daybreak',              ayahs:5,   difficulty:'Beginner',     status:'available',   color:'#8E44AD', description:'First of the two Refuge surahs — seeks protection from four external evils. Recite every morning and evening.' },
  { id:'an-nas',     number:114, name:'An-Nas',     arabic:'النَّاس',       meaning:'Mankind',                   ayahs:6,   difficulty:'Beginner',     status:'available',   color:'#D32F2F', description:'The final surah — seeks refuge from the inner whisperer. The Quran closes with this prayer of protection.' },
  // ── Short Makki gems ───────────────────────────────────────────────────────
  { id:'al-asr',     number:103, name:'Al-Asr',     arabic:'الْعَصْر',      meaning:'The Time',                  ayahs:3,   difficulty:'Beginner',     status:'available',   color:'#F57C00', description:'Three verses containing the complete formula for human success — faith, deeds, truth, and patience. All four required.' },
  { id:'al-kawthar', number:108, name:'Al-Kawthar', arabic:'الْكَوْثَر',    meaning:'Abundance',                 ayahs:3,   difficulty:'Beginner',     status:'available',   color:'#0097A7', description:'The shortest surah — three verses of profound consolation. Allah\'s answer to those who mocked the Prophet ﷺ.' },
  { id:'an-nasr',    number:110, name:'An-Nasr',    arabic:'النَّصْر',       meaning:'The Victory',               ayahs:3,   difficulty:'Beginner',     status:'available',   color:'#43A047', description:'One of the last surahs revealed — at the moment of greatest triumph, the command is to glorify and seek forgiveness.' },
  { id:'al-kafirun', number:109, name:'Al-Kafirun', arabic:'الْكَافِرُون',  meaning:'The Disbelievers',          ayahs:6,   difficulty:'Beginner',     status:'available',   color:'#455A64', description:'The surah of total clarity — a direct, uncompromising declaration that there is no middle ground between truth and falsehood.' },
  { id:'al-maun',    number:107, name:'Al-Maun',    arabic:'الْمَاعُون',    meaning:'Small Kindnesses',          ayahs:7,   difficulty:'Beginner',     status:'available',   color:'#00897B', description:'Seven verses exposing false religion — the one who denies Judgment Day shows it through neglect of orphans, the poor, and prayer.' },
  { id:'quraysh',    number:106, name:'Quraysh',    arabic:'قُرَيْش',       meaning:'Quraysh',                   ayahs:4,   difficulty:'Beginner',     status:'available',   color:'#F9A825', description:'A reminder to the Quraysh: your safe trade journeys and prosperity came from Allah — so worship the Lord of this House.' },
  { id:'al-fil',     number:105, name:'Al-Fil',     arabic:'الْفِيل',       meaning:'The Elephant',              ayahs:5,   difficulty:'Beginner',     status:'available',   color:'#6D4C41', description:'The story of Abraha\'s army and the war elephants — birds rained stones and reduced them to eaten straw to protect the Kaabah.' },
  { id:'al-masad',   number:111, name:'Al-Masad',   arabic:'الْمَسَد',      meaning:'The Palm Fiber',            ayahs:5,   difficulty:'Beginner',     status:'available',   color:'#37474F', description:'The only surah naming an individual — Allah\'s direct answer to Abu Lahab who mocked the Prophet ﷺ at Mount Safa.' },
  { id:'al-qadr',    number:97,  name:'Al-Qadr',    arabic:'الْقَدْر',      meaning:'The Night of Decree',       ayahs:5,   difficulty:'Beginner',     status:'available',   color:'#AD1457', description:'The night the Quran was first revealed — worth more than a thousand months of worship. Essential for Ramadan.' },
  // ── Comfort and guidance ──────────────────────────────────────────────────
  { id:'ad-duha',    number:93,  name:'Ad-Duha',    arabic:'الضُّحَىٰ',     meaning:'The Morning Light',         ayahs:11,  difficulty:'Beginner',     status:'available',   color:'#F4511E', description:'Revealed when revelation paused — Allah\'s tender reassurance to the Prophet ﷺ: I have not forsaken you. For anyone in hardship.' },
  { id:'ash-sharh',  number:94,  name:'Ash-Sharh',  arabic:'الشَّرْح',      meaning:'The Opening of the Chest',  ayahs:8,   difficulty:'Beginner',     status:'available',   color:'#00695C', description:'The famous promise stated twice: with every hardship comes ease. Read together with Ad-Duha as one continuous message.' },
  { id:'al-layl',    number:92,  name:'Al-Layl',    arabic:'اللَّيْل',      meaning:'The Night',                 ayahs:21,  difficulty:'Beginner',     status:'available',   color:'#283593', description:'Two paths, two destinies — the generous believer and the miserly denier. Closes with one of the Quran\'s most beautiful promises.' },
  // ── Signs and creation ────────────────────────────────────────────────────
  { id:'ash-shams',  number:91,  name:'Ash-Shams',  arabic:'الشَّمْس',      meaning:'The Sun',                   ayahs:15,  difficulty:'Beginner',     status:'available',   color:'#FF8F00', description:'Seven cosmic oaths — sun, moon, day, night, sky, earth, soul — all to one conclusion: success belongs to those who purify their soul.' },
  { id:'at-tin',     number:95,  name:'At-Tin',     arabic:'التِّين',       meaning:'The Fig',                   ayahs:8,   difficulty:'Beginner',     status:'available',   color:'#558B2F', description:'We created humanity in the finest form — yet reduce it to the lowest. The exception: those who believe and do righteous deeds.' },
  // ── The first revealed ────────────────────────────────────────────────────
  { id:'al-alaq',    number:96,  name:'Al-Alaq',    arabic:'الْعَلَق',      meaning:'The Clinging Clot',         ayahs:19,  difficulty:'Beginner',     status:'available',   color:'#4527A0', description:'The first words ever revealed: Read! In the name of your Lord who created. The origin of the entire Quran.' },
  // ── Longer surahs ─────────────────────────────────────────────────────────
  { id:'al-mulk',    number:67,  name:'Al-Mulk',    arabic:'الملك',         meaning:'The Sovereignty',           ayahs:30,  difficulty:'Beginner',     status:'available',   color:'#5B8FD4', description:'A beloved short surah — the Prophet ﷺ recommended reciting it every night.' },
  { id:'al-waqia',   number:56,  name:'Al-Waqia',   arabic:'الواقعة',       meaning:'The Inevitable Event',      ayahs:96,  difficulty:'Intermediate', status:'available',   color:'#D4A843', description:'A powerful surah about the Day of Judgment and the three destinies of humanity.' },
  { id:'al-rahman',  number:55,  name:'Al-Rahman',  arabic:'الرَّحْمَٰن',  meaning:'The Most Merciful',         ayahs:78,  difficulty:'Intermediate', status:'available',   color:'#E67E22', description:'The surah of divine mercy — asks 31 times which of your Lord\'s blessings you would deny.' },
  // ── Coming soon ───────────────────────────────────────────────────────────
  { id:'yasin',      number:36,  name:'Ya-Sin',     arabic:'يس',            meaning:'Ya Sin',                    ayahs:83,  difficulty:'Intermediate', status: 'available', color:'#9B59B6', description:'Called "the heart of the Quran" — covers resurrection, signs of Allah, and accountability.' },
  { id:'al-kahf',    number:18,  name:'Al-Kahf',    arabic:'الكهف',         meaning:'The Cave',                  ayahs:110, difficulty:'Advanced',     status: 'available', color:'#C0504D', description:'Recited on Fridays — four stories covering trials of faith, wealth, knowledge, and power.' },
]

const DIFF_COLOR = { Beginner:'#4CAF8A', Intermediate:'#D4A843', Advanced:'#C0504D' }

function hexRgb(h) {
  if (!h||h.length<7) return '180,180,180'
  return `${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`
}

function useSurahProgress(surahId) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`quran_progress_${surahId}`)
      if (saved) setCount(Object.values(JSON.parse(saved)).filter(Boolean).length)
    } catch (_) {}
  }, [surahId])
  return count
}

function SurahCard({ s }) {
  const done    = useSurahProgress(s.id)
  const pct     = s.ayahs ? Math.round(done / s.ayahs * 100) : 0
  const started = done > 0

  return (
    <div style={{
      background: s.status==='available' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)',
      border:`1px solid ${s.status==='available' ? `rgba(${hexRgb(s.color)},0.3)` : 'rgba(255,255,255,0.07)'}`,
      borderRadius:12, overflow:'hidden',
      opacity: s.status==='available' ? 1 : 0.55,
    }}>
      {/* Progress bar as top strip */}
      <div style={{ height:3, background:'rgba(255,255,255,0.05)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', left:0, top:0, height:'100%', width: s.status==='available' ? `${pct}%` : '0%', background:s.color, transition:'width 0.4s' }} />
        {s.status!=='available' && <div style={{ position:'absolute', inset:0, background:'#2a2a2a' }} />}
      </div>

      <div style={{ padding:'18px 20px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:28, height:28, borderRadius:'50%', border:`1.5px solid rgba(${hexRgb(s.color)},0.5)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:s.color }}>{s.number}</div>
            <div>
              <div style={{ fontSize:15, color: s.status==='available' ? s.color : '#6a5a40', fontWeight:700 }}>{s.name}</div>
              <div style={{ fontSize:10, color:'#6a5a40' }}>{s.meaning} · {s.ayahs} ayahs</div>
            </div>
          </div>
          <div style={{ fontSize:24, color:'#ddd5c0', fontFamily:'Amiri,serif', lineHeight:1 }}>{s.arabic}</div>
        </div>

        <p style={{ fontSize:12, color:'#7a6a52', lineHeight:1.6, marginBottom:12 }}>{s.description}</p>

        {/* Progress indicator */}
        {s.status==='available' && started && (
          <div style={{ marginBottom:10 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
              <span style={{ fontSize:10, color:'#6a5a40' }}>Progress</span>
              <span style={{ fontSize:10, color:s.color }}>{done}/{s.ayahs} · {pct}%</span>
            </div>
            <div style={{ height:3, background:'rgba(255,255,255,0.06)', borderRadius:2, overflow:'hidden' }}>
              <div style={{ width:`${pct}%`, height:'100%', background:s.color, borderRadius:2 }} />
            </div>
          </div>
        )}

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{ fontSize:10, padding:'3px 8px', borderRadius:10, background:`rgba(${hexRgb(DIFF_COLOR[s.difficulty]||'#888')},0.1)`, color:DIFF_COLOR[s.difficulty]||'#888', border:`1px solid rgba(${hexRgb(DIFF_COLOR[s.difficulty]||'#888')},0.2)` }}>{s.difficulty}</span>
          {s.status === 'available' ? (
            <Link to={`/surah/${s.id}`} style={{ padding:'7px 16px', borderRadius:8, background:`rgba(${hexRgb(s.color)},0.15)`, border:`1px solid rgba(${hexRgb(s.color)},0.4)`, color:s.color, fontSize:12, textDecoration:'none', fontWeight:600 }}>
              {pct===100 ? '✓ Review' : started ? 'Continue →' : 'Start →'}
            </Link>
          ) : (
            <span style={{ fontSize:11, color:'#4a3a28', background:'rgba(255,255,255,0.03)', padding:'5px 10px', borderRadius:6 }}>Coming soon</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function HomePage({ user }) {
  const [showFeedback, setShowFeedback] = useState(false)
  const totalDone = SURAHS.filter(s => s.status==='available').reduce((acc, s) => {
    try {
      const saved = localStorage.getItem(`quran_progress_${s.id}`)
      return acc + (saved ? Object.values(JSON.parse(saved)).filter(Boolean).length : 0)
    } catch { return acc }
  }, 0)
  const totalAyahs = SURAHS.filter(s => s.status==='available').reduce((a,s) => a+s.ayahs, 0)

  return (
    <main style={{ maxWidth:860, margin:'0 auto', padding:'32px 16px' }}>

      {/* Hero */}
      <div style={{ textAlign:'center', marginBottom:36 }}>
        <div style={{ fontSize:44, marginBottom:10, fontFamily:'Amiri,serif', color:'#D4A843' }}>الـقـرآن</div>
        <h1 style={{ fontSize:20, color:'#ddd5c0', fontWeight:700, marginBottom:8, letterSpacing:0.5 }}>Quran Memorization</h1>
        <p style={{ fontSize:13, color:'#7a6a52', maxWidth:480, margin:'0 auto', lineHeight:1.8 }}>
          Learn surah by surah — Arabic · transliteration · audio · progress tracking.<br/>
          Built for new Muslims and non-Arabic speakers.
        </p>
        {totalDone > 0 && (
          <div style={{ marginTop:14, display:'inline-block', background:'rgba(212,168,67,0.08)', border:'1px solid rgba(212,168,67,0.2)', borderRadius:20, padding:'6px 16px', fontSize:12, color:'#D4A843' }}>
            ✦ {totalDone} of {totalAyahs} available ayahs memorized
          </div>
        )}
        {!user && (
          <div style={{ marginTop:10, display:'inline-block', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:8, padding:'8px 16px', fontSize:11, color:'#6a5a40' }}>
            Sign in to sync your progress across devices
          </div>
        )}
      </div>

      {/* Early access banner */}
      <div style={{ marginBottom:28, background:'linear-gradient(135deg,rgba(212,168,67,0.12),rgba(212,168,67,0.04))', border:'1px solid rgba(212,168,67,0.35)', borderRadius:14, padding:'20px 24px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', right:20, top:'50%', transform:'translateY(-50%)', fontSize:64, fontFamily:'Amiri,serif', color:'rgba(212,168,67,0.07)', lineHeight:1, pointerEvents:'none', userSelect:'none' }}>بِسْمِ</div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16, position:'relative' }}>
          <div style={{ display:'flex', alignItems:'flex-start', gap:14 }}>
            <div style={{ width:40, height:40, borderRadius:10, background:'rgba(212,168,67,0.15)', border:'1px solid rgba(212,168,67,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>🌙</div>
            <div>
              <div style={{ fontSize:15, color:'#D4A843', fontWeight:700, marginBottom:4 }}>We're building — and we want your input</div>
              <div style={{ fontSize:12, color:'#8a7a60', lineHeight:1.6 }}>
                More surahs, more languages, more features — all shaped by what learners actually need.<br/>
                <span style={{ color:'#6a5a40' }}>It takes 60 seconds and makes a real difference.</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowFeedback(true)}
            style={{
              padding:'11px 22px', borderRadius:10, border:'1px solid rgba(212,168,67,0.5)',
              background:'#D4A843', color:'#06101c',
              fontSize:13, fontWeight:700, cursor:'pointer', flexShrink:0, whiteSpace:'nowrap',
              boxShadow:'0 4px 16px rgba(212,168,67,0.2)',
            }}>
            Share feedback →
          </button>
        </div>
      </div>

      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}

      {/* Surah grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:14 }}>
        {SURAHS.map(s => <SurahCard key={s.id} s={s} />)}
      </div>

      <div style={{ textAlign:'center', marginTop:36, fontSize:11, color:'#3a2a18', lineHeight:2 }}>
        Audio · Mahmoud Khalil Al-Husary · May Allah make this a means of benefit. آمين
      </div>
    </main>
  )
}
