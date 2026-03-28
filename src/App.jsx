// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import HomePage   from './pages/HomePage'
import SurahPage  from './pages/SurahPage'
import AboutPage      from './pages/AboutPage'
import QuranMapPage  from './pages/QuranMapPage'
import AdminPage          from './pages/AdminPage'
import FeaturedAyahsPage  from './pages/FeaturedAyahsPage'
import Header     from './components/Header'

export default function App() {
  const { user, loading, signIn, signUp, signOut } = useAuth()

  if (loading) {
    return (
      <div style={{ minHeight:'100vh', background:'#06101c', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ color:'#D4A843', fontSize:16, letterSpacing:2 }}>LOADING…</div>
      </div>
    )
  }

  return (
    <div style={{ minHeight:'100vh', background:'#06101c' }}>
      <Header user={user} onSignIn={signIn} onSignUp={signUp} onSignOut={signOut} />
      <Routes>
        <Route path="/"          element={<HomePage  user={user} />} />
        <Route path="/surah/:id" element={<SurahPage user={user} />} />
        <Route path="/about"     element={<AboutPage />} />
        <Route path="/surahs"    element={<QuranMapPage />} />
        <Route path="/admin"     element={<AdminPage />} />
        <Route path="/featured"  element={<FeaturedAyahsPage />} />
        <Route path="*"          element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
