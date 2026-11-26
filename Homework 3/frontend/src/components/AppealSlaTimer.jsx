import { useForm } from '../context/FormContext.js'
import { formatUtc } from '../domain/formatUtc.js'

export default function AppealSlaTimer() {
  const { sla, dossier } = useForm()
  const seconds = Math.ceil(sla.remainingMs / 1000)
  const pad = (value) => String(value).padStart(2, '0')
  const display = `${pad(Math.floor(seconds / 86400))}d ${pad(Math.floor(seconds / 3600) % 24)}:${pad(Math.floor(seconds / 60) % 60)}:${pad(seconds % 60)}`
  return <div className="sla-panel"><h3>Demonstration appeal window</h3><p>{sla.status === 'invalid' ? 'Deadline unavailable. Local review is disabled.' : <>{sla.status === 'expired' ? 'Deadline expired. Local review is disabled.' : 'Local review window is active.'} Deadline: <time dateTime={dossier.appealDeadline}>{formatUtc(dossier.appealDeadline)} at {dossier.appealDeadline.slice(11, 16)}</time>.</>}</p><span role="timer" aria-label="Time remaining" aria-live="off" className="sla-clock">{display}</span><p className="field-hint">Client-clock display only. The server independently enforces the deadline.</p></div>
}
