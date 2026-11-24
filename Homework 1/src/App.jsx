
import { Routes, Route } from "react-router";

import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";

import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />

        <Route path="gallery" element={<Gallery />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
