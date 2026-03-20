// src/pages/SurahPage.jsx
// Loads the correct surah by URL param, injects user + progress sync.

import { useParams, Link } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import { SECTIONS, SURAH_META } from '../data/al-waqia'
import SurahViewer from '../components/SurahViewer'

// Map of surah IDs to their data modules.
// When you add a new surah, import its data here and add an entry.
const SURAH_DATA_MAP = {
  'al-waqia': { sections: SECTIONS, meta: SURAH_META },
  // 'al-mulk':  { sections: AL_MULK_SECTIONS, meta: AL_MULK_META },
}

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
