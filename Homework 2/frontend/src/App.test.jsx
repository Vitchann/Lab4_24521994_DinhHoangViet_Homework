import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App.jsx'

describe('P2-05 application shell and demo data', () => {
  it('renders the Vietnamese application identity and a main landmark', () => {
    render(<App />)
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: /Hẹn hò nhưng không yêu/i })).toBeVisible()
  })

  it('clearly labels the local fictional demonstration', () => {
    render(<App />)
    expect(screen.getByText(/Tất cả hồ sơ đều hư cấu/i)).toBeVisible()
    expect(screen.queryByText('Get started')).not.toBeInTheDocument()
  })

  it('ships frozen fictional adult profiles with unique IDs and local documented artwork', async () => {
    const { demoProfiles } = await import('./data/profiles.js')
    expect(demoProfiles.length).toBeGreaterThanOrEqual(5)
    expect(new Set(demoProfiles.map(({ id }) => id)).size).toBe(demoProfiles.length)
    expect(Object.isFrozen(demoProfiles)).toBe(true)
    for (const profile of demoProfiles) {
      expect(Object.isFrozen(profile)).toBe(true)
      expect(profile.age).toBeGreaterThanOrEqual(18)
      expect(profile.name.trim()).not.toBe('')
      expect(profile.bio.length).toBeGreaterThan(30)
      expect(profile.interests.length).toBeGreaterThan(1)
      expect(profile.imageUrl).toMatch(/^\/profiles\/.+\.svg$/)
    }
  })
})
