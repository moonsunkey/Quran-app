import { useState } from 'react'

const hexRgb = h => `${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`

// Color-code transliteration: teal = stretch, orange = ayn/special, gold = normal
function ColoredTranslit({ text }) {
  const words = text.split('  ').filter(Boolean)
  return (
    <span>
      {words.map((word, i) => {
        const hasLong = word.includes('aa') || word.includes('ee') || word.includes('oo')
        const hasAyn  = word.includes("'")
        const hasHard = /[A-Z]/.test(word) || word.includes('kh') || word.includes('gh')
        const color = hasAyn ? '#E67E22' : hasLong ? '#81d4c0' : hasHard ? '#e87070' : 'var(--gold)'
        return (
          <span key={i}>
            <span style={{ color }}>{word}</span>
            {i < words.length-1 && <span style={{ color:'rgba(255,255,255,0.15)' }}> · </span>}
          </span>
        )
      })}
    </span>
  )
}

function Mask({ hidden, onReveal, children }) {
  if (!hidden) return <>{children}</>
  return (
    <div onClick={onReveal} style={{
      background:'rgba(255,255,255,0.03)', border:'1px dashed rgba(255,255,255,0.1)',
      borderRadius:6, padding:'8px 12px', cursor:'pointer',
      color:'var(--text-muted)', fontSize:11, letterSpacing:1, textAlign:'center',
      userSelect:'none',
    }}>
      TAP TO REVEAL ▸
    </div>
  )
}

export default function VerseCard({
  verse, section, isMem, onToggleMem,
  isPlaying, audioLoading, onPlay,
  isExpanded, onToggleExpand,
  practiceMode = 'show-all',
}) {
  const [revAr, setRevAr] = useState(false)
  const [revTr, setRevTr] = useState(false)
  const [revEn, setRevEn] = useState(false)
  const c = section.color

  return (
    <div style={{
      background: isMem ? 'rgba(76,175,138,0.04)' : 'rgba(255,255,255,0.02)',
      border:`1px solid ${isMem ? 'rgba(76,175,138,0.2)' : isExpanded ? `rgba(${hexRgb(c)},0.3)` : 'var(--border)'}`,
      borderRadius:10, marginBottom:10, overflow:'hidden', transition:'border 0.2s',
    }}>
      <div style={{ padding:'12px 14px' }}>
        <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
          {/* Ayah number */}
          <div style={{
            width:30, height:30, flexShrink:0, borderRadius:'50%',
            border:`1.5px solid rgba(${hexRgb(c)},0.4)`,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:11, color:c, marginTop:6,
          }}>{verse.n}</div>

          <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>
            {/* Arabic */}
            <Mask hidden={practiceMode==='hide-ar' && !revAr} onReveal={() => setRevAr(true)}>
              <div dir="rtl" style={{
                fontSize:26, color:'#f5ecd8', fontFamily:'var(--font-arabic)',
                lineHeight:2, textAlign:'right',
              }}>{verse.ar}</div>
            </Mask>
            {/* Transliteration */}
            <Mask hidden={practiceMode==='hide-tr' && !revTr} onReveal={() => setRevTr(true)}>
              <div style={{ fontSize:14, fontStyle:'italic', letterSpacing:0.3, lineHeight:1.7 }}>
                <ColoredTranslit text={verse.tr} />
              </div>
            </Mask>
            {/* Translation */}
            <Mask hidden={practiceMode==='hide-en' && !revEn} onReveal={() => setRevEn(true)}>
              <div style={{ fontSize:13, color:'var(--text-dim)', lineHeight:1.5 }}>{verse.en}</div>
            </Mask>
          </div>

          {/* Control column */}
          <div style={{ display:'flex', flexDirection:'column', gap:5, alignItems:'center', flexShrink:0 }}>
            {/* Play */}
            <button onClick={onPlay} style={{
              width:34, height:34, borderRadius:'50%', border:'none', cursor:'pointer',
              background: isPlaying ? 'var(--gold)' : 'var(--gold-dim)',
              color: isPlaying ? 'var(--bg)' : 'var(--gold)',
              fontSize:14, display:'flex', alignItems:'center', justifyContent:'center',
              transition:'all 0.2s',
            }}>
              {audioLoading ? '⌛' : isPlaying ? '⏹' : '▶'}
            </button>
            {/* Memorize toggle */}
            <button onClick={onToggleMem} style={{
              width:28, height:28, borderRadius:'50%',
              border:`1.5px solid ${isMem ? 'var(--green)' : 'rgba(255,255,255,0.12)'}`,
              background: isMem ? 'rgba(76,175,138,0.2)' : 'transparent',
              color: isMem ? 'var(--green)' : 'var(--text-muted)',
              fontSize:12, cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>{isMem ? '✓' : '○'}</button>
            {/* Expand (only in learn mode — no expand in practice) */}
            {onToggleExpand && (
              <button onClick={onToggleExpand} style={{
                width:24, height:24, background:'transparent', border:'none',
                cursor:'pointer', color:'var(--text-muted)', fontSize:11,
              }}>{isExpanded ? '▲' : '▼'}</button>
            )}
          </div>
        </div>

        {/* Audio progress bar */}
        {isPlaying && (
          <div style={{ marginTop:8, paddingLeft:40 }}>
            <div style={{ height:2, background:'rgba(255,255,255,0.06)', borderRadius:2 }}>
              <div style={{ width:'100%', height:'100%', background:'var(--gold)', borderRadius:2,
                animation:'audioFill 3s linear infinite', opacity:0.6 }}/>
            </div>
          </div>
        )}
      </div>

      {/* Expanded syllable guide */}
      {isExpanded && (
        <div style={{
          borderTop:`1px solid rgba(${hexRgb(c)},0.12)`,
          padding:'12px 14px', background:'rgba(0,0,0,0.25)',
        }}>
          <div style={{ fontSize:10, color:c, letterSpacing:1, marginBottom:10 }}>SYLLABLE GUIDE</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:12 }}>
            {verse.tr.split('  ').filter(w=>w.trim()).map((word,i) => {
              const hasLong = word.includes('aa')||word.includes('ee')||word.includes('oo')
              const hasAyn  = word.includes("'")
              const hasHard = /[A-Z]/.test(word)||word.includes('kh')||word.includes('gh')
              return (
                <div key={i} style={{
                  background: hasAyn ? 'rgba(230,126,34,0.1)' : hasHard ? 'rgba(192,80,77,0.08)' : hasLong ? 'rgba(129,212,192,0.08)' : 'rgba(255,255,255,0.03)',
                  border:`1px solid ${hasAyn ? 'rgba(230,126,34,0.3)' : hasHard ? 'rgba(192,80,77,0.2)' : hasLong ? 'rgba(129,212,192,0.2)' : 'var(--border)'}`,
                  borderRadius:6, padding:'4px 9px',
                }}>
                  <div style={{ fontSize:12, color:'var(--gold)', fontFamily:'monospace' }}>{word}</div>
                  <div style={{ fontSize:9, color:'var(--text-muted)', marginTop:1 }}>
                    {hasAyn && <span style={{ color:'#E67E22' }}>⚠ ayn </span>}
                    {hasLong && !hasAyn && <span style={{ color:'#81d4c0' }}>stretch </span>}
                    {hasHard && !hasAyn && <span style={{ color:'#e87070' }}>⚠ throat </span>}
                  </div>
                </div>
              )
            })}
          </div>
          {/* Legend */}
          <div style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:8 }}>
            {[
              { col:'#81d4c0', desc:'Stretch vowel (aa/ee/oo)' },
              { col:'#E67E22', desc:'⚠ Ayn — throat constriction' },
              { col:'#e87070', desc:'⚠ Emphatic/throat letter' },
            ].map(l => (
              <div key={l.col} style={{ display:'flex', gap:5, alignItems:'center' }}>
                <div style={{ width:9, height:9, borderRadius:2, background:l.col }}/>
                <span style={{ fontSize:10, color:'var(--text-muted)' }}>{l.desc}</span>
              </div>
            ))}
          </div>
          <div style={{ padding:'8px 12px', background:'rgba(212,168,67,0.05)', borderRadius:7, fontSize:11, color:'var(--text-muted)' }}>
            🔁 <strong style={{ color:'var(--gold)' }}>Method:</strong> Listen once. Read along with transliteration. Cover it. Try from memory. Repeat 3×.
          </div>
        </div>
      )}
    </div>
  )
}
