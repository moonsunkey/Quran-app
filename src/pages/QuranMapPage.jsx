// src/pages/QuranMapPage.jsx
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ALL_SURAHS, THEMES } from '../data/surahList'

const DIFF_LABEL = { 1:'Beginner', 2:'Intermediate', 3:'Advanced' }
const DIFF_COLOR = { 1:'#4CAF8A', 2:'#D4A843', 3:'#C0504D' }

const SURAH_ROUTES = { 1:'al-fatiha', 56:'al-waqia', 67:'al-mulk' }

const PERIOD_INFO = [
  { id:1, label:'Early Makki',  years:'610–615 CE', color:'#D4A843', desc:'The first revelations — short, intense, spiritual. Focused on who Allah is, the Day of Judgment, and basic ethics. The Prophet was alone with a small group of believers.' },
  { id:2, label:'Late Makki',   years:'615–622 CE', color:'#9B59B6', desc:'Longer surahs with stories of past prophets — Ibrahim, Musa, Nuh. These came as comfort during persecution. Believers were told: the prophets before you also faced rejection.' },
  { id:3, label:'Madani',       years:'622–632 CE', color:'#4CAF8A', desc:'After migration to Medina, the Muslim community grew. These surahs deal with law, society, family, and governance. The community needed practical guidance.' },
]

function dotSize(ayahs) {
  return Math.max(5, Math.min(20, 5 + Math.sqrt(ayahs / 286) * 18))
}

function hexRgb(h) {
  if (!h || h.length < 7) return '180,180,180'
  return `${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`
}

export default function QuranMapPage() {
  const [view,    setView]    = useState('themes')
  const [hovered, setHovered] = useState(null)
  const [search,  setSearch]  = useState('')
  const [selTheme, setSelTheme] = useState(null)

  const filtered = useMemo(() => ALL_SURAHS.filter(s => {
    if (selTheme && s.theme !== selTheme) return false
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) &&
        !s.ar.includes(search) && !String(s.n).includes(search)) return false
    return true
  }), [selTheme, search])

  return (
    <div style={{ minHeight:'100vh', background:'#06101c', fontFamily:"'Lato',Georgia,serif", color:'#ddd5c0' }}>

      {/* Header */}
      <div style={{ background:'linear-gradient(180deg,rgba(212,168,67,0.08),transparent)', borderBottom:'1px solid rgba(212,168,67,0.12)', padding:'28px 20px 20px' }}>
        <div style={{ maxWidth:1000, margin:'0 auto' }}>
          <Link to="/" style={{ fontSize:12, color:'#6a5a40', textDecoration:'none' }}>← Library</Link>
          <div style={{ marginTop:10, display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
            <div>
              <div style={{ fontSize:28, fontFamily:'Amiri,serif', color:'#D4A843', lineHeight:1 }}>القرآن الكريم</div>
              <h1 style={{ fontSize:20, color:'#ddd5c0', fontWeight:700, margin:'4px 0 2px' }}>Explore the Quran</h1>
              <div style={{ fontSize:12, color:'#6a5a40' }}>114 surahs · 6,236 ayahs · 23 years of revelation</div>
            </div>
            <div style={{ display:'flex', gap:4 }}>
              {[['themes','◉ Themes'],['journey','◈ Journey'],['visual','◧ Visual'],['table','≡ Table']].map(([v,l]) => (
                <button key={v} onClick={() => setView(v)} style={{ padding:'6px 13px', borderRadius:8, border:'none', cursor:'pointer', fontSize:11, background: view===v ? 'rgba(212,168,67,0.2)' : 'rgba(255,255,255,0.04)', color: view===v ? '#D4A843' : '#6a5a40', fontWeight: view===v ? 700 : 400 }}>{l}</button>
              ))}
            </div>
          </div>

          {/* Search + theme filter (visible on visual/table) */}
          {(view === 'visual' || view === 'table') && (
            <div style={{ display:'flex', gap:6, marginTop:14, flexWrap:'wrap', alignItems:'center' }}>
              {Object.entries(THEMES).map(([k,t]) => (
                <button key={k} onClick={() => setSelTheme(selTheme===k ? null : k)} style={{ padding:'4px 11px', borderRadius:20, border:`1px solid ${selTheme===k ? t.color : 'rgba(255,255,255,0.08)'}`, background: selTheme===k ? `rgba(${hexRgb(t.color)},0.12)` : 'transparent', color: selTheme===k ? t.color : '#6a5a40', fontSize:10, cursor:'pointer' }}>{t.icon} {t.label}</button>
              ))}
              <input placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} style={{ marginLeft:'auto', padding:'4px 11px', borderRadius:20, fontSize:11, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.04)', color:'#ddd5c0', outline:'none', width:140 }} />
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth:1000, margin:'0 auto', padding:'24px 20px' }}>

        {/* ── THEMES VIEW ── */}
        {view === 'themes' && (
          <div>
            <p style={{ fontSize:14, color:'#6a5a40', marginBottom:20, lineHeight:1.7 }}>
              The Quran covers 8 major themes. Each surah below is a circle — larger circles have more ayahs. Gold circles are available to learn now.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:14 }}>
              {Object.entries(THEMES).map(([key, theme]) => {
                const surahs = ALL_SURAHS.filter(s => s.theme === key)
                const totalAyahs = surahs.reduce((a,s) => a+s.ayahs, 0)
                return (
                  <div key={key} style={{ background:'rgba(255,255,255,0.02)', border:`1px solid rgba(${hexRgb(theme.color)},0.2)`, borderRadius:14, padding:'16px 18px', borderTop:`3px solid ${theme.color}` }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                      <div>
                        <div style={{ fontSize:16, color:theme.color, fontWeight:700 }}>{theme.icon} {theme.label}</div>
                        <div style={{ fontSize:11, color:'#6a5a40', marginTop:2, lineHeight:1.5 }}>{theme.desc}</div>
                      </div>
                      <div style={{ textAlign:'right', flexShrink:0, marginLeft:8 }}>
                        <div style={{ fontSize:18, color:theme.color, fontWeight:700 }}>{surahs.length}</div>
                        <div style={{ fontSize:9, color:'#4a3a28' }}>surahs</div>
                      </div>
                    </div>

                    {/* Dot cloud */}
                    <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginTop:12, minHeight:48, alignItems:'center' }}>
                      {surahs.map(s => {
                        const size = dotSize(s.ayahs)
                        const isHov = hovered === s.n
                        const route = SURAH_ROUTES[s.n]
                        return (
                          <div
                            key={s.n}
                            title={`${s.n}. ${s.name} (${s.ayahs} ayahs)`}
                            onMouseEnter={() => setHovered(s.n)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => route && (window.location.href = `/surah/${route}`)}
                            style={{
                              width: size, height: size,
                              borderRadius: '50%',
                              background: s.available
                                ? theme.color
                                : `rgba(${hexRgb(theme.color)},${isHov ? 0.4 : 0.2})`,
                              border: s.available
                                ? `1px solid ${theme.color}`
                                : `1px solid rgba(${hexRgb(theme.color)},0.3)`,
                              cursor: route ? 'pointer' : 'default',
                              transition:'all 0.15s',
                              transform: isHov ? 'scale(1.3)' : 'scale(1)',
                              flexShrink:0,
                              boxShadow: s.available ? `0 0 6px rgba(${hexRgb(theme.color)},0.4)` : 'none',
                            }}
                          />
                        )
                      })}
                    </div>

                    <div style={{ marginTop:8, fontSize:10, color:'#4a3a28' }}>
                      {totalAyahs.toLocaleString()} total ayahs
                      {surahs.filter(s=>s.available).length > 0 && (
                        <span style={{ color:theme.color, marginLeft:8 }}>
                          {surahs.filter(s=>s.available).length} available to learn
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div style={{ marginTop:20, display:'flex', gap:16, fontSize:11, color:'#6a5a40', flexWrap:'wrap' }}>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <div style={{ width:12, height:12, borderRadius:'50%', background:'#D4A843', boxShadow:'0 0 6px rgba(212,168,67,0.5)' }} />
                <span>Available to learn now</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.2)' }} />
                <span>Coming soon · larger dot = more ayahs</span>
              </div>
            </div>
          </div>
        )}

        {/* ── JOURNEY VIEW ── */}
        {view === 'journey' && (
          <div>
            <p style={{ fontSize:14, color:'#6a5a40', marginBottom:24, lineHeight:1.7 }}>
              The Quran was revealed over <strong style={{ color:'#ddd5c0' }}>23 years</strong>, in three distinct periods. Understanding this helps everything make sense. Each dot below is a surah, coloured by theme.
            </p>

            {PERIOD_INFO.map((period, pi) => {
              const surahs = ALL_SURAHS.filter(s => s.period === period.id)
              const themeCount = {}
              surahs.forEach(s => { themeCount[s.theme] = (themeCount[s.theme]||0) + 1 })
              const topThemes = Object.entries(themeCount).sort((a,b)=>b[1]-a[1]).slice(0,3)

              return (
                <div key={period.id} style={{ marginBottom:28, background:'rgba(255,255,255,0.02)', border:`1px solid rgba(${hexRgb(period.color)},0.2)`, borderRadius:14, overflow:'hidden' }}>
                  {/* Period header */}
                  <div style={{ background:`rgba(${hexRgb(period.color)},0.08)`, borderBottom:`1px solid rgba(${hexRgb(period.color)},0.15)`, padding:'14px 18px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8 }}>
                    <div>
                      <div style={{ fontSize:16, color:period.color, fontWeight:700 }}>{period.label}</div>
                      <div style={{ fontSize:11, color:'#6a5a40', marginTop:2 }}>{period.years} · {surahs.length} surahs</div>
                    </div>
                    <div style={{ display:'flex', gap:8 }}>
                      {topThemes.map(([k,c]) => (
                        <div key={k} style={{ fontSize:10, padding:'3px 9px', borderRadius:10, background:`rgba(${hexRgb(THEMES[k].color)},0.12)`, color:THEMES[k].color, border:`1px solid rgba(${hexRgb(THEMES[k].color)},0.2)` }}>
                          {THEMES[k].label} ({c})
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ padding:'16px 18px' }}>
                    {/* Description */}
                    <p style={{ fontSize:13, color:'#a09070', lineHeight:1.7, marginBottom:16 }}>{period.desc}</p>

                    {/* Surah dots by theme */}
                    {Object.entries(THEMES).map(([tkey, theme]) => {
                      const ts = surahs.filter(s => s.theme === tkey)
                      if (ts.length === 0) return null
                      return (
                        <div key={tkey} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                          <div style={{ fontSize:10, color:theme.color, width:120, flexShrink:0 }}>{theme.icon} {theme.label}</div>
                          <div style={{ display:'flex', flexWrap:'wrap', gap:3, flex:1 }}>
                            {ts.map(s => {
                              const size = dotSize(s.ayahs)
                              const route = SURAH_ROUTES[s.n]
                              const isHov = hovered === s.n
                              return (
                                <div
                                  key={s.n}
                                  title={`${s.n}. ${s.name} (${s.ayahs} ayahs)`}
                                  onMouseEnter={() => setHovered(s.n)}
                                  onMouseLeave={() => setHovered(null)}
                                  onClick={() => route && (window.location.href = `/surah/${route}`)}
                                  style={{
                                    width:size, height:size, borderRadius:'50%', flexShrink:0,
                                    background: s.available ? theme.color : `rgba(${hexRgb(theme.color)},0.25)`,
                                    border:`1px solid rgba(${hexRgb(theme.color)},0.4)`,
                                    cursor: route ? 'pointer' : 'default',
                                    transform: isHov ? 'scale(1.4)' : 'scale(1)',
                                    transition:'transform 0.1s',
                                    boxShadow: s.available ? `0 0 5px rgba(${hexRgb(theme.color)},0.5)` : 'none',
                                  }}
                                />
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {/* Theme legend */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginTop:8 }}>
              {Object.entries(THEMES).map(([k,t]) => (
                <div key={k} style={{ display:'flex', alignItems:'center', gap:4, fontSize:10, color:'#6a5a40' }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:t.color }} />
                  {t.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── VISUAL BAR CHART ── */}
        {view === 'visual' && (
          <div>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:16 }}>
              {Object.entries(THEMES).map(([k,t]) => (
                <div key={k} style={{ display:'flex', alignItems:'center', gap:4, fontSize:10, color:'#6a5a40' }}>
                  <div style={{ width:8, height:8, borderRadius:2, background:t.color }} />
                  {t.label}
                </div>
              ))}
              <span style={{ marginLeft:'auto', fontSize:10, color:'#6a5a40' }}>bar height = ayah count · hover for info</span>
            </div>

            <div style={{ display:'flex', alignItems:'flex-end', gap:2, flexWrap:'wrap', rowGap:24 }}>
              {filtered.map(s => {
                const h = Math.max(6, Math.round((s.ayahs / 286) * 80))
                const col = THEMES[s.theme]?.color || '#888'
                const isHov = hovered === s.n
                const route = SURAH_ROUTES[s.n]

                return (
                  <div key={s.n} onMouseEnter={() => setHovered(s.n)} onMouseLeave={() => setHovered(null)}
                    onClick={() => route && (window.location.href = `/surah/${route}`)}
                    style={{ position:'relative', display:'flex', flexDirection:'column', alignItems:'center', cursor: route ? 'pointer' : 'default' }}>

                    {isHov && (
                      <div style={{ position:'absolute', bottom:`${h+10}px`, left:'50%', transform:'translateX(-50%)', background:'#0c1b30', border:`1px solid rgba(${hexRgb(col)},0.4)`, borderRadius:8, padding:'8px 12px', zIndex:10, whiteSpace:'nowrap', boxShadow:'0 4px 20px rgba(0,0,0,0.6)', minWidth:150 }}>
                        <div style={{ fontSize:13, color:col, fontWeight:700 }}>{s.n}. {s.name}</div>
                        <div style={{ fontSize:11, color:'#ddd5c0', fontFamily:'Amiri,serif', marginTop:1 }}>{s.ar}</div>
                        <div style={{ fontSize:10, color:'#6a5a40', marginTop:4 }}>{s.ayahs} ayahs · {s.rev}</div>
                        <div style={{ fontSize:10, color:col, marginTop:2 }}>{THEMES[s.theme]?.label}</div>
                        {route && <div style={{ fontSize:10, color:'#4CAF8A', marginTop:3 }}>✓ Learn now →</div>}
                      </div>
                    )}

                    <div style={{ width: isHov ? 10 : 7, height: h, background: s.available ? col : `rgba(${hexRgb(col)},${isHov?0.6:0.35})`, borderRadius:'3px 3px 1px 1px', transition:'all 0.15s' }}>
                      <div style={{ position:'absolute', top:-4, left:'50%', transform:'translateX(-50%)', width:4, height:4, borderRadius:'50%', background: DIFF_COLOR[s.diff], opacity:0.6 }} />
                    </div>
                    {s.n % 10 === 0 && <div style={{ fontSize:7, color:'#3a2a18', marginTop:2 }}>{s.n}</div>}
                  </div>
                )
              })}
            </div>

            {/* Stats */}
            <div style={{ marginTop:28, display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:10 }}>
              {[
                { label:'Showing', value:filtered.length, color:'#D4A843' },
                { label:'Makki', value:filtered.filter(s=>s.rev==='Makki').length, color:'#D4A843' },
                { label:'Madani', value:filtered.filter(s=>s.rev==='Madani').length, color:'#5B8FD4' },
                { label:'Available', value:filtered.filter(s=>s.available).length, color:'#4CAF8A' },
                { label:'Total Ayahs', value:filtered.reduce((a,s)=>a+s.ayahs,0).toLocaleString(), color:'#E67E22' },
                { label:'Beginner', value:filtered.filter(s=>s.diff===1).length, color:'#4CAF8A' },
              ].map(s => (
                <div key={s.label} style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:10, padding:'12px 14px', textAlign:'center' }}>
                  <div style={{ fontSize:22, fontWeight:700, color:s.color }}>{s.value}</div>
                  <div style={{ fontSize:10, color:'#6a5a40', marginTop:2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TABLE VIEW ── */}
        {view === 'table' && (
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
              <thead>
                <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
                  {['#','Name','Arabic','Ayahs','Period','Theme','Level','Status'].map(h => (
                    <th key={h} style={{ padding:'9px 10px', textAlign:'left', fontSize:10, color:'#6a5a40', letterSpacing:1, fontWeight:400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => {
                  const theme = THEMES[s.theme]
                  const route = SURAH_ROUTES[s.n]
                  return (
                    <tr key={s.n} style={{ borderBottom:'1px solid rgba(255,255,255,0.04)', background: i%2===0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}
                      onMouseEnter={e => e.currentTarget.style.background=`rgba(${hexRgb(theme?.color||'#888')},0.05)`}
                      onMouseLeave={e => e.currentTarget.style.background= i%2===0 ? 'rgba(255,255,255,0.01)' : 'transparent'}
                    >
                      <td style={{ padding:'8px 10px', color:'#6a5a40', fontSize:11 }}>{s.n}</td>
                      <td style={{ padding:'8px 10px', color:'#ddd5c0' }}>
                        {route ? <Link to={`/surah/${route}`} style={{ color:theme?.color, textDecoration:'none' }}>{s.name} →</Link> : s.name}
                      </td>
                      <td style={{ padding:'8px 10px', fontFamily:'Amiri,serif', fontSize:16, color:'#a09070' }}>{s.ar}</td>
                      <td style={{ padding:'8px 10px', color:'#6a5a40' }}>{s.ayahs}</td>
                      <td style={{ padding:'8px 10px' }}>
                        <span style={{ fontSize:10, padding:'2px 7px', borderRadius:10, background: s.rev==='Makki'?'rgba(212,168,67,0.1)':'rgba(91,143,212,0.1)', color: s.rev==='Makki'?'#D4A843':'#5B8FD4' }}>{s.rev}</span>
                      </td>
                      <td style={{ padding:'8px 10px' }}>
                        {theme && <span style={{ fontSize:10, color:theme.color }}>{theme.icon} {theme.label}</span>}
                      </td>
                      <td style={{ padding:'8px 10px', fontSize:10, color:DIFF_COLOR[s.diff] }}>{DIFF_LABEL[s.diff]}</td>
                      <td style={{ padding:'8px 10px', fontSize:10, color: route ? '#4CAF8A' : '#3a2a18' }}>
                        {route ? '✓ Available' : 'Coming soon'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div style={{ marginTop:10, fontSize:11, color:'#3a2a18', textAlign:'right' }}>{filtered.length} surahs</div>
          </div>
        )}
      </div>
    </div>
  )
}
