import { calculateScore } from '../domain/swipeEngine.js'
import Icon from './Icon.jsx'

export default function ScoreBoard({ history }) {
  const score = calculateScore(history)
  return (
    <section className="score-board" aria-labelledby="score-heading">
      <div className="panel-heading"><span className="mini-icon"><Icon name="spark" /></span><h2 id="score-heading">Điểm cảm xúc</h2></div>
      <output aria-label="Điểm của bạn" className="score-value">{score > 0 ? '+' : ''}{score}</output>
      <p>Mỗi quyết định, một dấu ấn.</p>
      <div className="score-legend"><span><b>+10</b> khi thích</span><span><b>−5</b> khi bỏ qua / không thích</span></div>
    </section>
  )
}
