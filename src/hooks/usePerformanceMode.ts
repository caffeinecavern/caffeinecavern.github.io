import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const MOBILE_LIKE_QUERY = "(max-width: 767px), (pointer: coarse), (hover: none)";

export function usePerformanceMode() {
    const prefersReducedMotion = useReducedMotion();
    const [isMobileLike, setIsMobileLike] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia(MOBILE_LIKE_QUERY).matches;
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const mediaQuery = window.matchMedia(MOBILE_LIKE_QUERY);
        const update = () => setIsMobileLike(mediaQuery.matches);

        update();

        if (typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", update);
            return () => mediaQuery.removeEventListener("change", update);
        }

        mediaQuery.addListener(update);
        return () => mediaQuery.removeListener(update);
    }, []);

    return {
        prefersReducedMotion: Boolean(prefersReducedMotion),
        isMobileLike,
        isLowPerformanceMode: Boolean(prefersReducedMotion) || isMobileLike,
    };
}