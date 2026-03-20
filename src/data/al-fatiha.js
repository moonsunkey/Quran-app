// src/data/al-fatiha.js
// Surah Al-Fatiha (1) — The Opening — 7 ayahs — Makki
// Recited in every rakat of every prayer — the most recited surah in the Quran

export const SURAH_META = {
  number:     1,
  name:       'Al-Fatiha',
  arabic:     'الفاتحة',
  meaning:    'The Opening',
  ayahs:      7,
  revelation: 'Makki',
  theme:      `The complete conversation between the servant and Allah — praise, gratitude, and guidance`,
  reciterId:  'Husary_128kbps',
  audioOffset: 0,  // Ayah 1 = absolute position 1
}

export const SECTIONS = [
  {
    id:      'bismillah',
    label:   'In the Name of Allah',
    arabic:  'بسم الله',
    ayahs:   '1',
    color:   '#D4A843',
    icon:    '✦',
    summary: 'Every surah begins with this — the opening invocation. Recited before starting any good action.',
    memTip:  `The most repeated phrase in Islam. You already know this one — بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ`,
    verses: [
      { n:1, ar:'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', tr:"Bis-mil-laa-hir  raH-maa-nir  ra-Heem", en:'In the name of Allah, the Most Gracious, the Most Merciful' },
    ],
  },
  {
    id:      'praise',
    label:   'Praise & Gratitude',
    arabic:  'الحمد والشكر',
    ayahs:   '2–4',
    color:   '#4CAF8A',
    icon:    '🌿',
    summary: 'All praise belongs to Allah — Lord of all worlds, the Most Merciful, Master of the Day of Judgment.',
    memTip:  `Three attributes of Allah in three ayahs: Lord of worlds → Most Merciful → Master of Judgment. Each builds on the last.`,
    verses: [
      { n:2, ar:'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ',         tr:"Al-Ham-du  lil-laa-hi  rab-bil  'aa-la-meen",         en:'All praise is for Allah — Lord of all the worlds' },
      { n:3, ar:'ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',                        tr:"Ar-raH-maa-nir  ra-Heem",                             en:'The Most Gracious, the Most Merciful' },
      { n:4, ar:'مَٰلِكِ يَوْمِ ٱلدِّينِ',                        tr:"Maa-li-ki  yaw-mid  deen",                            en:'Master of the Day of Judgment' },
    ],
  },
  {
    id:      'worship',
    label:   'Devotion & Prayer',
    arabic:  'العبادة والاستعانة',
    ayahs:   '5',
    color:   '#5B8FD4',
    icon:    '🤲',
    summary: 'The pivot of the surah — the servant speaks directly to Allah: You alone we worship, You alone we ask for help.',
    memTip:  `Ayah 5 is the centre of Al-Fatiha. It shifts from ABOUT Allah to TO Allah. Notice "we" — this is a communal prayer.`,
    verses: [
      { n:5, ar:'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', tr:"Iy-yaa-ka  na'-bu-du  wa  iy-yaa-ka  nas-ta-'een", en:'You alone we worship, and You alone we ask for help' },
    ],
  },
  {
    id:      'guidance',
    label:   'The Request',
    arabic:  'الدعاء',
    ayahs:   '6–7',
    color:   '#9B59B6',
    icon:    '🌙',
    summary: 'The ultimate prayer — guide us to the straight path, the path of those You blessed, not those who went astray.',
    memTip:  `The surah ends with a dua (supplication). Ayah 6 is the request; ayah 7 describes it. Muslims recite this at least 17 times daily in prayer.`,
    verses: [
      { n:6, ar:'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ',                                                     tr:"Ih-di-naS  Si-raa-Tal  mus-ta-qeem",                                                        en:'Guide us to the straight path' },
      { n:7, ar:'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ', tr:"Si-raa-Tal  la-dhee-na  an-'am-ta  'a-lay-him  ghay-ril  magh-Doo-bi  'a-lay-him  wa-laD  Daal-leen", en:'The path of those You have blessed — not of those who earned anger, nor of those who went astray' },
    ],
  },
]
