// src/pages/QuranMapPage.jsx
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ALL_SURAHS } from '../data/surahList'

const DIFF_LABEL = { 1:'Beginner', 2:'Intermediate', 3:'Advanced' }
const DIFF_COLOR = { 1:'#4CAF8A', 2:'#D4A843', 3:'#C0504D' }

// Bar height proportional to ayah count (max 286)
const barH = (ayahs) => Math.max(8, Math.round((ayahs / 286) * 80))

export default function QuranMapPage() {
  const [filter, setFilter]   = useState('all')   // all | makki | madani
  const [diff,   setDiff]     = useState(0)        // 0=all, 1,2,3
  const [view,   setView]     = useState('visual') // visual | table
  const [search, setSearch]   = useState('')
  const [hovered, setHovered] = useState(null)

  const filtered = useMemo(() => ALL_SURAHS.filter(s => {
    if (filter === 'makki'  && s.rev !== 'Makki')  return false
    if (filter === 'madani' && s.rev !== 'Madani') return false
    if (diff && s.diff !== diff) return false
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) &&
        !s.ar.includes(search) && !String(s.n).includes(search)) return false
    return true
  }), [filter, diff, search])

  const stats = {
    makki:  ALL_SURAHS.filter(s => s.rev === 'Makki').length,
    madani: ALL_SURAHS.filter(s => s.rev === 'Madani').length,
    avail:  ALL_SURAHS.filter(s => s.available).length,
  }

  return (
    <div style={{ minHeight:'100vh', background:'#06101c', fontFamily:"'Lato',Georgia,serif", color:'#ddd5c0' }}>

      {/* Header */}
      <div style={{ background:'linear-gradient(180deg,rgba(212,168,67,0.08),transparent)', borderBottom:'1px solid rgba(212,168,67,0.12)', padding:'32px 20px 24px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <Link to="/" style={{ fontSize:12, color:'#6a5a40', textDecoration:'none' }}>← Library</Link>
          <div style={{ marginTop:12, display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
            <div>
              <div style={{ fontSize:32, fontFamily:'Amiri,serif', color:'#D4A843', lineHeight:1 }}>القرآن الكريم</div>
              <h1 style={{ fontSize:22, color:'#ddd5c0', fontWeight:700, margin:'6px 0 0' }}>All 114 Surahs</h1>
              <div style={{ fontSize:13, color:'#6a5a40', marginTop:4 }}>
                {stats.makki} Makki · {stats.madani} Madani · {stats.avail} available to learn
              </div>
            </div>

            {/* View toggle */}
            <div style={{ display:'flex', gap:4 }}>
              {[['visual','◉ Visual'],['table','≡ Table']].map(([v,l]) => (
                <button key={v} onClick={() => setView(v)} style={{
                  padding:'7px 16px', borderRadius:8, border:'none', cursor:'pointer', fontSize:12,
                  background: view===v ? 'rgba(212,168,67,0.2)' : 'rgba(255,255,255,0.04)',
                  color: view===v ? '#D4A843' : '#6a5a40',
                  fontWeight: view===v ? 700 : 400,
                }}>{l}</button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div style={{ display:'flex', gap:8, marginTop:18, flexWrap:'wrap', alignItems:'center' }}>
            {/* Revelation */}
            <div style={{ display:'flex', gap:4 }}>
              {[['all','All'],['makki','🕌 Makki'],['madani','🕌 Madani']].map(([f,l]) => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding:'5px 13px', borderRadius:20, border:`1px solid ${filter===f ? '#D4A843' : 'rgba(255,255,255,0.08)'}`,
                  background: filter===f ? 'rgba(212,168,67,0.12)' : 'transparent',
                  color: filter===f ? '#D4A843' : '#6a5a40', fontSize:11, cursor:'pointer',
                }}>{l}</button>
              ))}
            </div>
            <div style={{ width:1, height:20, background:'rgba(255,255,255,0.08)' }} />
            {/* Difficulty */}
            {[0,1,2,3].map(d => (
              <button key={d} onClick={() => setDiff(d)} style={{
                padding:'5px 13px', borderRadius:20, fontSize:11, cursor:'pointer',
                border:`1px solid ${diff===d ? (d ? DIFF_COLOR[d] : '#D4A843') : 'rgba(255,255,255,0.08)'}`,
                background: diff===d ? `rgba(${d ? (d===1?'76,175,138':d===2?'212,168,67':'192,80,77') : '212,168,67'},0.12)` : 'transparent',
                color: diff===d ? (d ? DIFF_COLOR[d] : '#D4A843') : '#6a5a40',
              }}>{d === 0 ? 'All levels' : DIFF_LABEL[d]}</button>
            ))}
            {/* Search */}
            <input
              placeholder="Search surah…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                marginLeft:'auto', padding:'5px 12px', borderRadius:20, fontSize:12,
                border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.04)',
                color:'#ddd5c0', outline:'none', width:160,
              }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'24px 20px' }}>

        {view === 'visual' ? (
          <>
            {/* Legend */}
            <div style={{ display:'flex', gap:16, marginBottom:20, flexWrap:'wrap' }}>
              {[
                ['#D4A843','Available to learn'],
                ['rgba(255,255,255,0.15)','Makki (not yet available)'],
                ['rgba(91,143,212,0.4)','Madani (not yet available)'],
              ].map(([c,l]) => (
                <div key={l} style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <div style={{ width:12, height:12, borderRadius:2, background:c }} />
                  <span style={{ fontSize:11, color:'#6a5a40' }}>{l}</span>
                </div>
              ))}
              <span style={{ fontSize:11, color:'#6a5a40', marginLeft:'auto' }}>Bar height = number of ayahs</span>
            </div>

            {/* Visual bar chart */}
            <div style={{ display:'flex', alignItems:'flex-end', gap:2, flexWrap:'wrap', rowGap:32 }}>
              {filtered.map(s => {
                const h = barH(s.ayahs)
                const isHov = hovered === s.n
                const barColor = s.available
                  ? '#D4A843'
                  : s.rev === 'Madani'
                  ? 'rgba(91,143,212,0.5)'
                  : 'rgba(255,255,255,0.18)'

                return (
                  <div
                    key={s.n}
                    onMouseEnter={() => setHovered(s.n)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ position:'relative', display:'flex', flexDirection:'column', alignItems:'center', cursor: s.available ? 'pointer' : 'default' }}
                    onClick={() => s.available && (window.location.href = `/surah/${['al-fatiha','al-mulk','al-waqia'][s.n===1?0:s.n===67?1:2]}`)}
                  >
                    {/* Tooltip */}
                    {isHov && (
                      <div style={{
                        position:'absolute', bottom:`${h + 10}px`, left:'50%', transform:'translateX(-50%)',
                        background:'#0c1b30', border:'1px solid rgba(212,168,67,0.3)', borderRadius:8,
                        padding:'8px 12px', zIndex:10, whiteSpace:'nowrap', minWidth:140,
                        boxShadow:'0 4px 20px rgba(0,0,0,0.5)',
                      }}>
                        <div style={{ fontSize:13, color:'#D4A843', fontWeight:700 }}>{s.n}. {s.name}</div>
                        <div style={{ fontSize:11, color:'#ddd5c0', fontFamily:'Amiri,serif', marginTop:1 }}>{s.ar}</div>
                        <div style={{ fontSize:10, color:'#6a5a40', marginTop:4, display:'flex', gap:8 }}>
                          <span>{s.ayahs} ayahs</span>
                          <span style={{ color: s.rev==='Makki' ? '#D4A843' : '#5B8FD4' }}>{s.rev}</span>
                          <span style={{ color: DIFF_COLOR[s.diff] }}>{DIFF_LABEL[s.diff]}</span>
                        </div>
                        {s.available && <div style={{ fontSize:10, color:'#4CAF8A', marginTop:4 }}>✓ Available to learn →</div>}
                      </div>
                    )}

                    {/* Bar */}
                    <div style={{
                      width: isHov ? 10 : 7,
                      height: h,
                      background: isHov
                        ? (s.available ? '#f0c84e' : s.rev==='Madani' ? '#7aabf0' : 'rgba(255,255,255,0.4)')
                        : barColor,
                      borderRadius:'3px 3px 1px 1px',
                      transition:'all 0.15s',
                      position:'relative',
                    }}>
                      {/* Difficulty dot on top */}
                      <div style={{
                        position:'absolute', top:-4, left:'50%', transform:'translateX(-50%)',
                        width:4, height:4, borderRadius:'50%',
                        background: DIFF_COLOR[s.diff],
                        opacity: 0.7,
                      }} />
                    </div>

                    {/* Number label every 10 */}
                    {s.n % 10 === 0 && (
                      <div style={{ fontSize:8, color:'#3a2a18', marginTop:3 }}>{s.n}</div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Summary stats */}
            <div style={{ marginTop:32, display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:12 }}>
              {[
                { label:'Total Surahs', value:114, color:'#D4A843' },
                { label:'Makki Surahs', value:stats.makki, color:'#D4A843' },
                { label:'Madani Surahs', value:stats.madani, color:'#5B8FD4' },
                { label:'Available to Learn', value:stats.avail, color:'#4CAF8A' },
                { label:'Total Ayahs', value:'6,236', color:'#E67E22' },
                { label:'Beginner Surahs', value:ALL_SURAHS.filter(s=>s.diff===1).length, color:'#4CAF8A' },
              ].map(s => (
                <div key={s.label} style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:10, padding:'14px 16px', textAlign:'center' }}>
                  <div style={{ fontSize:24, fontWeight:700, color:s.color }}>{s.value}</div>
                  <div style={{ fontSize:11, color:'#6a5a40', marginTop:3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* TABLE VIEW */
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
              <thead>
                <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
                  {['#','Name','Arabic','Ayahs','Revelation','Level','Status'].map(h => (
                    <th key={h} style={{ padding:'10px 12px', textAlign:'left', fontSize:10, color:'#6a5a40', letterSpacing:1, fontWeight:400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={s.n} style={{
                    borderBottom:'1px solid rgba(255,255,255,0.04)',
                    background: i%2===0 ? 'rgba(255,255,255,0.01)' : 'transparent',
                    transition:'background 0.1s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background='rgba(212,168,67,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background= i%2===0 ? 'rgba(255,255,255,0.01)' : 'transparent'}
                  >
                    <td style={{ padding:'9px 12px', color:'#6a5a40', fontSize:11 }}>{s.n}</td>
                    <td style={{ padding:'9px 12px', color:'#ddd5c0', fontWeight:500 }}>
                      {s.available
                        ? <Link to={`/surah/${s.n===1?'al-fatiha':s.n===67?'al-mulk':'al-waqia'}`} style={{ color:'#D4A843', textDecoration:'none' }}>{s.name} →</Link>
                        : s.name
                      }
                    </td>
                    <td style={{ padding:'9px 12px', fontFamily:'Amiri,serif', fontSize:16, color:'#a09070' }}>{s.ar}</td>
                    <td style={{ padding:'9px 12px', color:'#6a5a40' }}>{s.ayahs}</td>
                    <td style={{ padding:'9px 12px' }}>
                      <span style={{ fontSize:10, padding:'2px 8px', borderRadius:10, background: s.rev==='Makki'?'rgba(212,168,67,0.1)':'rgba(91,143,212,0.1)', color: s.rev==='Makki'?'#D4A843':'#5B8FD4' }}>{s.rev}</span>
                    </td>
                    <td style={{ padding:'9px 12px' }}>
                      <span style={{ fontSize:10, color: DIFF_COLOR[s.diff] }}>{DIFF_LABEL[s.diff]}</span>
                    </td>
                    <td style={{ padding:'9px 12px' }}>
                      {s.available
                        ? <span style={{ fontSize:10, color:'#4CAF8A' }}>✓ Available</span>
                        : <span style={{ fontSize:10, color:'#3a2a18' }}>Coming soon</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop:12, fontSize:11, color:'#3a2a18', textAlign:'right' }}>{filtered.length} of 114 surahs</div>
          </div>
        )}
      </div>
    </div>
  )
}
