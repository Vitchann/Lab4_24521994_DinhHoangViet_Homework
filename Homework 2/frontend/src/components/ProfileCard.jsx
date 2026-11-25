import Icon from './Icon.jsx'

export default function ProfileCard({ profile }) {
  return (
    <article className="profile-card">
      <div className="profile-art" style={{ background: profile.color }}>
        <img src={profile.imageUrl} alt={`Minh họa hư cấu của ${profile.name}`} draggable="false" />
        <span className="profile-label">HỒ SƠ HƯ CẤU</span>
        <span className="portrait-note">Illustrated people, real good vibes.</span>
      </div>
      <div className="profile-details">
        <div className="profile-heading"><h2>{profile.name}, {profile.age}</h2><span className="profile-star" aria-hidden="true">✦</span></div>
        <p className="profile-meta"><Icon name="pin" /> {profile.city} <span aria-hidden="true">·</span> {profile.occupation}</p>
        <p className="profile-bio">{profile.bio}</p>
        <ul className="interest-tags" aria-label="Sở thích">{profile.interests?.map((interest) => <li key={interest}>{interest}</li>)}</ul>
      </div>
    </article>
  )
}
