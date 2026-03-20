import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SURAH_56 } from '../data/surah56'
import { useProgress } from '../hooks/useProgress'
import { useAudio, RECITERS } from '../hooks/useAudio'
import VerseCard from '../components/VerseCard'

const SURAH_DATA = { 56: SURAH_56 }

const TABS = [
  { id:'learn',    icon:'📖', label:'Learn' },
  { id:'practice', icon:'🧠', label:'Practice' },
  { id:'map',      icon:'🗺', label:'Map' },
  { id:'progress', icon:'✦', label:'Progress' },
]

const hexRgb = h => `${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`

export default function SurahView() {
  const { number }           = useParams()
  const surah                = SURAH_DATA[Number(number)]
  const { progress, toggleAyah, syncing } = useProgress()
  const audio                = useAudio()

  const [tab, setTab]               = useState('learn')
  const [activeSec, setActiveSec]   = useState(surah?.sections[0]?.id || '')
  const [expanded, setExpanded]     = useState(null)
  const [practiceMode, setPracticeMode] = useState('show-all')
  const [showReciterPicker, setShowReciterPicker] = useState(false)

  if (!surah) return (
    <div style={{ textAlign:'center', padding:60 }}>
      <div style={{ color:'var(--text-dim)', marginBottom:16 }}>Surah not found or coming soon.</div>
      <Link to="/"><button className="btn btn-outline">← Back home</button></Link>
    </div>
  )

  const sec = surah.sections.find(s => s.id === activeSec) || surah.sections[0]
  const totalAyahs     = surah.sections.reduce((a,s) => a + s.verses.length, 0)
  const memorizedCount = surah.sections.reduce((a,s) =>
    a + s.verses.filter(v => progress[`${s.id}-${v.n}`]).length, 0)
  const pctDone = Math.round(memorizedCount / totalAyahs * 100)

  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:'calc(100vh - 62px)' }}>

      {/* Surah header bar */}
      <div style={{
        background:'#0a1828', borderBottom:'1px solid var(--gold-border)',
        padding:'12px 16px',
        position:'sticky', top:62, zIndex:90,
      }}>
        <div style={{ maxWidth:920, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:10 }}>
            <Link to="/" style={{ color:'var(--text-muted)', fontSize:12 }}>← Home</Link>
            <div style={{ display:'flex', alignItems:'center', gap:10, flex:1 }}>
              <div style={{ fontSize:22, color:'var(--gold)', fontFamily:'var(--font-arabic)' }}>{surah.arabic}</div>
              <div>
                <div style={{ fontSize:14, color:'var(--text)', fontWeight:600 }}>{surah.name}</div>
                <div style={{ fontSize:11, color:'var(--text-muted)' }}>{surah.meaning} · {surah.ayahs} ayahs</div>
              </div>
            </div>
            {/* Reciter picker */}
            <div style={{ position:'relative' }}>
              <button onClick={() => setShowReciterPicker(v=>!v)} style={{
                background:'rgba(255,255,255,0.04)', border:'1px solid var(--gold-border)',
                borderRadius:8, padding:'5px 10px', color:'var(--gold)', fontSize:11, cursor:'pointer',
                textAlign:'right',
              }}>
                🎙 {audio.reciter.name.split(' ').slice(1,3).join(' ')}<br/>
                <span style={{ color:'var(--text-muted)', fontSize:9 }}>tap to change</span>
              </button>
              {showReciterPicker && (
                <div style={{
                  position:'absolute', right:0, top:'calc(100%+6px)', minWidth:240,
                  background:'#0c1b30', border:'1px solid var(--border)', borderRadius:10,
                  padding:8, zIndex:200,
                }}>
                  {RECITERS.map((r,i) => (
                    <div key={r.id} onClick={() => { audio.changeReciter(i); setShowReciterPicker(false) }}
                      style={{
                        padding:'8px 10px', borderRadius:7, cursor:'pointer',
                        background: i===audio.reciterIdx ? 'var(--gold-dim)' : 'transparent',
                        border:`1px solid ${i===audio.reciterIdx ? 'var(--gold-border)' : 'transparent'}`,
                        marginBottom:4,
                      }}>
                      <div style={{ fontSize:13, color: i===audio.reciterIdx ? 'var(--gold)' : 'var(--text)' }}>{r.name}</div>
                      <div style={{ fontSize:10, color:'var(--text-muted)' }}>{r.style}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ textAlign:'right', flexShrink:0 }}>
              <div style={{ fontSize:16, fontWeight:700, color:'var(--gold)' }}>{pctDone}%</div>
              <div style={{ width:80, height:3, background:'rgba(255,255,255,0.06)', borderRadius:2, overflow:'hidden', marginTop:3 }}>
                <div style={{ width:`${pctDone}%`, height:'100%', background:'var(--gold)', borderRadius:2, transition:'width 0.4s' }}/>
              </div>
              {syncing && <div style={{ fontSize:9, color:'var(--text-muted)' }}>saving…</div>}
            </div>
          </div>

          {/* Tab bar */}
          <div style={{ display:'flex' }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                flex:1, padding:'8px 4px', border:'none', cursor:'pointer',
                background: tab===t.id ? 'rgba(212,168,67,0.08)' : 'transparent',
                color: tab===t.id ? 'var(--gold)' : 'var(--text-muted)',
                borderBottom:`2px solid ${tab===t.id ? 'var(--gold)' : 'transparent'}`,
                fontSize:12, transition:'all 0.2s',
              }}>{t.icon} {t.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex:1, maxWidth:920, margin:'0 auto', width:'100%', padding:'20px 12px' }}>

        {/* ── LEARN ── */}
        {tab === 'learn' && (
          <div>
            {/* Section chips */}
            <div style={{ display:'flex', gap:6, overflowX:'auto', paddingBottom:8, marginBottom:16 }}>
              {surah.sections.map(s => (
                <button key={s.id} onClick={() => { setActiveSec(s.id); setExpanded(null) }} style={{
                  flexShrink:0, padding:'5px 12px',
                  border:`1.5px solid ${activeSec===s.id ? s.color : 'var(--border)'}`,
                  borderRadius:20, cursor:'pointer', fontSize:11,
                  background: activeSec===s.id ? `rgba(${hexRgb(s.color)},0.15)` : 'transparent',
                  color: activeSec===s.id ? s.color : 'var(--text-dim)', transition:'all 0.2s',
                }}>{s.icon} {s.label}</button>
              ))}
            </div>

            {/* Section header */}
            <div style={{
              background:`rgba(${hexRgb(sec.color)},0.07)`,
              border:`1px solid rgba(${hexRgb(sec.color)},0.2)`,
              borderRadius:12, padding:'14px 16px', marginBottom:14,
            }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12 }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:16, color:sec.color, fontWeight:700 }}>
                    {sec.icon} {sec.label}
                    <span style={{ fontSize:11, color:'var(--text-muted)', fontWeight:400, marginLeft:8 }}>
                      · Ayahs {sec.ayahs}
                    </span>
                  </div>
                  <div style={{ fontSize:12, color:'var(--text-dim)', marginTop:4, lineHeight:1.6 }}>{sec.summary}</div>
                  <div style={{ marginTop:8, fontSize:11, color:'var(--text-muted)', background:'rgba(0,0,0,0.2)', borderRadius:6, padding:'6px 10px' }}>
                    <span style={{ color:sec.color }}>💡 </span>{sec.memTip}
                  </div>
                </div>
                <div style={{ fontSize:22, fontFamily:'var(--font-arabic)', color:'var(--text)', lineHeight:1.6 }}>{sec.arabic}</div>
              </div>
            </div>

            {/* Verses */}
            {sec.verses.map(v => {
              const key = `${sec.id}-${v.n}`
              const playKey = `${surah.number}-${v.n}`
              return (
                <VerseCard key={key}
                  verse={v} section={sec} progressKey={key}
                  isMem={!!progress[key]} onToggleMem={() => toggleAyah(key)}
                  isPlaying={audio.playingKey === playKey}
                  audioLoading={audio.loading && audio.playingKey === playKey}
                  onPlay={() => audio.toggle(surah.number, v.n)}
                  isExpanded={expanded === key}
                  onToggleExpand={() => setExpanded(expanded === key ? null : key)}
                />
              )
            })}
          </div>
        )}

        {/* ── PRACTICE ── */}
        {tab === 'practice' && (
          <div>
            <div className="card" style={{ marginBottom:14, borderColor:'rgba(155,89,182,0.25)', background:'rgba(155,89,182,0.07)' }}>
              <div style={{ fontSize:13, color:'var(--purple)', fontWeight:700, marginBottom:8 }}>🧠 Practice Mode</div>
              <div style={{ fontSize:11, color:'var(--text-dim)', marginBottom:10 }}>
                Hide one layer to test your memory. Tap a covered line to reveal it.
              </div>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                {[
                  { id:'show-all', label:'👁 Show All' },
                  { id:'hide-tr',  label:'Hide Transliteration' },
                  { id:'hide-ar',  label:'Hide Arabic' },
                  { id:'hide-en',  label:'Hide Translation' },
                ].map(m => (
                  <button key={m.id} onClick={() => setPracticeMode(m.id)} style={{
                    fontSize:11, padding:'5px 12px', borderRadius:20, border:'none', cursor:'pointer',
                    background: practiceMode===m.id ? 'var(--purple)' : 'rgba(255,255,255,0.05)',
                    color: practiceMode===m.id ? 'white' : 'var(--text-muted)', transition:'all 0.2s',
                  }}>{m.label}</button>
                ))}
              </div>
            </div>

            <div style={{ display:'flex', gap:6, overflowX:'auto', paddingBottom:8, marginBottom:14 }}>
              {surah.sections.map(s => (
                <button key={s.id} onClick={() => setActiveSec(s.id)} style={{
                  flexShrink:0, fontSize:10, padding:'4px 10px', borderRadius:20, border:'none', cursor:'pointer',
                  background: activeSec===s.id ? `rgba(${hexRgb(s.color)},0.18)` : 'rgba(255,255,255,0.04)',
                  color: activeSec===s.id ? s.color : 'var(--text-muted)',
                }}>{s.icon} {s.label.split(' ').slice(0,2).join(' ')}</button>
              ))}
            </div>

            {sec.verses.map(v => {
              const key = `${sec.id}-${v.n}`
              const playKey = `${surah.number}-${v.n}`
              return (
                <VerseCard key={key}
                  verse={v} section={sec} progressKey={key}
                  isMem={!!progress[key]} onToggleMem={() => toggleAyah(key)}
                  isPlaying={audio.playingKey === playKey}
                  audioLoading={audio.loading && audio.playingKey === playKey}
                  onPlay={() => audio.toggle(surah.number, v.n)}
                  practiceMode={practiceMode}
                />
              )
            })}
          </div>
        )}

        {/* ── MAP ── */}
        {tab === 'map' && (
          <div>
            <div style={{ textAlign:'center', marginBottom:20 }}>
              <div style={{ fontSize:11, color:'var(--text-muted)', letterSpacing:2, marginBottom:6 }}>STRUCTURAL OVERVIEW</div>
              <div style={{ fontSize:20, color:'var(--gold)' }}>{surah.arabic} · {surah.ayahs} Ayahs · {surah.sections.length} Sections</div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
              {/* Root */}
              <div style={{ background:'var(--gold-dim)', border:'2px solid var(--gold)', borderRadius:14, padding:'12px 28px', textAlign:'center' }}>
                <div style={{ fontSize:20, color:'var(--gold)' }}>{surah.arabic}</div>
                <div style={{ fontSize:11, color:'var(--text-muted)' }}>{surah.theme}</div>
              </div>
              <div style={{ width:2, height:20, background:'var(--gold-border)' }}/>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, width:'100%' }}>
                {[
                  [surah.sections[1]],
                  surah.sections.slice(4),
                  [surah.sections[2], surah.sections[3]],
                ].map((group, gi) => (
                  <div key={gi} style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {group.map(s => {
                      const done = s.verses.filter(v => progress[`${s.id}-${v.n}`]).length
                      const pct = Math.round(done/s.verses.length*100)
                      return (
                        <div key={s.id} onClick={() => { setActiveSec(s.id); setTab('learn') }}
                          style={{
                            background:`rgba(${hexRgb(s.color)},0.08)`,
                            border:`1.5px solid rgba(${hexRgb(s.color)},${pct===100?0.7:0.3})`,
                            borderRadius:10, padding:'10px 12px', cursor:'pointer', transition:'all 0.2s',
                          }}>
                          <div style={{ fontSize:13, color:s.color, fontWeight:700 }}>{s.icon} {s.label}</div>
                          <div style={{ fontSize:10, color:'var(--text-muted)', marginBottom:6 }}>{s.arabic} · {s.ayahs}</div>
                          <div style={{ height:3, background:'rgba(255,255,255,0.05)', borderRadius:2, overflow:'hidden' }}>
                            <div style={{ width:`${pct}%`, height:'100%', background:s.color, borderRadius:2 }}/>
                          </div>
                          <div style={{ fontSize:9, color:s.color, marginTop:3 }}>{done}/{s.verses.length}</div>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ marginTop:20 }}>
              <div style={{ fontSize:10, color:'var(--text-muted)', letterSpacing:1, marginBottom:10 }}>SECTION SUMMARIES</div>
              {surah.sections.map(s => (
                <div key={s.id} style={{ marginBottom:8, paddingBottom:8, borderBottom:'1px solid var(--border)' }}>
                  <span style={{ color:s.color }}>{s.icon} {s.label} ({s.ayahs}): </span>
                  <span style={{ fontSize:12, color:'var(--text-dim)' }}>{s.summary}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PROGRESS ── */}
        {tab === 'progress' && (
          <div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:20 }}>
              {[
                { l:'Total', v:totalAyahs, c:'var(--gold)' },
                { l:'Done',  v:memorizedCount, c:'var(--green)' },
                { l:'Left',  v:totalAyahs-memorizedCount, c:'var(--red)' },
                { l:'%',     v:`${pctDone}%`, c:'var(--blue)' },
              ].map(s => (
                <div key={s.l} className="card" style={{ textAlign:'center', padding:'14px 8px' }}>
                  <div style={{ fontSize:22, fontWeight:700, color:s.c }}>{s.v}</div>
                  <div style={{ fontSize:10, color:'var(--text-muted)' }}>{s.l}</div>
                </div>
              ))}
            </div>

            {surah.sections.map(s => {
              const done = s.verses.filter(v => progress[`${s.id}-${v.n}`]).length
              const pct = Math.round(done/s.verses.length*100)
              return (
                <div key={s.id} className="card" style={{ marginBottom:10 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                    <span style={{ color:s.color, fontWeight:600, fontSize:13 }}>{s.icon} {s.label}</span>
                    <span style={{ fontSize:12, color: pct===100 ? 'var(--green)' : s.color }}>
                      {done}/{s.verses.length} {pct===100 ? '✓' : ''}
                    </span>
                  </div>
                  <div style={{ height:4, background:'rgba(255,255,255,0.05)', borderRadius:2, overflow:'hidden', marginBottom:8 }}>
                    <div style={{ width:`${pct}%`, height:'100%', background:s.color, borderRadius:2, transition:'width 0.4s' }}/>
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:3 }}>
                    {s.verses.map(v => {
                      const k = `${s.id}-${v.n}`
                      return (
                        <div key={v.n} onClick={() => toggleAyah(k)} title={`Ayah ${v.n}`} style={{
                          width:18, height:18, borderRadius:3, cursor:'pointer',
                          background: progress[k] ? s.color : 'rgba(255,255,255,0.04)',
                          border:`1px solid ${progress[k] ? s.color : 'rgba(255,255,255,0.08)'}`,
                          transition:'all 0.15s', display:'flex', alignItems:'center', justifyContent:'center',
                          fontSize:7, color: progress[k] ? '#06101c' : 'transparent',
                        }}>✓</div>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {memorizedCount === totalAyahs && (
              <div style={{ textAlign:'center', padding:28, background:'var(--gold-dim)', border:'1px solid var(--gold-border)', borderRadius:14, marginTop:16 }}>
                <div style={{ fontSize:36, marginBottom:8 }}>✦</div>
                <div style={{ fontSize:20, color:'var(--gold)', fontWeight:700 }}>Masha'Allah! Alhamdulillah!</div>
                <div style={{ fontSize:13, color:'var(--text-dim)', marginTop:4 }}>You have completed Surah {surah.name}</div>
                <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>May Allah accept it and make it easy for you.</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
