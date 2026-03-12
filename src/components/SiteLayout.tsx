import { Outlet, useLocation } from "react-router-dom";
import { palette } from "../data/site";
import { usePerformanceMode } from "../hooks/usePerformanceMode";
import { CaveFrame, FloatingDust } from "./BackgroundEffects";
import SiteHeader from "./SiteHeader";

export default function SiteLayout() {
    const location = useLocation();
    const routeResetKey = location.pathname;
    const { isLowPerformanceMode } = usePerformanceMode();

    return (
        <div
            key={routeResetKey}
            className="relative min-h-screen overflow-x-hidden text-white"
            style={{
                background: isLowPerformanceMode
                    ? `linear-gradient(180deg, ${palette.bgTop} 0%, ${palette.bgBottom} 100%)`
                    : `
                    radial-gradient(circle at 50% 10%, rgba(152, 106, 128, 0.12), transparent 24%),
                    radial-gradient(circle at 50% 0%, ${palette.glowLilac}, transparent 18%),
                    linear-gradient(180deg, ${palette.bgTop} 0%, ${palette.bgBottom} 100%)
                  `,
            }}
        >
            <div className="pointer-events-none absolute inset-0 z-0">
                <FloatingDust />
                <CaveFrame />
            </div>

            <div className="relative z-10">
                <SiteHeader />
                <Outlet />
            </div>
        </div>
    );
}
