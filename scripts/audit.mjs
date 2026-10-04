// Post-build audit: asset paths exist + no inherited reference identity ships.
import fs from 'node:fs'
import path from 'node:path'
const root = path.resolve('.')
let fail = 0
const projects = JSON.parse(fs.readFileSync('src/data/projects.json', 'utf8'))
for (const p of projects) {
  if (!fs.existsSync(path.join(root, 'public', p.cover))) { console.error('MISSING cover:', p.cover); fail++ }
}
const banned = [/calendly/i, /cal\.com/i, /whatsapp/i, /\bRajNet\b/i, /\bUK Realty\b/i, /Imperium Marketing/i, /Propmart/i, /Top 6/i, /Build this OS/i, /Founder\.txt/i, /github\.com/i, /instagram\.com\/(?!reel)/i, /lorem ipsum/i, /coursera\.org\/verify/i]
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])
for (const f of walk('dist').filter((f) => /\.(html|js|css|json|xml|txt|svg)$/.test(f))) {
  const s = fs.readFileSync(f, 'utf8')
  for (const b of banned) if (b.test(s)) { console.error(`BANNED ${b} in ${f}`); fail++ }
}
for (const st of ['idle','happy','sad','excited','sleeping','alert','dragging','celebrating']) {
  const ok = ['png','webp'].some((e) => fs.existsSync(`public/assets/03-companion/companion-${st}.${e}`))
  if (!ok) console.warn(`WARN companion-${st} image missing (stand-in photo will show)`)
}
if (!fs.existsSync('dist/index.html')) { console.error('dist/index.html missing'); fail++ }
console.log(fail ? `Audit FAILED (${fail})` : 'Audit passed: assets present, no banned identity tokens in build output.')
process.exit(fail ? 1 : 0)
