export default function RemoteState({ resource, label = 'dossiers' }) {
  if (resource.status === 'loading') return <p role="status">Loading {label}…</p>
  return <section className="panel"><p role="alert">Unable to load {label}. {resource.error?.code === 'INVALID_RESPONSE' ? 'The API response was invalid.' : 'Check the backend connection and retry.'}</p><button className="primary-link" type="button" onClick={resource.retry}>Retry</button></section>
}
