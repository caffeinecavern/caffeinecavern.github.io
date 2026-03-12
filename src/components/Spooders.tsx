import { motion, useAnimationControls, useInView } from "framer-motion";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { usePerformanceMode } from "../hooks/usePerformanceMode";

type SpoodersProps = {
    className?: string;
    variant?: "hero" | "shelf";
};

type DancingSpooderProps = {
    className?: string;
    size?: number;
    delay?: number;
};

type SpiderConfig = {
    id: string;
    left: string;
    silkLength: number;
    size: number;
    delay: number;
    hideBelow?: "sm" | "md";
};

export const ClassicCornerWeb = memo(function ClassicCornerWeb({ side }: { side: "left" | "right" }) {
    const stroke = "rgba(255,255,255,0.15)";
    const accent = "rgba(248,191,214,0.08)";

    return (
        <svg
            viewBox="0 0 180 180"
            className={`absolute top-0 ${side === "left" ? "left-0" : "right-0"} h-28 w-28 sm:h-36 sm:w-36 lg:h-44 lg:w-44 ${side === "right" ? "scale-x-[-1]" : ""}`}
            fill="none"
            aria-hidden="true"
        >
            <g strokeLinecap="round">
                <path d="M8 8 L172 8" stroke={stroke} strokeWidth="1.4" />
                <path d="M8 8 L8 172" stroke={stroke} strokeWidth="1.4" />
                <path d="M8 8 L154 26" stroke={stroke} strokeWidth="1.05" />
                <path d="M8 8 L138 50" stroke={stroke} strokeWidth="1.05" />
                <path d="M8 8 L114 82" stroke={stroke} strokeWidth="1.05" />
                <path d="M8 8 L84 122" stroke={stroke} strokeWidth="1" />
                <path d="M8 8 L42 164" stroke={stroke} strokeWidth="0.95" />
                <path d="M34 8 Q34 34 8 34" stroke={accent} strokeWidth="1.05" />
                <path d="M58 8 Q58 58 8 58" stroke={stroke} strokeWidth="1" />
                <path d="M84 8 Q84 84 8 84" stroke={accent} strokeWidth="0.95" />
                <path d="M114 8 Q114 114 8 114" stroke={stroke} strokeWidth="0.9" />
                <path d="M146 8 Q146 146 8 146" stroke={accent} strokeWidth="0.9" />
            </g>
        </svg>
    );
});

export const TopWebRail = memo(function TopWebRail() {
    const stroke = "rgba(255,255,255,0.16)";
    const accent = "rgba(248,191,214,0.08)";

    return (
        <svg
            viewBox="0 0 1200 190"
            preserveAspectRatio="none"
            className="absolute inset-x-0 top-0 h-24 w-full sm:h-28 lg:h-32"
            fill="none"
            aria-hidden="true"
        >
            <g strokeLinecap="round">
                <path
                    d="M0 18 C110 6 204 6 314 18 C424 30 516 30 626 18 C736 6 828 6 938 18 C1048 30 1138 28 1200 18"
                    stroke={stroke}
                    strokeWidth="1.4"
                />
                <path
                    d="M50 44 C146 28 238 28 334 44 C430 60 522 60 618 44 C714 28 806 28 902 44 C998 60 1090 58 1150 40"
                    stroke={accent}
                    strokeWidth="1.05"
                />
                <path d="M120 18 L98 44" stroke={stroke} strokeWidth="1" />
                <path d="M286 18 L266 44" stroke={stroke} strokeWidth="1" />
                <path d="M918 18 L938 44" stroke={stroke} strokeWidth="1" />
                <path d="M1084 18 L1106 44" stroke={stroke} strokeWidth="1" />
            </g>
        </svg>
    );
});

function GlossyEye({ size, delay = 0, animateIdle }: { size: number; delay?: number; animateIdle: boolean }) {
    const highlights = (
        <>
      <span
          className="absolute rounded-full bg-white"
          style={{ width: size * 0.28, height: size * 0.28, left: size * 0.18, top: size * 0.16 }}
      />
            <span
                className="absolute rounded-full bg-white/75"
                style={{ width: size * 0.1, height: size * 0.1, right: size * 0.2, bottom: size * 0.2 }}
            />
        </>
    );

    if (!animateIdle) {
        return (
            <span className="relative block rounded-full bg-[#060608]" style={{ width: size, height: size }}>
        {highlights}
      </span>
        );
    }

    return (
        <motion.span
            className="relative block rounded-full bg-[#060608]"
            style={{ width: size, height: size }}
            animate={{ scaleY: [1, 1, 0.12, 1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.42, 0.46, 0.54, 1], delay }}
        >
            {highlights}
        </motion.span>
    );
}

type BodyDanceMotion = {
    x: number[];
    y: number[];
    duration: number;
    times: number[];
};

type SpiderLegProps = {
    side: "left" | "right";
    rowIndex: number;
    anchorX: number;
    anchorY: number;
    upperLength: number;
    lowerLength: number;
    thickness: number;
    spread: number;
    kneeDrop: number;
    footDrop: number;
    delay: number;
    animateIdle: boolean;
    danceMode?: boolean;
    bodyDance?: BodyDanceMotion;
};

const LegSegment = memo(function LegSegment({
                                                x1,
                                                y1,
                                                x2,
                                                y2,
                                                thickness,
                                            }: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    thickness: number;
}) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.hypot(dx, dy);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    return (
        <span
            className="absolute rounded-full bg-[#050507]"
            style={{
                left: x1,
                top: y1,
                width: length,
                height: thickness,
                transform: `translateY(-50%) rotate(${angle}deg)`,
                transformOrigin: "0 50%",
            }}
        />
    );
});

function SpiderLeg({
                       side,
                       rowIndex,
                       anchorX,
                       anchorY,
                       upperLength,
                       lowerLength,
                       thickness,
                       spread,
                       kneeDrop,
                       footDrop,
                       delay,
                       animateIdle,
                       danceMode = false,
                       bodyDance,
                   }: SpiderLegProps) {
    const dir = side === "left" ? -1 : 1;
    const kneeX = dir * upperLength * spread;
    const kneeY = kneeDrop * 0.16;
    const lowerX = -dir * lowerLength * 0.42;
    const lowerY = footDrop;

    if (!animateIdle) {
        return (
            <div className="absolute" style={{ left: anchorX, top: anchorY }}>
                <LegSegment x1={0} y1={0} x2={kneeX} y2={kneeY} thickness={thickness} />
                <div className="absolute" style={{ left: kneeX, top: kneeY }}>
                    <LegSegment x1={0} y1={0} x2={lowerX} y2={lowerY} thickness={thickness} />
                </div>
            </div>
        );
    }

    if (!danceMode || !bodyDance) {
        return (
            <motion.div className="absolute" style={{ left: anchorX, top: anchorY }}>
                <LegSegment x1={0} y1={0} x2={kneeX} y2={kneeY} thickness={thickness} />

                <motion.div
                    className="absolute"
                    style={{ left: kneeX, top: kneeY, transformOrigin: "0 0" }}
                    animate={{ rotate: side === "left" ? [6, 14, 8, 6] : [-6, -14, -8, -6] }}
                    transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay,
                    }}
                >
                    <LegSegment x1={0} y1={0} x2={lowerX} y2={lowerY} thickness={thickness} />
                </motion.div>
            </motion.div>
        );
    }

    const upperSway = [5.5, 4.5, 3.5, 2.5][rowIndex] ?? 3.5;
    const lowerBase = [18, 22, 26, 30][rowIndex] ?? 24;
    const lowerSquat = [12, 14, 16, 18][rowIndex] ?? 14;
    const lowerExtend = [7, 8, 9, 10][rowIndex] ?? 8;

    const upperRotate =
        side === "left"
            ? [0, upperSway * 0.45, upperSway, upperSway * 0.45, 0, -upperSway * 0.45, -upperSway, -upperSway * 0.45, 0]
            : [0, -upperSway * 0.45, -upperSway, -upperSway * 0.45, 0, upperSway * 0.45, upperSway, upperSway * 0.45, 0];

    const lowerMagnitude = [
        lowerBase - lowerExtend,
        lowerBase - lowerExtend * 0.35,
        lowerBase + lowerSquat,
        lowerBase + lowerSquat * 0.35,
        lowerBase - lowerExtend,
        lowerBase - lowerExtend * 0.35,
        lowerBase + lowerSquat,
        lowerBase + lowerSquat * 0.35,
        lowerBase - lowerExtend,
    ];

    const lowerRotate = side === "left" ? lowerMagnitude : lowerMagnitude.map((value) => -value);

    return (
        <motion.div
            className="absolute"
            initial={{ x: 0, y: 0, rotate: 0 }}
            style={{ left: anchorX, top: anchorY }}
            animate={{
                x: bodyDance.x,
                y: bodyDance.y,
            }}
            transition={{
                duration: bodyDance.duration,
                repeat: Infinity,
                ease: "easeInOut",
                times: bodyDance.times,
                delay,
            }}
        >
            <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: upperRotate }}
                transition={{
                    duration: bodyDance.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: bodyDance.times,
                    delay,
                }}
                style={{ transformOrigin: "0 0" }}
            >
                <LegSegment x1={0} y1={0} x2={kneeX} y2={kneeY} thickness={thickness} />
            </motion.div>

            <motion.div
                className="absolute"
                initial={{ rotate: side === "left" ? lowerBase : -lowerBase }}
                style={{ left: kneeX, top: kneeY, transformOrigin: "0 0" }}
                animate={{ rotate: lowerRotate }}
                transition={{
                    duration: bodyDance.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: bodyDance.times,
                    delay,
                }}
            >
                <LegSegment x1={0} y1={0} x2={lowerX} y2={lowerY} thickness={thickness} />
            </motion.div>
        </motion.div>
    );
}

function CuteSpiderBody({
                            size,
                            delay,
                            animateIdle,
                            danceMode = false,
                        }: {
    size: number;
    delay: number;
    animateIdle: boolean;
    danceMode?: boolean;
}) {
    const bodySize = size * 1.08;
    const eyeSize = size * 0.25;
    const centerX = size * 1.1;
    const radius = bodySize / 2;
    const bodyTop = 0;
    const centerY = bodyTop + radius;
    const thickness = Math.max(2.2, size * 0.05);
    const upperLength = size * 0.42;
    const lowerLength = size * 0.36;

    const legRows = [
        { y: centerY - radius * 0.4, spread: 0.38, kneeDrop: size * 0.24, footDrop: size * 0.32, delayOffset: 0.02 },
        { y: centerY - radius * 0.12, spread: 0.5, kneeDrop: size * 0.28, footDrop: size * 0.36, delayOffset: 0.08 },
        { y: centerY + radius * 0.16, spread: 0.62, kneeDrop: size * 0.32, footDrop: size * 0.4, delayOffset: 0.14 },
        { y: centerY + radius * 0.42, spread: 0.72, kneeDrop: size * 0.36, footDrop: size * 0.44, delayOffset: 0.2 },
    ];

    const leftX = centerX - radius + size * 0.02;
    const rightX = centerX + radius - size * 0.02;

    const bodyDance =
        animateIdle && danceMode
            ? {
                x: [0, size * 0.12, size * 0.22, size * 0.12, 0, -size * 0.12, -size * 0.22, -size * 0.12, 0],
                y: [0, size * 0.02, size * 0.13, size * 0.04, 0, size * 0.02, size * 0.13, size * 0.04, 0],
                duration: 0.95,
                times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
            }
            : undefined;

    const spiderContent = (
        <>
            {legRows.map((leg, index) => (
                <SpiderLeg
                    key={`left-${index}`}
                    rowIndex={index}
                    side="left"
                    anchorX={leftX}
                    anchorY={leg.y}
                    upperLength={upperLength}
                    lowerLength={lowerLength}
                    thickness={thickness}
                    spread={leg.spread}
                    kneeDrop={leg.kneeDrop}
                    footDrop={leg.footDrop}
                    delay={danceMode ? delay : delay + leg.delayOffset}
                    animateIdle={animateIdle}
                    danceMode={danceMode}
                    bodyDance={bodyDance}
                />
            ))}

            {legRows.map((leg, index) => (
                <SpiderLeg
                    key={`right-${index}`}
                    rowIndex={index}
                    side="right"
                    anchorX={rightX}
                    anchorY={leg.y}
                    upperLength={upperLength}
                    lowerLength={lowerLength}
                    thickness={thickness}
                    spread={leg.spread}
                    kneeDrop={leg.kneeDrop}
                    footDrop={leg.footDrop}
                    delay={danceMode ? delay : delay + leg.delayOffset}
                    animateIdle={animateIdle}
                    danceMode={danceMode}
                    bodyDance={bodyDance}
                />
            ))}

                <motion.div
                    className="absolute rounded-full"
                    initial={{x: 0, y: 0, rotate: 0, scaleX: 1, scaleY: 1}}
                    style={{
                        width: bodySize,
                        height: bodySize,
                        left: centerX - radius,
                        top: bodyTop,
                        background:
                            "radial-gradient(circle at 34% 28%, rgba(28,22,34,1) 0%, rgba(14,10,18,1) 42%, rgba(5,4,8,1) 100%)",
                        boxShadow: "0 10px 22px rgba(0,0,0,0.22)",
                    }}
                    animate={
                        bodyDance
                            ? {
                                x: bodyDance.x,
                                y: bodyDance.y,
                                rotate: 0,
                                scaleX: [1, 1.02, 1.09, 1.03, 1, 1.02, 1.09, 1.03, 1],
                                scaleY: [1, 0.995, 0.93, 0.985, 1, 0.995, 0.93, 0.985, 1],
                            }
                            : undefined
                    }
                    transition={
                        bodyDance
                            ? {
                                duration: bodyDance.duration,
                                repeat: Infinity,
                                ease: "easeInOut",
                                times: bodyDance.times,
                                delay,
                            }
                            : undefined
                    }
                >
                    <div className="absolute left-1/2 top-[34%] flex -translate-x-1/2 items-center gap-[9px]">
                        <GlossyEye size={eyeSize} delay={delay} animateIdle={animateIdle}/>
                        <GlossyEye size={eyeSize} delay={delay + 0.08} animateIdle={animateIdle}/>
                    </div>

                    <div
                        className="absolute rounded-full bg-[#e89ab8]/55 blur-[0.4px]"
                        style={{width: size * 0.16, height: size * 0.1, left: size * 0.22, top: size * 0.58}}
                    />
                    <div
                        className="absolute rounded-full bg-[#e89ab8]/55 blur-[0.4px]"
                        style={{width: size * 0.16, height: size * 0.1, right: size * 0.22, top: size * 0.58}}
                    />
                </motion.div>
        </>
    );

    return <div className="relative" style={{width: size * 2.2, height: size * 2.1}}>{spiderContent}</div>;
}

function HangingSpider({
                           left,
                           silkLength,
                           size,
                           delay,
                           hideBelow,
                           animateIdle,
                       }: SpiderConfig & { animateIdle: boolean }) {
    const [isHovered, setIsHovered] = useState(false);
    const silkControls = useAnimationControls();
    const spiderControls = useAnimationControls();
    const touchLockRef = useRef(false);
    const touchCooldownUntilRef = useRef(0);

    const visibilityClass =
        hideBelow === "md" ? "hidden md:block" : hideBelow === "sm" ? "hidden sm:block" : "block";

    const climbDistance = Math.max(28, Math.min(silkLength * 0.24, 54));
    const spiderHeight = size * 2.1;
    const spiderWidth = size * 2.2;
    const offscreenStart = 72;
    const topLift = 72;

    useEffect(() => {
        if (touchLockRef.current) return;

        if (isHovered) {
            void silkControls.start("hover");
            void spiderControls.start("hover");
        } else {
            void silkControls.start("rest");
            void spiderControls.start("rest");
        }
    }, [isHovered, silkControls, spiderControls]);

    const runTouchJump = async () => {
        const now = performance.now();

        if (touchLockRef.current || now < touchCooldownUntilRef.current) {
            return;
        }

        touchLockRef.current = true;
        setIsHovered(false);

        await Promise.all([silkControls.start("hover"), spiderControls.start("hover")]);
        await Promise.all([silkControls.start("rest"), spiderControls.start("rest")]);

        touchCooldownUntilRef.current = performance.now() + 180;
        touchLockRef.current = false;
    };

    return (
        <div
            className={`absolute ${visibilityClass}`}
            style={{ top: -topLift, left, width: spiderWidth, marginLeft: `-${spiderWidth / 2}px` }}
            aria-hidden="true"
        >
            <motion.div
                initial={false}
                animate={animateIdle ? { y: [0, 6, 0], rotate: [0, 1.15, 0, -1.15, 0] } : undefined}
                transition={animateIdle ? { duration: 5.6 + delay, repeat: Infinity, ease: "easeInOut", delay } : undefined}
            >
                <div className="relative" style={{ width: spiderWidth, height: silkLength + spiderHeight + offscreenStart }}>
                    <motion.div
                        className="absolute overflow-hidden rounded-full"
                        style={{ left: "50%", top: -offscreenStart, width: 2.5, marginLeft: -1.25 }}
                        initial={false}
                        animate={silkControls}
                        variants={{
                            rest: { height: silkLength + offscreenStart },
                            hover: { height: Math.max(18, silkLength + offscreenStart - climbDistance) },
                        }}
                        transition={{ type: "spring", stiffness: 240, damping: 20 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/48 to-white/12"
                            initial={false}
                            animate={animateIdle ? { opacity: [0.72, 0.96, 0.72] } : { opacity: 0.82 }}
                            transition={animateIdle ? { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay } : undefined}
                        />
                        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/12" />
                    </motion.div>

                    <motion.div
                        className="pointer-events-auto absolute top-0 cursor-default touch-manipulation"
                        style={{ left: "50%", width: spiderWidth, marginLeft: -(spiderWidth / 2) }}
                        initial={false}
                        animate={spiderControls}
                        variants={{
                            rest: { y: silkLength - 1 },
                            hover: { y: silkLength - climbDistance - 1 },
                        }}
                        transition={{ type: "spring", stiffness: 250, damping: 18 }}
                        onPointerEnter={(event) => {
                            if (event.pointerType === "mouse" && !touchLockRef.current) {
                                setIsHovered(true);
                            }
                        }}
                        onPointerLeave={(event) => {
                            if (event.pointerType === "mouse" && !touchLockRef.current) {
                                setIsHovered(false);
                            }
                        }}
                        onPointerDown={(event) => {
                            if (event.pointerType === "touch" || event.pointerType === "pen") {
                                void runTouchJump();
                            }
                        }}
                    >
                        <CuteSpiderBody size={size} delay={delay} animateIdle={animateIdle} danceMode={false} />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export function DancingSpooder({
                                   className = "",
                                   size = 26,
                                   delay = 0,
                               }: DancingSpooderProps) {
    const { isLowPerformanceMode, prefersReducedMotion } = usePerformanceMode();
    const animateIdle = !isLowPerformanceMode && !prefersReducedMotion;

    return (
        <div
            className={`pointer-events-none relative flex items-center justify-center ${className}`}
            aria-hidden="true"
        >
            <motion.div
                className="absolute rounded-full bg-black/20 blur-md"
                style={{
                    bottom: size * 0.05,
                    width: size * 2.5,
                    height: size * 0.52,
                }}
                animate={
                    animateIdle
                        ? {
                            scaleX: [1, 1.04, 1.14, 1.05, 1, 1.04, 1.14, 1.05, 1],
                            scaleY: [1, 0.98, 0.94, 0.98, 1, 0.98, 0.94, 0.98, 1],
                            opacity: [0.18, 0.2, 0.28, 0.21, 0.18, 0.2, 0.28, 0.21, 0.18],
                        }
                        : undefined
                }
                transition={
                    animateIdle
                        ? {
                            duration: 0.95,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
                            delay,
                        }
                        : undefined
                }
            />

            <div className="relative">
                <CuteSpiderBody size={size} delay={delay} animateIdle={animateIdle} danceMode/>
            </div>
        </div>
    );
}

export default function Spooders({className = "", variant = "hero"}: SpoodersProps) {
    const {isLowPerformanceMode, prefersReducedMotion} = usePerformanceMode();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(containerRef, {margin: "0px 0px -20% 0px"});

    const animateIdle = isInView && !isLowPerformanceMode && !prefersReducedMotion;

    const spiders = useMemo<SpiderConfig[]>(() => {
        if (variant === "hero") {
            return isLowPerformanceMode
                ? [{id: "hero-mobile", left: "84%", silkLength: 205, size: 25, delay: 0.14}]
                : [
                    { id: "left-1", left: "8%", silkLength: 210, size: 24, delay: 0.06 },
                    { id: "right-2", left: "84%", silkLength: 245, size: 27, delay: 0.22 },
                    { id: "right-1", left: "92%", silkLength: 170, size: 23, delay: 0.1 },
                ];
        }

        return isLowPerformanceMode
            ? [{ id: "shelf-mobile", left: "86%", silkLength: 164, size: 24, delay: 0.16 }]
            : [
                { id: "left", left: "12%", silkLength: 250, size: 26, delay: 0.08 },
                { id: "right", left: "88%", silkLength: 156, size: 26, delay: 0.2 },
            ];
    }, [isLowPerformanceMode, variant]);

    return (
        <div
            ref={containerRef}
            className={`pointer-events-none absolute inset-x-0 top-0 overflow-visible ${variant === "hero" ? "h-[21rem] sm:h-[24rem] lg:h-[28rem]" : "h-44"} ${className}`}
            aria-hidden="true"
        >
            <ClassicCornerWeb side="left" />
            <ClassicCornerWeb side="right" />
            <TopWebRail />
            {spiders.map((spider) => (
                <HangingSpider key={spider.id} {...spider} animateIdle={animateIdle} />
            ))}
        </div>
    );
}