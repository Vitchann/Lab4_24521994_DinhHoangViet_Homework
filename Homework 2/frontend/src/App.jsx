import './App.css'
import { demoProfiles } from './data/profiles.js'
import SwipeDeck from './components/SwipeDeck.jsx'

export default function App({ profiles = demoProfiles }) {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">Đến nội dung chính</a>
      <header className="site-header">
        <a className="brand" href="#main"><span className="brand-mark" aria-hidden="true">♡</span> hẹn hò<span className="brand-dot">.</span></a>
        <span className="header-note">Một chút rung động. Một chút vui.</span>
        <span className="demo-badge"><span aria-hidden="true">✦</span> Bản demo</span>
      </header>
      <main id="main" tabIndex={-1}>
        <div className="page-intro">
          <p className="eyebrow">KẾT NỐI THEO CÁCH CỦA BẠN</p>
          <h1>Hẹn hò nhưng không yêu<span className="pink-dot">.</span></h1>
          <p>Một lần lướt, một cảm xúc. Khám phá những người bạn có thể thích.</p>
        </div>
        <SwipeDeck profiles={profiles} />
      </main>
      <footer className="site-footer"><span>Tất cả hồ sơ đều hư cấu · Dữ liệu demo cục bộ</span><span>Chỉ để khám phá, không để hứa hẹn ♡</span></footer>
    </div>
  )
}
