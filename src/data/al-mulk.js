// src/data/al-mulk.js — Surah Al-Mulk (67) — 30 ayahs
// zh: Ma Jian translation (马坚译本)  hi: Standard Hindi Islamic translation
// All zh and hi fields use double quotes — never single quotes

export const SURAH_META = {
  number: 67, name: 'Al-Mulk', arabic: 'الملك',
  meaning: 'The Sovereignty', meaningZh: '国权章', meaningHi: 'बादशाही',
  ayahs: 30, revelation: 'Makki',
  theme: "Allah's absolute sovereignty — life, death, and accountability",
  reciterId: 'Husary_128kbps',
  audioOffset: 5241,
}

export const SECTIONS = [
  {
    id:'sovereignty', label:'Sovereignty & Creation', arabic:'الملك والخلق',
    labelZh:'主权与创造', labelHi:'बादशाही और तख़लीक़',
    ayahs:'1–5', color:'#D4A843', icon:'✦',
    summary:"All sovereignty belongs to Allah. He created life and death as a test. He built the seven heavens perfectly — can you find any flaw?",
    summaryZh:'一切主权属于真主。他创造了生死作为考验。他完美地创造了七层天——你能找到任何缺陷吗？',
    summaryHi:'सारी बादशाही अल्लाह की है। उसने ज़िंदगी और मौत को आज़माइश के तौर पर बनाया। सात आसमान कामिल बनाए — कोई खामी मिलती है?',
    memTip:"Opens with the word Mulk (sovereignty) — the surah's name is its first word.",
    verses:[
      { n:1,  ar:'تَبَٰرَكَ ٱلَّذِى بِيَدِهِ ٱلْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَىْءٍ قَدِيرٌ', tr:"Ta-baa-ra-kal  la-dhee  bi-ya-di-hil  mul-ku  wa  hu-wa  'a-laa  kul-li  shay-in  qa-deer", en:'Blessed is He in whose hand is all sovereignty — He is over all things capable', zh:"至福的是他，君权在他手中，他对一切事物是全能的", hi:"बड़ा बरकत वाला है वह जिसके हाथ में बादशाही है और वह हर चीज़ पर क़ादिर है" },
      { n:2,  ar:'ٱلَّذِى خَلَقَ ٱلْمَوْتَ وَٱلْحَيَوٰةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا وَهُوَ ٱلْعَزِيزُ ٱلْغَفُورُ', tr:"Al-la-dhee  kha-la-qal  maw-ta  wal-Ha-yaa-ta  li-yab-lu-wa-kum  ay-yu-kum  aH-sa-nu  'a-ma-laa  wa  hu-wal  'a-zee-zul  gha-foor", en:'He who created death and life to test which of you is best in deed', zh:"他创造了死和生，以便考验你们谁的行为更好，他是万能的，至赦的", hi:"जिसने मौत और ज़िंदगी पैदा की ताकि तुम्हें आज़माए कि कौन अच्छे काम करता है" },
      { n:3,  ar:'ٱلَّذِى خَلَقَ سَبْعَ سَمَٰوَٰتٍ طِبَاقًا مَّا تَرَىٰ فِى خَلْقِ ٱلرَّحْمَٰنِ مِن تَفَٰوُتٍ فَٱرْجِعِ ٱلْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ', tr:"Al-la-dhee  kha-la-qa  sab-'a  sa-maa-waa-tin  Ti-baa-qaa  maa  ta-raa  fee  khal-qir  raH-maa-ni  min  ta-faa-wu-tin  far-ji-'il  ba-Sa-ra  hal  ta-raa  min  fu-Toor", en:'He who created seven heavens in layers — look again, do you see any flaw?', zh:"他创造了七层天，你在至仁主的创造中看不见任何缺陷，你再看，能看到任何裂缝吗", hi:"जिसने सात आसमान तहों-पर-तह बनाए — रहमान की बनावट में कोई खामी नहीं — कोई दरार नज़र आती है" },
      { n:4,  ar:'ثُمَّ ٱرْجِعِ ٱلْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ ٱلْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ', tr:"Thum-mar-ji-'il  ba-Sa-ra  kar-ra-tay-ni  yan-qa-lib  i-lay-kal  ba-Sa-ru  khaa-si-an  wa  hu-wa  Ha-seer", en:'Look again and again — your sight returns humbled and exhausted', zh:"然后你再看两次，目光将疲惫地垂落到你的眼前", hi:"फिर बार-बार नज़र दौड़ाओ — नज़र थकी-हारी तुम्हारी तरफ लौट आएगी" },
      { n:5,  ar:'وَلَقَدْ زَيَّنَّا ٱلسَّمَآءَ ٱلدُّنْيَا بِمَصَٰبِيحَ وَجَعَلْنَٰهَا رُجُومًا لِّلشَّيَٰطِينِ وَأَعْتَدْنَا لَهُمْ عَذَابَ ٱلسَّعِيرِ', tr:"Wa  la-qad  zay-yan-nas  sa-maa-ad  dun-yaa  bi-ma-Saa-beeH-a  wa  ja-'al-naa-haa  ru-joo-mal  lish-shay-aa-Tee-na  wa  a'-tad-naa  la-hum  'a-dhaa-bas  sa-'eer", en:'We adorned the nearest heaven with lamps and made them missiles against the devils', zh:"我确实用灯笼装饰了最近的天，并使它们成为驱赶恶魔的手段", hi:"हमने क़रीबी आसमान को चिराग़ों से सजाया और शैतानों को मारने का ज़रिया बनाया" },
    ]
  },
  {
    id:'hellfire', label:'The Hellfire', arabic:'جهنم',
    labelZh:'火狱', labelHi:'जहन्नम',
    ayahs:'6–11', color:'#C0504D', icon:'🔥',
    summary:'Those who disbelieve are thrown into Hell — they hear its roaring, admit they ignored the warnings.',
    summaryZh:'那些不信道的人被投入火狱——他们听到它的咆哮，承认他们忽视了警告。',
    summaryHi:'काफ़िरों को जहन्नम में डाला जाएगा — उसकी आवाज़ सुनेंगे, मानेंगे कि चेतावनी को नज़रअंदाज़ किया।',
    memTip:"The keepers ask: 'Did no warner come?' The disbelievers admit yes, but we denied.",
    verses:[
      { n:6,  ar:'وَلِلَّذِينَ كَفَرُوا۟ بِرَبِّهِمْ عَذَابُ جَهَنَّمَ وَبِئْسَ ٱلْمَصِيرُ', tr:"Wa  lil-la-dhee-na  ka-fa-roo  bi-rab-bi-him  'a-dhaa-bu  ja-han-na-ma  wa  bi-sal  ma-Seer", en:'For those who disbelieve in their Lord is the punishment of Hell — what a terrible destination', zh:"那些不信道的人将受到火狱的惩罚，而那是一个恶劣的归宿", hi:"जिन्होंने अपने रब का इनकार किया उनके लिए जहन्नम का अज़ाब है" },
      { n:7,  ar:'إِذَآ أُلْقُوا۟ فِيهَا سَمِعُوا۟ لَهَا شَهِيقًا وَهِىَ تَفُورُ', tr:"I-dhaa  ul-qoo  fee-haa  sa-mi-'oo  la-haa  sha-hee-qaw  wa  hiy-ya  ta-foor", en:'When they are thrown into it, they hear it roaring as it boils over', zh:"当他们被投入其中时，他们将听到它狂啸，同时它在沸腾", hi:"जब उसमें डाले जाएंगे तो उसकी चिंघाड़ सुनेंगे जबकि वह खौल रही होगी" },
      { n:8,  ar:'تَكَادُ تَمَيَّزُ مِنَ ٱلْغَيْظِ كُلَّمَآ أُلْقِىَ فِيهَا فَوْجٌ سَأَلَهُمْ خَزَنَتُهَآ أَلَمْ يَأْتِكُمْ نَذِيرٌ', tr:"Ta-kaa-du  ta-may-ya-zu  mi-nal  ghay-Zi  kul-la-maa  ul-qi-ya  fee-haa  faw-jun  sa-a-la-hum  kha-za-na-tu-haa  a-lam  ya-ti-kum  na-dheer", en:'It almost bursts with rage. Every time a group is thrown in, its keepers ask: did no warner come?', zh:"它几乎因愤怒而崩裂，每当一批人被投入，守卫便问他们：没有警告者来过你们吗", hi:"क़रीब है कि ग़ुस्से से फट जाए — दरोग़े पूछेंगे: क्या तुम्हारे पास डराने वाला नहीं आया था" },
      { n:9,  ar:'قَالُوا۟ بَلَىٰ قَدْ جَآءَنَا نَذِيرٌ فَكَذَّبْنَا وَقُلْنَا مَا نَزَّلَ ٱللَّهُ مِن شَىْءٍ إِنْ أَنتُمْ إِلَّا فِى ضَلَٰلٍ كَبِيرٍ', tr:"Qaa-loo  ba-laa  qad  jaa-a-naa  na-dhee-run  fa-kadh-dhab-naa  wa  qul-naa  maa  naz-za-lal-laa-hu  min  shay-in  in  an-tum  il-laa  fee  Da-laa-lin  ka-beer", en:'They say: yes, a warner came but we denied him and said Allah revealed nothing', zh:"他们说：警告者确实来过，但我们否认了他，并说真主没有降示任何东西", hi:"वे कहेंगे — आया था मगर हमने झुठलाया और कहा अल्लाह ने कुछ नहीं उतारा" },
      { n:10, ar:'وَقَالُوا۟ لَوْ كُنَّا نَسْمَعُ أَوْ نَعْقِلُ مَا كُنَّا فِىٓ أَصْحَٰبِ ٱلسَّعِيرِ', tr:"Wa  qaa-loo  law  kun-naa  nas-ma-'u  aw  na-'qi-lu  maa  kun-naa  fee  as-Haa-bis  sa-'eer", en:'And they say: if only we had listened or reasoned, we would not be in the Blaze', zh:"他们说：如果我们曾经倾听或思考，我们就不会是火狱的居民了", hi:"और वे कहेंगे — अगर हम सुनते या समझते तो भड़कती आग वालों में न होते" },
      { n:11, ar:'فَٱعْتَرَفُوا۟ بِذَنۢبِهِمْ فَسُحْقًا لِّأَصْحَٰبِ ٱلسَّعِيرِ', tr:"Fa-'-ta-ra-foo  bi-dham-bi-him  fa-suH-qal  li-as-Haa-bis  sa-'eer", en:'So they admit their sin — away with the companions of the Blaze!', zh:"于是他们承认了自己的罪过，远离那些火狱的居民", hi:"तो उन्होंने अपना गुनाह मान लिया — धिक्कार है भड़कती आग वालों पर" },
    ]
  },
  {
    id:'forgiveness', label:'Fear & Forgiveness', arabic:'الخشية والمغفرة',
    labelZh:'敬畏与宽恕', labelHi:'ख़ौफ़ और मग़फ़िरत',
    ayahs:'12–14', color:'#4CAF8A', icon:'🌿',
    summary:'Those who fear Allah unseen have forgiveness and great reward. He knows what is in the hearts.',
    summaryZh:'那些在无人见处敬畏真主的人将获得宽恕和巨大的奖赏。他知道心中所藏。',
    summaryHi:'जो बिना देखे अल्लाह से डरते हैं उनके लिए मग़फ़िरत और बड़ा अज्र है। वह दिलों के भेद जानता है।',
    memTip:'Only 3 ayahs. Contrast with the previous Hell section. Fear in secret leads to reward.',
    verses:[
      { n:12, ar:'إِنَّ ٱلَّذِينَ يَخْشَوْنَ رَبَّهُم بِٱلْغَيْبِ لَهُم مَّغْفِرَةٌ وَأَجْرٌ كَبِيرٌ', tr:"In-nal  la-dhee-na  yakh-shaw-na  rab-ba-hum  bil-ghay-bi  la-hum  magh-fi-ra-tuw  wa  aj-run  ka-beer", en:'Those who fear their Lord unseen will have forgiveness and a great reward', zh:"那些在无人见处敬畏主的人们，将获得宽恕和厚赏", hi:"जो लोग बिना देखे अपने रब से डरते हैं उनके लिए मग़फ़िरत और बड़ा अज्र है" },
      { n:13, ar:'وَأَسِرُّوا۟ قَوْلَكُمْ أَوِ ٱجْهَرُوا۟ بِهِۦٓ إِنَّهُۥ عَلِيمٌۢ بِذَاتِ ٱلصُّدُورِ', tr:"Wa  a-sir-roo  qaw-la-kum  a-wij-ha-roo  bi-hee  in-na-hu  'a-lee-mum  bi-dhaa-tiS  Su-door", en:'Whether you speak quietly or aloud — He knows what is within the hearts', zh:"你们无论是秘密地说话，还是公开地说，他确实知道内心之所藏", hi:"तुम बात छुपाओ या ज़ाहिर करो — वह दिलों के भेद जानता है" },
      { n:14, ar:'أَلَا يَعْلَمُ مَنْ خَلَقَ وَهُوَ ٱللَّطِيفُ ٱلْخَبِيرُ', tr:"A-laa  ya'-la-mu  man  kha-la-qa  wa  hu-wal  la-Tee-ful  kha-beer", en:'Would He not know what He created? He is the Subtle, the Aware', zh:"他难道不知道他所创造的吗？他是入微的，彻知的", hi:"क्या वह नहीं जानता जिसने पैदा किया — वह बारीकबीन, ख़बरदार है" },
    ]
  },
  {
    id:'earth', label:'Signs on Earth', arabic:'آيات الأرض',
    labelZh:'大地上的迹象', labelHi:'धरती की निशानियाँ',
    ayahs:'15–22', color:'#9B59B6', icon:'🌱',
    summary:'Allah made the earth gentle for you. He could swallow you up or send a storm. Look at the birds — who holds them up but Allah?',
    summaryZh:'真主使大地顺服于你们。他可以使大地吞没你们或发送风暴。看看飞鸟——除了真主，谁能托住它们？',
    summaryHi:'अल्लाह ने धरती को तुम्हारे लिए नर्म किया। वह धँसा भी सकता है। परिंदों को देखो — रहमान के सिवा कौन थामे हुए है?',
    memTip:'Four questions starting with: Are you sure He will not... builds rising tension.',
    verses:[
      { n:15, ar:'هُوَ ٱلَّذِى جَعَلَ لَكُمُ ٱلْأَرْضَ ذَلُولًا فَٱمْشُوا۟ فِى مَنَاكِبِهَا وَكُلُوا۟ مِن رِّزْقِهِۦ وَإِلَيْهِ ٱلنُّشُورُ', tr:"Hu-wal  la-dhee  ja-'a-la  la-ku-mul  ar-Da  dha-loo-lan  fam-shoo  fee  ma-naa-ki-bi-haa  wa  ku-loo  mir  riz-qi-hee  wa  i-lay-hin  nu-shoor", en:'He made the earth gentle for you — walk through it and eat from His provision', zh:"他是使大地顺服于你们的主，故你们在其四方行走，吃他的给养", hi:"वही है जिसने धरती को नर्म किया — उसके कंधों पर चलो और उसका रिज़्क़ खाओ" },
      { n:16, ar:'ءَأَمِنتُم مَّن فِى ٱلسَّمَآءِ أَن يَخْسِفَ بِكُمُ ٱلْأَرْضَ فَإِذَا هِىَ تَمُورُ', tr:"A-a-min-tum  man  fis  sa-maa-i  an  yakh-si-fa  bi-ku-mul  ar-Da  fa-i-dhaa  hi-ya  ta-moor", en:'Are you sure He above will not cause the earth to swallow you while it quakes?', zh:"你们可以相信，天上的主不会使大地把你们吞没，而大地正在震动着吗", hi:"क्या तुम आसमान वाले से बेख़ौफ़ हो कि वह धरती में धँसा दे और वह काँपने लगे" },
      { n:17, ar:'أَمْ أَمِنتُم مَّن فِى ٱلسَّمَآءِ أَن يُرْسِلَ عَلَيْكُمْ حَاصِبًا فَسَتَعْلَمُونَ كَيْفَ نَذِيرِ', tr:"Am  a-min-tum  man  fis  sa-maa-i  an  yur-si-la  'a-lay-kum  Haa-Si-ban  fa-sa-ta'-la-moo-na  kay-fa  na-dheer", en:'Or are you sure He will not send a storm of stones against you?', zh:"你们可以相信，天上的主不会向你们发射石块吗，你们将知道我的警告是怎样的", hi:"या आसमान वाले से बेख़ौफ़ हो कि वह पत्थर बरसाने वाली आँधी भेज दे" },
      { n:18, ar:'وَلَقَدْ كَذَّبَ ٱلَّذِينَ مِن قَبْلِهِمْ فَكَيْفَ كَانَ نَكِيرِ', tr:"Wa  la-qad  kadh-dha-bal  la-dhee-na  min  qab-li-him  fa-kay-fa  kaa-na  na-keer", en:'And those before them also denied — so how terrible was My reproach', zh:"在他们以前的人曾经否认了，然后看看我是怎样惩罚了他们的", hi:"उनसे पहले वालों ने भी झुठलाया था — तो कैसा था मेरा इनकार" },
      { n:19, ar:'أَوَلَمْ يَرَوْا۟ إِلَى ٱلطَّيْرِ فَوْقَهُمْ صَٰٓفَّٰتٍ وَيَقْبِضْنَ مَا يُمْسِكُهُنَّ إِلَّا ٱلرَّحْمَٰنُ إِنَّهُۥ بِكُلِّ شَىْءٍۭ بَصِيرٌ', tr:"A-wa  lam  ya-raw  i-laT  Tay-ri  faw-qa-hum  Saaf-faa-tin  wa  yaq-biD-na  maa  yum-si-ku-hun-na  il-lar  raH-maa-nu  in-na-hu  bi-kul-li  shay-in  ba-Seer", en:'Do they not see the birds above them spreading their wings? None holds them up but the Most Merciful', zh:"他们难道没有见过在他们头上翱翔的飞鸟吗，只有至仁主托住了它们，他确实看见万物", hi:"क्या उन्होंने परिंदों को नहीं देखा जो उड़ रहे हैं — रहमान के सिवा कोई नहीं थामे" },
      { n:20, ar:'أَمَّنْ هَٰذَا ٱلَّذِى هُوَ جُندٌ لَّكُمْ يَنصُرُكُم مِّن دُونِ ٱلرَّحْمَٰنِ إِنِ ٱلْكَٰفِرُونَ إِلَّا فِى غُرُورٍ', tr:"Am-man  haa-dhal  la-dhee  hu-wa  jun-dul  la-kum  yan-Su-ru-kum  min  doo-nir  raH-maa-ni  i-nil  kaa-fi-roo-na  il-laa  fee  ghuroor", en:'Who could be an army for you against the Most Merciful? The disbelievers are in nothing but delusion', zh:"这个人是谁，能作为你们的军队来抵御至仁主呢，不信道的人只是在极大的迷误中", hi:"यह कौन है जो रहमान के मुक़ाबले में तुम्हारी फ़ौज बन सके — काफ़िर तो बस धोखे में हैं" },
      { n:21, ar:'أَمَّنْ هَٰذَا ٱلَّذِى يَرْزُقُكُمْ إِنْ أَمْسَكَ رِزْقَهُۥ بَل لَّجُّوا۟ فِى عُتُوٍّ وَنُفُورٍ', tr:"Am-man  haa-dhal  la-dhee  yar-zu-qu-kum  in  am-sa-ka  riz-qa-hu  bal  laj-joo  fee  'u-tuw-wiw  wa  nu-foor", en:'Who could provide for you if He withheld His provision? Yet they persist in arrogance', zh:"这个人是谁，能在他收回给养时来供给你们呢，他们只是在傲慢和逃避中坚持", hi:"यह कौन है जो रोज़ी रोकने पर दे सके — वे सरकशी में अड़े हुए हैं" },
      { n:22, ar:'أَفَمَن يَمْشِى مُكِبًّا عَلَىٰ وَجْهِهِۦٓ أَهْدَىٰٓ أَمَّن يَمْشِى سَوِيًّا عَلَىٰ صِرَٰطٍ مُّسْتَقِيمٍ', tr:"A-fa-man  yam-shee  mu-kib-ban  'a-laa  waj-hi-hee  ah-daa  am-man  yam-shee  sa-wiy-yan  'a-laa  Si-raa-Tim  mus-ta-qeem", en:'Is one who walks fallen on his face better guided, or one who walks upright on a straight path?', zh:"那么，一个俯卧着走路的人和一个在正路上直立走路的人，哪个得到了正确引导", hi:"तो क्या जो औंधे मुँह चलता है वह ज़्यादा हिदायत याफ़्ता है या जो सीधे रास्ते पर चलता है" },
    ]
  },
  {
    id:'warning', label:'The Final Warning', arabic:'الإنذار الأخير',
    labelZh:'最后的警告', labelHi:'आखिरी चेतावनी',
    ayahs:'23–30', color:'#E67E22', icon:'📖',
    summary:'Allah gave you hearing, sight, and hearts. Three "Say" commands answer the disbelievers. The surah closes: who will bring you water if it sinks away?',
    summaryZh:'真主给了你们听觉、视觉和心灵。三个说命令回应了不信道者。苏拉以此结束：如果你们的水消失了，谁能给你们带来流动的泉水？',
    summaryHi:'अल्लाह ने तुम्हें कान, आँखें और दिल दिए। तीन क़ुल काफ़िरों को जवाब देते हैं। अंत: अगर पानी ज़मीन में उतर जाए तो कौन लाएगा?',
    memTip:'Three Say (قل) commands in ayahs 26, 28, 29. Pattern: question then Say.',
    verses:[
      { n:23, ar:'قُلْ هُوَ ٱلَّذِىٓ أَنشَأَكُمْ وَجَعَلَ لَكُمُ ٱلسَّمْعَ وَٱلْأَبْصَٰرَ وَٱلْأَفْـِٔدَةَ قَلِيلًا مَّا تَشْكُرُونَ', tr:"Qul  hu-wal  la-dhee  an-sha-a-kum  wa  ja-'a-la  la-ku-mus  sam-'a  wal-ab-Saa-ra  wal-af-i-da-ta  qa-lee-lam  maa  tash-ku-roon", en:'Say: He created you and gave you hearing, sight, and hearts — little do you give thanks', zh:"你说：他是创造你们的，并赋予你们听觉、视觉和心灵，但你们很少感谢", hi:"कह दो — वही है जिसने पैदा किया और कान, आँखें और दिल दिए — तुम कम ही शुक्र करते हो" },
      { n:24, ar:'قُلْ هُوَ ٱلَّذِى ذَرَأَكُمْ فِى ٱلْأَرْضِ وَإِلَيْهِ تُحْشَرُونَ', tr:"Qul  hu-wal  la-dhee  dha-ra-a-kum  fil  ar-Di  wa  i-lay-hi  tuH-sha-roon", en:'Say: He scattered you across the earth — and to Him you will be gathered', zh:"你说：他是在大地上繁殖你们的，向他那里你们将被聚集", hi:"कह दो — वही है जिसने धरती में फैलाया और उसी की तरफ इकट्ठे किए जाओगे" },
      { n:25, ar:'وَيَقُولُونَ مَتَىٰ هَٰذَا ٱلْوَعْدُ إِن كُنتُمْ صَٰدِقِينَ', tr:"Wa  ya-qoo-loo-na  ma-taa  haa-dhal  wa'-du  in  kun-tum  Saa-di-qeen", en:'And they say: when will this promise be fulfilled, if you are truthful?', zh:"他们说：如果你们是诚实的，这个许诺是什么时候实现呢", hi:"और वे कहते हैं — यह वादा कब पूरा होगा अगर तुम सच्चे हो" },
      { n:26, ar:'قُلْ إِنَّمَا ٱلْعِلْمُ عِندَ ٱللَّهِ وَإِنَّمَآ أَنَا۠ نَذِيرٌ مُّبِينٌ', tr:"Qul  in-na-mal  'il-mu  'in-dal-laa-hi  wa  in-na-maa  a-na  na-dhee-rum  mu-been", en:'Say: knowledge of it is only with Allah — I am only a clear warner', zh:"你说：知识只在真主那里，我只是一个明显的警告者", hi:"कह दो — इसका इल्म तो बस अल्लाह के पास है और मैं खुला डराने वाला हूँ" },
      { n:27, ar:'فَلَمَّا رَأَوْهُ زُلْفَةً سِيٓـَٔتْ وُجُوهُ ٱلَّذِينَ كَفَرُوا۟ وَقِيلَ هَٰذَا ٱلَّذِى كُنتُم بِهِۦ تَدَّعُونَ', tr:"Fa-lam-maa  ra-aw-hu  zul-fa-tan  see-at  wu-joo-hul  la-dhee-na  ka-fa-roo  wa  qee-la  haa-dhal  la-dhee  kun-tum  bi-hee  tad-da-'oon", en:'When they see it approaching, the disbelievers faces will be stricken — this is what you called for!', zh:"当他们亲眼看到它临近时，不信者的面孔将变得难看，并将被说：这就是你们曾经要求的", hi:"जब वे उसे नज़दीक देखेंगे तो काफ़िरों के चेहरे बिगड़ जाएंगे — यही है जो तुम माँगते थे" },
      { n:28, ar:'قُلْ أَرَءَيْتُمْ إِنْ أَهْلَكَنِىَ ٱللَّهُ وَمَن مَّعِىَ أَوْ رَحِمَنَا فَمَن يُجِيرُ ٱلْكَٰفِرِينَ مِنْ عَذَابٍ أَلِيمٍ', tr:"Qul  a-ra-ay-tum  in  ah-la-ka-ni-yal-laa-hu  wa  mam  ma-'i-ya  aw  ra-Hi-ma-naa  fa-man  yu-jee-rul  kaa-fi-ree-na  min  'a-dhaa-bin  a-leem", en:'Say: whether Allah destroys me or shows mercy — who will protect the disbelievers from painful punishment?', zh:"你说：如果真主毁灭了我和与我在一起的人，或者怜悯了我们，那么谁能救不信道的人呢", hi:"कह दो — अगर अल्लाह हलाक कर दे या रहम करे तो काफ़िरों को दर्दनाक अज़ाब से कौन बचाएगा" },
      { n:29, ar:'قُلْ هُوَ ٱلرَّحْمَٰنُ ءَامَنَّا بِهِۦ وَعَلَيْهِ تَوَكَّلْنَا فَسَتَعْلَمُونَ مَنْ هُوَ فِى ضَلَٰلٍ مُّبِينٍ', tr:"Qul  hu-war  raH-maa-nu  aa-man-naa  bi-hee  wa  'a-lay-hi  ta-wak-kal-naa  fa-sa-ta'-la-moo-na  man  hu-wa  fee  Da-laa-lim  mu-been", en:'Say: He is the Most Merciful — we believe in Him and rely on Him. You will know who is in clear error', zh:"你说：他是至仁主，我们信仰了他，我们全靠了他，不久你们就会知道谁是在明显的迷误中", hi:"कह दो — वह रहमान है — हम उस पर ईमान लाए और उसी पर भरोसा किया" },
      { n:30, ar:'قُلْ أَرَءَيْتُمْ إِنْ أَصْبَحَ مَآؤُكُمْ غَوْرًا فَمَن يَأْتِيكُم بِمَآءٍ مَّعِينٍۭ', tr:"Qul  a-ra-ay-tum  in  as-ba-Ha  maa-u-kum  ghaw-ran  fa-man  ya-tee-kum  bi-maa-im  ma-'een", en:'Say: if your water were to sink into the earth, who could bring you flowing water?', zh:"你说：如果你们的水沉没于大地，那么谁能来给你们供给流动的泉水呢", hi:"कह दो — बताओ अगर तुम्हारा पानी ज़मीन में उतर जाए तो कौन बहता पानी लाएगा" },
    ]
  },
]
