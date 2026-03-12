import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { menuItems, palette } from "../data/site";
import { usePerformanceMode } from "../hooks/usePerformanceMode";
import { Button, buttonClasses } from "./ui";

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isLowPerformanceMode } = usePerformanceMode();

  const handleSectionNav = (target: string) => {
    setMobileMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: target } });
      return;
    }

    document.getElementById(target)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handlePageNav = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
      <motion.header
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="sticky top-2 z-30 mx-auto mb-6 w-full max-w-7xl bg-transparent px-4 pt-[max(0px,env(safe-area-inset-top))] sm:px-6 md:px-10 lg:px-14"
      >
        <div
            className={`relative overflow-hidden rounded-[28px] border px-4 py-3 shadow-[0_10px_32px_rgba(0,0,0,0.22)] ${
                isLowPerformanceMode ? "backdrop-blur-sm" : "backdrop-blur-xl"
            } sm:px-5`}
            style={{
              borderColor: palette.line,
              background: "rgba(31, 24, 38, 0.60)",
            }}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.025))]" />
            {!isLowPerformanceMode && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(247,196,219,0.14),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(226,206,255,0.12),transparent_32%)]" />
            )}
            <div className="absolute inset-x-0 top-0 h-px bg-white/18" />
          </div>

          <div className="relative flex items-center justify-between gap-3">
            <Link
                to="/"
                onClick={handlePageNav}
                className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 ${
                    isLowPerformanceMode ? "" : "backdrop-blur-sm"
                }`}
                style={{
                  borderColor: palette.line,
                  background: palette.shellStrong,
                }}
            >
              <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${palette.blush}, ${palette.lilac})`,
                  }}
              />
              <span className="text-xs uppercase tracking-[0.18em] text-white/85 sm:text-sm sm:tracking-[0.22em]">
              caffeinecavern
            </span>
            </Link>

            <nav className="hidden md:flex md:flex-wrap md:items-center md:gap-2">
              {menuItems.map((item) =>
                  item.kind === "section" ? (
                      <Button
                          key={item.label}
                          variant="ghost"
                          className="rounded-full px-4 text-sm"
                          onClick={() => handleSectionNav(item.target)}
                      >
                        {item.label}
                      </Button>
                  ) : (
                      <Link
                          key={item.label}
                          to={item.href}
                          onClick={handlePageNav}
                          className={buttonClasses(
                              "ghost",
                              "default",
                              `rounded-full px-4 text-sm ${
                                  location.pathname === item.href ? "bg-white/[0.13]" : ""
                              }`
                          )}
                      >
                        {item.label}
                      </Link>
                  )
              )}
            </nav>

            <button
                type="button"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border text-white transition hover:bg-white/[0.16] md:hidden"
                style={{
                  borderColor: palette.line,
                  background: palette.shellStrong,
                }}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="relative md:hidden"
                >
                  <div
                      className={`mt-3 rounded-[24px] border p-2 ${
                          isLowPerformanceMode ? "" : "backdrop-blur-md"
                      }`}
                      style={{
                        borderColor: palette.line,
                        background: "rgba(255,255,255,0.09)",
                      }}
                  >
                    <nav className="flex flex-col gap-2">
                      {menuItems.map((item) =>
                          item.kind === "section" ? (
                              <Button
                                  key={item.label}
                                  variant="ghost"
                                  className="w-full justify-start rounded-2xl px-4 text-sm"
                                  onClick={() => handleSectionNav(item.target)}
                              >
                                {item.label}
                              </Button>
                          ) : (
                              <Link
                                  key={item.label}
                                  to={item.href}
                                  onClick={handlePageNav}
                                  className={buttonClasses(
                                      "ghost",
                                      "default",
                                      `w-full justify-start rounded-2xl px-4 text-sm ${
                                          location.pathname === item.href ? "bg-white/[0.13]" : ""
                                      }`
                                  )}
                              >
                                {item.label}
                              </Link>
                          )
                      )}
                    </nav>
                  </div>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
  );
}