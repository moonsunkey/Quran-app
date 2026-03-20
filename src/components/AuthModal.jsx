import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function AuthModal({ onClose }) {
  const { login, signup, loginGoogle } = useAuth()
  const [mode, setMode]     = useState('login')   // login | signup
  const [email, setEmail]   = useState('')
  const [pass, setPass]     = useState('')
  const [name, setName]     = useState('')
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handle = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      if (mode === 'login') await login(email, pass)
      else await signup(email, pass, name)
      onClose()
    } catch (err) {
      setError(err.message.replace('Firebase: ', '').replace(/\(auth.*\)/, '').trim())
    } finally { setLoading(false) }
  }

  const handleGoogle = async () => {
    setError(''); setLoading(true)
    try { await loginGoogle(); onClose() }
    catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', zIndex:1000,
      display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
      <div style={{ background:'#0c1b30', border:'1px solid var(--gold-border)', borderRadius:16,
        padding:'28px 24px', width:'100%', maxWidth:400, position:'relative' }}>

        <button onClick={onClose} style={{ position:'absolute', top:14, right:16,
          background:'transparent', border:'none', color:'var(--text-dim)', fontSize:20, cursor:'pointer' }}>×</button>

        <div style={{ textAlign:'center', marginBottom:24 }}>
          <div style={{ fontSize:22, color:'var(--gold)' }}>الواقعة</div>
          <div style={{ fontSize:13, color:'var(--text-dim)', marginTop:4 }}>
            {mode === 'login' ? 'Sign in to sync your progress' : 'Create your free account'}
          </div>
        </div>

        {/* Google */}
        <button onClick={handleGoogle} disabled={loading}
          style={{ width:'100%', padding:'10px', borderRadius:8, marginBottom:16,
            background:'rgba(255,255,255,0.05)', border:'1px solid var(--border)',
            color:'var(--text)', fontSize:13, cursor:'pointer', display:'flex',
            alignItems:'center', justifyContent:'center', gap:8 }}>
          <span style={{ fontSize:16 }}>G</span> Continue with Google
        </button>

        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
          <div style={{ flex:1, height:1, background:'var(--border)' }}/>
          <span style={{ fontSize:11, color:'var(--text-muted)' }}>OR</span>
          <div style={{ flex:1, height:1, background:'var(--border)' }}/>
        </div>

        <form onSubmit={handle}>
          {mode === 'signup' && (
            <input value={name} onChange={e => setName(e.target.value)}
              placeholder="Your name" required
              style={inputStyle} />
          )}
          <input value={email} onChange={e => setEmail(e.target.value)}
            type="email" placeholder="Email" required style={inputStyle} />
          <input value={pass} onChange={e => setPass(e.target.value)}
            type="password" placeholder="Password (min 6 chars)" required minLength={6}
            style={inputStyle} />

          {error && <div style={{ color:'var(--red)', fontSize:12, marginBottom:12 }}>{error}</div>}

          <button type="submit" disabled={loading}
            className="btn btn-gold" style={{ width:'100%', marginBottom:14 }}>
            {loading ? '...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign:'center', fontSize:12, color:'var(--text-dim)' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <span onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            style={{ color:'var(--gold)', cursor:'pointer' }}>
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </span>
        </div>

        <div style={{ marginTop:16, fontSize:10, color:'var(--text-muted)', textAlign:'center' }}>
          Guest progress is saved locally. Sign in to sync across devices.
        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  width:'100%', padding:'10px 12px', marginBottom:12,
  background:'rgba(255,255,255,0.04)', border:'1px solid var(--border)',
  borderRadius:8, color:'var(--text)', fontSize:13, outline:'none',
  display:'block',
}
