import { useCallback, useEffect, useState } from 'react'
import { calculateSla } from '../domain/appealSla.js'

export function useAppealSlaTimer(deadline) {
  const [now, setNow] = useState(() => Date.now())
  const refresh = useCallback(() => setNow(Date.now()), [])
  useEffect(() => {
    const interval = window.setInterval(refresh, 1000)
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') refresh()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      window.clearInterval(interval)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [refresh])
  return { ...calculateSla(deadline, now), refresh }
}
