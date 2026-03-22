// src/pages/AdminPage.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

const ADMIN_PASSWORD = 'quranmemo2024'

const STAR = '★'
const CAT_COLOR = { suggestion:'#D4A843', surah:'#4CAF8A', language:'#5B8FD4', bug:'#C0504D' }
const CAT_ICON  = { suggestion:'💡', surah:'📖', language:'🌐', bug:'🐛' }

export default function AdminPage() {
  const [authed,  setAuthed]  = useState(false)
  const [pw,      setPw]      = useState('')
  const [pwError, setPwError] = useState(false)
  const [data,    setData]    = useState([])
  const [loading, setLoading] = useState(false)
  const [tab,     setTab]     = useState('overview')

  const login = () => {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); load() }
    else { setPwError(true); setTimeout(() => setPwError(false), 1500) }
  }

  const load = async () => {
    setLoading(true)
    try {
      const snap = await getDocs(query(collection(db, 'feedback'), orderBy('createdAt', 'desc')))
      setData(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch(e) { console.error(e) }
    finally { setLoading(false) }
  }

  // Computed stats
  const total = data.length
  const byCategory = data.reduce((acc, d) => { acc[d.category] = (acc[d.category]||0)+1; return acc }, {})
  const avgRating = data.filter(d=>d.rating).length
    ? (data.filter(d=>d.rating).reduce((a,d)=>a+d.rating,0) / data.filter(d=>d.rating).length).toFixed(1)
    : 'N/A'

  // Surah votes
  const surahVotes = {}
  data.filter(d=>d.surahRequest).forEach(d => {
    const key = d.surahRequest.name
    surahVotes[key] = (surahVotes[key]||0)+1
  })
  const surahRanking = Object.entries(surahVotes).sort((a,b)=>b[1]-a[1])

  // Language votes
  const langVotes = {}
  data.filter(d=>d.languageRequest).forEach(d => {
    langVotes[d.languageRequest] = (langVotes[d.languageRequest]||0)+1
  })
  const langRanking = Object.entries(langVotes).sort((a,b)=>b[1]-a[1])

  // How found
  const howFoundVotes = {}
  data.filter(d=>d.howFound).forEach(d => {
    howFoundVotes[d.howFound] = (howFoundVotes[d.howFound]||0)+1
  })

  if (!authed) {
    return (
      <div style={{ minHeight:'100vh', background:'#06101c', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Lato',Georgia,serif" }}>
        <div style={{ width:320, background:'#0c1b30', border:'1px solid rgba(212,168,67,0.2)', borderRadius:16, padding:28, textAlign:'center' }}>
          <div style={{ fontSize:32, fontFamily:'Amiri,serif', color:'#D4A843', marginBottom:12 }}>الملك</div>
          <div style={{ fontSize:15, color:'#ddd5c0', fontWeight:700, marginBottom:4 }}>Admin</div>
          <div style={{ fontSize:12, color:'#6a5a40', marginBottom:20 }}>Feedback dashboard</div>
          <input
            type="password" placeholder="Password" value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key==='Enter' && login()}
            style={{
              width:'100%', padding:'10px 14px', borderRadius:8, fontSize:13,
              border:`1px solid ${pwError ? '#C0504D' : 'rgba(255,255,255,0.1)'}`,
              background:'rgba(255,255,255,0.04)', color:'#ddd5c0', outline:'none', marginBottom:10,
              transition:'border-color 0.2s',
            }}
          />
          {pwError && <div style={{ fontSize:11, color:'#C0504D', marginBottom:8 }}>Incorrect password</div>}
          <button onClick={login} style={{ width:'100%', padding:'10px', borderRadius:8, border:'none', background:'#D4A843', color:'#06101c', fontSize:13, fontWeight:700, cursor:'pointer' }}>
            Enter
          </button>
          <Link to="/" style={{ display:'block', marginTop:14, fontSize:11, color:'#6a5a40', textDecoration:'none' }}>← Back to app</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight:'100vh', background:'#06101c', fontFamily:"'Lato',Georgia,serif", color:'#ddd5c0' }}>
      {/* Header */}
      <div style={{ background:'rgba(212,168,67,0.06)', borderBottom:'1px solid rgba(212,168,67,0.12)', padding:'16px 24px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <div style={{ fontSize:16, color:'#D4A843', fontWeight:700 }}>Feedback Dashboard</div>
          <div style={{ fontSize:11, color:'#6a5a40', marginTop:2 }}>{total} submissions · avg rating {avgRating}</div>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={load} style={{ padding:'6px 14px', borderRadius:8, border:'1px solid rgba(212,168,67,0.3)', background:'transparent', color:'#D4A843', fontSize:12, cursor:'pointer' }}>
            {loading ? '⟳ Loading…' : '⟳ Refresh'}
          </button>
          <Link to="/" style={{ padding:'6px 14px', borderRadius:8, border:'1px solid rgba(255,255,255,0.1)', background:'transparent', color:'#6a5a40', fontSize:12, textDecoration:'none' }}>← App</Link>
        </div>
      </div>

      <div style={{ maxWidth:900, margin:'0 auto', padding:'24px 20px' }}>
        {/* Tab bar */}
        <div style={{ display:'flex', gap:4, marginBottom:24, borderBottom:'1px solid rgba(255,255,255,0.06)', paddingBottom:0 }}>
          {[['overview','Overview'],['surahs','Surah votes'],['languages','Languages'],['comments','Comments']].map(([t,l]) => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding:'8px 16px', border:'none', cursor:'pointer', fontSize:13,
              background:'transparent', color: tab===t ? '#D4A843' : '#6a5a40',
              borderBottom:`2px solid ${tab===t ? '#D4A843' : 'transparent'}`,
              fontWeight: tab===t ? 600 : 400,
            }}>{l}</button>
          ))}
        </div>

        {/* Overview tab */}
        {tab === 'overview' && (
          <div>
            {/* Summary cards */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:12, marginBottom:24 }}>
              {[
                { label:'Total submissions', value:total, color:'#D4A843' },
                { label:'Avg rating', value: avgRating === 'N/A' ? '—' : `${avgRating} ${STAR}`, color:'#D4A843' },
                { label:'Surah requests', value:byCategory.surah||0, color:'#4CAF8A' },
                { label:'Language requests', value:byCategory.language||0, color:'#5B8FD4' },
                { label:'Suggestions', value:byCategory.suggestion||0, color:'#D4A843' },
                { label:'Bugs reported', value:byCategory.bug||0, color:'#C0504D' },
              ].map(s => (
                <div key={s.label} style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:10, padding:'14px 16px', textAlign:'center' }}>
                  <div style={{ fontSize:24, fontWeight:700, color:s.color }}>{s.value}</div>
                  <div style={{ fontSize:10, color:'#6a5a40', marginTop:3 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* How found */}
            {Object.keys(howFoundVotes).length > 0 && (
              <div style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:12, padding:'16px 18px', marginBottom:16 }}>
                <div style={{ fontSize:13, color:'#D4A843', fontWeight:600, marginBottom:12 }}>How did they find the app?</div>
                {Object.entries(howFoundVotes).sort((a,b)=>b[1]-a[1]).map(([k,v]) => (
                  <div key={k} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                    <div style={{ fontSize:12, color:'#a09070', width:180, flexShrink:0 }}>{k}</div>
                    <div style={{ flex:1, height:6, background:'rgba(255,255,255,0.05)', borderRadius:3, overflow:'hidden' }}>
                      <div style={{ width:`${(v/total)*100}%`, height:'100%', background:'#D4A843', borderRadius:3 }} />
                    </div>
                    <div style={{ fontSize:11, color:'#D4A843', width:30, textAlign:'right' }}>{v}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Recent activity */}
            <div style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:12, padding:'16px 18px' }}>
              <div style={{ fontSize:13, color:'#D4A843', fontWeight:600, marginBottom:12 }}>Recent submissions</div>
              {data.slice(0,8).map(d => (
                <div key={d.id} style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ fontSize:16 }}>{CAT_ICON[d.category]}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:2 }}>
                      <span style={{ fontSize:11, color:CAT_COLOR[d.category], fontWeight:600 }}>{d.category}</span>
                      {d.rating > 0 && <span style={{ fontSize:10, color:'#D4A843' }}>{STAR.repeat(d.rating)}</span>}
                      {d.surahRequest && <span style={{ fontSize:10, color:'#4CAF8A' }}>→ {d.surahRequest.name}</span>}
                      {d.languageRequest && <span style={{ fontSize:10, color:'#5B8FD4' }}>→ {d.languageRequest}</span>}
                    </div>
                    {d.comment && <div style={{ fontSize:12, color:'#7a6a52', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{d.comment}</div>}
                  </div>
                  <div style={{ fontSize:10, color:'#4a3a28', flexShrink:0 }}>
                    {d.createdAt?.toDate ? d.createdAt.toDate().toLocaleDateString() : ''}
                  </div>
                </div>
              ))}
              {data.length === 0 && !loading && (
                <div style={{ fontSize:13, color:'#4a3a28', textAlign:'center', padding:20 }}>No submissions yet</div>
              )}
            </div>
          </div>
        )}

        {/* Surah votes tab */}
        {tab === 'surahs' && (
          <div>
            <div style={{ fontSize:13, color:'#6a5a40', marginBottom:16 }}>
              {surahRanking.length} surahs requested · {byCategory.surah||0} total votes
            </div>
            {surahRanking.length === 0 && (
              <div style={{ fontSize:13, color:'#4a3a28', textAlign:'center', padding:40 }}>No surah votes yet</div>
            )}
            {surahRanking.map(([name, votes], i) => (
              <div key={name} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:10, marginBottom:8 }}>
                <div style={{ fontSize:13, color:'#6a5a40', width:24, textAlign:'center', fontWeight:700 }}>#{i+1}</div>
                <div style={{ flex:1, fontSize:14, color:'#ddd5c0' }}>{name}</div>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ width:100, height:6, background:'rgba(255,255,255,0.05)', borderRadius:3, overflow:'hidden' }}>
                    <div style={{ width:`${(votes/surahRanking[0][1])*100}%`, height:'100%', background:'#4CAF8A', borderRadius:3 }} />
                  </div>
                  <div style={{ fontSize:13, color:'#4CAF8A', fontWeight:700, width:24, textAlign:'right' }}>{votes}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Language votes tab */}
        {tab === 'languages' && (
          <div>
            <div style={{ fontSize:13, color:'#6a5a40', marginBottom:16 }}>
              {langRanking.length} languages requested · {byCategory.language||0} total votes
            </div>
            {langRanking.length === 0 && (
              <div style={{ fontSize:13, color:'#4a3a28', textAlign:'center', padding:40 }}>No language votes yet</div>
            )}
            {langRanking.map(([name, votes], i) => (
              <div key={name} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:10, marginBottom:8 }}>
                <div style={{ fontSize:13, color:'#6a5a40', width:24, textAlign:'center', fontWeight:700 }}>#{i+1}</div>
                <div style={{ flex:1, fontSize:14, color:'#ddd5c0' }}>{name}</div>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ width:100, height:6, background:'rgba(255,255,255,0.05)', borderRadius:3, overflow:'hidden' }}>
                    <div style={{ width:`${(votes/langRanking[0][1])*100}%`, height:'100%', background:'#5B8FD4', borderRadius:3 }} />
                  </div>
                  <div style={{ fontSize:13, color:'#5B8FD4', fontWeight:700, width:24, textAlign:'right' }}>{votes}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Comments tab */}
        {tab === 'comments' && (
          <div>
            {data.filter(d=>d.comment).length === 0 && (
              <div style={{ fontSize:13, color:'#4a3a28', textAlign:'center', padding:40 }}>No comments yet</div>
            )}
            {data.filter(d=>d.comment).map(d => (
              <div key={d.id} style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:10, padding:'14px 16px', marginBottom:10 }}>
                <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:8 }}>
                  <span style={{ fontSize:14 }}>{CAT_ICON[d.category]}</span>
                  <span style={{ fontSize:11, color:CAT_COLOR[d.category], fontWeight:600 }}>{d.category}</span>
                  {d.rating > 0 && <span style={{ fontSize:11, color:'#D4A843' }}>{STAR.repeat(d.rating)}</span>}
                  <span style={{ marginLeft:'auto', fontSize:10, color:'#4a3a28' }}>
                    {d.createdAt?.toDate ? d.createdAt.toDate().toLocaleDateString() : ''}
                  </span>
                </div>
                <div style={{ fontSize:13, color:'#a09070', lineHeight:1.6 }}>{d.comment}</div>
                {d.email && <div style={{ fontSize:11, color:'#5B8FD4', marginTop:6 }}>📧 {d.email}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
