import Icon from './Icon.jsx'

export default function SwipeControls({ onSwipe, onUndo, isComplete, canUndo }) {
  return (
    <div className="swipe-controls" role="group" aria-label="Quyết định của bạn">
      <button type="button" className="action-button undo-button" aria-label="Hoàn tác" aria-keyshortcuts="Backspace" disabled={!canUndo} onClick={onUndo}><Icon name="undo" /><span>Hoàn tác</span></button>
      <button type="button" className="action-button dislike-button" aria-label="Không thích" aria-keyshortcuts="ArrowLeft" disabled={isComplete} onClick={() => onSwipe('left')}><Icon name="close" /><span>Không thích</span></button>
      <button type="button" className="action-button like-button" aria-label="Thích" aria-keyshortcuts="ArrowRight" disabled={isComplete} onClick={() => onSwipe('right')}><Icon name="heart" /><span>Thích</span></button>
      <button type="button" className="action-button skip-button" aria-label="Bỏ qua" aria-keyshortcuts="ArrowUp" disabled={isComplete} onClick={() => onSwipe('up')}><Icon name="up" /><span>Bỏ qua</span></button>
    </div>
  )
}
