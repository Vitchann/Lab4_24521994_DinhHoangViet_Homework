
export function filterPhotos(photos, category = "all") {
  if (category === "all") {
    return photos;
  }

  return photos.filter(
    (photo) => photo.category === category
  );
}

export function findPhoto(photos, id) {
  return photos.find(
    (photo) => photo.id === id
  );
}
