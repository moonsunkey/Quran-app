// Master surah list — add data files as you build them out.
// "available: true" means the full ayah data exists in /data/surah{N}.js
export const SURAH_LIST = [
  { number: 1,   name: 'Al-Fatiha',    arabic: 'الفاتحة',  ayahs: 7,   meaning: 'The Opening',          available: false },
  { number: 36,  name: 'Ya-Sin',       arabic: 'يس',        ayahs: 83,  meaning: 'Ya Sin',               available: false },
  { number: 55,  name: 'Ar-Rahman',    arabic: 'الرحمن',   ayahs: 78,  meaning: 'The Most Merciful',    available: false },
  { number: 56,  name: 'Al-Waqia',     arabic: 'الواقعة',  ayahs: 96,  meaning: 'The Inevitable Event', available: true  },
  { number: 67,  name: 'Al-Mulk',      arabic: 'الملك',    ayahs: 30,  meaning: 'The Sovereignty',      available: false },
  { number: 78,  name: 'An-Naba',      arabic: 'النبأ',    ayahs: 40,  meaning: 'The News',             available: false },
  { number: 112, name: 'Al-Ikhlas',    arabic: 'الإخلاص', ayahs: 4,   meaning: 'Sincerity',            available: false },
  { number: 113, name: 'Al-Falaq',     arabic: 'الفلق',   ayahs: 5,   meaning: 'The Daybreak',         available: false },
  { number: 114, name: 'An-Nas',       arabic: 'الناس',   ayahs: 6,   meaning: 'Mankind',              available: false },
]

export const SECTION_COLORS = {
  opening:   '#D4A843',
  sabiqun:   '#4CAF8A',
  yamin:     '#5B8FD4',
  shimal:    '#C0504D',
  signs:     '#9B59B6',
  quran_sec: '#E67E22',
  death:     '#7F8C8D',
}
