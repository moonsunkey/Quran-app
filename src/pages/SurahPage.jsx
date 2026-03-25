// src/pages/SurahPage.jsx
import { useParams, Link } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import SurahViewer from '../components/SurahViewer'
import { SURAH_DATA_MAP } from '../data/surahData'

export default function SurahPage({ user }) {
  const { id } = useParams()
  const data   = SURAH_DATA_MAP[id]
  const { memorized, toggle, markSection, syncing } = useProgress(user, id)

  if (!data) {
    return (
      <div style={{ textAlign:'center', padding:'60px 20px' }}>
        <div style={{ fontSize:14, color:'#C0504D', marginBottom:12 }}>Surah not found.</div>
        <Link to="/" style={{ color:'#D4A843', fontSize:13 }}>← Back to library</Link>
      </div>
    )
  }

  return (
    <SurahViewer
      meta={data.meta}
      sections={data.sections}
      memorized={memorized}
      onToggle={toggle}
      onMarkSection={markSection}
      syncing={syncing}
      user={user}
    />
  )
}
