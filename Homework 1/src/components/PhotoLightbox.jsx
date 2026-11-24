
import { useEffect, useRef, useId } from "react";

export default function PhotoLightbox({
  photo,
  onClose,
}) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (photo && !dialog.open) {
      dialog.showModal();
    }

    if (!photo && dialog.open) {
      dialog.close();
    }
  }, [photo]);

  return (
    <dialog
      ref={dialogRef}
      className="photo-lightbox"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      {photo && (
        <article className="lightbox-content">
          <header className="lightbox-header">
            <h2 id={titleId}>{photo.title}</h2>

            <button
              type="button"
              className="close-button"
              aria-label="Close photo"
              onClick={onClose}
              autoFocus
            >
              ×
            </button>
          </header>

          <figure className="lightbox-figure">
            <img
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
            />

            <figcaption id={descriptionId}>
              {photo.description}
            </figcaption>
          </figure>

          <dl className="lightbox-details">
            <dt>Photo ID</dt>
            <dd>{photo.id}</dd>

            <dt>Category</dt>
            <dd>{photo.category}</dd>

            <dt>Resolution</dt>
            <dd>
              {photo.width} × {photo.height}
            </dd>
          </dl>
        </article>
      )}
    </dialog>
  );
}
