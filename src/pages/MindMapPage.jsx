// src/pages/MindMapPage.jsx
import { useState, useRef, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'

// ── Data map ─────────────────────────────────────────────────────────────────
import { SECTIONS as FATIHA_S, SURAH_META as FATIHA_M } from '../data/al-fatiha'

const DATA_MAP = {
  'al-fatiha': { sections: FATIHA_S, meta: FATIHA_M },
}

// ── Colour helpers ────────────────────────────────────────────────────────────
function wordColor(tr) {
  if (!tr) return '#D4A843'
  if (/aa|ee|oo/.test(tr)) return '#81d4c0'
  if (/[SDTQH]|kh|gh|'/.test(tr)) return '#E6944A'
  return '#D4A843'
}

function hexRgb(h) {
  if (!h || h.length < 7) return '180,180,180'
  return `${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`
}

// ── Layout engine ─────────────────────────────────────────────────────────────
// Builds node positions for the mind map
function buildLayout(sections) {
  const nodes = []
  const edges = []

  // Canvas dimensions
  const CX = 1800
  const CY = 900

  // Central surah node
  const center = { id: 'root', x: CX/2, y: CY/2, type: 'root' }
  nodes.push(center)

  // Lay sections in a circle around center
  const sectionRadius = 380
  sections.forEach((sec, si) => {
    const angle = (si / sections.length) * Math.PI * 2 - Math.PI / 2
    const sx = CX/2 + Math.cos(angle) * sectionRadius
    const sy = CY/2 + Math.sin(angle) * sectionRadius

    const secNode = { id: sec.id, x: sx, y: sy, type: 'section', data: sec, angle }
    nodes.push(secNode)
    edges.push({ from: 'root', to: sec.id, color: sec.color })

    // Lay ayahs in an arc beyond the section node
    const verseRadius = 220
    const spread = Math.min(0.9, sec.verses.length * 0.18)
    sec.verses.forEach((v, vi) => {
      const baseAngle = angle
      const offset = sec.verses.length === 1
        ? 0
        : (vi / (sec.verses.length - 1) - 0.5) * spread
      const vAngle = baseAngle + offset
      const vx = sx + Math.cos(vAngle) * verseRadius
      const vy = sy + Math.sin(vAngle) * verseRadius

      const vNode = { id: `${sec.id}-${v.n}`, x: vx, y: vy, type: 'verse', data: v, sectionColor: sec.color, angle: vAngle }
      nodes.push(vNode)
      edges.push({ from: sec.id, to: `${sec.id}-${v.n}`, color: sec.color })
    })
  })

  return { nodes, edges, width: CX, height: CY }
}

// ── Node dimensions ───────────────────────────────────────────────────────────
const ROOT_R   = 60
const SEC_W    = 130
const SEC_H    = 52
const VERSE_W  = 160
const VERSE_H  = 72

// ── SVG Mind Map ──────────────────────────────────────────────────────────────
function MindMapSVG({ layout, meta, selected, onSelect, lang }) {
  const { nodes, edges, width, height } = layout

  const nodeById = Object.fromEntries(nodes.map(n => [n.id, n]))

  return (
    <g>
      {/* Edges */}
      {edges.map((e, i) => {
        const a = nodeById[e.from]
        const b = nodeById[e.to]
        if (!a || !b) return null
        const rgb = hexRgb(e.color)
        return (
          <line
            key={i}
            x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke={`rgba(${rgb},0.35)`}
            strokeWidth={a.type === 'root' ? 2.5 : 1.5}
            strokeLinecap="round"
          />
        )
      })}

      {/* Root node */}
      {(() => {
        const r = nodeById['root']
        return (
          <g key="root" onClick={() => onSelect(null)} style={{ cursor:'pointer' }}>
            <circle cx={r.x} cy={r.y} r={ROOT_R} fill="rgba(212,168,67,0.12)" stroke="#D4A843" strokeWidth={1.5} />
            <text x={r.x} y={r.y - 10} textAnchor="middle" fill="#D4A843" fontSize={22} fontFamily="Amiri,serif">{meta.arabic}</text>
            <text x={r.x} y={r.y + 12} textAnchor="middle" fill="#D4A843" fontSize={11} fontFamily="Lato,sans-serif">{meta.name}</text>
            <text x={r.x} y={r.y + 26} textAnchor="middle" fill="#6a5a40" fontSize={9} fontFamily="Lato,sans-serif">{meta.ayahs} ayahs</text>
          </g>
        )
      })()}

      {/* Section nodes */}
      {nodes.filter(n => n.type === 'section').map(n => {
        const isSelected = selected?.id === n.id
        const rgb = hexRgb(n.data.color)
        return (
          <g key={n.id} onClick={() => onSelect(n)} style={{ cursor:'pointer' }}>
            <rect
              x={n.x - SEC_W/2} y={n.y - SEC_H/2}
              width={SEC_W} height={SEC_H} rx={10}
              fill={isSelected ? `rgba(${rgb},0.25)` : `rgba(${rgb},0.1)`}
              stroke={n.data.color}
              strokeWidth={isSelected ? 2 : 1}
            />
            <text x={n.x} y={n.y - 8} textAnchor="middle" fill={n.data.color} fontSize={13} fontFamily="Amiri,serif">{n.data.arabic}</text>
            <text x={n.x} y={n.y + 10} textAnchor="middle" fill={n.data.color} fontSize={10} fontFamily="Lato,sans-serif" fontWeight="600">{n.data.label}</text>
            <text x={n.x} y={n.y + 22} textAnchor="middle" fill="#6a5a40" fontSize={9} fontFamily="Lato,sans-serif">ayahs {n.data.ayahs}</text>
          </g>
        )
      })}

      {/* Verse nodes */}
      {nodes.filter(n => n.type === 'verse').map(n => {
        const isSelected = selected?.id === n.id
        const rgb = hexRgb(n.sectionColor)
        const v = n.data
        // Show first 2 words
        const words = v.words?.slice(0, 2) || []
        return (
          <g key={n.id} onClick={() => onSelect(n)} style={{ cursor:'pointer' }}>
            <rect
              x={n.x - VERSE_W/2} y={n.y - VERSE_H/2}
              width={VERSE_W} height={VERSE_H} rx={8}
              fill={isSelected ? `rgba(${rgb},0.2)` : 'rgba(255,255,255,0.03)'}
              stroke={isSelected ? n.sectionColor : `rgba(${rgb},0.3)`}
              strokeWidth={isSelected ? 1.5 : 0.8}
            />
            {/* Ayah number */}
            <text x={n.x - VERSE_W/2 + 10} y={n.y - VERSE_H/2 + 13} fill={`rgba(${rgb},0.6)`} fontSize={9} fontFamily="Lato,sans-serif">{v.n}</text>
            {/* Arabic snippet */}
            <text x={n.x} y={n.y - 16} textAnchor="middle" fill="#ddd5c0" fontSize={14} fontFamily="Amiri,serif">
              {v.ar.split(' ').slice(0,3).join(' ')}…
            </text>
            {/* Word chips */}
            {words.map((w, wi) => (
              <text
                key={wi}
                x={n.x - 30 + wi * 64} y={n.y + 8}
                textAnchor="middle"
                fill={wordColor(w.tr)}
                fontSize={9}
                fontFamily="Lato,sans-serif"
                fontStyle="italic"
              >
                {w.tr?.replace(/-/g,'')}
              </text>
            ))}
            {/* English meaning */}
            <text x={n.x} y={n.y + 26} textAnchor="middle" fill="#6a5a40" fontSize={8} fontFamily="Lato,sans-serif">
              {v.en?.slice(0, 28)}{v.en?.length > 28 ? '…' : ''}
            </text>
          </g>
        )
      })}
    </g>
  )
}

// ── Detail panel ──────────────────────────────────────────────────────────────
function DetailPanel({ selected, lang, onClose }) {
  if (!selected) return null
  const { data, type, sectionColor } = selected

  if (type === 'section') {
    return (
      <div style={{ position:'absolute', bottom:20, left:'50%', transform:'translateX(-50%)', width:420, background:'#0c1b30', border:`1px solid ${data.color}40`, borderRadius:14, padding:'16px 20px', boxShadow:'0 8px 32px rgba(0,0,0,0.5)', zIndex:10 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
          <div>
            <div style={{ fontSize:20, fontFamily:'Amiri,serif', color:data.color }}>{data.arabic}</div>
            <div style={{ fontSize:14, color:data.color, fontWeight:700 }}>{data.label}</div>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'#6a5a40', fontSize:18, cursor:'pointer' }}>×</button>
        </div>
        <div style={{ fontSize:12, color:'#a09070', lineHeight:1.7, marginBottom:8 }}>
          {lang === 'zh' ? data.summaryZh : lang === 'hi' ? data.summaryHi : data.summary}
        </div>
        <div style={{ fontSize:11, color:'#6a5a40', fontStyle:'italic' }}>💡 {data.memTip}</div>
      </div>
    )
  }

  if (type === 'verse') {
    const v = data
    return (
      <div style={{ position:'absolute', bottom:20, left:'50%', transform:'translateX(-50%)', width:460, background:'#0c1b30', border:`1px solid rgba(${hexRgb(sectionColor)},0.3)`, borderRadius:14, padding:'16px 20px', boxShadow:'0 8px 32px rgba(0,0,0,0.5)', zIndex:10, maxHeight:'60vh', overflowY:'auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
          <div style={{ fontSize:11, color:sectionColor }}>Ayah {v.n}</div>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'#6a5a40', fontSize:18, cursor:'pointer' }}>×</button>
        </div>

        {/* Arabic */}
        <div style={{ fontSize:22, fontFamily:'Amiri,serif', color:'#ddd5c0', textAlign:'right', lineHeight:1.8, marginBottom:10, direction:'rtl' }}>{v.ar}</div>

        {/* Translation */}
        <div style={{ fontSize:13, color:'#a09070', lineHeight:1.7, marginBottom:12 }}>
          {lang === 'zh' ? v.zh : lang === 'hi' ? v.hi : v.en}
        </div>

        {/* Word by word */}
        {v.words && (
          <div>
            <div style={{ fontSize:10, color:'#6a5a40', letterSpacing:1, marginBottom:8 }}>WORD BY WORD</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {v.words.map((w, i) => (
                <div key={i} style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:8, padding:'8px 10px', textAlign:'center', minWidth:70 }}>
                  <div style={{ fontSize:16, fontFamily:'Amiri,serif', color:'#ddd5c0', marginBottom:3 }}>{w.ar}</div>
                  <div style={{ fontSize:10, color:wordColor(w.tr), fontStyle:'italic', marginBottom:3 }}>{w.tr?.replace(/-/g,'')}</div>
                  <div style={{ fontSize:10, color:'#6a5a40' }}>
                    {lang === 'zh' ? w.zh : lang === 'hi' ? w.hi : w.en}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
  return null
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function MindMapPage() {
  const { id } = useParams()
  const surahData = DATA_MAP[id]

  const svgRef    = useRef(null)
  const [vb,      setVb]      = useState({ x:0, y:0, w:0, h:0 })
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState(null)
  const [selected, setSelected] = useState(null)
  const [lang,    setLang]    = useState('en')
  const initRef = useRef(false)

  const layout = surahData ? buildLayout(surahData.sections) : null

  // Initialise viewBox to fit the canvas
  useEffect(() => {
    if (!layout || initRef.current) return
    initRef.current = true
    const el = svgRef.current
    if (!el) return
    const { clientWidth: w, clientHeight: h } = el
    const scale = Math.min(w / layout.width, h / layout.height) * 0.85
    const vw = w / scale
    const vh = h / scale
    setVb({
      x: layout.width/2 - vw/2,
      y: layout.height/2 - vh/2,
      w: vw, h: vh,
    })
  }, [layout])

  // Pan handlers
  const onMouseDown = useCallback(e => {
    if (e.button !== 0) return
    setDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY, vb: { ...vb } })
  }, [vb])

  const onMouseMove = useCallback(e => {
    if (!dragging || !dragStart) return
    const el = svgRef.current
    if (!el) return
    const scale = el.clientWidth / vb.w
    const dx = (e.clientX - dragStart.x) / scale
    const dy = (e.clientY - dragStart.y) / scale
    setVb(v => ({ ...v, x: dragStart.vb.x - dx, y: dragStart.vb.y - dy }))
  }, [dragging, dragStart, vb.w])

  const onMouseUp = useCallback(() => setDragging(false), [])

  // Zoom
  const onWheel = useCallback(e => {
    e.preventDefault()
    const factor = e.deltaY > 0 ? 1.12 : 0.88
    const el = svgRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const mx = ((e.clientX - rect.left) / rect.width)  * vb.w + vb.x
    const my = ((e.clientY - rect.top)  / rect.height) * vb.h + vb.y
    setVb(v => ({
      x: mx - (mx - v.x) * factor,
      y: my - (my - v.y) * factor,
      w: v.w * factor,
      h: v.h * factor,
    }))
  }, [vb])

  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [onWheel])

  if (!surahData) {
    return (
      <div style={{ minHeight:'100vh', background:'#06101c', display:'flex', alignItems:'center', justifyContent:'center', color:'#D4A843', fontFamily:'Lato,serif' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:48, marginBottom:12 }}>🗺</div>
          <div style={{ fontSize:16, marginBottom:8 }}>Mind map not available for this surah yet.</div>
          <Link to="/" style={{ fontSize:13, color:'#6a5a40' }}>← Back to library</Link>
        </div>
      </div>
    )
  }

  const { meta } = surahData

  return (
    <div style={{ height:'100vh', background:'#06101c', display:'flex', flexDirection:'column', fontFamily:'Lato,Georgia,serif', userSelect:'none', overflow:'hidden' }}>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 16px', borderBottom:'1px solid rgba(212,168,67,0.12)', background:'rgba(0,0,0,0.3)', flexShrink:0, zIndex:5 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <Link to={`/surah/${id}`} style={{ fontSize:12, color:'#6a5a40', textDecoration:'none' }}>← Learn</Link>
          <div style={{ width:1, height:16, background:'rgba(255,255,255,0.08)' }} />
          <div style={{ fontSize:18, fontFamily:'Amiri,serif', color:'#D4A843' }}>{meta.arabic}</div>
          <div style={{ fontSize:13, color:'#ddd5c0', fontWeight:600 }}>{meta.name} · Mind Map</div>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          {/* Language toggle */}
          {[['en','EN'],['zh','中文'],['hi','हि']].map(([l,label]) => (
            <button key={l} onClick={() => setLang(l)} style={{
              padding:'4px 10px', borderRadius:16, border:'none', cursor:'pointer', fontSize:11,
              background: lang===l ? 'rgba(212,168,67,0.2)' : 'rgba(255,255,255,0.04)',
              color: lang===l ? '#D4A843' : '#6a5a40',
              fontWeight: lang===l ? 700 : 400,
            }}>{label}</button>
          ))}
          <div style={{ fontSize:10, color:'#4a3a28', marginLeft:8 }}>Scroll to zoom · drag to pan · tap a node</div>
        </div>
      </div>

      {/* SVG canvas */}
      <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
        <svg
          ref={svgRef}
          width="100%" height="100%"
          viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
          style={{ cursor: dragging ? 'grabbing' : 'grab', display:'block' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {layout && (
            <MindMapSVG
              layout={layout}
              meta={meta}
              selected={selected}
              onSelect={setSelected}
              lang={lang}
            />
          )}
        </svg>

        {/* Detail panel */}
        {selected && (
          <DetailPanel
            selected={selected}
            lang={lang}
            onClose={() => setSelected(null)}
          />
        )}

        {/* Zoom controls */}
        <div style={{ position:'absolute', bottom:selected ? 200 : 20, right:20, display:'flex', flexDirection:'column', gap:4 }}>
          {[['＋', 0.75], ['－', 1.33], ['⊡', null]].map(([label, factor]) => (
            <button
              key={label}
              onClick={() => {
                if (factor === null) {
                  // reset
                  const el = svgRef.current
                  if (!el || !layout) return
                  const { clientWidth: w, clientHeight: h } = el
                  const scale = Math.min(w / layout.width, h / layout.height) * 0.85
                  setVb({ x: layout.width/2 - w/scale/2, y: layout.height/2 - h/scale/2, w: w/scale, h: h/scale })
                } else {
                  setVb(v => ({
                    x: v.x + v.w * (1 - factor) / 2,
                    y: v.y + v.h * (1 - factor) / 2,
                    w: v.w * factor,
                    h: v.h * factor,
                  }))
                }
              }}
              style={{ width:32, height:32, borderRadius:8, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(0,0,0,0.4)', color:'#ddd5c0', fontSize:16, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}
            >{label}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
