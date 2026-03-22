// src/components/FeedbackModal.jsx
import { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ALL_SURAHS } from '../data/surahList'

const CATEGORIES = [
  { id:'suggestion',   icon:'💡', label:'Suggestion',       desc:'Ideas to improve the app' },
  { id:'surah',        icon:'📖', label:'Surah request',    desc:'Vote for the next surah to add' },
  { id:'language',     icon:'🌐', label:'Language request', desc:'Request a new translation language' },
  { id:'bug',          icon:'🐛', label:'Bug report',       desc:'Something not working right' },
]

const LANGUAGES = ['Urdu (اردو)', 'Malay (Bahasa Melayu)', 'Turkish (Türkçe)', 'French (Français)', 'Indonesian (Bahasa Indonesia)', 'Bengali (বাংলা)', 'Somali', 'Swahili', 'Other']

const HOW_FOUND = ['Google search', 'Social media', 'Friend or family', 'Muslim community / masjid', 'Other']

export default function FeedbackModal({ onClose }) {
  const [step, setStep]         = useState(1)
  const [category, setCategory] = useState(null)
  const [surahSearch, setSurahSearch] = useState('')
  const [selectedSurah, setSelectedSurah] = useState(null)
  const [language, setLanguage] = useState('')
  const [rating, setRating]     = useState(0)
  const [comment, setComment]   = useState('')
  const [howFound, setHowFound] = useState('')
  const [email, setEmail]       = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone]         = useState(false)

  const filteredSurahs = ALL_SURAHS.filter(s =>
    s.name.toLowerCase().includes(surahSearch.toLowerCase()) ||
    s.ar.includes(surahSearch) ||
    String(s.n).includes(surahSearch)
  ).slice(0, 20)

  const canProceed = () => {
    if (step === 1) return !!category
    if (step === 2) {
      if (category === 'surah') return !!selectedSurah
      if (category === 'language') return !!language
      return true
    }
    return true
  }

  const handleSubmit = async () => {
    if (!rating && !comment) return
    setSubmitting(true)
    try {
      await addDoc(collection(db, 'feedback'), {
        category,
        surahRequest: selectedSurah ? { n: selectedSurah.n, name: selectedSurah.name } : null,
        languageRequest: language || null,
        rating,
        comment,
        howFound,
        email: email || null,
        createdAt: serverTimestamp(),
        userAgent: navigator.userAgent,
      })
      setDone(true)
    } catch (e) {
      console.error(e)
      alert('Could not submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:1000,
      background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', padding:16,
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background:'#0c1b30', border:'1px solid rgba(212,168,67,0.25)', borderRadius:16,
        width:'100%', maxWidth:480, maxHeight:'90vh', overflowY:'auto',
        boxShadow:'0 20px 60px rgba(0,0,0,0.6)',
      }}>
        {/* Header */}
        <div style={{ padding:'20px 24px 16px', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontSize:16, color:'#D4A843', fontWeight:700 }}>Share your feedback</div>
            <div style={{ fontSize:11, color:'#6a5a40', marginTop:2 }}>Help shape what gets built next</div>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'#6a5a40', fontSize:20, cursor:'pointer', padding:'0 4px' }}>×</button>
        </div>

        <div style={{ padding:'20px 24px' }}>
          {done ? (
            <div style={{ textAlign:'center', padding:'20px 0' }}>
              <div style={{ fontSize:40, marginBottom:12 }}>جزاك الله خيرا</div>
              <div style={{ fontSize:16, color:'#D4A843', fontWeight:700, marginBottom:8 }}>Thank you!</div>
              <div style={{ fontSize:13, color:'#7a6a52', lineHeight:1.7, marginBottom:20 }}>
                Your feedback helps us build a better tool for new Muslims everywhere. May Allah reward you for your time.
              </div>
              <button onClick={onClose} style={{ padding:'10px 28px', borderRadius:10, background:'rgba(212,168,67,0.15)', border:'1px solid rgba(212,168,67,0.3)', color:'#D4A843', fontSize:14, cursor:'pointer' }}>Close</button>
            </div>
          ) : (
            <>
              {/* Step indicators */}
              <div style={{ display:'flex', gap:4, marginBottom:20 }}>
                {[1,2,3].map(s => (
                  <div key={s} style={{ flex:1, height:3, borderRadius:2, background: s <= step ? '#D4A843' : 'rgba(255,255,255,0.08)', transition:'background 0.2s' }} />
                ))}
              </div>

              {/* Step 1: Category */}
              {step === 1 && (
                <div>
                  <div style={{ fontSize:14, color:'#ddd5c0', marginBottom:14 }}>What would you like to share?</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {CATEGORIES.map(c => (
                      <button key={c.id} onClick={() => setCategory(c.id)} style={{
                        display:'flex', alignItems:'center', gap:12, padding:'12px 14px',
                        borderRadius:10, border:`1px solid ${category===c.id ? 'rgba(212,168,67,0.5)' : 'rgba(255,255,255,0.08)'}`,
                        background: category===c.id ? 'rgba(212,168,67,0.08)' : 'rgba(255,255,255,0.02)',
                        cursor:'pointer', textAlign:'left', transition:'all 0.15s',
                      }}>
                        <span style={{ fontSize:20 }}>{c.icon}</span>
                        <div>
                          <div style={{ fontSize:13, color: category===c.id ? '#D4A843' : '#ddd5c0', fontWeight: category===c.id ? 600 : 400 }}>{c.label}</div>
                          <div style={{ fontSize:11, color:'#6a5a40' }}>{c.desc}</div>
                        </div>
                        {category===c.id && <span style={{ marginLeft:'auto', color:'#D4A843', fontSize:16 }}>✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Category-specific */}
              {step === 2 && (
                <div>
                  {category === 'surah' && (
                    <div>
                      <div style={{ fontSize:14, color:'#ddd5c0', marginBottom:12 }}>Which surah would you like us to add?</div>
                      <input
                        placeholder="Search by name or number…"
                        value={surahSearch}
                        onChange={e => setSurahSearch(e.target.value)}
                        style={{ width:'100%', padding:'9px 12px', borderRadius:8, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.04)', color:'#ddd5c0', fontSize:13, outline:'none', marginBottom:10 }}
                      />
                      <div style={{ maxHeight:220, overflowY:'auto', display:'flex', flexDirection:'column', gap:4 }}>
                        {filteredSurahs.map(s => (
                          <button key={s.n} onClick={() => setSelectedSurah(s)} style={{
                            display:'flex', alignItems:'center', gap:10, padding:'8px 12px',
                            borderRadius:8, border:`1px solid ${selectedSurah?.n===s.n ? 'rgba(212,168,67,0.4)' : 'rgba(255,255,255,0.06)'}`,
                            background: selectedSurah?.n===s.n ? 'rgba(212,168,67,0.08)' : 'transparent',
                            cursor:'pointer', textAlign:'left',
                          }}>
                            <span style={{ fontSize:11, color:'#6a5a40', width:24, flexShrink:0 }}>{s.n}</span>
                            <span style={{ fontSize:13, color: selectedSurah?.n===s.n ? '#D4A843' : '#ddd5c0' }}>{s.name}</span>
                            <span style={{ fontSize:14, color:'#a09070', fontFamily:'Amiri,serif', marginLeft:'auto' }}>{s.ar}</span>
                            {s.available && <span style={{ fontSize:9, color:'#4CAF8A', background:'rgba(76,175,138,0.1)', padding:'2px 6px', borderRadius:6 }}>done</span>}
                          </button>
                        ))}
                      </div>
                      {selectedSurah && (
                        <div style={{ marginTop:10, padding:'8px 12px', background:'rgba(212,168,67,0.06)', border:'1px solid rgba(212,168,67,0.2)', borderRadius:8, fontSize:12, color:'#D4A843' }}>
                          ✓ Voting for: {selectedSurah.n}. {selectedSurah.name} ({selectedSurah.ayahs} ayahs)
                        </div>
                      )}
                    </div>
                  )}

                  {category === 'language' && (
                    <div>
                      <div style={{ fontSize:14, color:'#ddd5c0', marginBottom:12 }}>Which language would you like added?</div>
                      <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                        {LANGUAGES.map(l => (
                          <button key={l} onClick={() => setLanguage(l)} style={{
                            padding:'9px 14px', borderRadius:8, border:`1px solid ${language===l ? 'rgba(212,168,67,0.4)' : 'rgba(255,255,255,0.08)'}`,
                            background: language===l ? 'rgba(212,168,67,0.08)' : 'transparent',
                            color: language===l ? '#D4A843' : '#ddd5c0', fontSize:13, cursor:'pointer', textAlign:'left',
                          }}>{l}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  {(category === 'suggestion' || category === 'bug') && (
                    <div>
                      <div style={{ fontSize:14, color:'#ddd5c0', marginBottom:12 }}>
                        {category === 'bug' ? 'Describe the issue' : 'What would you suggest?'}
                      </div>
                      <textarea
                        placeholder={category === 'bug' ? 'What happened? What were you trying to do?' : 'Share your idea…'}
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        rows={5}
                        style={{ width:'100%', padding:'10px 12px', borderRadius:8, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.04)', color:'#ddd5c0', fontSize:13, outline:'none', resize:'vertical', fontFamily:'inherit' }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Rating + how found + email */}
              {step === 3 && (
                <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                  {/* Star rating */}
                  <div>
                    <div style={{ fontSize:13, color:'#a09070', marginBottom:8 }}>How would you rate the app? (optional)</div>
                    <div style={{ display:'flex', gap:8 }}>
                      {[1,2,3,4,5].map(n => (
                        <button key={n} onClick={() => setRating(n)} style={{
                          fontSize:28, background:'none', border:'none', cursor:'pointer',
                          color: n <= rating ? '#D4A843' : 'rgba(255,255,255,0.15)',
                          transition:'color 0.1s, transform 0.1s',
                          transform: n <= rating ? 'scale(1.1)' : 'scale(1)',
                        }}>★</button>
                      ))}
                    </div>
                  </div>

                  {/* Comment (if not already entered) */}
                  {category !== 'bug' && category !== 'suggestion' && (
                    <div>
                      <div style={{ fontSize:13, color:'#a09070', marginBottom:8 }}>Any other thoughts? (optional)</div>
                      <textarea
                        placeholder="Share anything that would help us improve…"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        rows={3}
                        style={{ width:'100%', padding:'10px 12px', borderRadius:8, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.04)', color:'#ddd5c0', fontSize:13, outline:'none', resize:'vertical', fontFamily:'inherit' }}
                      />
                    </div>
                  )}

                  {/* How found */}
                  <div>
                    <div style={{ fontSize:13, color:'#a09070', marginBottom:8 }}>How did you find the app? (optional)</div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                      {HOW_FOUND.map(h => (
                        <button key={h} onClick={() => setHowFound(h)} style={{
                          padding:'5px 12px', borderRadius:20, fontSize:11, cursor:'pointer',
                          border:`1px solid ${howFound===h ? 'rgba(212,168,67,0.4)' : 'rgba(255,255,255,0.08)'}`,
                          background: howFound===h ? 'rgba(212,168,67,0.08)' : 'transparent',
                          color: howFound===h ? '#D4A843' : '#6a5a40',
                        }}>{h}</button>
                      ))}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <div style={{ fontSize:13, color:'#a09070', marginBottom:8 }}>Email for follow-up (optional)</div>
                    <input
                      type="email" placeholder="your@email.com" value={email}
                      onChange={e => setEmail(e.target.value)}
                      style={{ width:'100%', padding:'9px 12px', borderRadius:8, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.04)', color:'#ddd5c0', fontSize:13, outline:'none' }}
                    />
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:20, gap:10 }}>
                {step > 1 ? (
                  <button onClick={() => setStep(s => s-1)} style={{ padding:'10px 20px', borderRadius:8, border:'1px solid rgba(255,255,255,0.1)', background:'transparent', color:'#6a5a40', fontSize:13, cursor:'pointer' }}>← Back</button>
                ) : <div />}

                {step < 3 ? (
                  <button
                    onClick={() => setStep(s => s+1)}
                    disabled={!canProceed()}
                    style={{ padding:'10px 24px', borderRadius:8, border:'none', cursor: canProceed() ? 'pointer' : 'not-allowed', background: canProceed() ? '#D4A843' : 'rgba(212,168,67,0.2)', color: canProceed() ? '#06101c' : '#4a3a28', fontSize:13, fontWeight:600 }}>
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting || (!rating && !comment && !selectedSurah && !language)}
                    style={{ padding:'10px 24px', borderRadius:8, border:'none', cursor:'pointer', background:'#D4A843', color:'#06101c', fontSize:13, fontWeight:700 }}>
                    {submitting ? 'Sending…' : 'Submit feedback'}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
