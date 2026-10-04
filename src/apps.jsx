import { useMemo, useRef, useState, useEffect } from 'react'
import { Play, Download, Mail, Linkedin, Copy, Trash2, X, ExternalLink, Plus, RotateCcw } from 'lucide-react'
import { ownerProfile as P } from './data/profile.js'
import projects from './data/projects.json'
import { readLS, writeLS, ytId, clamp, useDrag } from './lib.js'

const FLAGS = P.flagships
const FLAG_IDS = FLAGS.map((f) => f.id)
const GROUPS = {
  'UI/UX': 'UI/UX', Film: 'Film', 'Documentary Series': 'Film', 'Music Video': 'Film', Commercial: 'Film',
  Poster: 'Design', Design: 'Design', Reel: 'Reels', Audio: 'Audio',
}
const group = (p) => GROUPS[p.category] || 'Other'
const ordered = [...projects].sort((a, b) => {
  const fa = FLAG_IDS.indexOf(a.id), fb = FLAG_IDS.indexOf(b.id)
  return (fa < 0 ? 99 : fa) - (fb < 0 ? 99 : fb)
})
export const PROJECTS = ordered
export const FLAGSHIPS = FLAGS

const Ext = ({ href, children, cls = 'btn sm sec' }) => (
  <a className={cls} href={href} target="_blank" rel="noreferrer noopener">{children}<ExternalLink size={15} aria-hidden /></a>
)

/* ---------- Portfolio ---------- */
export function PortfolioApp({ payload, open }) {
  const [f, setF] = useState('All')
  const [sel, setSel] = useState(payload?.id || null)
  useEffect(() => { if (payload?.id) setSel(payload.id) }, [payload])
  const groups = ['All', ...Array.from(new Set(ordered.map(group)))]
  const list = ordered.filter((p) => f === 'All' || group(p) === f)
  const p = ordered.find((x) => x.id === sel)
  if (p) {
    const isFlag = FLAG_IDS.includes(p.id)
    return (
      <div>
        <button className="back" onClick={() => setSel(null)}>← All projects</button>
        <div className="detail">
          <div className="im"><img src={p.cover} alt={`Cover artwork for ${p.title}`} /></div>
          <div className="case">
            <div className="tag">{p.tag}</div>
            <h3>{p.title}</h3>
            <p className="muted">{p.meta}</p>
            <p style={{ marginTop: 14 }}>{p.desc}</p>
            <div className="row">
              {isFlag && <button className="btn sm pri" onClick={() => open('cases', { id: p.id })}>Read the case file</button>}
              {p.url && <Ext href={p.url}>{p.btnText?.replace(/^[↗▶]\s*/, '') || 'Open project'}</Ext>}
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      <div className="chips" role="group" aria-label="Filter projects">
        {groups.map((g) => <button key={g} className="chip" aria-pressed={f === g} onClick={() => setF(g)}>{g}</button>)}
      </div>
      <div className="grid">
        {list.map((x) => (
          <button key={x.id} className="pc" onClick={() => setSel(x.id)}>
            <div className="im"><img loading="lazy" src={x.cover} alt={`Cover artwork for ${x.title}`} /></div>
            <b>{FLAG_IDS.includes(x.id) && <span className="star">★ </span>}{x.title}</b>
            <span>{x.tag}</span>
          </button>
        ))}
      </div>
      <p className="note">★ marks the five flagship case files. {projects.length} projects in the archive.</p>
    </div>
  )
}

/* ---------- Case files ---------- */
export function CasesApp({ payload }) {
  const [id, setId] = useState(payload?.id || FLAGS[0].id)
  useEffect(() => { if (payload?.id) setId(payload.id) }, [payload])
  const c = FLAGS.find((x) => x.id === id) || FLAGS[0]
  return (
    <div className="split">
      <div className="list" role="list">
        {FLAGS.map((x) => (
          <button key={x.id} aria-current={x.id === c.id} onClick={() => setId(x.id)}>
            <img src={x.cover} alt="" />
            <div><b>{x.title.replace(' (App Prototype)', '')}</b><span>{x.category.split(' · ')[0]}</span></div>
          </button>
        ))}
      </div>
      <article className="case" key={c.id}>
        <div className="tag">{c.category}</div>
        <h3>{c.title}</h3>
        <p className="muted">{c.context}</p>
        <p style={{ marginTop: 12 }}>{c.overview}</p>
        <h4>The question</h4><p>{c.theQuestion}</p>
        <h4>My role</h4><p>{c.role}</p>
        <h4>How it came together</h4>
        <ul>{c.howItCameTogether.map((s, i) => <li key={i}>{s}</li>)}</ul>
        <h4>Outcome</h4><p>{c.outcome}</p>
        <h4>Reflection</h4><p>{c.reflection}</p>
        <div className="row">{c.links.map((l) => <Ext key={l.url} href={l.url}>{l.label.replace(/^[↗▶]\s*/, '')}</Ext>)}</div>
      </article>
    </div>
  )
}

/* ---------- Film vault ---------- */
const FILMS = [
  { t: 'Mirage', s: 'Music video · SDG 6 · Director, vocals, lead', u: 'https://youtu.be/CX_G0lGilr8', c: '/assets/02-projects/mirage/cover.webp' },
  { t: 'Heartware', s: 'Documentary · Shot and edited', u: 'https://youtu.be/Rk8zTI0Rc60', c: '/assets/02-projects/heartware/cover.webp' },
  { t: 'Museum of a Normal Person · Ep 1', s: 'Docu-series · Cinematography and colour', u: 'https://youtu.be/dzIodzUOJjw', c: '/assets/02-projects/museum-of-a-normal-person/cover.webp' },
  { t: 'Museum of a Normal Person · Ep 2', s: 'Docu-series · Cinematography and colour', u: 'https://youtu.be/j1Iw5m5Ztf0', c: '/assets/02-projects/museum-of-a-normal-person/cover.webp' },
  { t: 'Museum of a Normal Person · Ep 3', s: 'Docu-series · Cinematography and colour', u: 'https://youtu.be/oopxkjOC5tw', c: '/assets/02-projects/museum-of-a-normal-person/cover.webp' },
  { t: 'Moiré', s: 'Short film', u: 'https://youtu.be/RXE7CCLYXGg', c: '/assets/02-projects/moire/cover.webp' },
  { t: 'The Wheel of Life', s: 'Personal film', u: 'https://youtu.be/mG_hhUn0dWI', c: '/assets/02-projects/wheeloflife/cover.webp' },
  { t: 'Kiwi Slices', s: 'Commercial · Internship', u: 'https://youtu.be/bWTlYq7gXqQ', c: '/assets/02-projects/kiwislices/cover.webp' },
  { t: "Barbie's Dreamhouse", s: 'Commercial · Academic miniature', u: 'https://youtu.be/9q0rounPPjU', c: '/assets/02-projects/barbie/cover.webp' },
]
function Film({ f }) {
  const [on, setOn] = useState(false)
  const id = ytId(f.u)
  return (
    <div className="film">
      <div className="v">
        {on ? <iframe title={f.t} src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen /> : (
          <>
            <img loading="lazy" src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" onError={(e) => { e.currentTarget.src = f.c }} />
            <button onClick={() => setOn(true)} aria-label={`Play ${f.t}`}><i><Play size={26} fill="currentColor" /></i></button>
          </>
        )}
      </div>
      <b>{f.t}</b><span className="muted">{f.s}</span>
      <a href={f.u} target="_blank" rel="noreferrer noopener">Open on YouTube ↗</a>
    </div>
  )
}
export function FilmsApp() {
  return (
    <div>
      <p className="muted" style={{ marginBottom: 16 }}>Nothing autoplays. Press play to load a film from YouTube; links open the original.</p>
      <div className="films">{FILMS.map((f) => <Film key={f.u} f={f} />)}</div>
    </div>
  )
}

/* ---------- About ---------- */
export function AboutApp() {
  return (
    <div className="about">
      <img src={P.identity.altPortraits.cinematicWarm} alt="Aritra Banerjee, portrait in warm light" />
      <div>
        <div className="tag">About.txt</div>
        <pre>{P.aboutText}</pre>
        <div className="row">
          <a className="btn sm pri" href={P.identity.resumePdf} download>Download résumé <Download size={16} aria-hidden /></a>
          <a className="btn sm sec" href={`mailto:${P.contact.email}`}>Email <Mail size={16} aria-hidden /></a>
        </div>
      </div>
    </div>
  )
}

/* ---------- Journey ---------- */
export function JourneyApp() {
  return (
    <div>
      <h3>Journey, 2004 to now</h3>
      <p className="muted" style={{ marginBottom: 22 }}>Media and experience design start early: you absorb stimuli from birth. These are the turning points.</p>
      <ol className="tl">
        {P.journey.map((j, i) => (
          <li key={i}><span className="y">{j.year}</span><b>{j.title}</b><p>{j.desc}</p><span className="tag">{j.tag}</span></li>
        ))}
      </ol>
      <p className="note">Munchables.tv view counts are approximate and self-reported.</p>
    </div>
  )
}

/* ---------- Craft ---------- */
const STEPS = [
  ['Start from real experience', 'Every project begins with something I watched, lived or noticed: a first legal encounter, a water crisis, a shop full of other people\'s pasts.'],
  ['Test the assumption', 'Research before building. For Legaloid a ten-person survey killed my own cost-led idea before any screen was designed.'],
  ['Make the sharp thing', 'Prototype, shoot or cut the smallest version that can be judged. A made thing speaks louder than an application.'],
  ['Let constraints set the look', 'No stabilizer, no budget, one weekend: the limit becomes the style, such as handheld shake that reads as human.'],
  ['Show it, then reflect', 'Ship it to real people, note what held up, and write down what I would do with more runway.'],
]
export function CraftApp() {
  return (
    <div>
      <h3>How I work</h3>
      <p className="muted" style={{ marginBottom: 18 }}>A five-step loop across design, film and AI-assisted prototyping.</p>
      <div className="steps">{STEPS.map(([t, d]) => <div className="step" key={t}><b>{t}</b><p>{d}</p></div>)}</div>
      <h3 style={{ marginTop: 28 }}>What I can do</h3>
      <div className="steps" style={{ marginTop: 10 }}>
        {P.commercial.offerings.map((o) => (
          <div className="step" key={o.title}><b>{o.title}</b><p>{o.desc}</p><p className="tag" style={{ gridColumn: 2 }}>{o.tags.join(' · ')}</p></div>
        ))}
      </div>
    </div>
  )
}

/* ---------- Whiteboard ---------- */
const COLORS = ['#F2C94C', '#F4A58A', '#9AD9C9', '#C9B6F0']
const KEY = 'aritraos-board-v1'
export function BoardApp({ payload }) {
  const [notes, setNotes] = useState(() => { const n = readLS(KEY, []); return Array.isArray(n) ? n : [] })
  const [txt, setTxt] = useState('')
  const [col, setCol] = useState(COLORS[0])
  const area = useRef(null), inp = useRef(null)
  useEffect(() => writeLS(KEY, notes), [notes])
  useEffect(() => { if (payload?.focus) inp.current?.focus() }, [payload])
  const add = () => {
    const t = txt.trim().slice(0, 140)
    if (!t) return
    setNotes((n) => [...n, { id: Date.now(), t, c: col, x: 16 + (n.length % 5) * 28, y: 16 + (n.length % 5) * 28 }])
    setTxt('')
  }
  const upd = (id, patch) => setNotes((n) => n.map((x) => (x.id === id ? { ...x, ...patch } : x)))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 420 }}>
      <div className="wbbar">
        <input ref={inp} value={txt} maxLength={140} placeholder="Write a quick sticky (140 characters)" aria-label="Sticky note text"
          onChange={(e) => setTxt(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} />
        {COLORS.map((c) => <button key={c} className="sw" style={{ background: c }} aria-pressed={col === c} aria-label={`Colour ${c}`} onClick={() => setCol(c)} />)}
        <button className="btn sm pri" onClick={add}><Plus size={16} aria-hidden /> Add</button>
        <button className="btn sm sec" onClick={() => setNotes([])}><RotateCcw size={16} aria-hidden /> Clear</button>
      </div>
      <div className="board" ref={area}>
        {notes.map((n) => <Sticky key={n.id} n={n} area={area} upd={upd} del={() => setNotes((l) => l.filter((x) => x.id !== n.id))} />)}
        {!notes.length && <p className="muted" style={{ padding: 20 }}>Empty board. Add a note above, then drag it by its top bar.</p>}
      </div>
      <p className="note">Notes are saved only in this browser. Nobody else, including me, receives them. To reach me, use Contact.</p>
    </div>
  )
}
function Sticky({ n, area, upd, del }) {
  const start = useDrag({
    onStart: () => ({ x: n.x, y: n.y }),
    onMove: (dx, dy, o) => {
      const r = area.current.getBoundingClientRect()
      upd(n.id, { x: clamp(o.x + dx, 0, r.width - 176), y: clamp(o.y + dy, 0, r.height - 60) })
    },
  })
  return (
    <div className="sticky" style={{ left: n.x, top: n.y, background: n.c }}>
      <header onPointerDown={start}><span style={{ fontSize: 12, fontWeight: 600 }}>drag</span>
        <button onClick={del} aria-label="Delete note"><Trash2 size={16} /></button></header>
      <textarea value={n.t} maxLength={140} aria-label="Edit note" onChange={(e) => upd(n.id, { t: e.target.value })} />
    </div>
  )
}

/* ---------- Résumé ---------- */
export function ResumeApp() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="row" style={{ marginTop: 0 }}>
        <a className="btn sm pri" href={P.identity.resumePdf} download>Download PDF <Download size={16} aria-hidden /></a>
        <Ext href={P.identity.resumePdf}>Open in new tab</Ext>
      </div>
      <iframe title="Résumé preview" src={P.identity.resumePdf} style={{ flex: 1, minHeight: 380, border: '2px solid var(--ink)', borderRadius: 6, background: '#fff' }} />
    </div>
  )
}

/* ---------- Contact ---------- */
export function ContactApp() {
  const [f, setF] = useState({ name: '', org: '', msg: '' })
  const [copied, setCopied] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const href = `mailto:${P.contact.email}?subject=${encodeURIComponent(`Hello from ${f.name || 'your portfolio'}`)}&body=${encodeURIComponent(`Hi Aritra,\n\n${f.msg}\n\n${f.name}${f.org ? ', ' + f.org : ''}`)}`
  const copy = async () => { try { await navigator.clipboard.writeText(P.contact.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* ignore */ } }
  return (
    <div>
      <h3>Let's talk</h3>
      <p className="muted" style={{ marginBottom: 16 }}>Looking for a full-time role in design, video or creative technology. Writing here opens your email app with the message ready to send.</p>
      <div className="row" style={{ marginTop: 0, marginBottom: 22 }}>
        <a className="btn sm pri" href={`mailto:${P.contact.email}`}><Mail size={16} aria-hidden /> {P.contact.email}</a>
        <button className="btn sm sec" onClick={copy}><Copy size={16} aria-hidden /> {copied ? 'Copied' : 'Copy email'}</button>
        <Ext href={P.contact.linkedin}><Linkedin size={16} aria-hidden /> LinkedIn</Ext>
      </div>
      <div className="form">
        <label>Your name<input value={f.name} onChange={set('name')} autoComplete="name" /></label>
        <label>Studio or company<input value={f.org} onChange={set('org')} autoComplete="organization" /></label>
        <label>Message<textarea value={f.msg} onChange={set('msg')} /></label>
        <a className="btn pri" href={href}>Open in my email app</a>
      </div>
    </div>
  )
}
