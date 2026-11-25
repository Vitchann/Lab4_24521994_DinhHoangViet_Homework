import { useEffect, useRef, useState } from 'react'

const THRESHOLD = 50

function releaseCapture(gesture) {
  if (gesture?.element.hasPointerCapture?.(gesture.id)) {
    gesture.element.releasePointerCapture(gesture.id)
  }
}

function directionFor(x, y) {
  if (Math.abs(x) >= THRESHOLD && Math.abs(x) > Math.abs(y)) return x > 0 ? 'right' : 'left'
  if (y <= -THRESHOLD && Math.abs(y) > Math.abs(x)) return 'up'
  return null
}

export function useSwipeGesture({ revision, disabled, onSwipe }) {
  const active = useRef(null)
  const [drag, setDrag] = useState(null)
  const visibleDrag = drag?.revision === revision ? drag : null

  useEffect(() => {
    const cancel = () => {
      const previous = active.current
      active.current = null
      setDrag(null)
      releaseCapture(previous)
    }
    window.addEventListener('blur', cancel)
    return () => {
      window.removeEventListener('blur', cancel)
      releaseCapture(active.current)
    }
  }, [])

  function reset() {
    const previous = active.current
    active.current = null
    setDrag(null)
    releaseCapture(previous)
  }

  return {
    dragging: Boolean(visibleDrag),
    style: visibleDrag ? { transform: `translate(${visibleDrag.x}px, ${visibleDrag.y}px) rotate(${visibleDrag.x / 18}deg)` } : undefined,
    handlers: {
      onPointerDown(event) {
        if (active.current && active.current.revision !== revision) reset()
        if (active.current) {
          // Multi-touch cancels the first gesture; repeated down for the same pointer is ignored.
          if (event.pointerId !== active.current.id) reset()
          return
        }
        if (disabled || event.button !== 0 || event.isPrimary === false) return
        event.preventDefault()
        event.currentTarget.focus({ preventScroll: true })
        active.current = { id: event.pointerId, x: event.clientX, y: event.clientY, revision, element: event.currentTarget }
        event.currentTarget.setPointerCapture?.(event.pointerId)
      },
      onPointerMove(event) {
        const start = active.current
        if (!start || event.pointerId !== start.id) return
        if (start.revision !== revision || disabled) { reset(); return }
        event.preventDefault()
        setDrag({ x: event.clientX - start.x, y: event.clientY - start.y, revision })
      },
      onPointerUp(event) {
        const start = active.current
        if (!start || event.pointerId !== start.id) return
        const direction = !disabled && event.button === 0 && start.revision === revision
          ? directionFor(event.clientX - start.x, event.clientY - start.y) : null
        // Clear before releasing capture/dispatching, so duplicate events cannot commit again.
        reset()
        if (direction) onSwipe(direction)
      },
      onPointerCancel(event) {
        if (event.pointerId === active.current?.id) reset()
      },
      onLostPointerCapture(event) {
        if (event.pointerId === active.current?.id) reset()
      },
    },
  }
}
