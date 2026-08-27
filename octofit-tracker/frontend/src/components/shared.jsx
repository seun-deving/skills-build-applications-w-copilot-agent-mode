export function ResourceView({ title, description, children }) {
  return <section className="resource-view"><div className="section-heading"><div><span className="eyebrow">OctoFit Tracker</span><h1>{title}</h1><p>{description}</p></div></div>{children}</section>
}

export function ResourceState({ status, error, hasItems, empty }) {
  if (status === 'loading') return <div className="status-message">Loading...</div>
  if (status === 'error') return <div className="alert alert-warning" role="alert">{error}</div>
  if (status === 'ready' && !hasItems && empty) return <div className="status-message">{empty}</div>
  return null
}

