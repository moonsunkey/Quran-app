// src/pages/SurahPage.jsx
import { useParams, Link } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import { SECTIONS as AL_FATIHA_SECTIONS,  SURAH_META as AL_FATIHA_META  } from '../data/al-fatiha'
import { SECTIONS as AL_WAQIA_SECTIONS,   SURAH_META as AL_WAQIA_META   } from '../data/al-waqia'
import { SECTIONS as AL_MULK_SECTIONS,    SURAH_META as AL_MULK_META    } from '../data/al-mulk'
import { SECTIONS as AL_RAHMAN_SECTIONS,  SURAH_META as AL_RAHMAN_META  } from '../data/al-rahman'
import { SECTIONS as AL_ASR_SECTIONS,     SURAH_META as AL_ASR_META     } from '../data/al-asr'
import { SECTIONS as AL_FIL_SECTIONS,     SURAH_META as AL_FIL_META     } from '../data/al-fil'
import { SECTIONS as QURAYSH_SECTIONS,    SURAH_META as QURAYSH_META    } from '../data/quraysh'
import { SECTIONS as AL_MAUN_SECTIONS,    SURAH_META as AL_MAUN_META    } from '../data/al-maun'
import { SECTIONS as AL_KAWTHAR_SECTIONS, SURAH_META as AL_KAWTHAR_META } from '../data/al-kawthar'
import { SECTIONS as AL_KAFIRUN_SECTIONS, SURAH_META as AL_KAFIRUN_META } from '../data/al-kafirun'
import { SECTIONS as AN_NASR_SECTIONS,    SURAH_META as AN_NASR_META    } from '../data/an-nasr'
import { SECTIONS as AL_IKHLAS_SECTIONS,  SURAH_META as AL_IKHLAS_META  } from '../data/al-ikhlas'
import { SECTIONS as AL_FALAQ_SECTIONS,   SURAH_META as AL_FALAQ_META   } from '../data/al-falaq'
import { SECTIONS as AN_NAS_SECTIONS,     SURAH_META as AN_NAS_META     } from '../data/an-nas'
import { SECTIONS as ASH_SHAMS_SECTIONS,  SURAH_META as ASH_SHAMS_META  } from '../data/ash-shams'
import { SECTIONS as AL_LAYL_SECTIONS,    SURAH_META as AL_LAYL_META    } from '../data/al-layl'
import { SECTIONS as AD_DUHA_SECTIONS,    SURAH_META as AD_DUHA_META    } from '../data/ad-duha'
import { SECTIONS as ASH_SHARH_SECTIONS,  SURAH_META as ASH_SHARH_META  } from '../data/ash-sharh'
import { SECTIONS as AT_TIN_SECTIONS,     SURAH_META as AT_TIN_META     } from '../data/at-tin'
import { SECTIONS as AL_ALAQ_SECTIONS,    SURAH_META as AL_ALAQ_META    } from '../data/al-alaq'
import { SECTIONS as AL_QADR_SECTIONS,    SURAH_META as AL_QADR_META    } from '../data/al-qadr'
import { SECTIONS as AL_MASAD_SECTIONS,   SURAH_META as AL_MASAD_META   } from '../data/al-masad'
import SurahViewer from '../components/SurahViewer'

// ── Add new surahs here ───────────────────────────────────────────────────────
const SURAH_DATA_MAP = {
  'al-fatiha':  { sections: AL_FATIHA_SECTIONS,  meta: AL_FATIHA_META  },
  'al-waqia':   { sections: AL_WAQIA_SECTIONS,   meta: AL_WAQIA_META   },
  'al-mulk':    { sections: AL_MULK_SECTIONS,    meta: AL_MULK_META    },
  'al-rahman':  { sections: AL_RAHMAN_SECTIONS,  meta: AL_RAHMAN_META  },
  'al-asr':     { sections: AL_ASR_SECTIONS,     meta: AL_ASR_META     },
  'al-fil':     { sections: AL_FIL_SECTIONS,     meta: AL_FIL_META     },
  'quraysh':    { sections: QURAYSH_SECTIONS,    meta: QURAYSH_META    },
  'al-maun':    { sections: AL_MAUN_SECTIONS,    meta: AL_MAUN_META    },
  'al-kawthar': { sections: AL_KAWTHAR_SECTIONS, meta: AL_KAWTHAR_META },
  'al-kafirun': { sections: AL_KAFIRUN_SECTIONS, meta: AL_KAFIRUN_META },
  'an-nasr':    { sections: AN_NASR_SECTIONS,    meta: AN_NASR_META    },
  'al-ikhlas':  { sections: AL_IKHLAS_SECTIONS,  meta: AL_IKHLAS_META  },
  'al-falaq':   { sections: AL_FALAQ_SECTIONS,   meta: AL_FALAQ_META   },
  'an-nas':     { sections: AN_NAS_SECTIONS,     meta: AN_NAS_META     },
  'ash-shams':  { sections: ASH_SHAMS_SECTIONS,  meta: ASH_SHAMS_META  },
  'al-layl':    { sections: AL_LAYL_SECTIONS,    meta: AL_LAYL_META    },
  'ad-duha':    { sections: AD_DUHA_SECTIONS,    meta: AD_DUHA_META    },
  'ash-sharh':  { sections: ASH_SHARH_SECTIONS,  meta: ASH_SHARH_META  },
  'at-tin':     { sections: AT_TIN_SECTIONS,     meta: AT_TIN_META     },
  'al-alaq':    { sections: AL_ALAQ_SECTIONS,    meta: AL_ALAQ_META    },
  'al-qadr':    { sections: AL_QADR_SECTIONS,    meta: AL_QADR_META    },
  'al-masad':   { sections: AL_MASAD_SECTIONS,   meta: AL_MASAD_META   },
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
