// src/pages/SurahPage.jsx
import { useParams, Link } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import { SECTIONS as AL_FATIHA_SECTIONS, SURAH_META as AL_FATIHA_META } from '../data/al-fatiha'
import { SECTIONS as AL_WAQIA_SECTIONS,  SURAH_META as AL_WAQIA_META  } from '../data/al-waqia'
import { SECTIONS as AL_MULK_SECTIONS,   SURAH_META as AL_MULK_META   } from '../data/al-mulk'
import SurahViewer from '../components/SurahViewer'

// ── Add new surahs here ───────────────────────────────────────────────────────
const SURAH_DATA_MAP = {
  'al-fatiha': { sections: AL_FATIHA_SECTIONS, meta: AL_FATIHA_META },
  'al-waqia':  { sections: AL_WAQIA_SECTIONS,  meta: AL_WAQIA_META  },
  'al-mulk':   { sections: AL_MULK_SECTIONS,   meta: AL_MULK_META   },
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
