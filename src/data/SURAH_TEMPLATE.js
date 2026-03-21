// ============================================================
// SURAH DATA TEMPLATE — read this entire file before starting
// ============================================================
// Copy this file, rename it (e.g. al-rahman.js), fill in data
// Then add it to SurahPage.jsx and HomePage.jsx
//
// ── CRITICAL RULES (every rule exists because it broke a build) ──────────────
//
// RULE 1: tr MUST use double quotes
//   ✓ tr:"Bis-mil-laa-hir  raH-maa-nir  ra-Heem"
//   ✗ tr:'Bis-mil-laa-hir  raH-maa-nir  ra-Heem'
//   WHY: The ayn symbol (') inside a single-quoted string breaks JS parsing
//
// RULE 2: zh and hi MUST use double quotes
//   ✓ zh:"奉至仁至慈的真主之名"
//   ✗ zh:'奉至仁至慈的真主之名'
//   ✗ zh:`奉至仁至慈的真主之名`
//   WHY: Chinese text often contains ' characters, backticks caused parse errors
//        Double quotes are the only safe option for zh and hi fields
//
// RULE 3: memTip and summary strings containing apostrophes use backticks
//   ✓ memTip: `Allah's mercy is the theme`
//   ✗ memTip: 'Allah\'s mercy is the theme'
//
// RULE 4: en uses single quotes (safe — English text rarely has apostrophes)
//         If en contains an apostrophe, use double quotes instead:
//   ✓ en:"Don't be among those who forget"
//   ✗ en:'Don't be among those who forget'
//
// RULE 5: ar uses single quotes (safe — Arabic has no apostrophes)
//   ✓ ar:'بِسْمِ ٱللَّهِ'
//
// RULE 6: Any number of SECTIONS works — MapTab is fully dynamic
//   You can have 2, 4, 5, 7 sections — no hardcoded limits
//
// RULE 7: audioOffset = total ayahs in all surahs before this one
//   Al-Fatiha = 0 (ayah 1 = absolute position 1)
//   Al-Baqarah = 7
//   ...
//   Al-Waqia (56) = 4979
//   Al-Mulk (67) = 5241
//   Find yours at: https://api.quran.com/api/v4/verses/by_key/{surah}:{ayah}
//
// ── ADDING TO THE APP (3 files to update) ────────────────────────────────────
//
// 1. src/pages/SurahPage.jsx — add import and register in SURAH_DATA_MAP:
//    import { SECTIONS as AL_XXX_SECTIONS, SURAH_META as AL_XXX_META } from '../data/al-xxx'
//    'al-xxx': { sections: AL_XXX_SECTIONS, meta: AL_XXX_META },
//
// 2. src/pages/HomePage.jsx — add entry to SURAHS array:
//    { id:'al-xxx', number:XX, name:'Al-Xxx', arabic:'...', meaning:'...',
//      ayahs:XX, difficulty:'Beginner', status:'available', color:'#XXXXXX',
//      description:'...' }
//
// 3. That's it — no changes needed to SurahViewer, Header, or App
//
// ── WORD-BY-WORD DATA (optional but powerful) ────────────────────────────────
// If you include a `words` array on a verse, the expanded view shows
// interactive word cards instead of just syllable chips.
// Each word: { ar:'...', tr:"...", en:'...', zh:"...", hi:"..." }
// tr in word objects also must use double quotes (same Rule 1)
//
// ── CHECKLIST BEFORE PUSHING ─────────────────────────────────────────────────
// □ All tr fields use double quotes
// □ All zh fields use double quotes
// □ All hi fields use double quotes  
// □ No apostrophes inside single-quoted strings
// □ Run: npm run build — must show ✓ built with no errors
// □ Test in browser: open the surah, check Learn tab, Map tab, Practice tab
// □ Commit message: "Add Surah [Name] ([number])"
// ============================================================

export const SURAH_META = {
  number:      0,              // surah number (1–114)
  name:        'Al-Example',   // English transliterated name
  arabic:      'الاسم',        // Arabic name
  meaning:     'The Meaning',  // English meaning
  ayahs:       0,              // total ayahs
  revelation:  'Makki',        // 'Makki' or 'Madani'
  theme:       `Theme of the surah`,  // use backticks for safety
  reciterId:   'Husary_128kbps',      // default reciter — don't change
  audioOffset: 0,              // absolute ayah number of ayah 1 minus 1
}

export const SECTIONS = [
  {
    id:        'section-one',   // unique ID, lowercase, no spaces
    label:     'Section Title', // English label shown in UI
    arabic:    'عنوان القسم',   // Arabic section heading
    ayahs:     '1–10',          // ayah range as string
    color:     '#D4A843',       // hex colour for this section
    icon:      '✦',             // emoji or symbol
    summary:   'Brief summary of what this section covers.',
    summaryZh: "中文摘要",       // Chinese summary (double quotes)
    summaryHi: "हिंदी सारांश",  // Hindi summary (double quotes)
    memTip:    `Memory tip — use backticks so apostrophes don't break things.`,
    verses: [
      // FIELD QUOTE RULES SUMMARY:
      //   ar:  single quotes  ✓
      //   tr:  DOUBLE quotes  ✓ (NEVER single — ayn ' will break it)
      //   en:  single quotes  ✓ (use double if contains apostrophe)
      //   zh:  DOUBLE quotes  ✓ (NEVER single or backtick)
      //   hi:  DOUBLE quotes  ✓ (NEVER single or backtick)
      {
        n:  1,
        ar: 'Arabic text here',
        tr: "Syl-la-bi-fied  trans-li-ter-aa-tion",
        en: 'English translation here',
        zh: "中文翻译",
        hi: "हिंदी अनुवाद",
        // words array is optional — include for key surahs like Al-Fatiha
        words: [
          { ar:'word', tr:"syl-la-ble", en:'meaning', zh:"含义", hi:"अर्थ" },
        ],
      },
      {
        n:  2,
        ar: 'Arabic text here',
        tr: "Syl-la-bi-fied  trans-li-ter-aa-tion",
        en: 'English translation here',
        zh: "中文翻译",
        hi: "हिंदी अनुवाद",
      },
    ],
  },

  {
    id:        'section-two',
    label:     'Section Two Title',
    arabic:    'عنوان القسم الثاني',
    ayahs:     '11–20',
    color:     '#4CAF8A',
    icon:      '🌿',
    summary:   'Brief summary of section two.',
    summaryZh: "第二节摘要",
    summaryHi: "दूसरे खंड का सारांश",
    memTip:    `Memory tip for section two.`,
    verses: [
      {
        n:  11,
        ar: 'Arabic text here',
        tr: "Syl-la-bi-fied  trans-li-ter-aa-tion",
        en: 'English translation here',
        zh: "中文翻译",
        hi: "हिंदी अनुवाद",
      },
    ],
  },

  // Add as many sections as needed — app handles any number automatically
]
