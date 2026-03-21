// src/pages/AboutPage.jsx
import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <main style={{ maxWidth:680, margin:'0 auto', padding:'32px 20px', fontFamily:"'Lato','Palatino Linotype',Georgia,serif", color:'#ddd5c0' }}>

      {/* Header */}
      <div style={{ textAlign:'center', marginBottom:40 }}>
        <div style={{ fontSize:48, fontFamily:'Amiri,serif', color:'#D4A843', marginBottom:12 }}>الـقـرآن</div>
        <h1 style={{ fontSize:22, color:'#D4A843', fontWeight:700, marginBottom:8 }}>Quran Memorization</h1>
        <p style={{ fontSize:14, color:'#7a6a52', lineHeight:1.8 }}>A free tool for new Muslims and non-Arabic speakers</p>
      </div>

      {/* Origin story */}
      <div style={{ marginBottom:36, padding:'20px 24px', background:'rgba(212,168,67,0.06)', border:'1px solid rgba(212,168,67,0.15)', borderRadius:16 }}>
        <div style={{ fontSize:11, color:'#D4A843', letterSpacing:2, marginBottom:10 }}>WHY THIS EXISTS</div>
        <p style={{ fontSize:15, color:'#a09070', lineHeight:1.9, margin:0 }}>
          I took my shahada 15 years ago. Growing up Chinese and non-Muslim, Arabic felt completely foreign — the script, the sounds, the way words connect. I wanted to memorize the Quran, but every resource I found assumed either a childhood background in Arabic or access to a teacher who could sit with me and correct my pronunciation.
        </p>
        <p style={{ fontSize:15, color:'#a09070', lineHeight:1.9, margin:'12px 0 0' }}>
          I couldn't find a tool simple enough for someone coming in with no Arabic at all. So I built one — designed around the learning needs of converts and new Muslims who are starting from scratch.
        </p>
      </div>

      {/* What is this */}
      <Section title="What is this app?" color="#D4A843">
        <p>A structured system for memorizing the Quran surah by surah — built specifically for people who didn't grow up with Arabic. Every ayah shows three layers at once:</p>
        <div style={{ marginTop:12, display:'flex', flexDirection:'column', gap:10 }}>
          {[
            ['Arabic text','The actual Quran — large, clear script'],
            ['Transliteration','Every word broken into syllables, colour-coded so you know exactly how to pronounce it'],
            ['English translation','So you understand what you are reciting, not just how to say it'],
          ].map(([t,d]) => (
            <div key={t} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'#D4A843', flexShrink:0, marginTop:7 }} />
              <div><strong style={{ color:'#ddd5c0' }}>{t}</strong> — {d}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop:12 }}>Every ayah also has a play button to hear how it sounds, recited by one of the world's most respected Quran reciters.</p>
      </Section>

      {/* Who it's for */}
      <Section title="Who it's for" color="#4CAF8A">
        <p>Anyone who wants to memorize the Quran but finds standard resources difficult — especially:</p>
        <div style={{ marginTop:10, display:'flex', flexDirection:'column', gap:8 }}>
          {[
            'New Muslims (converts) learning for the first time',
            'Non-Arabic speakers from any background',
            'People who know some Arabic but struggle with pronunciation',
            'Parents teaching children who grew up in non-Muslim households',
          ].map(t => (
            <div key={t} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
              <span style={{ color:'#4CAF8A', flexShrink:0 }}>✓</span>
              <span style={{ fontSize:14, color:'#a09070' }}>{t}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* How to use */}
      <Section title="How to use it" color="#5B8FD4">
        <Step n="1" color="#5B8FD4" title="Start with Al-Fatiha">
          Only 7 ayahs. Recited in every rakat of every prayer — at least 17 times a day. If you're new, begin here before anything else.
        </Step>
        <Step n="2" color="#5B8FD4" title="Read the Guide tab first">
          Open the 📚 Guide tab inside any surah. It explains every Arabic sound with English comparisons — especially the 9 sounds that don't exist in English at all.
        </Step>
        <Step n="3" color="#5B8FD4" title="Listen before you read">
          Press ▶ on an ayah to hear the recitation. Listen once all the way through before trying to read along.
        </Step>
        <Step n="4" color="#5B8FD4" title="Read along with the transliteration">
          Play it again and read the syllable-by-syllable transliteration out loud as you hear it. The colours guide you — teal means stretch the vowel, orange means a difficult sound to watch.
        </Step>
        <Step n="5" color="#5B8FD4" title="Cover and try alone">
          Expand the ayah (▼) to see the syllable breakdown. Then cover the transliteration and try to recite from the Arabic alone. Repeat 3 times.
        </Step>
        <Step n="6" color="#5B8FD4" title="Use Practice mode to test yourself">
          The 🧠 Practice tab lets you hide the Arabic, transliteration, or translation. Reveal each layer only when you need a hint.
        </Step>
        <Step n="7" color="#5B8FD4" title="Mark each ayah done">
          Tap ○ when you can recite an ayah without looking. Your progress saves automatically and shows on the home screen.
        </Step>
        <Step n="8" color="#5B8FD4" title="Use auto-play for listening practice">
          The ▶▶ Auto-play button plays through an entire section automatically. Great for listening on repeat while doing other things.
        </Step>
      </Section>

      {/* Colour guide */}
      <Section title="Understanding the colours" color="#81d4c0">
        <p style={{ marginBottom:14 }}>The transliteration is colour-coded so you can instantly see how to treat each syllable:</p>
        {[
          ['#D4A843', 'Gold',   'Normal sound — read as written, like any English word'],
          ['#81d4c0', 'Teal',   'Long vowel (aa, ee, oo) — hold it for 2 beats instead of 1'],
          ['#E6944A', 'Orange', 'Hard Arabic sound — needs extra attention. The Guide tab explains each one.'],
        ].map(([c,n,d]) => (
          <div key={n} style={{ display:'flex', gap:12, alignItems:'flex-start', marginBottom:12 }}>
            <div style={{ width:14, height:14, borderRadius:3, background:c, flexShrink:0, marginTop:3 }} />
            <div>
              <div style={{ fontSize:14, color:c, fontWeight:700 }}>{n}</div>
              <div style={{ fontSize:13, color:'#7a6a52', lineHeight:1.6 }}>{d}</div>
            </div>
          </div>
        ))}
      </Section>

      {/* Audio */}
      <Section title="Audio" color="#9B59B6">
        <p>Recitation is by <strong style={{ color:'#ddd5c0' }}>Mahmoud Khalil Al-Husary</strong> — chosen because his delivery is slow, clear, and precise. Ideal for learners. You can switch to Al-Afasy, Abdul Basit, or Al-Minshawi inside the surah viewer if you prefer a different style.</p>
      </Section>

      {/* Progress */}
      <Section title="Your progress" color="#E67E22">
        <p>Everything saves automatically to your device. Sign in to sync your progress across your phone, tablet, and computer — so you can practice anywhere and pick up exactly where you left off.</p>
      </Section>

      {/* Dua */}
      <div style={{ textAlign:'center', margin:'40px 0 20px', padding:'24px', background:'rgba(212,168,67,0.06)', border:'1px solid rgba(212,168,67,0.15)', borderRadius:16 }}>
        <div style={{ fontSize:22, fontFamily:'Amiri,serif', color:'#D4A843', marginBottom:10, lineHeight:1.8 }}>
          رَبَّنَا تَقَبَّلْ مِنَّا
        </div>
        <div style={{ fontSize:13, color:'#7a6a52', fontStyle:'italic', marginBottom:8 }}>
          "Our Lord, accept [this] from us." — Al-Baqarah 2:127
        </div>
        <div style={{ fontSize:12, color:'#4a3a28', lineHeight:1.7 }}>
          May Allah make this a means of benefit for every person who finds it,<br/>
          and accept it as a good deed. آمين
        </div>
      </div>

      <div style={{ textAlign:'center', marginTop:24 }}>
        <Link to="/" style={{ display:'inline-block', padding:'12px 32px', borderRadius:10, background:'rgba(212,168,67,0.12)', border:'1px solid rgba(212,168,67,0.3)', color:'#D4A843', textDecoration:'none', fontSize:15, fontWeight:600 }}>
          ← Start Learning
        </Link>
      </div>

    </main>
  )
}

function Section({ title, color, children }) {
  const rgb = {
    '#D4A843':'212,168,67', '#4CAF8A':'76,175,138', '#5B8FD4':'91,143,212',
    '#81d4c0':'129,212,192', '#9B59B6':'155,89,182', '#E67E22':'230,126,34',
  }[color] || '180,180,180'
  return (
    <div style={{ marginBottom:32 }}>
      <div style={{ fontSize:17, color, fontWeight:700, marginBottom:12, paddingBottom:8, borderBottom:`1px solid rgba(${rgb},0.2)` }}>
        {title}
      </div>
      <div style={{ fontSize:14, color:'#a09070', lineHeight:1.8 }}>{children}</div>
    </div>
  )
}

function Step({ n, color, title, children }) {
  return (
    <div style={{ display:'flex', gap:12, marginBottom:16, alignItems:'flex-start' }}>
      <div style={{ width:30, height:30, borderRadius:'50%', border:`1.5px solid rgba(91,143,212,0.4)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, color, flexShrink:0, marginTop:1 }}>{n}</div>
      <div>
        <div style={{ fontSize:14, color:'#ddd5c0', fontWeight:600, marginBottom:3 }}>{title}</div>
        <div style={{ fontSize:13, color:'#7a6a52', lineHeight:1.7 }}>{children}</div>
      </div>
    </div>
  )
}
