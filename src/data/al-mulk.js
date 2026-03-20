// src/data/al-mulk.js
// Surah Al-Mulk (67) — The Sovereignty — 30 ayahs — Makki
// Audio absolute ayah offset: 5241 (ayah 1 = absolute 5242)

export const SURAH_META = {
  number:    67,
  name:      'Al-Mulk',
  arabic:    'الملك',
  meaning:   'The Sovereignty',
  ayahs:     30,
  revelation:'Makki',
  theme:     "Allah's absolute sovereignty — life, death, and accountability",
  reciterId: 'Husary_128kbps',
  audioOffset: 5241,   // add ayah number to get absolute position on CDN
}

export const SECTIONS = [
  {
    id: 'sovereignty', label: 'Sovereignty & Creation', arabic: 'الملك والخلق',
    ayahs: '1–5', color: '#D4A843', icon: '✦',
    summary: 'All sovereignty belongs to Allah. He created life and death as a test. He built the seven heavens perfectly — can you find any flaw?',
    memTip: `Opens with the word Mulk (sovereignty) — the surah's name is its first word. Ayahs 3–4 repeat the challenge: look again and again, your eye returns exhausted.`,
    verses: [
      { n:1,  ar:'تَبَٰرَكَ ٱلَّذِى بِيَدِهِ ٱلْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَىْءٍ قَدِيرٌ',         tr:"Ta-baa-ra-kal  la-dhee  bi-ya-di-hil  mul-ku  wa  hu-wa  'a-laa  kul-li  shay-in  qa-deer",      en:'Blessed is He in whose hand is all sovereignty — He is over all things capable' },
      { n:2,  ar:'ٱلَّذِى خَلَقَ ٱلْمَوْتَ وَٱلْحَيَوٰةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا وَهُوَ ٱلْعَزِيزُ ٱلْغَفُورُ', tr:"Al-la-dhee  kha-la-qal  maw-ta  wal-Ha-yaa-ta  li-yab-lu-wa-kum  ay-yu-kum  aH-sa-nu  'a-ma-laa  wa  hu-wal  'a-zee-zul  gha-foor", en:'He who created death and life to test which of you is best in deed — He is the Almighty, the Forgiving' },
      { n:3,  ar:'ٱلَّذِى خَلَقَ سَبْعَ سَمَٰوَٰتٍ طِبَاقًا مَّا تَرَىٰ فِى خَلْقِ ٱلرَّحْمَٰنِ مِن تَفَٰوُتٍ فَٱرْجِعِ ٱلْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ', tr:"Al-la-dhee  kha-la-qa  sab-'a  sa-maa-waa-tin  Ti-baa-qaa  maa  ta-raa  fee  khal-qir  raH-maa-ni  min  ta-faa-wu-tin  far-ji-'il  ba-Sa-ra  hal  ta-raa  min  fu-Toor", en:'He who created seven heavens in layers — you see no inconsistency in the creation of the Most Merciful. Look again — do you see any flaw?' },
      { n:4,  ar:'ثُمَّ ٱرْجِعِ ٱلْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ ٱلْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ',  tr:"Thum-mar-ji-'il  ba-Sa-ra  kar-ra-tay-ni  yan-qa-lib  i-lay-kal  ba-Sa-ru  khaa-si-an  wa  hu-wa  Ha-seer", en:'Then look again and again — your sight will return to you humbled and exhausted' },
      { n:5,  ar:'وَلَقَدْ زَيَّنَّا ٱلسَّمَآءَ ٱلدُّنْيَا بِمَصَٰبِيحَ وَجَعَلْنَٰهَا رُجُومًا لِّلشَّيَٰطِينِ وَأَعْتَدْنَا لَهُمْ عَذَابَ ٱلسَّعِيرِ', tr:"Wa  la-qad  zay-yan-nas  sa-maa-ad  dun-yaa  bi-ma-Saa-beeH-a  wa  ja-'al-naa-haa  ru-joo-mal  lish-shay-aa-Tee-na  wa  a'-tad-naa  la-hum  'a-dhaa-bas  sa-'eer", en:'And We adorned the nearest heaven with lamps and made them missiles against the devils — We have prepared for them the punishment of the Blaze' },
    ],
  },
  {
    id: 'hellfire', label: 'The Hellfire', arabic: 'جهنم',
    ayahs: '6–11', color: '#C0504D', icon: '🔥',
    summary: 'Those who disbelieve are thrown into Hell — they hear its roaring as they are questioned. They admit they ignored the warnings.',
    memTip: `The keepers ask: "Did no warner come to you?" — the disbelievers admit yes, but we denied. This question-and-confession pattern makes it easy to memorize.`,
    verses: [
      { n:6,  ar:'وَلِلَّذِينَ كَفَرُوا۟ بِرَبِّهِمْ عَذَابُ جَهَنَّمَ وَبِئْسَ ٱلْمَصِيرُ',              tr:"Wa  lil-la-dhee-na  ka-fa-roo  bi-rab-bi-him  'a-dhaa-bu  ja-han-na-ma  wa  bi-sal  ma-Seer",   en:'For those who disbelieve in their Lord is the punishment of Hell — what a terrible destination' },
      { n:7,  ar:'إِذَآ أُلْقُوا۟ فِيهَا سَمِعُوا۟ لَهَا شَهِيقًا وَهِىَ تَفُورُ',                       tr:"I-dhaa  ul-qoo  fee-haa  sa-mi-'oo  la-haa  sha-hee-qaw  wa  hiy-ya  ta-foor",                 en:'When they are thrown into it, they hear it roaring as it boils over' },
      { n:8,  ar:'تَكَادُ تَمَيَّزُ مِنَ ٱلْغَيْظِ كُلَّمَآ أُلْقِىَ فِيهَا فَوْجٌ سَأَلَهُمْ خَزَنَتُهَآ أَلَمْ يَأْتِكُمْ نَذِيرٌ', tr:"Ta-kaa-du  ta-may-ya-zu  mi-nal  ghay-Zi  kul-la-maa  ul-qi-ya  fee-haa  faw-jun  sa-a-la-hum  kha-za-na-tu-haa  a-lam  ya-ti-kum  na-dheer", en:'It almost bursts with rage. Every time a group is thrown in, its keepers ask: did no warner come to you?' },
      { n:9,  ar:'قَالُوا۟ بَلَىٰ قَدْ جَآءَنَا نَذِيرٌ فَكَذَّبْنَا وَقُلْنَا مَا نَزَّلَ ٱللَّهُ مِن شَىْءٍ إِنْ أَنتُمْ إِلَّا فِى ضَلَٰلٍ كَبِيرٍ', tr:"Qaa-loo  ba-laa  qad  jaa-a-naa  na-dhee-run  fa-kadh-dhab-naa  wa  qul-naa  maa  naz-za-lal-laa-hu  min  shay-in  in  an-tum  il-laa  fee  Da-laa-lin  ka-beer", en:'They say: yes, a warner did come to us but we denied him, saying Allah has not revealed anything — you are in great error' },
      { n:10, ar:'وَقَالُوا۟ لَوْ كُنَّا نَسْمَعُ أَوْ نَعْقِلُ مَا كُنَّا فِىٓ أَصْحَٰبِ ٱلسَّعِيرِ',      tr:"Wa  qaa-loo  law  kun-naa  nas-ma-'u  aw  na-'qi-lu  maa  kun-naa  fee  as-Haa-bis  sa-'eer",  en:'And they say: if only we had listened or reasoned, we would not be among the companions of the Blaze' },
      { n:11, ar:'فَٱعْتَرَفُوا۟ بِذَنۢبِهِمْ فَسُحْقًا لِّأَصْحَٰبِ ٱلسَّعِيرِ',                         tr:"Fa-'-ta-ra-foo  bi-dham-bi-him  fa-suH-qal  li-as-Haa-bis  sa-'eer",                           en:'So they admit their sin — away with the companions of the Blaze!' },
    ],
  },
  {
    id: 'forgiveness', label: 'Fear & Forgiveness', arabic: 'الخشية والمغفرة',
    ayahs: '12–14', color: '#4CAF8A', icon: '🌿',
    summary: 'Those who fear Allah in secret have forgiveness and great reward. Allah knows what is concealed — He is All-Aware.',
    memTip: `Short section — only 3 ayahs. Contrast with the previous section on Hell. Fear in secret → reward. Allah created us and knows the secrets of every heart.`,
    verses: [
      { n:12, ar:'إِنَّ ٱلَّذِينَ يَخْشَوْنَ رَبَّهُم بِٱلْغَيْبِ لَهُم مَّغْفِرَةٌ وَأَجْرٌ كَبِيرٌ',    tr:"In-nal  la-dhee-na  yakh-shaw-na  rab-ba-hum  bil-ghay-bi  la-hum  magh-fi-ra-tuw  wa  aj-run  ka-beer", en:'Indeed those who fear their Lord unseen will have forgiveness and a great reward' },
      { n:13, ar:'وَأَسِرُّوا۟ قَوْلَكُمْ أَوِ ٱجْهَرُوا۟ بِهِۦٓ إِنَّهُۥ عَلِيمٌۢ بِذَاتِ ٱلصُّدُورِ',    tr:"Wa  a-sir-roo  qaw-la-kum  a-wij-ha-roo  bi-hee  in-na-hu  'a-lee-mum  bi-dhaa-tiS  Su-door",  en:'Whether you speak quietly or aloud — He knows what is within the hearts' },
      { n:14, ar:'أَلَا يَعْلَمُ مَنْ خَلَقَ وَهُوَ ٱللَّطِيفُ ٱلْخَبِيرُ',                               tr:"A-laa  ya'-la-mu  man  kha-la-qa  wa  hu-wal  la-Tee-ful  kha-beer",                           en:'Would He not know what He created? He is the Subtle, the Aware' },
    ],
  },
  {
    id: 'earth', label: 'Signs on Earth', arabic: 'آيات الأرض',
    ayahs: '15–22', color: '#9B59B6', icon: '🌱',
    summary: 'Allah made the earth gentle for you — walk and eat from it. He could swallow you up or send a storm. Look at the birds — who holds them up but Allah?',
    memTip: `Four rhetorical questions — "Are you sure He won't...?" builds tension. The birds analogy (ayah 19) is one of the most vivid in the Quran.`,
    verses: [
      { n:15, ar:'هُوَ ٱلَّذِى جَعَلَ لَكُمُ ٱلْأَرْضَ ذَلُولًا فَٱمْشُوا۟ فِى مَنَاكِبِهَا وَكُلُوا۟ مِن رِّزْقِهِۦ وَإِلَيْهِ ٱلنُّشُورُ', tr:"Hu-wal  la-dhee  ja-'a-la  la-ku-mul  ar-Da  dha-loo-lan  fam-shoo  fee  ma-naa-ki-bi-haa  wa  ku-loo  mir  riz-qi-hee  wa  i-lay-hin  nu-shoor", en:'He is the One who made the earth gentle for you — walk through its regions and eat from His provision. To Him is the resurrection' },
      { n:16, ar:'ءَأَمِنتُم مَّن فِى ٱلسَّمَآءِ أَن يَخْسِفَ بِكُمُ ٱلْأَرْضَ فَإِذَا هِىَ تَمُورُ',      tr:"A-a-min-tum  man  fis  sa-maa-i  an  yakh-si-fa  bi-ku-mul  ar-Da  fa-i-dhaa  hi-ya  ta-moor",  en:'Are you sure that He who is above will not cause the earth to swallow you as it quakes?' },
      { n:17, ar:'أَمْ أَمِنتُم مَّن فِى ٱلسَّمَآءِ أَن يُرْسِلَ عَلَيْكُمْ حَاصِبًا فَسَتَعْلَمُونَ كَيْفَ نَذِيرِ', tr:"Am  a-min-tum  man  fis  sa-maa-i  an  yur-si-la  'a-lay-kum  Haa-Si-ban  fa-sa-ta'-la-moo-na  kay-fa  na-dheer", en:'Or are you sure He will not send a storm of stones against you? Then you will know how My warning was' },
      { n:18, ar:'وَلَقَدْ كَذَّبَ ٱلَّذِينَ مِن قَبْلِهِمْ فَكَيْفَ كَانَ نَكِيرِ',                        tr:"Wa  la-qad  kadh-dha-bal  la-dhee-na  min  qab-li-him  fa-kay-fa  kaa-na  na-keer",             en:'And those before them also denied — so how terrible was My reproach' },
      { n:19, ar:'أَوَلَمْ يَرَوْا۟ إِلَى ٱلطَّيْرِ فَوْقَهُمْ صَٰٓفَّٰتٍ وَيَقْبِضْنَ مَا يُمْسِكُهُنَّ إِلَّا ٱلرَّحْمَٰنُ إِنَّهُۥ بِكُلِّ شَىْءٍۭ بَصِيرٌ', tr:"A-wa  lam  ya-raw  i-laT  Tay-ri  faw-qa-hum  Saaf-faa-tin  wa  yaq-biD-na  maa  yum-si-ku-hun-na  il-lar  raH-maa-nu  in-na-hu  bi-kul-li  shay-in  ba-Seer", en:'Do they not see the birds above them spreading and folding their wings? None holds them up except the Most Merciful — He sees all things' },
      { n:20, ar:'أَمَّنْ هَٰذَا ٱلَّذِى هُوَ جُندٌ لَّكُمْ يَنصُرُكُم مِّن دُونِ ٱلرَّحْمَٰنِ إِنِ ٱلْكَٰفِرُونَ إِلَّا فِى غُرُورٍ', tr:"Am-man  haa-dhal  la-dhee  hu-wa  jun-dul  la-kum  yan-Su-ru-kum  min  doo-nir  raH-maa-ni  i-nil  kaa-fi-roo-na  il-laa  fee  ghuroor", en:'Who is this that could be an army for you to help you other than the Most Merciful? The disbelievers are in nothing but delusion' },
      { n:21, ar:'أَمَّنْ هَٰذَا ٱلَّذِى يَرْزُقُكُمْ إِنْ أَمْسَكَ رِزْقَهُۥ بَل لَّجُّوا۟ فِى عُتُوٍّ وَنُفُورٍ', tr:"Am-man  haa-dhal  la-dhee  yar-zu-qu-kum  in  am-sa-ka  riz-qa-hu  bal  laj-joo  fee  'u-tuw-wiw  wa  nu-foor", en:'Who is this that could provide for you if He withheld His provision? Yet they persist in arrogance and aversion' },
      { n:22, ar:'أَفَمَن يَمْشِى مُكِبًّا عَلَىٰ وَجْهِهِۦٓ أَهْدَىٰٓ أَمَّن يَمْشِى سَوِيًّا عَلَىٰ صِرَٰطٍ مُّسْتَقِيمٍ', tr:"A-fa-man  yam-shee  mu-kib-ban  'a-laa  waj-hi-hee  ah-daa  am-man  yam-shee  sa-wiy-yan  'a-laa  Si-raa-Tim  mus-ta-qeem", en:'Is one who walks fallen on his face better guided, or one who walks upright on a straight path?' },
    ],
  },
  {
    id: 'warning', label: 'The Final Warning', arabic: 'الإنذار الأخير',
    ayahs: '23–30', color: '#E67E22', icon: '📖',
    summary: 'Allah gave you hearing, sight and hearts — yet you are ungrateful. He scattered you across the earth. When will the promised Day come? Only Allah knows. He is the Most Merciful — believe in Him.',
    memTip: `The surah closes with 3 "Say" (قل) commands — ayahs 26, 28, 29. Each one is Allah telling the Prophet what to reply to the disbelievers. Pattern: question → Say: ...`,
    verses: [
      { n:23, ar:'قُلْ هُوَ ٱلَّذِىٓ أَنشَأَكُمْ وَجَعَلَ لَكُمُ ٱلسَّمْعَ وَٱلْأَبْصَٰرَ وَٱلْأَفْـِٔدَةَ قَلِيلًا مَّا تَشْكُرُونَ', tr:"Qul  hu-wal  la-dhee  an-sha-a-kum  wa  ja-'a-la  la-ku-mus  sam-'a  wal-ab-Saa-ra  wal-af-i-da-ta  qa-lee-lam  maa  tash-ku-roon", en:'Say: He is the One who created you and gave you hearing, sight, and hearts — little do you give thanks' },
      { n:24, ar:'قُلْ هُوَ ٱلَّذِى ذَرَأَكُمْ فِى ٱلْأَرْضِ وَإِلَيْهِ تُحْشَرُونَ',                       tr:"Qul  hu-wal  la-dhee  dha-ra-a-kum  fil  ar-Di  wa  i-lay-hi  tuH-sha-roon",                   en:'Say: He is the One who scattered you across the earth — and to Him you will be gathered' },
      { n:25, ar:'وَيَقُولُونَ مَتَىٰ هَٰذَا ٱلْوَعْدُ إِن كُنتُمْ صَٰدِقِينَ',                           tr:"Wa  ya-qoo-loo-na  ma-taa  haa-dhal  wa'-du  in  kun-tum  Saa-di-qeen",                         en:'And they say: when will this promise be fulfilled, if you are truthful?' },
      { n:26, ar:'قُلْ إِنَّمَا ٱلْعِلْمُ عِندَ ٱللَّهِ وَإِنَّمَآ أَنَا۠ نَذِيرٌ مُّبِينٌ',               tr:"Qul  in-na-mal  'il-mu  'in-dal-laa-hi  wa  in-na-maa  a-na  na-dhee-rum  mu-been",             en:'Say: knowledge of it is only with Allah — I am only a clear warner' },
      { n:27, ar:'فَلَمَّا رَأَوْهُ زُلْفَةً سِيٓـَٔتْ وُجُوهُ ٱلَّذِينَ كَفَرُوا۟ وَقِيلَ هَٰذَا ٱلَّذِى كُنتُم بِهِۦ تَدَّعُونَ', tr:"Fa-lam-maa  ra-aw-hu  zul-fa-tan  see-at  wu-joo-hul  la-dhee-na  ka-fa-roo  wa  qee-la  haa-dhal  la-dhee  kun-tum  bi-hee  tad-da-'oon", en:'When they see it approaching, the faces of the disbelievers will be stricken — and it will be said: this is what you used to call for' },
      { n:28, ar:'قُلْ أَرَءَيْتُمْ إِنْ أَهْلَكَنِىَ ٱللَّهُ وَمَن مَّعِىَ أَوْ رَحِمَنَا فَمَن يُجِيرُ ٱلْكَٰفِرِينَ مِنْ عَذَابٍ أَلِيمٍ', tr:"Qul  a-ra-ay-tum  in  ah-la-ka-ni-yal-laa-hu  wa  mam  ma-'i-ya  aw  ra-Hi-ma-naa  fa-man  yu-jee-rul  kaa-fi-ree-na  min  'a-dhaa-bin  a-leem", en:'Say: whether Allah destroys me and those with me or shows us mercy — who will protect the disbelievers from a painful punishment?' },
      { n:29, ar:'قُلْ هُوَ ٱلرَّحْمَٰنُ ءَامَنَّا بِهِۦ وَعَلَيْهِ تَوَكَّلْنَا فَسَتَعْلَمُونَ مَنْ هُوَ فِى ضَلَٰلٍ مُّبِينٍ', tr:"Qul  hu-war  raH-maa-nu  aa-man-naa  bi-hee  wa  'a-lay-hi  ta-wak-kal-naa  fa-sa-ta'-la-moo-na  man  hu-wa  fee  Da-laa-lim  mu-been", en:'Say: He is the Most Merciful — we believe in Him and upon Him we rely. You will soon know who is in clear error' },
      { n:30, ar:'قُلْ أَرَءَيْتُمْ إِنْ أَصْبَحَ مَآؤُكُمْ غَوْرًا فَمَن يَأْتِيكُم بِمَآءٍ مَّعِينٍۭ',    tr:"Qul  a-ra-ay-tum  in  as-ba-Ha  maa-u-kum  ghaw-ran  fa-man  ya-tee-kum  bi-maa-im  ma-'een",   en:'Say: if your water were to sink into the earth, who could bring you flowing water?' },
    ],
  },
]
