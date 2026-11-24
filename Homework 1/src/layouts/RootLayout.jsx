
import { NavLink, Outlet } from "react-router";

export default function RootLayout() {
  return (
    <>
      <header className="site-header">
        <nav className="navbar" aria-label="Main navigation">
          <span className="brand">PhotoGallery</span>

          <ul className="nav-links">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/gallery"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Gallery
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>UIT - S3T | Lab 4 - Homework 1</p>
      </footer>
    </>
  );
}
