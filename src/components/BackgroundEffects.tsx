import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import { palette } from "../data/site";
import { usePerformanceMode } from "../hooks/usePerformanceMode";

export const FloatingDust = memo(function FloatingDust() {
    const { isLowPerformanceMode, prefersReducedMotion } = usePerformanceMode();

    const particles = useMemo(() => {
        const count = isLowPerformanceMode ? 4 : 14;

        return Array.from({ length: count }, (_, i) => ({
            id: i,
            left: `${8 + ((i * 19) % 84)}%`,
            top: `${10 + ((i * 27) % 72)}%`,
            size: isLowPerformanceMode ? 3 + (i % 2) : 4 + (i % 4) * 2,
            duration: 6 + (i % 4),
            delay: (i % 5) * 0.45,
        }));
    }, [isLowPerformanceMode]);

    if (isLowPerformanceMode) {
        return (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {particles.map((p) => (
                    <span
                        key={p.id}
                        className="absolute rounded-full bg-white/25"
                        style={{
                            left: p.left,
                            top: p.top,
                            width: p.size,
                            height: p.size,
                            boxShadow: `0 0 7px ${palette.blush}`,
                        }}
                    />
                ))}
            </div>
        );
    }

    if (prefersReducedMotion) {
        return null;
    }

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {particles.map((p) => (
                <motion.span
                    key={p.id}
                    className="absolute rounded-full bg-white/45 blur-[0.5px]"
                    style={{
                        left: p.left,
                        top: p.top,
                        width: p.size,
                        height: p.size,
                        boxShadow: `0 0 14px ${palette.blush}`,
                    }}
                    animate={{
                        y: [0, -8, 0],
                        opacity: [0.14, 0.42, 0.14],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
});

export const CaveFrame = memo(function CaveFrame() {
    const { isLowPerformanceMode } = usePerformanceMode();

    if (isLowPerformanceMode) {
        return (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="absolute inset-x-0 top-0 h-20 opacity-28"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(152,106,128,0.10), rgba(0,0,0,0))",
                    }}
                />

                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={`top-stalactite-mobile-${i}`}
                        className="absolute top-0"
                        style={{
                            left: `${6 + i * 18}%`,
                            width: `${26 + (i % 2) * 8}px`,
                            height: `${34 + (i % 3) * 10}px`,
                            background:
                                "linear-gradient(180deg, rgba(104,72,82,0.72), rgba(52,34,40,0.44))",
                            clipPath: "polygon(10% 0%, 100% 0%, 65% 100%, 30% 88%)",
                            opacity: 0.5,
                        }}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
                className="absolute inset-x-0 top-0 h-24 opacity-28 blur-md"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(160,108,132,0.12), rgba(0,0,0,0))",
                }}
            />

            <div
                className="absolute inset-x-0 top-0 h-32 opacity-20 blur-xl"
                style={{
                    background:
                        "radial-gradient(circle at 50% 0%, rgba(176,120,145,0.16), rgba(0,0,0,0) 68%)",
                }}
            />

            {Array.from({ length: 8 }).map((_, i) => (
                <div
                    key={`top-stalactite-${i}`}
                    className="absolute top-0"
                    style={{
                        left: `${5 + i * 11.5}%`,
                        width: `${28 + (i % 3) * 10}px`,
                        height: `${40 + (i % 4) * 10}px`,
                        background:
                            "linear-gradient(180deg, rgba(116,80,92,0.78), rgba(60,40,48,0.54))",
                        clipPath: "polygon(10% 0%, 100% 0%, 65% 100%, 30% 88%)",
                        opacity: 0.58,
                    }}
                />
            ))}
        </div>
    );
});