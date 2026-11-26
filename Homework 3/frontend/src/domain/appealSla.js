export function calculateSla(deadline, nowMs) {
  const end = typeof deadline === 'string' ? Date.parse(deadline) : NaN
  if (!Number.isFinite(end) || !Number.isFinite(nowMs) || new Date(end).toISOString() !== deadline) return { status: 'invalid', remainingMs: 0 }
  const remainingMs = Math.max(0, end - nowMs)
  return { status: remainingMs > 0 ? 'active' : 'expired', remainingMs }
}
