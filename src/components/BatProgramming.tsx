import { motion } from "framer-motion";
import { batProgramming, palette } from "../data/site";
import { usePerformanceMode } from "../hooks/usePerformanceMode";

export default function BatProgramming() {
    const { isLowPerformanceMode, prefersReducedMotion } = usePerformanceMode();
    const shouldFloat = !isLowPerformanceMode && !prefersReducedMotion;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease: "easeOut" }}
            className="relative mx-auto flex w-full max-w-[280px] items-center justify-center sm:max-w-[340px] md:max-w-[420px]"
        >
            {isLowPerformanceMode ? (
                <div
                    className="pointer-events-none absolute inset-0 rounded-full opacity-75 blur-xl"
                    style={{
                        background: `radial-gradient(circle, ${palette.glowPink}, transparent 65%)`,
                    }}
                />
            ) : (
                <>
                    <div
                        className="pointer-events-none absolute inset-0 rounded-full blur-2xl"
                        style={{
                            background: `radial-gradient(circle, ${palette.glowPink}, ${palette.glowLilac}, transparent 68%)`,
                        }}
                    />
                    <div
                        className="pointer-events-none absolute left-6 top-6 h-14 w-14 rounded-full blur-2xl sm:left-10 sm:top-10 sm:h-20 sm:w-20"
                        style={{ background: "rgba(247,196,219,0.14)" }}
                    />
                    <div
                        className="pointer-events-none absolute right-6 bottom-6 h-12 w-12 rounded-full blur-2xl sm:right-10 sm:bottom-10 sm:h-16 sm:w-16"
                        style={{ background: "rgba(226,206,255,0.14)" }}
                    />
                </>
            )}

            <motion.img
                src={batProgramming}
                alt="Bat mascot programming"
                loading="lazy"
                decoding="async"
                className="relative z-10 w-full object-contain drop-shadow-[0_0_22px_rgba(247,196,219,0.18)] sm:drop-shadow-[0_0_30px_rgba(247,196,219,0.22)]"
                animate={
                    shouldFloat
                        ? {
                            y: [0, -6, 0],
                            rotate: [0, 1.2, 0, -1.2, 0],
                            scale: [1, 1.015, 1],
                        }
                        : undefined
                }
                transition={
                    shouldFloat
                        ? {
                            duration: 6.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }
                        : undefined
                }
            />
        </motion.div>
    );
}