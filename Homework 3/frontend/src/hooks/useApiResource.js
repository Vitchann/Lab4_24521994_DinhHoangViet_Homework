import { useEffect, useState } from 'react'
import { requestApi } from '../api/client.js'

export function useApiResource(path, parse) {
  const [state, setState] = useState({ path, status: 'loading' })
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    if (!path) return
    const controller = new AbortController()
    requestApi(path, { signal: controller.signal }, parse).then((data) => {
      if (!controller.signal.aborted) setState({ path, status: 'ready', data })
    }).catch((error) => {
      if (!controller.signal.aborted) setState({ path, status: 'error', error })
    })
    return () => controller.abort()
  }, [path, parse, attempt])
  function retry() { setState({ path, status: 'loading' }); setAttempt((value) => value + 1) }
  return { ...(state.path === path ? state : { status: 'loading' }), retry }
}
