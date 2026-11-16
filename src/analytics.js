// Google Analytics 4 with consent. Nothing loads and nothing is sent until the visitor accepts.
// The Measurement ID is public by design (it is visible on every site that uses GA).
const ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-Q79N5RFVNX'
const KEY = 'aritraos-consent-v1'
let loaded = false

export function getConsent() {
  try { const v = localStorage.getItem(KEY); return v === 'granted' || v === 'denied' ? v : null } catch { return null }
}

function load() {
  if (loaded || !ID) return
  loaded = true
  window[`ga-disable-${ID}`] = false
  window.dataLayer = window.dataLayer || []
  window.gtag = function () { window.dataLayer.push(arguments) }
  window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
  window.gtag('js', new Date())
  window.gtag('config', ID, { allow_google_signals: false, allow_ad_personalization_signals: false })
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`
  document.head.appendChild(s)
}

function clearCookies() {
  const host = location.hostname
  document.cookie.split(';').map((c) => c.trim().split('=')[0]).filter((n) => n === '_ga' || n.startsWith('_ga_')).forEach((n) => {
    document.cookie = `${n}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
    document.cookie = `${n}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${host}`
  })
}

export function setConsent(value) {
  try { localStorage.setItem(KEY, value) } catch { /* storage unavailable */ }
  if (value === 'granted') load()
  else {
    if (ID) window[`ga-disable-${ID}`] = true
    clearCookies()
  }
}

export function initAnalytics() {
  if (getConsent() === 'granted') load()
}

// Events are dropped unless the visitor has accepted. Nothing is queued.
export function track(name, params = {}) {
  if (!loaded || getConsent() !== 'granted' || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}

export const openConsent = () => window.dispatchEvent(new Event('aritraos:consent-open'))

// One listener covers email, résumé and outbound link clicks.
export function watchLinks() {
  const h = (e) => {
    const a = e.target.closest?.('a[href]')
    if (!a) return
    const href = a.getAttribute('href') || ''
    if (href.startsWith('mailto:')) return track('email_click', { method: 'mailto' })
    if (/\.pdf($|\?)/i.test(href)) return track('resume_download', { method: a.hasAttribute('download') ? 'download' : 'open', file_name: href.split('/').pop() })
    try {
      const u = new URL(a.href, location.href)
      if (u.hostname && u.hostname !== location.hostname) track('outbound_click', { link_domain: u.hostname, link_url: u.href.slice(0, 200), link_text: (a.textContent || '').trim().slice(0, 60) })
    } catch { /* ignore */ }
  }
  document.addEventListener('click', h, true)
  return () => document.removeEventListener('click', h, true)
}
