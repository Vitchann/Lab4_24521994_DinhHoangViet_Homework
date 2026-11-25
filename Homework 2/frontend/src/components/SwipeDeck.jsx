import { useRef, useState } from 'react'
import { getCurrentProfile, getProgress, swipe, undo } from '../domain/swipeEngine.js'
import ProfileCard from './ProfileCard.jsx'
import SwipeControls from './SwipeControls.jsx'
import ScoreBoard from './ScoreBoard.jsx'
import InteractionHistory from './InteractionHistory.jsx'
import Icon from './Icon.jsx'
import { useDeckKeyboard } from '../hooks/useDeckKeyboard.js'
import { useSwipeGesture } from '../hooks/useSwipeGesture.js'

export default function SwipeDeck({ profiles }) {
  const [history, setHistory] = useState([])
  const deckRef = useRef(null)
  const current = getCurrentProfile(profiles, history)
  const progress = getProgress(profiles, history)
  const preserveFocus = () => {
    if (deckRef.current?.contains(document.activeElement)) deckRef.current.focus({ preventScroll: true })
  }
  const onSwipe = (direction) => {
    if (progress.remaining === 1) preserveFocus()
    setHistory((previous) => swipe(profiles, previous, direction))
  }
  const onUndo = () => {
    if (history.length === 1) preserveFocus()
    setHistory((previous) => undo(previous))
  }
  const keyboard = useDeckKeyboard({ onSwipe, onUndo })
  const gesture = useSwipeGesture({ revision: history, disabled: !current, onSwipe })

  return (
    <section ref={deckRef} className="deck-layout" aria-label="Bộ thẻ khám phá" tabIndex={0} aria-describedby="deck-help" {...keyboard}>
      <aside className="left-column">
        <div className="discovery-note"><span className="note-symbol" aria-hidden="true">✳</span><h2>Không áp lực.<br />Cứ là chính bạn.</h2><p>Một bộ thẻ, những cá tính khác nhau. Lắng nghe cảm xúc và chọn điều bạn muốn.</p><span className="small-rule" /></div>
        <ScoreBoard history={history} />
      </aside>
      <div className="deck-column">
        <div className="deck-progress"><span><span className="live-dot" /> Khám phá hôm nay</span><span>Còn {progress.remaining} hồ sơ</span></div>
        <div className={`card-stack ${current ? '' : 'is-empty'}`} role="region" aria-label="Hồ sơ hiện tại" tabIndex={0} data-dragging={gesture.dragging} style={gesture.style} {...gesture.handlers}>
          {current ? <div className="card-entry" key={current.id}><ProfileCard profile={current} /></div> : <div className="empty-deck"><Icon name="spark" /><h2>{profiles.length ? 'Bạn đã khám phá hết rồi!' : 'Chưa có hồ sơ để khám phá'}</h2><p>{profiles.length ? 'Một hành trình nhỏ, thật nhiều cảm xúc. Hoàn tác để xem lại lựa chọn của bạn.' : 'Hãy quay lại khi có thêm những gương mặt mới.'}</p></div>}
        </div>
        <SwipeControls onSwipe={onSwipe} onUndo={onUndo} isComplete={progress.isComplete} canUndo={history.length > 0} />
        <p className="deck-caption">Chọn theo cảm xúc, không cần nghĩ quá nhiều.</p>
        <p className="gesture-help">Kéo thẻ sang trái, phải hoặc lên trên để chọn.</p>
        <p className="keyboard-help" id="deck-help">Chọn bộ thẻ để dùng phím <kbd>←</kbd> không thích <kbd>→</kbd> thích <kbd>↑</kbd> bỏ qua <kbd>⌫</kbd> hoàn tác</p>
        <p className="deck-announcement" role="status" aria-live="polite" aria-atomic="true">{current ? `Đang xem ${current.name}. Còn ${progress.remaining} hồ sơ.` : 'Đã hết hồ sơ.'}</p>
      </div>
      <aside className="right-column"><InteractionHistory history={history} profiles={profiles} /><div className="little-note"><Icon name="heart" /><p>Không cần tìm người hoàn hảo.<br />Chỉ cần một chút đồng điệu.</p></div></aside>
    </section>
  )
}
