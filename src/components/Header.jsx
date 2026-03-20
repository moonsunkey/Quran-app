// src/components/Header.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header({ user, onSignIn, onSignUp, onSignOut }) {
  const [mode,     setMode]     = useState('signin') // 'signin' | 'signup'
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [open,     setOpen]     = useState(false)

  const handleSubmit = async () => {
    setError('')
    try {
      if (mode === 'signup') await onSignUp(email, password)
      else                   await onSignIn(email, password)
      setOpen(false)
      setEmail(''); setPassword('')
    } catch (e) {
      setError(e.message.replace('Firebase: ', '').replace(/ \(auth\/.*\)\.?/, ''))
    }
  }

  return (
    <header style={{
      background: 'linear-gradient(180deg,#0c1b30,#06101c)',
      borderBottom: '1px solid rgba(212,168,67,0.2)',
      padding: '12px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:10 }}>
        <div style={{
          width:36, height:36, borderRadius:'50%',
          border:'2px solid #D4A843',
          display:'flex', alignItems:'center', justifyContent:'center',
          background:'rgba(212,168,67,0.1)', color:'#D4A843', fontSize:10, textAlign:'center', lineHeight:1.2,
        }}>القرآن</div>
        <div>
          <div style={{ fontSize:15, color:'#D4A843', fontWeight:700, lineHeight:1 }}>Quran Memorization</div>
          <div style={{ fontSize:9, color:'#6a5a40', letterSpacing:1.5 }}>FOR NEW LEARNERS</div>
        </div>
      </Link>

      {/* Auth */}
      {user ? (
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:12, color:'#ddd5c0' }}>{user.email}</div>
            <div style={{ fontSize:10, color:'#4CAF8A' }}>Progress synced ✓</div>
          </div>
          <button onClick={onSignOut} style={{
            fontSize:11, padding:'5px 10px',
            border:'1px solid rgba(255,255,255,0.1)', borderRadius:6,
            background:'transparent', color:'#6a5a40', cursor:'pointer',
          }}>Sign out</button>
        </div>
      ) : (
        <div style={{ position:'relative' }}>
          <button onClick={() => setOpen(v => !v)} style={{
            padding:'7px 14px', borderRadius:8,
            border:'1px solid rgba(212,168,67,0.3)',
            background:'rgba(212,168,67,0.08)', color:'#D4A843',
            fontSize:12, cursor:'pointer',
          }}>Sign in / Register</button>

          {open && (
            <div style={{
              position:'absolute', right:0, top:'110%', width:280,
              background:'#0c1b30', border:'1px solid rgba(212,168,67,0.2)',
              borderRadius:12, padding:16, zIndex:200,
            }}>
              {/* Toggle */}
              <div style={{ display:'flex', gap:4, marginBottom:14 }}>
                {['signin','signup'].map(m => (
                  <button key={m} onClick={() => { setMode(m); setError('') }} style={{
                    flex:1, padding:'6px', borderRadius:6, border:'none', cursor:'pointer',
                    background: mode===m ? '#D4A843' : 'rgba(255,255,255,0.05)',
                    color: mode===m ? '#06101c' : '#6a5a40', fontSize:12, fontWeight: mode===m ? 700 : 400,
                  }}>{m === 'signin' ? 'Sign in' : 'Register'}</button>
                ))}
              </div>

              {/* Inputs */}
              <input
                type="email" placeholder="Email" value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width:'100%', padding:'8px 10px', marginBottom:8, borderRadius:6,
                  border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.05)',
                  color:'#ddd5c0', fontSize:13, outline:'none',
                }}
              />
              <input
                type="password" placeholder="Password" value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                style={{
                  width:'100%', padding:'8px 10px', marginBottom:10, borderRadius:6,
                  border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.05)',
                  color:'#ddd5c0', fontSize:13, outline:'none',
                }}
              />

              {error && (
                <div style={{ fontSize:11, color:'#e08080', marginBottom:8, lineHeight:1.4 }}>{error}</div>
              )}

              <button onClick={handleSubmit} style={{
                width:'100%', padding:'9px', borderRadius:6, border:'none', cursor:'pointer',
                background:'#D4A843', color:'#06101c', fontSize:13, fontWeight:700,
              }}>{mode === 'signin' ? 'Sign in' : 'Create account'}</button>

              <div style={{ fontSize:10, color:'#4a3a28', marginTop:8, textAlign:'center', lineHeight:1.5 }}>
                {mode === 'signin'
                  ? 'New here? Switch to Register above.'
                  : 'Progress syncs across all your devices after sign-up.'}
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
