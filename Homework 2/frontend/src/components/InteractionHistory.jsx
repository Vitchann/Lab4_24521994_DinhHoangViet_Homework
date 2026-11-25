import { ACTION_POINTS } from '../domain/models.js'

const actionLabels = { LIKE: 'Đã thích', DISLIKE: 'Không thích', SKIP: 'Bỏ qua' }

export default function InteractionHistory({ history, profiles }) {
  const byId = new Map(profiles.map((profile) => [profile.id, profile]))
  return (
    <section className="history-panel" aria-labelledby="history-heading">
      <div className="panel-heading"><h2 id="history-heading">Lịch sử tương tác</h2><span className="count-badge">{history.length}</span></div>
      <p className="panel-description">Những cảm xúc vừa đi qua.</p>
      {history.length === 0 ? <div className="empty-history"><span aria-hidden="true">♡</span><h3>Chưa có tương tác nào</h3><p>Một cái thích nhỏ có thể là<br />khởi đầu của điều thú vị.</p></div> : (
        <ol className="history-list" reversed>
          {[...history].reverse().map((entry) => {
            const profile = byId.get(entry.profileId)
            const points = ACTION_POINTS[entry.action]
            return <li key={entry.profileId} data-action={entry.action}><img src={profile.imageUrl} alt="" /><div><strong>{profile.name}</strong><span>{actionLabels[entry.action]}</span></div><b className={points > 0 ? 'positive' : 'negative'}>{points > 0 ? '+' : ''}{points}</b></li>
          })}
        </ol>
      )}
      <div className="history-note"><span aria-hidden="true">↶</span> Đổi ý cũng không sao. Bạn luôn có thể hoàn tác.</div>
    </section>
  )
}
