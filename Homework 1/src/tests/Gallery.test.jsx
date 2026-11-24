
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

import Gallery from "../pages/Gallery";

function renderGallery(url = "/gallery") {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <Gallery />
    </MemoryRouter>
  );
}

describe("Gallery Integration Tests", () => {
  it("renders all six photos", () => {
    renderGallery();

    expect(
      screen.getByText("Showing 6 photos")
    ).toBeInTheDocument();
  });

  it("filters esports photos", async () => {
    const user = userEvent.setup();

    renderGallery();

    await user.click(
      screen.getByRole("button", { name: "Esports" })
    );

    expect(
      screen.getByText("Showing 2 photos")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "View Gaming Arena",
      })
    ).toBeInTheDocument();
  });

  it("loads category from URL", () => {
    renderGallery("/gallery?category=nature");

    expect(
      screen.getByText("Showing 2 photos")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "View Mountain Landscape",
      })
    ).toBeInTheDocument();
  });

  it("opens lightbox when selecting a photo", async () => {
    const user = userEvent.setup();

    renderGallery();

    await user.click(
      screen.getByRole("button", {
        name: "View Gaming Arena",
      })
    );

    expect(
      screen.getByRole("dialog")
    ).toHaveAttribute("open");
  });

  it("opens lightbox through deep linking", () => {
    renderGallery("/gallery?photoId=3");

    expect(
      screen.getByRole("dialog")
    ).toHaveAttribute("open");
  });

  it("closes lightbox when clicking close", async () => {
    const user = userEvent.setup();

    renderGallery("/gallery?photoId=3");

    await user.click(
      screen.getByRole("button", {
        name: "Close photo",
      })
    );

    expect(
      screen.queryByRole("dialog")
    ).not.toBeInTheDocument();
  });

  it("handles an invalid photo ID", () => {
    renderGallery("/gallery?photoId=999");

    expect(
      screen.getByText("404: Photo not found.")
    ).toBeInTheDocument();
  });

  it("handles an invalid category", () => {
    renderGallery("/gallery?category=invalid");

    expect(
      screen.getByText(
        "No photos found in this category."
      )
    ).toBeInTheDocument();
  });
});
