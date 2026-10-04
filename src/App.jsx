import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LayoutGrid, FolderOpen, Clapperboard, FileText, Route, Sparkles, StickyNote, ScrollText, Mail, Search, Minus, Maximize2, X, Sun, Moon, Contrast } from 'lucide-react'
import { ownerProfile as P } from './data/profile.js'
import { readLS, writeLS, useLS, useMedia, clamp, fuzzy, useDrag } from './lib.js'
import {
  PortfolioApp, CasesApp, FilmsApp, AboutApp, JourneyApp, CraftApp, BoardApp, ResumeApp, ContactApp, PROJECTS, FLAGSHIPS,
} from './apps.jsx'
import Companion from './Companion.jsx'

const APPS = [
  { id: 'portfolio', title: 'Portfolio', desc: 'All 22 projects, filterable', badge: 'Main drive', icon: LayoutGrid, C: PortfolioApp, size: [940, 640] },
  { id: 'cases', title: 'Case Files', desc: 'Five flagship deep dives', badge: 'Start here', icon: FolderOpen, C: CasesApp, size: [980, 650] },
  { id: 'films', title: 'Film Vault', desc: 'Watch the films, no autoplay', icon: Clapperboard, C: FilmsApp, size: [900, 620] },
  { id: 'about', title: 'About.txt', desc: 'Who I am and how I think', icon: FileText, C: AboutApp, size: [820, 580] },
  { id: 'journey', title: 'Journey', desc: 'Kolkata 2004 to today', icon: Route, C: JourneyApp, size: [680, 620] },
  { id: 'craft', title: 'Craft', desc: 'My five-step method', icon: Sparkles, C: CraftApp, size: [740, 640] },
  { id: 'board', title: 'Whiteboard', desc: 'Leave a sticky note', icon: StickyNote, C: BoardApp, size: [840, 580] },
  { id: 'resume', title: 'Résumé', desc: 'Preview or download PDF', icon: ScrollText, C: ResumeApp, size: [780, 660] },
  { id: 'contact', title: 'Contact', desc: 'Email, LinkedIn, brief', badge: 'Hire me', icon: Mail, C: ContactApp, size: [660, 620] },
]
const THEMES = [['day', 'Day', Sun], ['night', 'Night', Moon], ['dark', 'Dark', Contrast]]
const QUOTES = [
  'Concepts before polish.', 'Let the shake be the style.', 'A made thing speaks louder than an application.',
  'Aim the work at the right problem first.', 'Warm tones, honest frames.', 'Test your own assumption before anyone else does.',
  'Make it mean something.', 'Constraints are a free art director.', 'Notice more. Then make.', 'Craft, in Bengali: karigori.',
  'Rest is part of the edit.', 'Ask the person, then design.', 'Look twice at ordinary things.', 'Finish the small version today.',
]
const LAYOUT = 'aritraos-layout-v1'

function useClock() {
  const f = () => new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true })
  const [t, setT] = useState(f)
  useEffect(() => { const i = setInterval(() => setT(f()), 20000); return () => clearInterval(i) }, [])
  return t
}

function Boot({ done }) {
  const seen = useRef(sessionStorage.getItem('aritraos-boot') === '1').current
  const d = seen ? 0.7 : 1.8
  useEffect(() => {
    const t = setTimeout(() => { try { sessionStorage.setItem('aritraos-boot', '1') } catch { /* private mode */ } done() }, d * 1000)
    return () => clearTimeout(t)
  }, [])
  return (
    <div className="boot" role="status">
      <div>
        <img src="/assets/01-portraits/primary-portrait-cafe.webp" alt="" />
        <h1>AritraOS</h1>
        <p>Loading projects, case files, films and journey · v1.0</p>
        <div className="bar-prog"><i style={{ '--d': `${d}s` }} /></div>
        <button onClick={done}>Skip boot</button>
      </div>
    </div>
  )
}

function Win({ w, app, active, focus, close, min, max, move, open }) {
  const ref = useRef(null)
  const C = app.C
  useEffect(() => { ref.current?.focus() }, [])
  const start = useDrag({
    threshold: 3,
    onStart: () => ({ x: w.x, y: w.y }),
    onMove: (dx, dy, o) => move(w.id, clamp(o.x + dx, -app.size[0] + 140, window.innerWidth - 140), clamp(o.y + dy, 48, window.innerHeight - 70)),
  })
  return (
    <section ref={ref} tabIndex={-1} role="dialog" aria-label={app.title} className={`win ${w.max ? 'max' : ''} ${w.min ? 'hide' : ''}`}
      style={{ left: w.x, top: w.y, width: app.size[0], height: app.size[1], maxWidth: '100vw', maxHeight: 'calc(100dvh - 140px)', zIndex: w.z }}
      onPointerDown={() => focus(w.id)}>
      <header className="wh" onPointerDown={(e) => { if (!e.target.closest('button')) start(e) }} onDoubleClick={() => max(w.id)}>
        <h2>{app.title}</h2>
        <div className="wc">
          <button onClick={() => min(w.id)} aria-label={`Minimise ${app.title}`}><Minus size={13} /></button>
          <button onClick={() => max(w.id)} aria-label={w.max ? 'Restore window' : 'Maximise window'}><Maximize2 size={12} /></button>
          <button onClick={() => close(w.id)} aria-label={`Close ${app.title}`}><X size={14} /></button>
        </div>
      </header>
      <div className="wb"><C payload={w.payload} open={open} /></div>
    </section>
  )
}

function Tile({ app, isOpen, open, off, setOff, canMove }) {
  const sup = useRef(false)
  const start = useDrag({
    threshold: 6,
    onStart: (e) => { const r = e.currentTarget.getBoundingClientRect(); return { r, x: off.x, y: off.y, el: e.currentTarget } },
    onMove: (dx, dy, o) => {
      if (!canMove) return
      o.el.classList.add('dragging')
      setOff({ x: clamp(o.x + dx, o.x - o.r.left, o.x + window.innerWidth - o.r.right), y: clamp(o.y + dy, o.y - o.r.top + 52, o.y + window.innerHeight - o.r.bottom - 90) })
    },
    onEnd: (moved, o) => { o.el.classList.remove('dragging'); if (moved && canMove) { sup.current = true; setTimeout(() => (sup.current = false), 0) } },
  })
  return (
    <button className="tile" style={{ transform: `translate(${off.x}px,${off.y}px)` }} onPointerDown={canMove ? start : undefined}
      onClick={() => { if (!sup.current) open(app.id) }} aria-label={`Open ${app.title}. ${app.desc}`}>
      <span className="glyph"><app.icon size={24} aria-hidden /></span>
      <span className="tt"><b>{app.title}</b><span>{app.desc}</span></span>
      {app.badge && <em>{app.badge}</em>}
      {isOpen && <i className="dot" aria-hidden />}
    </button>
  )
}

function Palette({ items, close }) {
  const [q, setQ] = useState(''), [i, setI] = useState(0)
  const res = useMemo(() => items.map((it) => ({ it, s: fuzzy(q, `${it.label} ${it.type}`) })).filter((r) => r.s).sort((a, b) => b.s - a.s).slice(0, 40).map((r) => r.it), [q, items])
  const run = (it) => { close(); it.run() }
  return (
    <div className="pal-back" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className="pal" role="dialog" aria-label="Search">
        <input autoFocus value={q} placeholder="Search apps, projects, commands" aria-label="Search" onChange={(e) => { setQ(e.target.value); setI(0) }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setI((n) => Math.min(n + 1, res.length - 1)) }
            else if (e.key === 'ArrowUp') { e.preventDefault(); setI((n) => Math.max(n - 1, 0)) }
            else if (e.key === 'Enter' && res[i]) run(res[i])
            else if (e.key === 'Escape') close()
          }} />
        <ul role="listbox">
          {res.map((it, n) => <li key={it.type + it.label} role="option" aria-selected={n === i}><button tabIndex={-1} onMouseEnter={() => setI(n)} onClick={() => run(it)}><span>{it.label}</span><small>{it.type}</small></button></li>)}
          {!res.length && <li style={{ padding: 14 }} className="muted">Nothing found.</li>}
        </ul>
      </div>
    </div>
  )
}

export default function App() {
  const [booted, setBooted] = useState(false)
  const [theme, setTheme] = useLS('aritraos-theme-v1', 'day')
  const [wins, setWins] = useState([])
  const [z, setZ] = useState(1000)
  const [pal, setPal] = useState(false)
  const [lay, setLay] = useState(() => { const l = readLS(LAYOUT, {}); return l && typeof l === 'object' ? l : {} })
  const [evt, setEvt] = useState({ n: 0, type: '' })
  const wide = useMedia('(min-width: 1181px)')
  const clock = useClock()
  const quote = QUOTES[Math.floor(Date.now() / 864e5) % QUOTES.length]
  useEffect(() => writeLS(LAYOUT, lay), [lay])
  const ping = (type) => setEvt((e) => ({ n: e.n + 1, type }))

  const open = useCallback((id, payload) => {
    const app = APPS.find((a) => a.id === id)
    setZ((n) => n + 1)
    setWins((ws) => {
      const nz = Math.max(1000, ...ws.map((w) => w.z)) + 1
      const ex = ws.find((w) => w.id === id)
      if (ex) return ws.map((w) => (w.id === id ? { ...w, z: nz, min: false, payload: payload ?? w.payload } : w))
      const k = ws.length
      const vw = window.innerWidth, vh = window.innerHeight
      return [...ws, { id, z: nz, x: clamp((vw - app.size[0]) / 2 + k * 30 - 30, 8, vw - 120), y: clamp(70 + k * 28, 52, vh - 160), payload }]
    })
    ping('open')
  }, [])
  const focus = (id) => setWins((ws) => { const top = Math.max(...ws.map((w) => w.z)); const w = ws.find((x) => x.id === id); return w.z === top ? ws : ws.map((x) => (x.id === id ? { ...x, z: top + 1 } : x)) })
  const close = (id) => { setWins((ws) => ws.filter((w) => w.id !== id)); ping('close') }
  const patch = (id, p) => setWins((ws) => ws.map((w) => (w.id === id ? { ...w, ...p } : w)))
  const min = (id) => patch(id, { min: true })
  const max = (id) => setWins((ws) => ws.map((w) => (w.id === id ? { ...w, max: !w.max } : w)))
  const move = (id, x, y) => patch(id, { x, y })

  const cycleTheme = () => { const n = THEMES[(THEMES.findIndex((t) => t[0] === theme) + 1) % 3][0]; setTheme(n); ping('theme') }
  const resetLayout = () => setLay({})
  const items = useMemo(() => [
    ...APPS.map((a) => ({ label: a.title, type: 'App', run: () => open(a.id) })),
    ...FLAGSHIPS.map((f) => ({ label: f.title, type: 'Case file', run: () => open('cases', { id: f.id }) })),
    ...PROJECTS.map((p) => ({ label: p.title, type: 'Project', run: () => open('portfolio', { id: p.id }) })),
    ...THEMES.map(([id, n]) => ({ label: `Switch to ${n} theme`, type: 'Command', run: () => setTheme(id) })),
    { label: 'Email Aritra', type: 'Command', run: () => { location.href = `mailto:${P.contact.email}` } },
    { label: 'Download résumé', type: 'Command', run: () => window.open(P.identity.resumePdf, '_blank', 'noopener') },
    { label: 'Reset desktop icon positions', type: 'Command', run: resetLayout },
  ], [open])

  useEffect(() => {
    const k = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPal((p) => !p) }
      else if (e.key === 'Escape' && !pal) setWins((ws) => { const vis = ws.filter((w) => !w.min); if (!vis.length) return ws; const top = vis.reduce((a, b) => (a.z > b.z ? a : b)); return ws.filter((w) => w.id !== top.id) })
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [pal])

  const txOff = lay.tx || { x: 0, y: 0 }
  const txDrag = useDrag({
    threshold: 6,
    onStart: (e) => ({ r: e.currentTarget.getBoundingClientRect(), x: txOff.x, y: txOff.y }),
    onMove: (dx, dy, o) => wide && setLay((l) => ({ ...l, tx: { x: clamp(o.x + dx, o.x - o.r.left, o.x + window.innerWidth - o.r.right), y: clamp(o.y + dy, o.y - o.r.top + 52, o.y + window.innerHeight - o.r.bottom - 90) } })),
  })

  return (
    <div className="os" data-theme={theme}>
      <div className="wall" aria-hidden><div className="glow" /><div className="wm">প্রদর্শনী</div><div className="grain" /><div className="strip" /></div>

      <header className="bar">
        <div className="mark"><img src="/assets/01-portraits/primary-portrait-cafe.webp" alt="" /> AritraOS</div>
        <nav aria-label="System">
          <button onClick={() => open('portfolio')}>Work</button>
          <button onClick={() => open('cases')}>Case Files</button>
          <button onClick={() => open('journey')}>Journey</button>
        </nav>
        <button className="ib" onClick={() => setPal(true)} aria-label="Search"><Search size={17} aria-hidden /> <span className="sr-lg">Search</span> <kbd>Ctrl K</kbd></button>
        <span className="sp" />
        <span className="status"><i /> Kolkata · Bengaluru · IST</span>
        <div className="seg" role="group" aria-label="Theme">
          {THEMES.map(([id, n]) => <button key={id} aria-pressed={theme === id} onClick={() => { setTheme(id); ping('theme') }}>{n}</button>)}
        </div>
        <button className="ib" style={{ display: 'none' }} id="tcycle" onClick={cycleTheme} aria-label="Change theme"><Contrast size={18} /></button>
        <span className="clock">{clock}</span>
      </header>

      <main className="desk">
        <section className="ident" aria-label="Introduction">
          <div className="eyebrow">{P.identity.roles.join(' · ')}</div>
          <h1><span>Aritra</span><span>Banerjee</span></h1>
          <p className="bn" lang="bn">Welcome to my প্রদর্শনী</p>
          <p className="sub">{P.identity.subheadline}</p>
          <p className="where">Kolkata, India · Studying Communications &amp; Media and Psychology at Christ University, Bengaluru</p>
          <div className="ctas">
            <button className="btn pri" onClick={() => open('portfolio')}>Enter the portfolio</button>
            <a className="btn sec" href={`mailto:${P.contact.email}`}>Email me</a>
            <a className="btn sec" href={P.identity.resumePdf} download>Résumé</a>
          </div>
          <div className="proof" aria-label="Highlights">
            <span><b>{PROJECTS.length}</b>projects</span><span><b>5</b>case files</span><span><b>Meta</b>Social Media Marketing certificate, Sep 2026</span>
          </div>
        </section>

        <section className="portrait" aria-label="Portrait">
          <div className="arch"><img src={P.identity.primaryPortrait} alt="Aritra Banerjee smiling at a café counter" /></div>
          <div className="plaque"><b>Frame 01</b> · Aritra Banerjee, Digital Creative</div>
        </section>

        <div className="side">
          <aside className="card tx" style={{ transform: `translate(${txOff.x}px,${txOff.y}px)` }} onPointerDown={wide ? txDrag : undefined} aria-label="Daily transmission">
            <small><span>Daily transmission</span><span>{clock.split(',')[0]}</span></small>
            <p>{quote}</p>
            <button onPointerDown={(e) => e.stopPropagation()} onClick={() => open('board', { focus: Date.now() })}>Add a quick sticky</button>
          </aside>
          <nav className="apps apps-wrap" aria-label="Applications">
            {APPS.map((a) => (
              <Tile key={a.id} app={a} isOpen={wins.some((w) => w.id === a.id)} open={open} canMove={wide}
                off={lay[a.id] || { x: 0, y: 0 }} setOff={(o) => setLay((l) => ({ ...l, [a.id]: o }))} />
            ))}
          </nav>
        </div>
      </main>

      <div className="wins">
        {wins.map((w) => <Win key={w.id} w={w} app={APPS.find((a) => a.id === w.id)} focus={focus} close={close} min={min} max={max} move={move} open={open} />)}
      </div>

      <Companion evt={evt} />

      <nav className="dock" aria-label="Dock">
        {APPS.map((a) => (
          <button key={a.id} className={wins.some((w) => w.id === a.id) ? 'on' : ''} onClick={() => open(a.id)} aria-label={a.title}>
            <a.icon size={24} aria-hidden /><span className="tip">{a.title}</span>
          </button>
        ))}
        <hr />
        <button onClick={() => setPal(true)} aria-label="Search"><Search size={24} aria-hidden /><span className="tip">Search</span></button>
        <button onClick={cycleTheme} aria-label="Change theme"><Contrast size={24} aria-hidden /><span className="tip">Theme</span></button>
      </nav>

      {pal && <Palette items={items} close={() => setPal(false)} />}
      {!booted && <Boot done={() => setBooted(true)} />}
    </div>
  )
}
