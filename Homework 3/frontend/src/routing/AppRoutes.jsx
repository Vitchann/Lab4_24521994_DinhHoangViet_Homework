import { Outlet, Route, Routes } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout.jsx'
import { OverviewPage, DossierIndex, AboutPage, NotFoundPage } from '../pages/WorkspacePages.jsx'
import DossierPage from '../pages/DossierPage.jsx'
import { simulation } from '../data/simulation.js'
import { validateDataset } from '../domain/validateDataset.js'

validateDataset(simulation)

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="dossiers" element={<DossierIndex />} />
        <Route path="dossier" element={<Outlet />}>
          <Route index element={<NotFoundPage />} />
          <Route path=":playerID" element={<DossierPage />} />
        </Route>
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
