import { useEffect, useRef } from 'react'

const directions = Object.freeze({ ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up' })
const editableSelector = 'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]'

export function useDeckKeyboard({ onSwipe, onUndo }) {
  const heldKeys = useRef(new Set())

  useEffect(() => {
    const reset = () => heldKeys.current.clear()
    window.addEventListener('blur', reset)
    return () => window.removeEventListener('blur', reset)
  }, [])

  return {
    onKeyDown(event) {
      if (event.defaultPrevented || event.isComposing || event.nativeEvent.isComposing ||
          event.ctrlKey || event.metaKey || event.altKey || event.shiftKey ||
          event.target.closest(editableSelector)) return
      if (event.key !== 'Backspace' && !Object.hasOwn(directions, event.key)) return
      event.preventDefault()
      if (event.repeat || heldKeys.current.has(event.key)) return
      heldKeys.current.add(event.key)
      if (event.key === 'Backspace') onUndo()
      else onSwipe(directions[event.key])
    },
    onKeyUp(event) {
      heldKeys.current.delete(event.key)
    },
    onBlur(event) {
      if (!event.currentTarget.contains(event.relatedTarget)) heldKeys.current.clear()
    },
  }
}
