import { describe, it, expect } from "vitest";
import { filterPhotos, findPhoto } from "../utils/gallery";

const mockPhotos = [
  { id: "1", category: "esports" },
  { id: "2", category: "nature" },
  { id: "3", category: "technology" },
  { id: "4", category: "esports" },
];

describe("Photo Gallery Logic", () => {
  it("returns all photos when category is all", () => {
    expect(filterPhotos(mockPhotos, "all"))
      .toHaveLength(4);
  });

  it("filters photos by category", () => {
    expect(filterPhotos(mockPhotos, "esports"))
      .toHaveLength(2);
  });

  it("returns empty array for invalid category", () => {
    expect(filterPhotos(mockPhotos, "invalid"))
      .toEqual([]);
  });

  it("finds a photo by ID", () => {
    expect(findPhoto(mockPhotos, "2"))
      .toEqual(mockPhotos[1]);
  });

  it("returns undefined for invalid photo ID", () => {
    expect(findPhoto(mockPhotos, "999"))
      .toBeUndefined();
  });
});
