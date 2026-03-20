// src/components/SurahViewer.jsx
import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

const hexRgb = h => {
  if (!h||h.length<7) return '180,180,180'
  return `${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`
}

const RECITERS = [
  { id: 'Husary_128kbps',               name: 'Al-Husary',   style: 'Clear & slow — best for learners ⭐' },
  { id: 'Alafasy_128kbps',              name: 'Al-Afasy',    style: 'Melodic & popular' },
  { id: 'Abdul_Basit_Murattal_192kbps', name: 'Abdul Basit', style: 'Classical & powerful' },
  { id: 'Minshawi_Murattal_128kbps',    name: 'Al-Minshawi', style: 'Warm & traditional' },
]

// ── Colour-coding helper (used in both main line and syllable cards) ──────────
function wordColor(word) {
  if (/[SDTQH]|kh|gh/.test(word) || word.includes("'")) return '#E6944A'  // orange — hard/ayn
  if (/aa|ee|oo/.test(word)) return '#81d4c0'                               // teal  — long vowel
  return '#D4A843'                                                           // gold  — normal
}

function wordLabel(word) {
  if (word.includes("'"))                         return { text:"⚠ ayn",    color:'#E6944A' }
  if (/[SDTQH]|kh|gh/.test(word))                return { text:"⚠ throat", color:'#C0504D' }
  if (/aa|ee|oo/.test(word))                      return { text:"stretch",  color:'#81d4c0' }
  return null
}

// ── Coloured transliteration line ─────────────────────────────────────────────
function TranslitLine({ tr, fontSize = 14 }) {
  const words = tr.split('  ')
  return (
    <div style={{ fontSize, fontStyle:'italic', letterSpacing:0.4, lineHeight:1.8 }}>
      {words.map((w, i) => (
        <span key={i}>
          <span style={{ color: wordColor(w) }}>{w}</span>
          {i < words.length - 1 && <span style={{ color:'#2a1a08' }}> · </span>}
        </span>
      ))}
    </div>
  )
}

// ── Audio hook ─────────────────────────────────────────────────────────────────
function useAudio(reciterId) {
  const audioRef   = useRef(null)
  const blobRef    = useRef(null)
  const [playing,  setPlaying]  = useState(null)
  const [loading,  setLoading]  = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const a = new Audio()
    audioRef.current = a
    a.oncanplay    = () => setLoading(false)
    a.ontimeupdate = () => { if (a.duration) setProgress(a.currentTime / a.duration * 100) }
    a.onended      = () => { setPlaying(null); setProgress(0) }
    a.onerror      = () => { setLoading(false); setPlaying(null) }
    return () => { a.pause(); a.src = '' }
  }, [])

  const play = useCallback(async (surah, ayah, onEnded) => {
    const a   = audioRef.current
    if (!a) return
    const key = `${surah}-${ayah}`
    const url = `https://everyayah.com/data/${reciterId}/${String(surah).padStart(3,'0')}${String(ayah).padStart(3,'0')}.mp3`
    a.pause()
    if (blobRef.current) { URL.revokeObjectURL(blobRef.current); blobRef.current = null }
    setLoading(true); setPlaying(key); setProgress(0)
    a.onended = () => { setPlaying(null); setProgress(0); onEnded && onEnded() }
    try {
      const res  = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const blob = await res.blob()
      const burl = URL.createObjectURL(blob)
      blobRef.current = burl
      a.src = burl; a.load(); await a.play()
    } catch {
      setLoading(false); setPlaying(null)
    }
  }, [reciterId])

  const stop = useCallback(() => {
    audioRef.current?.pause()
    if (blobRef.current) { URL.revokeObjectURL(blobRef.current); blobRef.current = null }
    setPlaying(null); setProgress(0)
  }, [])

  const toggle = useCallback((surah, ayah) => {
    const key = `${surah}-${ayah}`
    if (playing === key && audioRef.current && !audioRef.current.paused) { stop() }
    else { play(surah, ayah) }
  }, [playing, play, stop])

  return { toggle, play, stop, playing, loading, progress }
}

// ── PRONUNCIATION GUIDE DATA ──────────────────────────────────────────────────
const SOUNDS = [
  { letter:'ا / آ', roman:'aa',  tip:"Long 'a' — like 'father' held longer",             example:'Allaah',      hard:false },
  { letter:'ب',     roman:'b',   tip:"Same as English 'b'",                              example:'bayt',        hard:false },
  { letter:'ت',     roman:'t',   tip:"Same as English 't'",                              example:'tawbah',      hard:false },
  { letter:'ث',     roman:'th',  tip:"Like 'th' in 'think' — not 'the'",               example:'thamarah',    hard:false },
  { letter:'ج',     roman:'j',   tip:"Like 'j' in 'jar'",                               example:'jannah',      hard:false },
  { letter:'ح',     roman:'H',   tip:"⚠ Heavy 'h' — breathe hard from throat, like fogging a mirror", example:'Hameed', hard:true },
  { letter:'خ',     roman:'kh',  tip:"⚠ Like Scottish 'loch' — back of throat",        example:'khayr',       hard:true  },
  { letter:'د',     roman:'d',   tip:"Same as English 'd'",                              example:'deen',        hard:false },
  { letter:'ذ',     roman:'dh',  tip:"Like 'th' in 'the' or 'this'",                   example:'dhikr',       hard:false },
  { letter:'ر',     roman:'r',   tip:"Rolled 'r' — like Spanish or Italian",           example:'rahmah',      hard:false },
  { letter:'ز',     roman:'z',   tip:"Same as English 'z'",                              example:'zakat',       hard:false },
  { letter:'س',     roman:'s',   tip:"Like 's' in 'sun'",                               example:'salaam',      hard:false },
  { letter:'ش',     roman:'sh',  tip:"Like 'sh' in 'shore'",                            example:'shukr',       hard:false },
  { letter:'ص',     roman:'S',   tip:"⚠ Emphatic 's' — tongue flat, deep resonance",   example:'Salah',       hard:true  },
  { letter:'ض',     roman:'D',   tip:"⚠ Unique Arabic letter — heavy 'd', tongue presses molars", example:'Dhaall', hard:true },
  { letter:'ط',     roman:'T',   tip:"⚠ Heavy 't' — deep resonance",                   example:'Tayyib',      hard:true  },
  { letter:'ظ',     roman:'Dh',  tip:"⚠ Heavy 'dh' — emphatic version",               example:'Dhulm',       hard:true  },
  { letter:'ع',     roman:"'",   tip:"⚠ The Ayn — constrict the throat mid-vowel. No English equivalent. Practice: say 'a' and squeeze your throat.", example:"'Asr", hard:true },
  { letter:'غ',     roman:'gh',  tip:"⚠ Like gargling — voiced back-of-throat, like French 'r'", example:'ghayb', hard:true },
  { letter:'ف',     roman:'f',   tip:"Same as English 'f'",                              example:'falah',       hard:false },
  { letter:'ق',     roman:'q',   tip:"⚠ Deep 'k' from the very back of throat (uvula)", example:'Quran',      hard:true  },
  { letter:'ك',     roman:'k',   tip:"Same as English 'k'",                              example:'kitaab',      hard:false },
  { letter:'ل',     roman:'l',   tip:"Like English 'l'",                                 example:'laylah',      hard:false },
  { letter:'م',     roman:'m',   tip:"Same as English 'm'",                              example:'masjid',      hard:false },
  { letter:'ن',     roman:'n',   tip:"Same as English 'n'",                              example:'noor',        hard:false },
  { letter:'و',     roman:'w/oo',tip:"Consonant: 'w'. Vowel: 'oo' like 'moon'",        example:'waaqiah/noor',hard:false },
  { letter:'ه',     roman:'h',   tip:"Soft 'h' — like 'h' in 'hello'",                 example:'huwa',        hard:false },
  { letter:'ء',     roman:"'",   tip:"Glottal stop — like 'uh-oh' mid-word",           example:"as-haab",     hard:true  },
  { letter:'ي',     roman:'y/ee',tip:"Consonant: 'y'. Vowel: 'ee' like 'see'",         example:'yawm/deen',   hard:false },
  { letter:'ّ',     roman:'×2',  tip:"Shadda — doubles the letter, hold it one beat longer", example:"Allāh (ll)",hard:false },
]

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────
export default function SurahViewer({ meta, sections, memorized, onToggle, onMarkSection, syncing, user }) {
  const [tab,          setTab]          = useState('learn')
  const [activeSec,    setActiveSec]    = useState(sections[0]?.id)
  const [practiceMode, setPracticeMode] = useState('show-all')
  const [expandedKey,  setExpandedKey]  = useState(null)
  const [reciterIdx,   setReciterIdx]   = useState(0)
  const [showPicker,   setShowPicker]   = useState(false)
  const [autoPlaying,  setAutoPlaying]  = useState(false)
  const autoIdxRef = useRef(0)

  const reciter = RECITERS[reciterIdx]
  const audio   = useAudio(reciter.id)
  const sec     = sections.find(s => s.id === activeSec) || sections[0]
  const mem     = memorized || {}
  const total   = sections.reduce((a,s) => a + s.verses.length, 0)
  const done    = Object.values(mem).filter(Boolean).length
  const pct     = total ? Math.round(done / total * 100) : 0

  // ── Auto-play logic ──────────────────────────────────────────────────────────
  const startAutoPlay = useCallback(() => {
    autoIdxRef.current = 0
    setAutoPlaying(true)
    const playNext = (idx) => {
      if (idx >= sec.verses.length) { setAutoPlaying(false); return }
      const v = sec.verses[idx]
      audio.play(meta.number, v.n, () => {
        autoIdxRef.current = idx + 1
        playNext(idx + 1)
      })
    }
    playNext(0)
  }, [sec, audio, meta])

  const stopAutoPlay = useCallback(() => {
    setAutoPlaying(false)
    audio.stop()
  }, [audio])

  const TABS = [
    { id:'guide',    icon:'📚', label:'Guide'    },
    { id:'learn',    icon:'📖', label:'Learn'    },
    { id:'practice', icon:'🧠', label:'Practice' },
    { id:'map',      icon:'🗺',  label:'Map'      },
    { id:'progress', icon:'✦',  label:'Progress' },
  ]

  return (
    <div style={{ minHeight:'100vh', fontFamily:"'Lato','Palatino Linotype',Georgia,serif" }}>

      {/* Sub-header */}
      <div style={{ background:'rgba(0,0,0,0.3)', borderBottom:'1px solid rgba(212,168,67,0.15)', padding:'10px 16px' }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
            <Link to="/" style={{ color:'#6a5a40', fontSize:12, textDecoration:'none' }}>← Library</Link>
            <span style={{ color:'#3a2a18' }}>·</span>
            <span style={{ fontSize:14, color:'#D4A843', fontWeight:700 }}>{meta.arabic}</span>
            <span style={{ fontSize:12, color:'#6a5a40' }}>{meta.name} · {meta.ayahs} ayahs</span>
            {syncing && <span style={{ fontSize:10, color:'#4CAF8A', marginLeft:'auto' }}>⟳ Saving…</span>}
            {!user   && <span style={{ fontSize:10, color:'#6a5a40', marginLeft:'auto' }}>Sign in to sync</span>}
          </div>

          {/* Progress bar */}
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
            <div style={{ flex:1, height:3, background:'rgba(255,255,255,0.06)', borderRadius:2, overflow:'hidden' }}>
              <div style={{ width:`${pct}%`, height:'100%', background:'linear-gradient(90deg,#D4A843,#f0c84e)', borderRadius:2, transition:'width 0.4s' }} />
            </div>
            <span style={{ fontSize:11, color:'#D4A843', flexShrink:0 }}>{done}/{total}</span>
          </div>

          {/* Reciter picker */}
          <div style={{ display:'flex', alignItems:'center', gap:8, position:'relative' }}>
            <span style={{ fontSize:10, color:'#6a5a40' }}>🎙</span>
            <button onClick={() => setShowPicker(v => !v)} style={{ padding:'3px 10px', borderRadius:6, border:'1px solid rgba(212,168,67,0.25)', background:'rgba(212,168,67,0.08)', color:'#D4A843', fontSize:11, cursor:'pointer' }}>
              {reciter.name} ▾
            </button>
            {showPicker && (
              <div style={{ position:'absolute', top:'110%', left:20, width:250, zIndex:50, background:'#0c1b30', border:'1px solid rgba(212,168,67,0.2)', borderRadius:10, padding:8 }}>
                {RECITERS.map((r,i) => (
                  <div key={r.id} onClick={() => { setReciterIdx(i); setShowPicker(false); audio.stop(); }} style={{ padding:'7px 10px', borderRadius:7, cursor:'pointer', marginBottom:3, background: i===reciterIdx ? 'rgba(212,168,67,0.12)' : 'transparent', border:`1px solid ${i===reciterIdx ? 'rgba(212,168,67,0.3)' : 'transparent'}` }}>
                    <div style={{ fontSize:12, color: i===reciterIdx ? '#D4A843' : '#ddd5c0' }}>{r.name} {i===reciterIdx ? '✓' : ''}</div>
                    <div style={{ fontSize:10, color:'#6a5a40' }}>{r.style}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Colour legend */}
            <div style={{ marginLeft:'auto', display:'flex', gap:10, alignItems:'center' }}>
              {[['#D4A843','normal'],['#81d4c0','stretch'],['#E6944A','hard']].map(([c,l]) => (
                <div key={l} style={{ display:'flex', alignItems:'center', gap:3 }}>
                  <div style={{ width:8, height:8, borderRadius:2, background:c }} />
                  <span style={{ fontSize:9, color:'#6a5a40' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth:900, margin:'0 auto', display:'flex' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex:1, padding:'10px 4px', border:'none', cursor:'pointer', background: tab===t.id ? 'rgba(212,168,67,0.08)' : 'transparent', color: tab===t.id ? '#D4A843' : '#6a5a40', borderBottom:`2px solid ${tab===t.id ? '#D4A843' : 'transparent'}`, fontSize:12, transition:'all 0.2s' }}>{t.icon} {t.label}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth:900, margin:'0 auto', padding:'20px 12px' }}>

        {/* ── PRONUNCIATION GUIDE TAB ── */}
        {tab === 'guide' && <GuideTab />}

        {/* ── LEARN TAB ── */}
        {tab === 'learn' && (
          <LearnTab
            sections={sections} sec={sec} activeSec={activeSec}
            setActiveSec={id => { setActiveSec(id); setExpandedKey(null); stopAutoPlay(); }}
            memorized={mem} onToggle={onToggle} onMarkSection={onMarkSection}
            audio={audio} meta={meta} expandedKey={expandedKey} setExpandedKey={setExpandedKey}
            autoPlaying={autoPlaying} onStartAutoPlay={startAutoPlay} onStopAutoPlay={stopAutoPlay}
          />
        )}

        {/* ── PRACTICE TAB ── */}
        {tab === 'practice' && (
          <PracticeTab
            sections={sections} sec={sec} activeSec={activeSec}
            setActiveSec={id => { setActiveSec(id); audio.stop(); }}
            memorized={mem} onToggle={onToggle}
            practiceMode={practiceMode} setPracticeMode={setPracticeMode}
            audio={audio} meta={meta}
          />
        )}

        {/* ── MAP TAB ── */}
        {tab === 'map' && (
          <MapTab
            sections={sections}
            memorized={mem}
            meta={meta}
            onSelect={id => { setActiveSec(id); setTab('learn') }}
          />
        )}

        {/* ── PROGRESS TAB ── */}
        {tab === 'progress' && (
          <ProgressTab sections={sections} memorized={mem} onToggle={onToggle} onMarkSection={onMarkSection} meta={meta} />
        )}
      </div>
    </div>
  )
}

// ── GUIDE TAB ──────────────────────────────────────────────────────────────────
function GuideTab() {
  const [hardOnly, setHardOnly] = useState(false)
  return (
    <div>
      {/* Welcome banner */}
      <div style={{ background:'rgba(212,168,67,0.07)', border:'1px solid rgba(212,168,67,0.2)', borderRadius:12, padding:'16px 20px', marginBottom:20 }}>
        <div style={{ fontSize:15, color:'#D4A843', fontWeight:700, marginBottom:6 }}>Welcome, New Learner 🌙</div>
        <div style={{ fontSize:13, color:'#a09070', lineHeight:1.8 }}>
          Arabic has some sounds that don't exist in English — but most are familiar! Only 9 are truly "new" and they're marked <span style={{ color:'#E6944A' }}>⚠ Hard</span>. Use the colour guide to read transliterations:
        </div>
        <div style={{ display:'flex', gap:12, marginTop:10, flexWrap:'wrap' }}>
          {[['#D4A843','Gold','Normal sound — read as written'],['#81d4c0','Teal','Long vowel — stretch 2 beats'],['#E6944A','Orange','Hard sound — needs practice']].map(([c,n,d]) => (
            <div key={n} style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:10, height:10, borderRadius:2, background:c, flexShrink:0 }} />
              <span style={{ fontSize:12, color:'#a09070' }}><strong style={{ color:c }}>{n}:</strong> {d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transliteration key */}
      <div style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:12, padding:'14px 18px', marginBottom:16 }}>
        <div style={{ fontSize:11, color:'#D4A843', letterSpacing:1, marginBottom:12 }}>VOWEL SOUNDS</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:8 }}>
          {[['aa','Long A — like "father"'],['ee','Long E — like "see"'],['oo','Long U — like "moon"'],['a','Short A — like "cat"'],['i','Short I — like "sit"'],['u','Short U — like "put"']].map(([s,d]) => (
            <div key={s} style={{ display:'flex', gap:8, alignItems:'center' }}>
              <code style={{ fontSize:13, color:'#81d4c0', background:'rgba(129,212,192,0.08)', border:'1px solid rgba(129,212,192,0.2)', borderRadius:4, padding:'1px 7px', minWidth:32, textAlign:'center' }}>{s}</code>
              <span style={{ fontSize:12, color:'#6a5a40' }}>{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter toggle */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <div style={{ fontSize:11, color:'#D4A843', letterSpacing:1 }}>ALL ARABIC SOUNDS ({SOUNDS.length})</div>
        <button onClick={() => setHardOnly(v => !v)} style={{ fontSize:11, padding:'4px 12px', border:'1px solid rgba(212,168,67,0.3)', borderRadius:20, background: hardOnly ? 'rgba(212,168,67,0.15)' : 'transparent', color: hardOnly ? '#D4A843' : '#6a5a40', cursor:'pointer' }}>
          {hardOnly ? 'Show all' : '⚠ Hard sounds only'}
        </button>
      </div>

      {/* Sound cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:10 }}>
        {SOUNDS.filter(s => !hardOnly || s.hard).map(s => (
          <div key={s.roman} style={{ background: s.hard ? 'rgba(230,148,74,0.05)' : 'rgba(255,255,255,0.02)', border:`1px solid ${s.hard ? 'rgba(230,148,74,0.2)' : 'rgba(255,255,255,0.06)'}`, borderRadius:10, padding:'12px 14px', display:'flex', gap:12, alignItems:'flex-start' }}>
            <div style={{ width:42, height:42, flexShrink:0, borderRadius:8, background: s.hard ? 'rgba(230,148,74,0.1)' : 'rgba(76,175,138,0.08)', border:`1.5px solid ${s.hard ? '#E6944A' : '#4CAF8A'}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, color: s.hard ? '#E6944A' : '#4CAF8A', fontFamily:'serif' }}>{s.letter}</div>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
                <code style={{ fontSize:14, color:'#D4A843', fontFamily:'monospace' }}>{s.roman}</code>
                {s.hard && <span style={{ fontSize:9, color:'#E6944A', background:'rgba(230,148,74,0.1)', borderRadius:10, padding:'1px 6px' }}>⚠ NEW SOUND</span>}
              </div>
              <div style={{ fontSize:12, color:'#a09070', lineHeight:1.5 }}>{s.tip}</div>
              <div style={{ fontSize:11, color:'#6a5a40', marginTop:3 }}>e.g. <em style={{ color:'#D4A843' }}>{s.example}</em></div>
            </div>
          </div>
        ))}
      </div>

      {/* Tajweed basics */}
      <div style={{ marginTop:20, background:'rgba(91,143,212,0.07)', border:'1px solid rgba(91,143,212,0.2)', borderRadius:12, padding:'16px 20px' }}>
        <div style={{ fontSize:13, color:'#5B8FD4', fontWeight:700, marginBottom:12 }}>📘 Basic Tajweed Rules</div>
        {[
          { rule:'Stretch (Madd)', desc:'When aa, ee, or oo appears — hold that vowel for 2 counts minimum. Shown in teal.' },
          { rule:'Shadda (ّ)',     desc:'Doubles the letter — written as ×2 in transliteration. Hold the sound one beat.' },
          { rule:'Sun Letters',   desc:'"Al-" changes before certain letters — al-Shamsi becomes ash-Shamsi. The l merges.' },
          { rule:'Waqf (pause)',  desc:'Pause slightly at the end of each ayah. Slightly lengthen the final vowel before stopping.' },
        ].map(t => (
          <div key={t.rule} style={{ marginBottom:10, paddingBottom:10, borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize:12, color:'#5B8FD4', marginBottom:3 }}>◆ {t.rule}</div>
            <div style={{ fontSize:12, color:'#a09070' }}>{t.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── LEARN TAB ─────────────────────────────────────────────────────────────────
function LearnTab({ sections, sec, activeSec, setActiveSec, memorized, onToggle, onMarkSection, audio, meta, expandedKey, setExpandedKey, autoPlaying, onStartAutoPlay, onStopAutoPlay }) {
  const mem = memorized || {}
  const sectionDone = sec.verses.every(v => mem[`${sec.id}-${v.n}`])

  return (
    <div>
      {/* Section chips */}
      <div style={{ display:'flex', gap:6, overflowX:'auto', paddingBottom:8, marginBottom:14 }}>
        {sections.map(s => (
          <button key={s.id} onClick={() => setActiveSec(s.id)} style={{ flexShrink:0, padding:'5px 12px', border:`1.5px solid ${activeSec===s.id ? s.color : 'rgba(255,255,255,0.08)'}`, borderRadius:20, background: activeSec===s.id ? `rgba(${hexRgb(s.color)},0.15)` : 'transparent', color: activeSec===s.id ? s.color : '#6a5a40', fontSize:11, cursor:'pointer', whiteSpace:'nowrap' }}>{s.icon} {s.label}</button>
        ))}
      </div>

      {/* Section header */}
      <div style={{ background:`rgba(${hexRgb(sec.color)},0.07)`, border:`1px solid rgba(${hexRgb(sec.color)},0.2)`, borderRadius:12, padding:'14px 16px', marginBottom:14 }}>
        <div style={{ display:'flex', justifyContent:'space-between', gap:12 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:16, color:sec.color, fontWeight:700 }}>{sec.icon} {sec.label} <span style={{ fontSize:11, color:'#6a5a40', fontWeight:400 }}>· Ayahs {sec.ayahs}</span></div>
            <div style={{ fontSize:12, color:'#a09070', marginTop:4, lineHeight:1.6 }}>{sec.summary}</div>
            <div style={{ marginTop:8, fontSize:11, color:'#6a5a40', background:'rgba(0,0,0,0.2)', borderRadius:6, padding:'6px 10px' }}><span style={{ color:sec.color }}>💡 </span>{sec.memTip}</div>
          </div>
          <div style={{ fontSize:22, fontFamily:'Amiri,serif', color:'#ddd5c0', lineHeight:1.6, textAlign:'right' }}>{sec.arabic}</div>
        </div>
        <div style={{ display:'flex', gap:8, marginTop:10, flexWrap:'wrap' }}>
          <button onClick={() => onMarkSection(sec.verses.map(v => `${sec.id}-${v.n}`), !sectionDone)} style={{ padding:'5px 14px', fontSize:11, border:`1px solid ${sectionDone ? '#4CAF8A' : `rgba(${hexRgb(sec.color)},0.4)`}`, borderRadius:20, background:'transparent', color: sectionDone ? '#4CAF8A' : sec.color, cursor:'pointer' }}>
            {sectionDone ? '✓ Section complete' : `Mark all ${sec.verses.length} done`}
          </button>
          {/* Auto-play button */}
          <button onClick={autoPlaying ? onStopAutoPlay : onStartAutoPlay} style={{ padding:'5px 14px', fontSize:11, border:`1px solid ${autoPlaying ? '#C0504D' : 'rgba(212,168,67,0.3)'}`, borderRadius:20, background: autoPlaying ? 'rgba(192,80,77,0.1)' : 'rgba(212,168,67,0.08)', color: autoPlaying ? '#C0504D' : '#D4A843', cursor:'pointer' }}>
            {autoPlaying ? '⏹ Stop auto-play' : '▶▶ Auto-play section'}
          </button>
        </div>
      </div>

      {/* Verses */}
      {sec.verses.map(v => {
        const key     = `${sec.id}-${v.n}`
        const isMem   = mem[key]
        const isExp   = expandedKey === key
        const playKey = `${meta.number}-${v.n}`
        const isPlay  = audio.playing === playKey

        return (
          <div key={key} style={{ background: isMem ? 'rgba(76,175,138,0.04)' : 'rgba(255,255,255,0.02)', border:`1px solid ${isMem ? 'rgba(76,175,138,0.2)' : isPlay ? `rgba(${hexRgb(sec.color)},0.4)` : isExp ? `rgba(${hexRgb(sec.color)},0.2)` : 'rgba(255,255,255,0.06)'}`, borderRadius:10, marginBottom:10, overflow:'hidden', transition:'border-color 0.2s' }}>
            <div style={{ padding:'12px 14px' }}>
              <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                <div style={{ width:28, height:28, flexShrink:0, borderRadius:'50%', border:`1.5px solid rgba(${hexRgb(sec.color)},0.4)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:sec.color, marginTop:6 }}>{v.n}</div>
                <div style={{ flex:1 }}>
                  <div dir="rtl" style={{ fontSize:26, color:'#f5ecd8', fontFamily:'Amiri,serif', lineHeight:2, textAlign:'right', marginBottom:4 }}>{v.ar}</div>
                  <TranslitLine tr={v.tr} />
                  <div style={{ fontSize:13, color:'#7a6a52', lineHeight:1.5, marginTop:4 }}>{v.en}</div>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:5, alignItems:'center', flexShrink:0 }}>
                  <button onClick={() => audio.toggle(meta.number, v.n)} style={{ width:34, height:34, borderRadius:'50%', border:'none', cursor:'pointer', background: isPlay ? '#D4A843' : 'rgba(212,168,67,0.12)', color: isPlay ? '#06101c' : '#D4A843', fontSize:13, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    {audio.loading && isPlay ? '⏳' : isPlay ? '⏹' : '▶'}
                  </button>
                  <button onClick={() => onToggle(key)} style={{ width:28, height:28, borderRadius:'50%', border:`1.5px solid ${isMem ? '#4CAF8A' : 'rgba(255,255,255,0.12)'}`, background: isMem ? 'rgba(76,175,138,0.2)' : 'transparent', color: isMem ? '#4CAF8A' : '#4a3a28', fontSize:12, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>{isMem ? '✓' : '○'}</button>
                  <button onClick={() => setExpandedKey(isExp ? null : key)} style={{ background:'transparent', border:'none', cursor:'pointer', color:'#4a3a28', fontSize:10 }}>{isExp ? '▲' : '▼'}</button>
                </div>
              </div>
              {isPlay && (
                <div style={{ marginTop:6, paddingLeft:38, height:2, background:'rgba(255,255,255,0.05)', borderRadius:2, overflow:'hidden' }}>
                  <div style={{ width:`${audio.progress}%`, height:'100%', background:'#D4A843', borderRadius:2, transition:'width 0.1s' }} />
                </div>
              )}
            </div>

            {/* Expanded syllable breakdown */}
            {isExp && (
              <div style={{ borderTop:`1px solid rgba(${hexRgb(sec.color)},0.12)`, padding:'12px 14px', background:'rgba(0,0,0,0.25)' }}>
                <div style={{ fontSize:10, color:sec.color, letterSpacing:1, marginBottom:10 }}>SYLLABLE BREAKDOWN</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:10 }}>
                  {v.tr.split('  ').filter(w => w.trim()).map((word, i) => {
                    const lbl = wordLabel(word)
                    return (
                      <div key={i} style={{ background:`rgba(${hexRgb(wordColor(word))},0.08)`, border:`1px solid rgba(${hexRgb(wordColor(word))},0.25)`, borderRadius:6, padding:'4px 9px' }}>
                        <div style={{ fontSize:12, color: wordColor(word), fontFamily:'monospace' }}>{word}</div>
                        {lbl && <div style={{ fontSize:9, color: lbl.color }}>{lbl.text}</div>}
                      </div>
                    )
                  })}
                </div>
                <div style={{ fontSize:10, color:'#5a4a32', padding:'7px 10px', background:'rgba(212,168,67,0.04)', borderRadius:6 }}>
                  🔁 <span style={{ color:'#D4A843' }}>Method:</span> Listen ▶ → follow transliteration → cover → try alone → 3 rounds.
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── PRACTICE TAB ──────────────────────────────────────────────────────────────
function PracticeTab({ sections, sec, activeSec, setActiveSec, memorized, onToggle, practiceMode, setPracticeMode, audio, meta }) {
  const mem = memorized || {}
  return (
    <div>
      <div style={{ background:'rgba(155,89,182,0.07)', border:'1px solid rgba(155,89,182,0.2)', borderRadius:12, padding:'14px 16px', marginBottom:14 }}>
        <div style={{ fontSize:13, color:'#9B59B6', fontWeight:700, marginBottom:8 }}>🧠 Practice Mode</div>
        <div style={{ fontSize:11, color:'#a09070', marginBottom:10 }}>Hide a layer and test your memory. Tap the covered area to reveal it.</div>
        <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
          {[{id:'show-all',label:'👁 Show All'},{id:'hide-tr',label:'Hide Transliteration'},{id:'hide-ar',label:'Hide Arabic'},{id:'hide-en',label:'Hide Translation'}].map(m => (
            <button key={m.id} onClick={() => setPracticeMode(m.id)} style={{ fontSize:11, padding:'5px 12px', borderRadius:20, border:'none', cursor:'pointer', background: practiceMode===m.id ? '#9B59B6' : 'rgba(255,255,255,0.04)', color: practiceMode===m.id ? 'white' : '#6a5a40' }}>{m.label}</button>
          ))}
        </div>
      </div>
      <div style={{ display:'flex', gap:6, overflowX:'auto', paddingBottom:8, marginBottom:12 }}>
        {sections.map(s => (
          <button key={s.id} onClick={() => setActiveSec(s.id)} style={{ flexShrink:0, fontSize:10, padding:'4px 10px', borderRadius:20, border:'none', cursor:'pointer', background: activeSec===s.id ? `rgba(${hexRgb(s.color)},0.18)` : 'rgba(255,255,255,0.04)', color: activeSec===s.id ? s.color : '#6a5a40', whiteSpace:'nowrap' }}>{s.icon} {s.label.split(' ').slice(0,2).join(' ')}</button>
        ))}
      </div>
      {sec.verses.map(v => {
        const key    = `${sec.id}-${v.n}`
        const isPlay = audio.playing === `${meta.number}-${v.n}`
        return <PracticeCard key={key} v={v} sec={sec} mode={practiceMode} isMem={mem[key]} onToggle={() => onToggle(key)} onPlay={() => audio.toggle(meta.number, v.n)} isPlaying={isPlay} audioLoading={audio.loading && isPlay} />
      })}
    </div>
  )
}

function PracticeCard({ v, sec, mode, isMem, onToggle, onPlay, isPlaying, audioLoading }) {
  const [revAr, setRevAr] = useState(false)
  const [revTr, setRevTr] = useState(false)
  const [revEn, setRevEn] = useState(false)
  const Mask = ({ hidden, onReveal, children }) => hidden
    ? <div onClick={onReveal} style={{ background:'rgba(255,255,255,0.03)', border:'1px dashed rgba(255,255,255,0.1)', borderRadius:6, padding:'7px 12px', cursor:'pointer', color:'#4a3a28', fontSize:10, letterSpacing:1, textAlign:'center' }}>TAP TO REVEAL ▸</div>
    : <>{children}</>
  return (
    <div style={{ background: isMem ? 'rgba(76,175,138,0.04)' : 'rgba(255,255,255,0.02)', border:`1px solid ${isMem ? 'rgba(76,175,138,0.2)' : 'rgba(255,255,255,0.06)'}`, borderRadius:10, padding:'12px 14px', marginBottom:10 }}>
      <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
        <div style={{ width:26, height:26, flexShrink:0, borderRadius:'50%', border:`1.5px solid rgba(${hexRgb(sec.color)},0.4)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:sec.color }}>{v.n}</div>
        <div style={{ flex:1, display:'flex', flexDirection:'column', gap:5 }}>
          <Mask hidden={mode==='hide-ar'&&!revAr} onReveal={() => setRevAr(true)}>
            <div dir="rtl" style={{ fontSize:22, color:'#f5ecd8', fontFamily:'Amiri,serif', lineHeight:2, textAlign:'right' }}>{v.ar}</div>
          </Mask>
          <Mask hidden={mode==='hide-tr'&&!revTr} onReveal={() => setRevTr(true)}>
            <TranslitLine tr={v.tr} fontSize={13} />
          </Mask>
          <Mask hidden={mode==='hide-en'&&!revEn} onReveal={() => setRevEn(true)}>
            <div style={{ fontSize:12, color:'#7a6a52' }}>{v.en}</div>
          </Mask>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:5, alignItems:'center', flexShrink:0 }}>
          <button onClick={onPlay} style={{ width:30, height:30, borderRadius:'50%', border:'none', cursor:'pointer', background: isPlaying ? '#D4A843' : 'rgba(212,168,67,0.1)', color: isPlaying ? '#06101c' : '#D4A843', fontSize:12, display:'flex', alignItems:'center', justifyContent:'center' }}>
            {audioLoading ? '⏳' : isPlaying ? '⏹' : '▶'}
          </button>
          <button onClick={onToggle} style={{ width:26, height:26, borderRadius:'50%', border:`1.5px solid ${isMem ? '#4CAF8A' : 'rgba(255,255,255,0.1)'}`, background: isMem ? 'rgba(76,175,138,0.2)' : 'transparent', color: isMem ? '#4CAF8A' : '#4a3a28', fontSize:11, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>{isMem ? '✓' : '○'}</button>
        </div>
      </div>
    </div>
  )
}

// ── MAP TAB ───────────────────────────────────────────────────────────────────
function MapTab({ sections, memorized, meta, onSelect }) {
  const mem = memorized || {}
  const [root, ...rest] = sections
  return (
    <div>
      <div style={{ textAlign:'center', marginBottom:20 }}>
        <div style={{ fontSize:11, color:'#6a5a40', letterSpacing:2, marginBottom:4 }}>STRUCTURAL OVERVIEW</div>
        <div style={{ fontSize:18, color:'#D4A843' }}>{meta.arabic} · {meta.ayahs} Ayahs</div>
      </div>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div style={{ background:'rgba(212,168,67,0.1)', border:'2px solid #D4A843', borderRadius:12, padding:'12px 28px', textAlign:'center' }}>
          <div style={{ fontSize:20, color:'#D4A843' }}>{root.arabic}</div>
          <div style={{ fontSize:11, color:'#6a5a40', marginTop:2 }}>{root.label} · {root.ayahs}</div>
        </div>
        <div style={{ width:2, height:16, background:'rgba(212,168,67,0.25)' }} />
        <div style={{ display:'grid', gridTemplateColumns:`repeat(${Math.min(rest.length, 3)}, 1fr)`, gap:10, width:'100%' }}>
          {rest.map(s => <MapNode key={s.id} sec={s} memorized={mem} onSelect={onSelect} />)}
        </div>
      </div>
    </div>
  )
}

function MapNode({ sec, memorized, onSelect, compact }) {
  const mem  = memorized || {}
  const done = sec.verses.filter(v => mem[`${sec.id}-${v.n}`]).length
  const pct  = Math.round(done / sec.verses.length * 100)
  return (
    <div onClick={() => onSelect(sec.id)} style={{ background:`rgba(${hexRgb(sec.color)},0.08)`, border:`1.5px solid rgba(${hexRgb(sec.color)},${pct===100?0.6:0.25})`, borderRadius:10, padding: compact ? '8px 10px' : '12px 14px', cursor:'pointer', transition:'all 0.2s' }}>
      <div style={{ fontSize: compact ? 12 : 13, color:sec.color, fontWeight:700, marginBottom:2 }}>{sec.icon} {sec.label}</div>
      <div style={{ fontSize:10, color:'#6a5a40', marginBottom:4 }}>{sec.arabic} · {sec.ayahs}</div>
      <div style={{ height:3, background:'rgba(255,255,255,0.05)', borderRadius:2, overflow:'hidden' }}>
        <div style={{ width:`${pct}%`, height:'100%', background:sec.color, borderRadius:2 }} />
      </div>
      <div style={{ fontSize:9, color:sec.color, marginTop:3 }}>{done}/{sec.verses.length}</div>
    </div>
  )
}

// ── PROGRESS TAB ──────────────────────────────────────────────────────────────
function ProgressTab({ sections, memorized, onToggle, onMarkSection, meta }) {
  const mem   = memorized || {}
  const total = sections.reduce((a,s) => a + s.verses.length, 0)
  const done  = Object.values(mem).filter(Boolean).length
  const pct   = total ? Math.round(done/total*100) : 0

  return (
    <div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:20 }}>
        {[{l:'Total',v:total,c:'#D4A843'},{l:'Done',v:done,c:'#4CAF8A'},{l:'Left',v:total-done,c:'#C0504D'},{l:'%',v:`${pct}%`,c:'#5B8FD4'}].map(s => (
          <div key={s.l} style={{ textAlign:'center', padding:'14px 8px', background:`rgba(${hexRgb(s.c)},0.07)`, border:`1px solid rgba(${hexRgb(s.c)},0.2)`, borderRadius:10 }}>
            <div style={{ fontSize:22, fontWeight:700, color:s.c }}>{s.v}</div>
            <div style={{ fontSize:10, color:'#6a5a40', marginTop:2 }}>{s.l}</div>
          </div>
        ))}
      </div>
      {sections.map(s => {
        const secDone = s.verses.filter(v => mem[`${s.id}-${v.n}`]).length
        const secPct  = Math.round(secDone/s.verses.length*100)
        const allDone = secDone === s.verses.length
        return (
          <div key={s.id} style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:10, padding:'12px 14px', marginBottom:10 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
              <span style={{ color:s.color, fontWeight:600, fontSize:13 }}>{s.icon} {s.label}</span>
              <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                <span style={{ fontSize:12, color: allDone ? '#4CAF8A' : s.color }}>{secDone}/{s.verses.length} {allDone ? '✓' : ''}</span>
                <button onClick={() => onMarkSection(s.verses.map(v => `${s.id}-${v.n}`), !allDone)} style={{ fontSize:10, padding:'3px 8px', borderRadius:10, border:`1px solid ${allDone ? '#4CAF8A' : `rgba(${hexRgb(s.color)},0.4)`}`, background:'transparent', color: allDone ? '#4CAF8A' : s.color, cursor:'pointer' }}>{allDone ? 'Unmark' : 'Mark all'}</button>
              </div>
            </div>
            <div style={{ height:4, background:'rgba(255,255,255,0.05)', borderRadius:2, overflow:'hidden', marginBottom:8 }}>
              <div style={{ width:`${secPct}%`, height:'100%', background:s.color, borderRadius:2, transition:'width 0.4s' }} />
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:3 }}>
              {s.verses.map(v => {
                const k = `${s.id}-${v.n}`
                return <div key={v.n} onClick={() => onToggle(k)} title={`Ayah ${v.n}`} style={{ width:18, height:18, borderRadius:3, cursor:'pointer', background: mem[k] ? s.color : 'rgba(255,255,255,0.04)', border:`1px solid ${mem[k] ? s.color : 'rgba(255,255,255,0.08)'}`, transition:'all 0.15s', display:'flex', alignItems:'center', justifyContent:'center', fontSize:7, color: mem[k] ? '#06101c' : 'transparent' }}>✓</div>
              })}
            </div>
          </div>
        )
      })}
      {done === total && (
        <div style={{ textAlign:'center', padding:'28px', background:'rgba(212,168,67,0.08)', border:'1px solid rgba(212,168,67,0.3)', borderRadius:14, marginTop:10 }}>
          <div style={{ fontSize:32, marginBottom:8 }}>✦</div>
          <div style={{ fontSize:20, color:'#D4A843', fontWeight:700 }}>Masha'Allah! Alhamdulillah!</div>
          <div style={{ fontSize:13, color:'#a09070', marginTop:4 }}>You have completed {meta.arabic}</div>
          <div style={{ fontSize:11, color:'#6a5a40', marginTop:4 }}>May Allah bless your recitation. آمين</div>
        </div>
      )}
    </div>
  )
}
