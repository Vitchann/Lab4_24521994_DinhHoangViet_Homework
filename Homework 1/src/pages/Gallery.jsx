
import { useSearchParams } from "react-router";
import { useRef, useEffect } from "react";

import { PHOTOS } from "../data/photos";
import { filterPhotos, findPhoto } from "../utils/gallery";

import PhotoCard from "../components/PhotoCard";
import CategoryFilter from "../components/CategoryFilter";
import PhotoLightbox from "../components/PhotoLightbox";

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();

  const headingRef = useRef(null);
  const triggerRef = useRef(null);
  const wasOpenRef = useRef(false);

  // URL State
  const category = searchParams.get("category") || "all";
  const selectedPhotoId = searchParams.get("photoId");

  // Derived State
  const visiblePhotos = filterPhotos(PHOTOS, category);
  const selectedPhoto = findPhoto(PHOTOS, selectedPhotoId);
  const isPhotoOpen = Boolean(selectedPhoto);

  // Restore focus after closing the lightbox
  useEffect(() => {
    if (wasOpenRef.current && !isPhotoOpen) {
      const trigger = triggerRef.current;

      if (trigger?.isConnected) {
        trigger.focus();
      } else {
        headingRef.current?.focus();
      }

      triggerRef.current = null;
    }

    wasOpenRef.current = isPhotoOpen;
  }, [isPhotoOpen]);

  // Update category in URL
  function handleCategoryChange(newCategory) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (newCategory === "all") {
        next.delete("category");
      } else {
        next.set("category", newCategory);
      }

      next.delete("photoId");

      return next;
    });
  }

  // Open selected photo
  function handlePhotoSelect(photoId) {
    triggerRef.current = document.activeElement;

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("photoId", photoId);
      return next;
    });
  }

  // Close lightbox and preserve category
  function handlePhotoClose() {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete("photoId");
        return next;
      },
      { replace: true }
    );
  }

  return (
    <section className="gallery-page">
      <header className="gallery-header">
        <h1 ref={headingRef} tabIndex={-1}>
          Photo Gallery
        </h1>

        <p>Explore our photo collection.</p>
      </header>

      <CategoryFilter
        category={category}
        onChange={handleCategoryChange}
      />

      <output
        className="photo-count"
        role="status"
        aria-live="polite"
      >
        Showing {visiblePhotos.length} photos
      </output>

      {/* Invalid Photo ID */}
      {selectedPhotoId && !selectedPhoto && (
        <section className="error-state" role="alert">
          <p>404: Photo not found.</p>

          <button
            type="button"
            onClick={handlePhotoClose}
          >
            Dismiss
          </button>
        </section>
      )}

      {/* Photo Gallery */}
      {visiblePhotos.length === 0 ? (
        <p className="empty-state">
          No photos found in this category.
        </p>
      ) : (
        <section
          className="photo-grid"
          aria-label="Photo collection"
        >
          {visiblePhotos.map((photo, index) => (
  <PhotoCard
    key={photo.id}
    photo={photo}
    onSelect={handlePhotoSelect}
    priority={index === 0}
  />
))}
        </section>
      )}

      {/* Native HTML Dialog */}
      <PhotoLightbox
        photo={selectedPhoto}
        onClose={handlePhotoClose}
      />
    </section>
  );
}
