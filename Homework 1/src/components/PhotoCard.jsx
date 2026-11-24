
export default function PhotoCard({
  photo,
  onSelect,
  priority = false,
}) {
  return (
    <article className="photo-card">
      <button
        type="button"
        className="photo-card-button"
        onClick={() => onSelect(photo.id)}
        aria-label={`View ${photo.title}`}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />

        <span className="photo-card-info">
          <span className="photo-category">
            {photo.category}
          </span>

          <span className="photo-title">
            {photo.title}
          </span>

          <span className="photo-description">
            {photo.description}
          </span>
        </span>
      </button>
    </article>
  );
}
