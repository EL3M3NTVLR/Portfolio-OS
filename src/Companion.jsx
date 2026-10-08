import { useEffect, useRef, useState } from 'react'
import { readLS, writeLS, clamp, useDrag, useMedia } from './lib.js'

const KEY = 'aritraos-companion-v2'
const W = 104, H = 124
const LINES = {
  idle: ['Aaj na hoy kal korbo.', 'Ekta cha hole bhalo hoto.', 'Slow is also a style.', 'Dekho, kono taratari nei.'],
  happy: ['Bhalo laglo! Ektu ghure dekho.', 'Case files-ta pore dekho, worth it.', 'Chilling, but make it cinematic.'],
  excited: ['Ooh, kichu khulle!', 'Ei je, ekta notun window!'],
  sad: ['Kothay gele? Ami eikhane...', 'Sob close hoye gelo?'],
  sleeping: ['zzz... render hocche...'],
  alert: ['Hm? Ke?'],
  celebrating: ['Hurrah!'],
  dragging: ['Oi oi, aste!'],
}

// Crops each state's PNG to its visible pixels so every pose is measured the same way,
// then sizes it by STATE_H (px tall). Tune these numbers if a pose looks too big or small.
const STATE_H = { idle: 112, happy: 112, alert: 112, excited: 114, celebrating: 114, dragging: 116, sad: 82, sleeping: 76 }
const cache = {}
function trimmed(src) {
  if (!cache[src]) {
    cache[src] = new Promise((res) => {
      const im = new Image()
      im.onload = () => {
        try {
          const k = Math.min(1, 420 / Math.max(im.naturalWidth, im.naturalHeight))
          const w = Math.round(im.naturalWidth * k), h = Math.round(im.naturalHeight * k)
          const cv = document.createElement('canvas'); cv.width = w; cv.height = h
          const cx = cv.getContext('2d'); cx.drawImage(im, 0, 0, w, h)
          const d = cx.getImageData(0, 0, w, h).data
          let x0 = w, y0 = h, x1 = -1, y1 = -1
          for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (d[(y * w + x) * 4 + 3] > 20) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y }
          if (x1 < 0) return res({ url: src, ratio: w / h })
          const tw = x1 - x0 + 1, th = y1 - y0 + 1
          const out = document.createElement('canvas'); out.width = tw; out.height = th
          out.getContext('2d').drawImage(cv, x0, y0, tw, th, 0, 0, tw, th)
          res({ url: out.toDataURL('image/png'), ratio: tw / th })
        } catch { res({ url: src, ratio: im.naturalWidth / im.naturalHeight }) }
      }
      im.onerror = () => res(null)
      im.src = src
    })
  }
  return cache[src]
}
async function loadArt(state) {
  for (const ext of ['png', 'webp']) {
    const r = await trimmed(`/assets/03-companion/companion-${state}.${ext}`)
    if (r) return r
  }
  return null
}
const pick = (s) => { const a = LINES[s] || LINES.idle; return a[Math.floor(Math.random() * a.length)] }
const home = () => ({ x: 14, y: window.innerHeight - H - 14 })

export default function Companion({ evt }) {
  const [pos, setPos] = useState(() => readLS(KEY, null) || home())
  const [state, setState] = useState('idle')
  const [say, setSay] = useState('')
  const [art, setArt] = useState({})
  const small = useMedia('(max-width: 767px)')
  const canDrag = useMedia('(min-width: 1181px)')
  const timer = useRef(0), sleepT = useRef(0), sayT = useRef(0)
  const fix = (p) => ({ x: clamp(p.x, 6, window.innerWidth - W - 6), y: clamp(p.y, 60, window.innerHeight - H - 6) })

  const react = (s, ms = 2400, text = true) => {
    clearTimeout(timer.current); setState(s)
    if (text) { setSay(pick(s)); clearTimeout(sayT.current); sayT.current = setTimeout(() => setSay(''), Math.max(ms, 2800)) }
    timer.current = setTimeout(() => setState('idle'), ms)
    wake()
  }
  const wake = () => { clearTimeout(sleepT.current); sleepT.current = setTimeout(() => { setState('sleeping') }, 45000) }

  useEffect(() => { wake(); const hi = setTimeout(() => { setSay('Taratari nei. Dock-e sob ache, aste aste dekho.'); sayT.current = setTimeout(() => setSay(''), 5200) }, 4500); return () => { clearTimeout(timer.current); clearTimeout(sleepT.current); clearTimeout(sayT.current); clearTimeout(hi) } }, [])
  useEffect(() => {
    const f = () => setPos((p) => fix(p))
    window.addEventListener('resize', f); f()
    return () => window.removeEventListener('resize', f)
  }, [])
  useEffect(() => { if (evt?.n) react(evt.type === 'open' ? 'excited' : evt.type === 'close' ? 'sad' : 'happy') }, [evt?.n])
  useEffect(() => { writeLS(KEY, pos) }, [pos])
  useEffect(() => { Object.keys(STATE_H).forEach((s) => loadArt(s).then((r) => setArt((a) => ({ ...a, [s]: r })))) }, [])

  const start = useDrag({
    threshold: 6,
    onStart: () => ({ x: pos.x, y: pos.y }),
    onMove: (dx, dy, o) => { if (!canDrag) return; setState('dragging'); setPos(fix({ x: o.x + dx, y: o.y + dy })) },
    onEnd: (moved) => { if (moved && canDrag) react('happy', 1800, false); else react('happy') },
  })
  const key = (e) => {
    const d = { ArrowLeft: [-24, 0], ArrowRight: [24, 0], ArrowUp: [0, -24], ArrowDown: [0, 24] }[e.key]
    if (d && canDrag) { e.preventDefault(); setPos((p) => fix({ x: p.x + d[0], y: p.y + d[1] })) }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); react('happy') }
  }
  const style = canDrag ? { left: pos.x, top: pos.y } : { left: 6, bottom: 10 }
  const cur = art[state]
  const scale = small ? 0.78 : 1

  return (
    <div className={`comp ${state === 'dragging' ? 'drag' : ''}`} data-state={state} style={style}
      onPointerDown={start} onPointerEnter={() => state === 'idle' && setState('alert')} onPointerLeave={() => state === 'alert' && setState('idle')}
      onKeyDown={key} tabIndex={0} role="button" aria-label="Lyadh, the lazy companion. Press Enter to say hi. Arrow keys move it.">
      {say && <div className="say" role="status">{say}</div>}
      <div className="sp" style={{ height: 124 * scale }}>
        {cur === null ? (
          <img className="fb" src="/assets/01-portraits/avatar-ref-jacket-glance.webp" alt="Lyadh companion, temporary portrait stand-in" draggable={false} />
        ) : cur ? (
          <img className="art" src={cur.url} alt={`Lyadh companion, ${state}`} draggable={false}
            style={{ height: STATE_H[state] * scale, width: 'auto', maxWidth: 150 * scale }} />
        ) : null}
      </div>
      {canDrag && <div className="lbl">
        <button onClick={(e) => { e.stopPropagation(); setPos(home()); react('happy', 1500, false) }} onPointerDown={(e) => e.stopPropagation()} aria-label="Reset companion position">reset</button>
      </div>}
    </div>
  )
}
