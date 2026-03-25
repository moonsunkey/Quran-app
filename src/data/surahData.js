// src/data/surahData.js
// Shared surah data map — imported by SurahPage, ReviewSession, and any
// component that needs to look up verse data by surah id.
//
// ── ADD NEW SURAHS HERE (same as SurahPage.jsx) ──────────────────────────────
import { SECTIONS as AL_FATIHA_S,  SURAH_META as AL_FATIHA_M  } from './al-fatiha'
import { SECTIONS as AL_WAQIA_S,   SURAH_META as AL_WAQIA_M   } from './al-waqia'
import { SECTIONS as AL_MULK_S,    SURAH_META as AL_MULK_M    } from './al-mulk'
import { SECTIONS as AL_RAHMAN_S,  SURAH_META as AL_RAHMAN_M  } from './al-rahman'
import { SECTIONS as AL_ASR_S,     SURAH_META as AL_ASR_M     } from './al-asr'
import { SECTIONS as AL_KAWTHAR_S, SURAH_META as AL_KAWTHAR_M } from './al-kawthar'
import { SECTIONS as AL_IKHLAS_S,  SURAH_META as AL_IKHLAS_M  } from './al-ikhlas'
import { SECTIONS as AL_FALAQ_S,   SURAH_META as AL_FALAQ_M   } from './al-falaq'
import { SECTIONS as AN_NAS_S,     SURAH_META as AN_NAS_M     } from './an-nas'
import { SECTIONS as AL_FIL_S,     SURAH_META as AL_FIL_M     } from './al-fil'
import { SECTIONS as QURAYSH_S,    SURAH_META as QURAYSH_M    } from './quraysh'
import { SECTIONS as AL_MAUN_S,    SURAH_META as AL_MAUN_M    } from './al-maun'
import { SECTIONS as AL_KAFIRUN_S, SURAH_META as AL_KAFIRUN_M } from './al-kafirun'
import { SECTIONS as AN_NASR_S,    SURAH_META as AN_NASR_M    } from './an-nasr'

export const SURAH_DATA_MAP = {
  'al-fatiha':  { sections: AL_FATIHA_S,  meta: AL_FATIHA_M  },
  'al-waqia':   { sections: AL_WAQIA_S,   meta: AL_WAQIA_M   },
  'al-mulk':    { sections: AL_MULK_S,    meta: AL_MULK_M    },
  'al-rahman':  { sections: AL_RAHMAN_S,  meta: AL_RAHMAN_M  },
  'al-asr':     { sections: AL_ASR_S,     meta: AL_ASR_M     },
  'al-kawthar': { sections: AL_KAWTHAR_S, meta: AL_KAWTHAR_M },
  'al-ikhlas':  { sections: AL_IKHLAS_S,  meta: AL_IKHLAS_M  },
  'al-falaq':   { sections: AL_FALAQ_S,   meta: AL_FALAQ_M   },
  'an-nas':     { sections: AN_NAS_S,     meta: AN_NAS_M     },
  'al-fil':     { sections: AL_FIL_S,     meta: AL_FIL_M     },
  'quraysh':    { sections: QURAYSH_S,    meta: QURAYSH_M    },
  'al-maun':    { sections: AL_MAUN_S,    meta: AL_MAUN_M    },
  'al-kafirun': { sections: AL_KAFIRUN_S, meta: AL_KAFIRUN_M },
  'an-nasr':    { sections: AN_NASR_S,    meta: AN_NASR_M    },
}
