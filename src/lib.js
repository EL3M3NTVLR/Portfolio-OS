import { useEffect, useState, useCallback } from 'react'

export function readLS(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    return v == null ? fallback : JSON.parse(v)
  } catch {
    return fallback
  }
}
export function writeLS(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* storage unavailable */ }
}
export function useLS(key, initial) {
  const [v, setV] = useState(() => readLS(key, initial))
  useEffect(() => writeLS(key, v), [key, v])
  return [v, setV]
}
export function useMedia(q) {
  const [m, setM] = useState(() => window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const f = () => setM(mq.matches)
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [q])
  return m
}
export const clamp = (n, a, b) => Math.min(Math.max(n, a), Math.max(a, b))
export const ytId = (u = '') => (u.match(/(?:youtu\.be\/|v=)([\w-]{11})/) || [])[1]
export function fuzzy(q, s) {
  q = q.toLowerCase().trim(); s = s.toLowerCase()
  if (!q) return 1
  if (s.includes(q)) return 100 - s.indexOf(q)
  let i = 0
  for (const c of s) if (c === q[i]) i++
  return i === q.length ? 10 : 0
}
export function useDrag({ onMove, onStart, onEnd, threshold = 0 }) {
  return useCallback((e) => {
    if (e.button != null && e.button !== 0) return
    const sx = e.clientX, sy = e.clientY
    const el = e.currentTarget
    const ctx = onStart ? onStart(e) : {}
    let moved = false
    el.setPointerCapture?.(e.pointerId)
    const mv = (ev) => {
      const dx = ev.clientX - sx, dy = ev.clientY - sy
      if (!moved && Math.hypot(dx, dy) < threshold) return
      moved = true
      onMove(dx, dy, ctx, ev)
    }
    const up = () => {
      el.removeEventListener('pointermove', mv)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
      onEnd?.(moved, ctx)
    }
    el.addEventListener('pointermove', mv)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
  }, [onMove, onStart, onEnd, threshold])
}
