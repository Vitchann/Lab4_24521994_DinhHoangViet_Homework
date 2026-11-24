
import { Link } from "react-router";

export default function Home() {
  return (
    <section className="hero">
      <span className="eyebrow">
        UIT - S3T | React 19
      </span>

      <h1>Photo & Evidence Gallery</h1>

      <p>
        Explore a collection of esports, nature
        and technology photographs.
      </p>

      <Link to="/gallery" className="primary-button">
        Explore Gallery
      </Link>
    </section>
  );
}
