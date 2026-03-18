import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";
import MoodcastPage from "./pages/MoodcastPage";

export default function App() {
  return (
      <HashRouter>
          <ScrollToTop/>
          <Routes>
              <Route element={<SiteLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/index" element={<Navigate to="/" replace />} />
                <Route path="/moodcast" element={<MoodcastPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
          </Routes>
      </HashRouter>
  );
}