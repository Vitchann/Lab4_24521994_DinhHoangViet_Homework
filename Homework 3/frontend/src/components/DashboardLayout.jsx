import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { SIMULATION_NOTICE } from '../domain/models.js'
import { useTribunal } from '../context/TribunalContext.js'
import Icon from './Icon.jsx'

export default function DashboardLayout() {
  const { data } = useTribunal()
  const { pathname } = useLocation()
  const section = pathname.startsWith('/dossier/') ? 'Dossier review' : pathname === '/dossiers' ? 'Dossier registry' : pathname === '/about' ? 'Simulation guide' : 'Overview'
  return (
    <div className="workspace">
      <a className="skip-link" href="#main">Skip to main content</a>
      <aside className="sidebar">
        <NavLink to="/" className="brand"><span className="brand-symbol"><Icon name="shield" /></span><span>fairplay<span className="brand-period">.</span><small>ESPORTS TRIBUNAL</small></span></NavLink>
        <p className="nav-label">REVIEW WORKSPACE</p>
        <nav aria-label="Primary navigation">
          <NavLink to="/" end><Icon name="grid" />Overview</NavLink>
          <NavLink to="/dossiers"><Icon name="folder" />Dossier registry<span className="nav-count" aria-hidden="true">{data ? String(data.dossiers.length).padStart(2, '0') : '—'}</span></NavLink>
          <NavLink to="/about"><Icon name="info" />Simulation guide</NavLink>
        </nav>
        <div className="sidebar-principle"><Icon name="shield" /><strong>Fair process.<br />Better competition.</strong><p>Context, clarity and a chance to be heard.</p></div>
        <div className="environment"><span className="status-dot" /><div><strong>Training environment</strong><small>Local demonstration · v0.1</small></div></div>
      </aside>
      <div className="workspace-body">
        <header className="topbar"><div><span>Workspace</span><span aria-hidden="true"> / </span><strong>{section}</strong></div><div className="workspace-identity"><span className="outline-badge">LOCAL DEMO</span><span className="operator-avatar" aria-hidden="true">FP</span></div></header>
        <main id="main" tabIndex={-1}>
          <div className="simulation-notice" role="note" aria-label="Simulation notice"><Icon name="info" /><div><strong>SIMULATION WORKSPACE</strong><p>{SIMULATION_NOTICE}</p></div></div>
          <Outlet />
        </main>
        <footer className="workspace-footer"><span>Fairplay Tribunal · Educational interface</span><span>No official authority. No real-world disciplinary findings.</span></footer>
      </div>
    </div>
  )
}
