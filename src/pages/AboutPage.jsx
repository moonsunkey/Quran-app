// src/pages/AboutPage.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'

const CONTENT = {
  en: {
    subtitle: 'A free tool for new Muslims and non-Arabic speakers',
    storyTitle: 'WHY THIS EXISTS',
    story1: 'I took my shahada 15 years ago. Growing up Chinese and non-Muslim, Arabic felt completely foreign — the script, the sounds, the way words connect. I wanted to memorize the Quran, but every resource I found assumed either a childhood background in Arabic or access to a teacher who could sit with me.',
    story2: "I couldn't find a tool simple enough for someone coming in with no Arabic at all. So I built one — designed around the learning needs of converts and new Muslims starting from scratch.",
    sections: [
      {
        title: 'What is this app?',
        color: '#D4A843',
        body: 'A structured system for memorizing the Quran surah by surah — built for people who did not grow up with Arabic. Every ayah shows:',
        bullets: [
          ['Arabic text', 'The actual Quran — large, clear script'],
          ['Transliteration', 'Every word broken into syllables, colour-coded for pronunciation'],
          ['Translation', 'English, Chinese, or Hindi — toggle any combination on or off'],
        ],
        extra: 'Every ayah has a play button for recitation audio, and a word-by-word breakdown connecting each Arabic word to its meaning in all selected languages.',
      },
      {
        title: 'Languages supported',
        color: '#4CAF8A',
        body: 'Toggle any combination of three languages from the surah header:',
        langs: [
          ['#D4A843', 'EN — English', 'On by default'],
          ['#4CAF8A', '中文 — Simplified Chinese', 'For Chinese-speaking converts and learners'],
          ['#FF7043', 'हिंदी — Hindi', 'For Hindi-speaking learners across India and the diaspora'],
        ],
        extra: 'Word-by-word breakdowns (available in Al-Fatiha) show all selected languages connected to each Arabic word.',
      },
      {
        title: "Who it's for",
        color: '#5B8FD4',
        checks: [
          'New Muslims (converts) learning to recite for the first time',
          'Non-Arabic speakers from any background',
          'Chinese, Hindi, and English-speaking communities',
          'People who know some Arabic but struggle with pronunciation',
          'Parents teaching children who grew up in non-Muslim households',
        ],
      },
      {
        title: 'How to use it',
        color: '#9B59B6',
        steps: [
          ['Start with Al-Fatiha', 'Only 7 ayahs — recited in every rakat of every prayer, at least 17 times daily. Start here.'],
          ['Read the Guide tab first', 'The 📚 Guide tab explains every Arabic sound, especially the 9 that do not exist in English.'],
          ['Set your language', 'Tap EN · 中文 · हिंदी at the top to show translations in your language — or all three at once.'],
          ['Listen before you read', 'Press ▶ on an ayah to hear the recitation. Listen once before reading along.'],
          ['Follow the colour-coded transliteration', 'Gold = normal · Teal = stretch the vowel · Orange = difficult sound.'],
          ['Expand for word-by-word', 'Tap ▼ to see each Arabic word matched to its meaning in all selected languages.'],
          ['Practice mode', 'Hide Arabic, transliteration, or translation to test your memory layer by layer.'],
          ['Auto-play', '▶▶ Auto-play plays through a whole section — the screen scrolls and highlights each ayah automatically.'],
          ['Mark done', 'Tap ○ when you can recite without looking. Progress saves and shows on the home screen.'],
        ],
      },
      {
        title: 'Colours in the transliteration',
        color: '#81d4c0',
        colors: [
          ['#D4A843', 'Gold', 'Normal sound — read as written'],
          ['#81d4c0', 'Teal', 'Long vowel (aa, ee, oo) — hold for 2 beats'],
          ['#E6944A', 'Orange', 'Hard Arabic sound — the Guide tab explains each one'],
        ],
      },
      {
        title: 'Audio',
        color: '#E67E22',
        body: 'Recitation by Mahmoud Khalil Al-Husary — chosen for his slow, clear delivery, ideal for learners. Switch to Al-Afasy, Abdul Basit, or Al-Minshawi inside any surah.',
      },
      {
        title: 'Spaced Repetition',
        color: '#4CAF8A',
        body: 'Mark ayahs done → they enter your daily review queue. The app brings them back at the perfect time — just before you forget. Uses the SM-2 algorithm (same as Anki). Start reviews from the home page.',
      },
      {
        title: 'Chunk Mode',
        color: '#9B59B6',
        body: 'Long ayahs split into 2–4 word chunks. Master each chunk then chain them — the method used by hafiz teachers worldwide. Enable in the Learn tab.',
      },
      {
        title: 'Progress',
        color: '#D4A843',
        body: 'Everything saves automatically. Sign in to sync across your phone, tablet, and computer.',
      },
    ],
    dua: 'رَبَّنَا تَقَبَّلْ مِنَّا',
    duaTranslation: '"Our Lord, accept [this] from us." — Al-Baqarah 2:127',
    duaNote: 'May Allah make this a means of benefit for every person who finds it, and accept it as a good deed. آمين',
    cta: '← Start Learning',
  },
  zh: {
    subtitle: '为新穆斯林和非阿拉伯语母语者提供的免费工具',
    storyTitle: '为什么要建立这个应用',
    story1: '我在15年前念了清真言。作为一名华人，在非穆斯林环境中长大，阿拉伯语对我来说完全陌生——字母、发音、词语的连接方式，一切都那么遥远。我想记诵《古兰经》，但我找到的每一个资源都假设学习者有阿拉伯语背景，或者能找到老师面对面指导。',
    story2: '我找不到一个足够简单的工具来帮助像我这样完全零基础的人。于是，我自己建了一个——专为皈依者和从零开始的新穆斯林设计。',
    sections: [
      {
        title: '这个应用是什么？',
        color: '#D4A843',
        body: '一个逐章记诵《古兰经》的结构化系统，专为没有阿拉伯语背景的人设计。每段经文显示：',
        bullets: [
          ['阿拉伯语原文', '《古兰经》原文——大字体，清晰易读'],
          ['音译', '每个词按音节拆分，用颜色标注发音难度'],
          ['翻译', '中文、英文或印地语——可随意切换任意组合'],
        ],
        extra: '每段经文都有播放按钮，还有逐词解析功能，将每个阿拉伯词连接到所选语言的含义。',
      },
      {
        title: '支持的语言',
        color: '#4CAF8A',
        body: '在苏拉标题栏中可以切换任意语言组合：',
        langs: [
          ['#D4A843', 'EN — 英语', '默认开启'],
          ['#4CAF8A', '中文 — 简体中文', '为华语皈依者和学习者'],
          ['#FF7043', 'हिंदी — 印地语', '为印度及海外印地语学习者'],
        ],
        extra: '逐词解析（目前在开端章中提供）会将所有选定语言连接到每个阿拉伯词。',
      },
      {
        title: '适合谁使用',
        color: '#5B8FD4',
        checks: [
          '第一次学习诵读的新穆斯林（皈依者）',
          '任何非阿拉伯语母语背景的人',
          '华语、印地语和英语社区的穆斯林',
          '懂一些阿拉伯语但发音不准的人',
          '在非穆斯林家庭长大的孩子的父母',
        ],
      },
      {
        title: '如何使用',
        color: '#9B59B6',
        steps: [
          ['从开端章开始', '只有7节经文——每次礼拜的每个拉卡特都要诵读，每天至少17次。从这里开始。'],
          ['先阅读指南选项卡', '📚 指南选项卡解释每个阿拉伯语发音，尤其是9个英语中不存在的音。'],
          ['设置语言', '点击顶部的 EN · 中文 · हिंदी 按钮——可同时开启多个语言。'],
          ['先聆听再阅读', '点击 ▶ 收听诵读。先听一遍再跟读。'],
          ['跟随颜色编码的音译', '金色=正常发音 · 青色=拉长元音 · 橙色=难音。'],
          ['展开逐词解析', '点击 ▼ 查看每个阿拉伯词与所选语言含义的对应。'],
          ['练习模式', '隐藏阿拉伯语、音译或翻译，逐层测试记忆。'],
          ['自动播放', '▶▶ 自动播放整个章节——屏幕自动滚动并高亮显示当前经文。'],
          ['标记完成', '诵读时无需看稿了，点击 ○ 标记。进度自动保存并显示在主页。'],
        ],
      },
      {
        title: '音译颜色说明',
        color: '#81d4c0',
        colors: [
          ['#D4A843', '金色', '普通发音——按字母拼读即可'],
          ['#81d4c0', '青色', '长元音（aa, ee, oo）——需持续发音2拍'],
          ['#E6944A', '橙色', '难发音——详见指南选项卡'],
        ],
      },
      {
        title: '音频诵读',
        color: '#E67E22',
        body: '诵读者为马哈茂德·哈利勒·侯萨里（Mahmoud Khalil Al-Husary）——以其缓慢清晰的诵读风格著称，非常适合初学者。在任意苏拉中可切换为阿法西、阿卜杜勒·巴斯特或明沙维。',
      },
      {
        title: '间隔重复记忆',
        color: '#4CAF8A',
        body: '标记经文完成 → 进入每日复习队列。应用在遗忘前提醒复习，使用SM-2算法。从主页开始复习。',
      },
      {
        title: '分块模式',
        color: '#9B59B6',
        body: '长节分成2-4词小块，逐块掌握再串联——全球哈菲兹教师的方法。在学习标签启用。',
      },
      {
        title: '进度保存',
        color: '#D4A843',
        body: '一切自动保存。登录后可跨设备同步。',
      },
    ],
    dua: 'رَبَّنَا تَقَبَّلْ مِنَّا',
    duaTranslation: '"我们的主啊，求你接受我们的功修。" — 《古兰经》2:127',
    duaNote: '愿真主使这个应用成为对每一位找到它的人的恩赐，并将其作为善功接受。آمين',
    cta: '← 开始学习',
  },
  hi: {
    subtitle: 'नए मुसलमानों और ग़ैर-अरबी बोलने वालों के लिए एक मुफ़्त टूल',
    storyTitle: 'यह ऐप क्यों बनाया',
    story1: 'मैंने 15 साल पहले शहादा पढ़ा। चीनी पृष्ठभूमि में ग़ैर-मुस्लिम परिवार में पला-बढ़ा — अरबी भाषा मेरे लिए बिल्कुल अजनबी थी। मैं क़ुरआन हिफ़्ज़ करना चाहता था, लेकिन हर संसाधन यह मान लेता था कि सीखने वाले का अरबी में बचपन से रिश्ता है या कोई उस्ताद मौजूद है।',
    story2: 'मुझे कोई ऐसा टूल नहीं मिला जो बिल्कुल शुरू से सिखाए। इसलिए मैंने ख़ुद बनाया — नए मुसलमानों और इस्लाम क़बूल करने वालों के लिए जो ज़ीरो से शुरू कर रहे हैं।',
    sections: [
      {
        title: 'यह ऐप क्या है?',
        color: '#D4A843',
        body: 'क़ुरआन को सूरह-दर-सूरह याद करने का एक व्यवस्थित तरीक़ा — उन लोगों के लिए जो अरबी के साथ नहीं पले-बढ़े। हर आयत में दिखता है:',
        bullets: [
          ['अरबी मूल पाठ', 'असली क़ुरआन — बड़े और साफ़ अक्षरों में'],
          ['तर्जुमा-ए-हर्फ़', 'हर शब्द को अक्षरों में बाँटा गया, रंग से उच्चारण की कठिनाई दर्शाई गई'],
          ['अनुवाद', 'हिंदी, अंग्रेज़ी या चीनी — कोई भी कॉम्बिनेशन चुनें'],
        ],
        extra: 'हर आयत में तिलावत सुनने का बटन है, और शब्द-दर-शब्द विश्लेषण जो हर अरबी शब्द को चुनी हुई भाषा के अर्थ से जोड़ता है।',
      },
      {
        title: 'भाषाएँ',
        color: '#4CAF8A',
        body: 'सूरह के हेडर से कोई भी भाषा चालू-बंद करें:',
        langs: [
          ['#D4A843', 'EN — अंग्रेज़ी', 'डिफ़ॉल्ट रूप से चालू'],
          ['#4CAF8A', '中文 — सरलीकृत चीनी', 'चीनी भाषी मुसलमानों के लिए'],
          ['#FF7043', 'हिंदी — हिंदी', 'भारत और प्रवासी हिंदी भाषियों के लिए'],
        ],
        extra: 'शब्द-दर-शब्द विश्लेषण (अभी सूरह अल-फ़ातिहा में) सभी चुनी हुई भाषाओं में अर्थ दिखाता है।',
      },
      {
        title: 'किनके लिए है?',
        color: '#5B8FD4',
        checks: [
          'नए मुसलमान (इस्लाम क़बूल करने वाले) जो पहली बार तिलावत सीख रहे हैं',
          'किसी भी ग़ैर-अरबी पृष्ठभूमि के लोग',
          'हिंदी, चीनी और अंग्रेज़ी बोलने वाले समुदाय',
          'जो थोड़ी अरबी जानते हैं लेकिन उच्चारण में दिक्कत है',
          'वे माता-पिता जो ग़ैर-मुस्लिम घर में पले बच्चों को सिखाना चाहते हैं',
        ],
      },
      {
        title: 'कैसे इस्तेमाल करें',
        color: '#9B59B6',
        steps: [
          ['सूरह अल-फ़ातिहा से शुरू करें', 'सिर्फ़ 7 आयतें — हर नमाज़ की हर रकात में पढ़ी जाती है, दिन में कम से कम 17 बार। यहाँ से शुरू करें।'],
          ['पहले गाइड टैब पढ़ें', '📚 गाइड टैब हर अरबी आवाज़ समझाता है — ख़ासकर वे 9 आवाज़ें जो हिंदी में नहीं होतीं।'],
          ['भाषा सेट करें', 'ऊपर EN · 中文 · हिंदी बटन दबाएँ — एक साथ कई भाषाएँ चालू कर सकते हैं।'],
          ['पहले सुनें फिर पढ़ें', '▶ दबाएँ और तिलावत सुनें। पहले एक बार सुनें, फिर साथ पढ़ें।'],
          ['रंग-कोड वाले तर्जुमा-ए-हर्फ़ को फ़ॉलो करें', 'सुनहरा = सामान्य · नीला-हरा = स्वर खींचें · नारंगी = कठिन आवाज़।'],
          ['शब्द-दर-शब्द विस्तार देखें', '▼ दबाएँ — हर अरबी शब्द का अर्थ चुनी हुई भाषाओं में देखें।'],
          ['प्रैक्टिस मोड', 'अरबी, तर्जुमा-ए-हर्फ़ या अनुवाद छुपाएँ और याददाश्त जाँचें।'],
          ['ऑटो-प्ले', '▶▶ पूरे सेक्शन को अपने-आप चलाता है — स्क्रीन स्क्रॉल होती है और हर आयत हाइलाइट होती है।'],
          ['हो गया मार्क करें', 'बिना देखे पढ़ लें तो ○ दबाएँ। प्रगति अपने-आप सेव होती है और होम स्क्रीन पर दिखती है।'],
        ],
      },
      {
        title: 'रंगों का मतलब',
        color: '#81d4c0',
        colors: [
          ['#D4A843', 'सुनहरा', 'सामान्य आवाज़ — जैसा लिखा है वैसे पढ़ें'],
          ['#81d4c0', 'नीला-हरा', 'लंबा स्वर (aa, ee, oo) — 2 बीट तक खींचें'],
          ['#E6944A', 'नारंगी', 'कठिन अरबी आवाज़ — गाइड टैब में विस्तार से समझाया है'],
        ],
      },
      {
        title: 'ऑडियो',
        color: '#E67E22',
        body: 'तिलावत महमूद ख़लील अल-हुसरी की — धीमी और साफ़ आवाज़ के लिए मशहूर, नए सीखने वालों के लिए बेहतरीन। किसी भी सूरह में अल-अफ़सी, अब्दुल बासित, या मिनशावी में बदल सकते हैं।',
      },
      {
        title: 'स्पेस्ड रिपीटिशन',
        color: '#4CAF8A',
        body: 'आयतें पूरी करें → रोज़ाना रिव्यू क्यू में जाती हैं। SM-2 एल्गोरिदम से सही वक़्त पर याद दिलाता है। होम पेज से शुरू करें।',
      },
      {
        title: 'चंक मोड',
        color: '#9B59B6',
        body: 'लंबी आयतें 2-4 शब्दों में बंटती हैं। हर हिस्सा याद करके जोड़ें। लर्न टैब में चालू करें।',
      },
      {
        title: 'प्रगति',
        color: '#D4A843',
        body: 'सब कुछ अपने-आप सेव होता है। साइन इन करके सिंक करें।',
      },
    ],
    dua: 'رَبَّنَا تَقَبَّلْ مِنَّا',
    duaTranslation: '"हमारे रब! हमसे क़बूल फ़रमा।" — अल-बक़रह 2:127',
    duaNote: 'अल्लाह इस ऐप को हर उस इंसान के लिए फ़ायदेमंद बनाए जो इसे पाए, और नेकी के तौर पर क़बूल फ़रमाए। آمين',
    cta: '← सीखना शुरू करें',
  },
}

export default function AboutPage() {
  const [lang, setLang] = useState('en')
  const c = CONTENT[lang]

  return (
    <main style={{ maxWidth:680, margin:'0 auto', padding:'32px 20px', fontFamily:"'Lato','Palatino Linotype',Georgia,serif", color:'#ddd5c0' }}>

      {/* Header */}
      <div style={{ textAlign:'center', marginBottom:32 }}>
        <div style={{ fontSize:48, fontFamily:'Amiri,serif', color:'#D4A843', marginBottom:12 }}>الـقـرآن</div>
        <h1 style={{ fontSize:22, color:'#D4A843', fontWeight:700, marginBottom:8 }}>Quran Memorization</h1>
        <p style={{ fontSize:14, color:'#7a6a52', lineHeight:1.8, marginBottom:16 }}>{c.subtitle}</p>

        {/* Language selector */}
        <div style={{ display:'flex', gap:6, justifyContent:'center' }}>
          {[['en','English'],['zh','中文'],['hi','हिंदी']].map(([l,label]) => (
            <button key={l} onClick={() => setLang(l)} style={{
              padding:'6px 16px', borderRadius:20, border:'none', cursor:'pointer', fontSize:13,
              background: lang===l ? '#D4A843' : 'rgba(255,255,255,0.06)',
              color: lang===l ? '#06101c' : '#6a5a40',
              fontWeight: lang===l ? 700 : 400,
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* Origin story */}
      <div style={{ marginBottom:36, padding:'20px 24px', background:'rgba(212,168,67,0.06)', border:'1px solid rgba(212,168,67,0.15)', borderRadius:16 }}>
        <div style={{ fontSize:11, color:'#D4A843', letterSpacing:2, marginBottom:10 }}>{c.storyTitle}</div>
        <p style={{ fontSize:15, color:'#a09070', lineHeight:1.9, margin:0 }}>{c.story1}</p>
        <p style={{ fontSize:15, color:'#a09070', lineHeight:1.9, margin:'12px 0 0' }}>{c.story2}</p>
      </div>

      {/* Dynamic sections */}
      {c.sections.map((sec, i) => (
        <Section key={i} title={sec.title} color={sec.color}>
          {sec.body && <p style={{ marginBottom: sec.bullets || sec.langs ? 12 : 0 }}>{sec.body}</p>}
          {sec.bullets && (
            <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom: sec.extra ? 12 : 0 }}>
              {sec.bullets.map(([t,d]) => (
                <div key={t} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                  <div style={{ width:6, height:6, borderRadius:'50%', background:sec.color, flexShrink:0, marginTop:7 }} />
                  <div><strong style={{ color:'#ddd5c0' }}>{t}</strong> — {d}</div>
                </div>
              ))}
            </div>
          )}
          {sec.langs && (
            <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom: sec.extra ? 12 : 0 }}>
              {sec.langs.map(([c,name,desc]) => (
                <div key={name} style={{ display:'flex', gap:10, alignItems:'flex-start', padding:'8px 12px', background:`rgba(255,255,255,0.02)`, border:`1px solid rgba(255,255,255,0.07)`, borderRadius:8 }}>
                  <div style={{ width:10, height:10, borderRadius:2, background:c, flexShrink:0, marginTop:4 }} />
                  <div>
                    <div style={{ fontSize:14, color:c, fontWeight:700, marginBottom:1 }}>{name}</div>
                    <div style={{ fontSize:12, color:'#7a6a52' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {sec.checks && (
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {sec.checks.map((t,i) => (
                <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                  <span style={{ color:sec.color, flexShrink:0 }}>✓</span>
                  <span style={{ fontSize:14 }}>{t}</span>
                </div>
              ))}
            </div>
          )}
          {sec.steps && (
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {sec.steps.map(([title,desc], i) => (
                <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                  <div style={{ width:28, height:28, borderRadius:'50%', border:`1.5px solid rgba(155,89,182,0.4)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, color:'#9B59B6', flexShrink:0 }}>{i+1}</div>
                  <div>
                    <div style={{ fontSize:14, color:'#ddd5c0', fontWeight:600, marginBottom:2 }}>{title}</div>
                    <div style={{ fontSize:13, color:'#7a6a52', lineHeight:1.6 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {sec.colors && (
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {sec.colors.map(([c,name,desc]) => (
                <div key={name} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                  <div style={{ width:14, height:14, borderRadius:3, background:c, flexShrink:0, marginTop:3 }} />
                  <div>
                    <div style={{ fontSize:14, color:c, fontWeight:700 }}>{name}</div>
                    <div style={{ fontSize:13, color:'#7a6a52' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {sec.extra && <p style={{ marginTop:10 }}>{sec.extra}</p>}
        </Section>
      ))}

      {/* Dua */}
      <div style={{ textAlign:'center', margin:'40px 0 20px', padding:'24px', background:'rgba(212,168,67,0.06)', border:'1px solid rgba(212,168,67,0.15)', borderRadius:16 }}>
        <div style={{ fontSize:22, fontFamily:'Amiri,serif', color:'#D4A843', marginBottom:10, lineHeight:1.8 }}>{c.dua}</div>
        <div style={{ fontSize:13, color:'#7a6a52', fontStyle:'italic', marginBottom:8 }}>{c.duaTranslation}</div>
        <div style={{ fontSize:12, color:'#4a3a28', lineHeight:1.7 }}>{c.duaNote}</div>
      </div>

      <div style={{ textAlign:'center', marginTop:24 }}>
        <Link to="/" style={{ display:'inline-block', padding:'12px 32px', borderRadius:10, background:'rgba(212,168,67,0.12)', border:'1px solid rgba(212,168,67,0.3)', color:'#D4A843', textDecoration:'none', fontSize:15, fontWeight:600 }}>
          {c.cta}
        </Link>
      </div>
    </main>
  )
}

function Section({ title, color, children }) {
  const rgbMap = {
    '#D4A843':'212,168,67','#4CAF8A':'76,175,138','#5B8FD4':'91,143,212',
    '#81d4c0':'129,212,192','#9B59B6':'155,89,182','#E67E22':'230,126,34',
  }
  const rgb = rgbMap[color] || '180,180,180'
  return (
    <div style={{ marginBottom:32 }}>
      <div style={{ fontSize:17, color, fontWeight:700, marginBottom:12, paddingBottom:8, borderBottom:`1px solid rgba(${rgb},0.2)` }}>{title}</div>
      <div style={{ fontSize:14, color:'#a09070', lineHeight:1.8 }}>{children}</div>
    </div>
  )
}
