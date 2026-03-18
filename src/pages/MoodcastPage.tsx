import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { usePerformanceMode } from "../hooks/usePerformanceMode";
import { Link } from "react-router-dom";
import { Children, isValidElement, cloneElement, useEffect, useRef, useState } from "react";

const rise = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
};

const stagger = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

function StoryBlock({
                        title,
                        children,
                        className = "",
                    }: {
    title: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            variants={stagger}
            className={`mx-auto max-w-3xl ${className}`}
        >
            <motion.div variants={rise} className="mb-5 text-center sm:mb-6">
                <div className="mx-auto mb-3 h-2 w-2 rounded-full bg-pink-200 sm:mb-4 sm:h-2.5 sm:w-2.5" />
                <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {title}
                </h2>
            </motion.div>

            <div className="space-y-4 text-left text-[15px] leading-7 text-white/84 sm:space-y-5 sm:text-center sm:text-base sm:leading-8">
                {children}
            </div>
        </motion.section>
    );
}

function CenterImage({
                         src,
                         alt,
                         className = "",
                         imageClassName = "",
                         minHeightClassName = "min-h-[220px] sm:min-h-[300px]",
                     }: {
    src: string;
    alt: string;
    className?: string;
    imageClassName?: string;
    minHeightClassName?: string;
}) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={rise}
            className={`mx-auto w-full max-w-4xl ${className}`}
        >
            <div
                className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] p-3 shadow-[0_14px_34px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:rounded-[30px] sm:p-5 sm:shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:backdrop-blur-xl">
                <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,180,207,0.08),transparent_32%),radial-gradient(circle_at_bottom,rgba(212,178,255,0.06),transparent_36%)]"/>
                <div
                    className={`relative flex items-center justify-center overflow-hidden rounded-[20px] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_48%,rgba(0,0,0,0.16)_100%)] ${minHeightClassName}`}
                >
                    <img
                        src={src}
                        alt={alt}
                        className={`relative z-10 max-h-[420px] w-auto max-w-full object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.34)] ${imageClassName}`}
                    />
                </div>
            </div>
        </motion.div>
    );
}

function applyCenteredOddLayout(
    children: ReactNode,
    options: {
        twoColBreakpoint?: string;
        threeColBreakpoint?: string;
    } = {},
) {
    const items = Children.toArray(children);
    const count = items.length;

    return items.map((child, index) => {
        if (!isValidElement(child)) return child;

        const isLast = index === count - 1;
        const remainder2 = count % 2;
        const remainder3 = count % 3;

        let extraClassName = "";

        if (options.twoColBreakpoint && remainder2 === 1 && isLast && count > 1) {
            extraClassName += ` ${options.twoColBreakpoint}:col-span-2 ${options.twoColBreakpoint}:mx-auto ${options.twoColBreakpoint}:w-full ${options.twoColBreakpoint}:max-w-[calc(50%-0.375rem)]`;
        }

        if (options.threeColBreakpoint && remainder3 === 1 && isLast && count > 3) {
            extraClassName += ` ${options.threeColBreakpoint}:col-start-2`;
        }

        if (
            options.threeColBreakpoint &&
            remainder3 === 2 &&
            count > 3 &&
            index >= count - 2
        ) {
            if (index === count - 2) {
                extraClassName += ` ${options.threeColBreakpoint}:col-start-1`;
            }

            if (index === count - 1) {
                extraClassName += ` ${options.threeColBreakpoint}:col-start-3`;
            }
        }

        const existingClassName =
            typeof child.props.className === "string" ? child.props.className : "";

        return cloneElement(child, {
            className: `${existingClassName}${extraClassName}`,
        });
    });
}

function StatementGrid({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            variants={stagger}
            className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2"
        >
            {applyCenteredOddLayout(children, { twoColBreakpoint: "sm" })}
        </motion.div>
    );
}

function Statement({
                       children,
                       className = "",
                   }: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            variants={rise}
            className={`rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-white/84 shadow-[0_12px_22px_rgba(0,0,0,0.14)] sm:rounded-[20px] sm:text-center sm:shadow-[0_14px_28px_rgba(0,0,0,0.16)] ${className}`}
        >
            {children}
        </motion.div>
    );
}

function FeatureList({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            variants={stagger}
            className="mx-auto grid max-w-4xl gap-3 sm:gap-4 md:grid-cols-2"
        >
            {applyCenteredOddLayout(children, { twoColBreakpoint: "md" })}
        </motion.div>
    );
}

function FeatureItem({
                         title,
                         children,
                         className = "",
                     }: {
    title: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            variants={rise}
            className={`rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-4 text-left shadow-[0_14px_28px_rgba(0,0,0,0.16)] sm:rounded-[24px] sm:px-5 sm:py-5 sm:text-center sm:shadow-[0_18px_36px_rgba(0,0,0,0.18)] ${className}`}
        >
            <h3 className="mb-2 text-lg font-semibold text-white sm:mb-3 sm:text-xl">{title}</h3>
            <p className="text-white/82">{children}</p>
        </motion.div>
    );
}

function BulletGrid({ children }: { children: ReactNode }) {
    const items = Children.toArray(children);
    const count = items.length;

    return (
        <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            variants={stagger}
            className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
            {items.map((child, index) => {
                if (!isValidElement(child)) return child;

                const isLast = index === count - 1;
                const isSecondLast = index === count - 2;

                let extraClassName = "";

                if (count % 2 === 1 && isLast && count > 1) {
                    extraClassName += " sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-[calc(50%-0.375rem)]";
                }

                if (count % 3 === 1 && isLast && count > 3) {
                    extraClassName += " lg:col-span-1 lg:col-start-2 lg:mx-0 lg:max-w-none";
                }

                if (count % 3 === 2 && count > 3) {
                    if (isSecondLast) {
                        extraClassName += " lg:col-span-1 lg:col-start-1 lg:mx-0 lg:max-w-none";
                    }

                    if (isLast) {
                        extraClassName += " lg:col-span-1 lg:col-start-3 lg:mx-0 lg:max-w-none";
                    }
                }

                const existingClassName =
                    typeof child.props.className === "string" ? child.props.className : "";

                return cloneElement(child, {
                    className: `${existingClassName} ${extraClassName}`.trim(),
                });
            })}
        </motion.ul>
    );
}

function BulletItem({
                        children,
                        className = "",
                    }: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <motion.li
            variants={rise}
            className={`rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-white/84 shadow-[0_12px_22px_rgba(0,0,0,0.14)] sm:rounded-[20px] sm:text-center sm:shadow-[0_14px_28px_rgba(0,0,0,0.16)] ${className}`}
        >
            {children}
        </motion.li>
    );
}

function QuickLookGrid() {
    const items = [
        {
            title: "Gentle check-ins",
            text: "Check in quickly using weather that feels closest to your day.",
        },
        {
            title: "Privacy first",
            text: "Everything stays on your device. No account. No tracking.",
        },
        {
            title: "Tiny quests",
            text: "Pick one small, realistic thing to help care for yourself.",
        },
        {
            title: "Export on your terms",
            text: "Keep a copy of your data or share it only when you choose.",
        },
    ];

    const arrangedItems = applyCenteredOddLayout(
        items.map((item) => (
            <motion.div
                key={item.title}
                variants={rise}
                className="rounded-[20px] border border-white/10 bg-white/[0.045] px-4 py-4 text-left shadow-[0_14px_28px_rgba(0,0,0,0.16)]"
            >
                <h3 className="mb-2 text-base font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-6 text-white/78">{item.text}</p>
            </motion.div>
        )),
        {
            twoColBreakpoint: "sm",
            threeColBreakpoint: "xl",
        },
    );

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="mx-auto max-w-5xl"
        >
            <motion.div variants={rise} className="mb-4 text-center sm:mb-5">
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-white/55">
                    Quick look
                </p>
            </motion.div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{arrangedItems}</div>
        </motion.section>
    );
}

function DisclosureCard({
                            title,
                            children,
                            defaultOpen = false,
                        }: {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
}) {
    return (
        <motion.details
            variants={rise}
            open={defaultOpen}
            className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-4 text-left shadow-[0_14px_28px_rgba(0,0,0,0.16)]"
        >
            <summary className="cursor-pointer list-none text-base font-semibold text-white marker:hidden">
                <span className="flex items-center justify-between gap-4">
                    <span>{title}</span>
                    <span className="text-sm font-medium text-white/55">Tap to open</span>
                </span>
            </summary>
            <div className="mt-4 space-y-4 text-[15px] leading-7 text-white/82">
                {children}
            </div>
        </motion.details>
    );
}

function ScreenshotTriptych() {
    const screenshots = [
        { src: "/projects/moodcast/moodcast_1.png", alt: "Moodcast screen 1" },
        { src: "/projects/moodcast/moodcast_2.png", alt: "Moodcast screen 2" },
        { src: "/projects/moodcast/moodcast_3.png", alt: "Moodcast screen 3" },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const goToIndex = (index: number) => {
        const normalizedIndex = (index + screenshots.length) % screenshots.length;
        setActiveIndex(normalizedIndex);
    };

    const goToNext = () => {
        setActiveIndex((current) => (current + 1) % screenshots.length);
    };

    const goToPrevious = () => {
        setActiveIndex((current) => (current - 1 + screenshots.length) % screenshots.length);
    };

    const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = event.touches[0].clientX;
        touchEndX.current = null;
    };

    const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
        touchEndX.current = event.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current === null || touchEndX.current === null) return;

        const distance = touchStartX.current - touchEndX.current;

        if (distance > 50) {
            goToNext();
        } else if (distance < -50) {
            goToPrevious();
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="mx-auto w-full max-w-6xl"
        >
            <div className="sm:hidden">
                <div
                    className="relative overflow-hidden"
                    aria-label="Moodcast screenshots"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <motion.div
                        className="flex"
                        animate={{ x: `-${activeIndex * 100}%` }}
                        transition={{ type: "spring", stiffness: 220, damping: 26 }}
                    >
                        {screenshots.map((shot) => (
                            <div key={shot.src} className="w-full shrink-0 px-1">
                                <img
                                    src={shot.src}
                                    alt={shot.alt}
                                    className="w-full rounded-[20px] border border-white/12 shadow-[0_18px_40px_rgba(0,0,0,0.22)]"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>

                <motion.div variants={rise} className="mt-4 flex items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={goToPrevious}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-lg text-white/80 transition hover:bg-white/[0.09] hover:text-white"
                        aria-label="Previous screenshot"
                    >
                        ‹
                    </button>

                    <div className="flex items-center gap-2">
                        {screenshots.map((shot, index) => {
                            const isActive = index === activeIndex;

                            return (
                                <button
                                    key={shot.src}
                                    type="button"
                                    onClick={() => goToIndex(index)}
                                    className={`h-2.5 rounded-full transition ${
                                        isActive ? "w-6 bg-white" : "w-2.5 bg-white/30 hover:bg-white/55"
                                    }`}
                                    aria-label={`Go to screenshot ${index + 1}`}
                                    aria-pressed={isActive}
                                />
                            );
                        })}
                    </div>

                    <button
                        type="button"
                        onClick={goToNext}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-lg text-white/80 transition hover:bg-white/[0.09] hover:text-white"
                        aria-label="Next screenshot"
                    >
                        ›
                    </button>
                </motion.div>
            </div>

            <div className="hidden sm:grid sm:grid-cols-3 sm:gap-4">
                {screenshots.map((shot) => (
                    <motion.div
                        key={shot.src}
                        variants={rise}
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 220, damping: 20 }}
                        className="flex items-center justify-center"
                    >
                        <img
                            src={shot.src}
                            alt={shot.alt}
                            className="w-full rounded-[22px] border border-white/12 shadow-[0_24px_60px_rgba(0,0,0,0.24)]"
                        />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default function MoodcastPage() {
    const { isLowPerformanceMode, prefersReducedMotion } = usePerformanceMode();
    const shouldAnimateHeroLogo = !isLowPerformanceMode && !prefersReducedMotion;

    const [showBackToTop, setShowBackToTop] = useState(false);
    const shouldAnimateBackToTop = !prefersReducedMotion;

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 500);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <section className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-6 sm:px-6 sm:pb-24 sm:pt-10 md:px-10 lg:px-14">
            <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-44 max-w-6xl bg-[radial-gradient(circle_at_top,rgba(244,180,207,0.05),transparent_38%)] blur-xl sm:h-72 sm:bg-[radial-gradient(circle_at_top,rgba(244,180,207,0.10),transparent_42%),radial-gradient(circle_at_top_right,rgba(212,178,255,0.10),transparent_34%)] sm:blur-3xl"/>

            <div className="relative mx-auto max-w-6xl">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="text-center"
                >
                    <motion.div
                        variants={rise}
                        className="relative mx-auto flex min-h-[180px] max-w-4xl items-center justify-center px-4 py-3 sm:min-h-[280px] sm:px-8 sm:py-6"
                    >
                        <div
                            className={`pointer-events-none absolute h-[180px] w-[180px] rounded-full bg-pink-300/10 ${isLowPerformanceMode ? "blur-xl" : "blur-3xl"} sm:h-[360px] sm:w-[360px] sm:bg-pink-300/20`}/>
                        {!isLowPerformanceMode && (
                            <div
                                className="pointer-events-none absolute h-[165px] w-[165px] rounded-full bg-violet-300/16 blur-3xl sm:h-[280px] sm:w-[280px] sm:bg-violet-300/20"/>
                        )}
                        {!isLowPerformanceMode && (
                            <div
                                className="pointer-events-none absolute h-[120px] w-[120px] rounded-full bg-white/8 blur-2xl sm:h-[190px] sm:w-[190px] sm:bg-white/10"/>
                        )}

                        <motion.img
                            src="/projects/moodcast/moodcast-logo.png"
                            alt="Moodcast"
                            loading="eager"
                            decoding="async"
                            className="relative z-10 w-[180px] max-w-full object-contain drop-shadow-[0_0_18px_rgba(244,180,207,0.14)] sm:w-[280px] sm:drop-shadow-[0_0_45px_rgba(244,180,207,0.28)] md:w-[340px]"
                            animate={
                                shouldAnimateHeroLogo
                                    ? {
                                        y: [0, -6, 0],
                                        scale: [1, 1.02, 1],
                                        rotate: [0, 1, 0, -1, 0],
                                    }
                                    : undefined
                            }
                            transition={
                                shouldAnimateHeroLogo
                                    ? {
                                        duration: 7,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }
                                    : undefined
                            }
                        />
                    </motion.div>

                    <motion.h3
                        variants={rise}
                        className="mx-auto mt-3 max-w-2xl text-base leading-7 text-white/80 sm:mt-4 sm:text-xl"
                    >
                        A helpful little pocket journal for tracking and managing your own inner weather.
                    </motion.h3>
                </motion.div>

                <div className="mt-10 space-y-14 sm:mt-16 sm:space-y-24">
                    <QuickLookGrid/>

                    <ScreenshotTriptych/>

                    <StoryBlock title="Overview">
                        <motion.p variants={rise}>
                            Moodcast is a calm, weather themed wellbeing companion made for gentle self reflection.
                        </motion.p>

                        <motion.p variants={rise}>
                            It turns mood tracking into something softer and easier to come back to. You can do
                            quick daily check-ins using weather icons that match how your day feels, then optionally
                            choose small quests that help you care for yourself in realistic ways.
                        </motion.p>

                        <motion.p variants={rise}>
                            Everything is stored locally on your device, so you can use it without creating an
                            account or giving away personal data.
                        </motion.p>

                        <motion.p variants={rise}>
                            Moodcast is not medical care, diagnosis, or crisis support. If you are in crisis, feel
                            unsafe, or need urgent help, please seek immediate support from local emergency or mental
                            health services.
                        </motion.p>
                    </StoryBlock>

                    <StoryBlock title="Why I made Moodcast">
                        <motion.p variants={rise}>
                            I wanted privacy and easy access to be part of the foundation, not an afterthought.
                        </motion.p>

                        <motion.p variants={rise}>
                            Too many apps collect, track, and sell deeply personal information, including emotional
                            and mental health data. I do not think that should be normal. A wellbeing app should not
                            turn private moments into ad profiles, assumptions, or something to monetize.
                        </motion.p>

                        <motion.p variants={rise}>
                            I made Moodcast to be a simple, gentle mood tracker people can actually use without
                            paying, signing up, or handing over personal data.
                        </motion.p>
                    </StoryBlock>

                    <StoryBlock title="Features" className="max-w-5xl">
                        <FeatureList>
                            <FeatureItem title="Gentle mood check-ins">
                                Moodcast uses weather as a softer way to check in with yourself. Instead of forcing
                                everything into a hard label, you can choose the weather that feels closest to your
                                day. It keeps mood tracking approachable, while still helping you notice patterns
                                over time.
                            </FeatureItem>

                            <FeatureItem title="Tiny quests">
                                After checking in, you can choose a tiny quest if it helps. These are meant to feel
                                realistic, gentle, and actually doable. Some days that might mean taking a breath,
                                slowing down, drinking water, or doing one small kind thing for yourself.
                            </FeatureItem>

                            <FeatureItem title="Daily logs">
                                Moodcast helps you build a personal record of how you have been feeling over time.
                                You can look back on past entries, notice patterns, and understand your own rhythms
                                a little better.
                            </FeatureItem>

                            <FeatureItem title="Privacy comes first">
                                Your data stays on your device. There is no account system, no login wall, no cloud
                                requirement, and no outside profile being built around you.
                            </FeatureItem>

                            <FeatureItem title="Export when you want it">
                                If you want to keep a copy of your data or share it with someone you trust, Moodcast
                                lets you export it in multiple formats. You stay in control of what leaves your
                                device and when.
                            </FeatureItem>

                            <FeatureItem title="Calm design">
                                Moodcast is built to feel soft, clear, and easy to return to. I wanted it to feel
                                more like a gentle companion and less like something judging or pushing you.
                            </FeatureItem>
                        </FeatureList>
                    </StoryBlock>

                    <StoryBlock title="The weather system">
                        <CenterImage
                            src="/projects/moodcast/moodcast_weather_grid.png"
                            alt="Moodcast weather grid"
                            imageClassName="max-h-[480px]"
                            minHeightClassName="min-h-[240px] sm:min-h-[360px]"
                        />

                        <motion.p variants={rise}>
                            Moodcast uses a set of default weather meanings to make check-ins feel natural and easy
                            to read. They are there as a starting point, not a rulebook. The goal is not to tell you
                            how you feel. It is to help you notice it a little more easily.
                        </motion.p>

                        <motion.p variants={rise}>
                            You can rename the weather icons and rewrite their descriptions in the settings to make
                            the system feel more like yours. Your future check-ins will use the updated meanings,
                            while past logs stay intact.
                        </motion.p>
                    </StoryBlock>

                    <StoryBlock title="Privacy and data">
                        <motion.p variants={rise}>
                            Privacy is a core part of Moodcast, not a bonus feature.
                        </motion.p>

                        <StatementGrid>
                            <Statement>Moodcast does not require an account.</Statement>
                            <Statement>Moodcast does not build a personal profile around you.</Statement>
                            <Statement>Moodcast does not store your data on outside servers.</Statement>
                            <Statement>Moodcast does not link your entries to an external database.</Statement>
                            <Statement>Moodcast does not need online syncing to work.</Statement>
                            <Statement>Your logs stay on your device.</Statement>
                        </StatementGrid>

                        <DisclosureCard title="More about how your data is protected">
                            <p>
                                I made sure your app data, including your settings, optional name, and daily logs,
                                is encrypted and only unlocked when you open the app. That means other apps and
                                outside services cannot casually read it.
                            </p>

                            <p>
                                You can also encrypt exports if you choose. If you ever email or move your data
                                elsewhere, that extra layer of protection can really matter.
                            </p>
                        </DisclosureCard>
                    </StoryBlock>

                    <StoryBlock title="Exporting your data">
                        <motion.p variants={rise}>
                            Moodcast lets you export your data in a few different formats, depending on what you
                            need:
                        </motion.p>

                        <div className="pt-1 sm:pt-2">
                            <BulletGrid>
                                <BulletItem>
                                    A polished PDF report with graphs, visuals, and an overall mood score.
                                </BulletItem>
                                <BulletItem>A CSV file for spreadsheets and analysis</BulletItem>
                                <BulletItem>An Excel file for tables and data analysis</BulletItem>
                                <BulletItem>The raw JSON data, great for future backups</BulletItem>
                            </BulletGrid>
                        </div>

                        <DisclosureCard title="More about export privacy">
                            <p>
                                Exports are compressed into a zip file, with optional password protection and
                                encryption. If you plan to email or move your data elsewhere, I strongly recommend
                                turning that on.
                            </p>

                            <p>
                                Exporting is completely optional and fully under your control. You can keep a
                                personal backup, share a report with someone you trust, or bring it into a therapy
                                session if that feels helpful.
                            </p>
                        </DisclosureCard>
                    </StoryBlock>

                    <StoryBlock title="Design goals and notes">
                        <motion.p variants={rise}>Moodcast is built around a few simple ideas:</motion.p>

                        <div className="pt-1 sm:pt-2">
                            <BulletGrid>
                                <BulletItem>Privacy should be the default</BulletItem>
                                <BulletItem>Wellbeing tools should be easy to reach and easy to use</BulletItem>
                                <BulletItem>Mood tracking should feel gentle, not clinical</BulletItem>
                                <BulletItem>Personal data should stay personal</BulletItem>
                            </BulletGrid>
                        </div>

                        <DisclosureCard title="Important note">
                            <p>
                                Moodcast is meant to support self reflection. It is not a replacement for therapy,
                                diagnosis, treatment, or emergency support.
                            </p>
                        </DisclosureCard>
                    </StoryBlock>

                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true, amount: 0.2}}
                        variants={stagger}
                        className="mx-auto max-w-3xl text-center"
                    >
                        <motion.div variants={rise} className="mb-5 sm:mb-6">
                            <div className="mx-auto mb-3 h-2 w-2 rounded-full bg-pink-200 sm:mb-4 sm:h-2.5 sm:w-2.5"/>
                            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                                Feedback and bugs
                            </h2>
                        </motion.div>

                        <motion.h4
                            variants={rise}
                            className="mx-auto max-w-2xl text-base font-semibold leading-7 text-white sm:text-lg"
                        >
                            If you have feedback, ideas, or run into a bug, I’d really love to hear about it.
                            You can report issues or share suggestions on the GitHub issue tracker.
                        </motion.h4>

                        <motion.a
                            variants={rise}
                            href="https://github.com/caffeinecavern/Moodcast/issues"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-5 inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-lg text-white/80 shadow-[0_12px_22px_rgba(0,0,0,0.16)] backdrop-blur-md transition hover:bg-white/[0.10] hover:text-white sm:mt-6 sm:shadow-[0_14px_30px_rgba(0,0,0,0.18)]"
                        >
                            Go to issue tracker
                        </motion.a>
                    </motion.section>

                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true, amount: 0.2}}
                        variants={stagger}
                        className="mx-auto max-w-3xl text-center"
                    >
                        <motion.div variants={rise} className="mb-5 sm:mb-6">
                            <div className="mx-auto mb-3 h-2 w-2 rounded-full bg-pink-200 sm:mb-4 sm:h-2.5 sm:w-2.5"/>
                            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                                Support
                            </h2>
                        </motion.div>

                        <motion.h4
                            variants={rise}
                            className="mx-auto max-w-2xl text-base font-semibold leading-7 text-white sm:text-lg"
                        >
                            If Moodcast means something to you and you want to help me keep building it, you can
                            support the project by fueling the coffee machine in the cave!
                        </motion.h4>

                        <motion.a
                            variants={rise}
                            href="https://ko-fi.com/T6T41UU1UV"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-5 inline-flex justify-center sm:mt-6"
                        >
                            <img
                                src="https://ko-fi.com/img/githubbutton_sm.svg"
                                alt="ko-fi"
                                className="h-auto w-[260px] max-w-full sm:w-[300px]"
                            />
                        </motion.a>
                    </motion.section>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true, amount: 0.25}}
                        variants={rise}
                        className="mx-auto max-w-3xl text-center"
                    >
                        <h3 className="text-lg font-semibold text-white sm:text-2xl">
                            Thank you for checking out Moodcast. I really appreciate you being here.
                        </h3>
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.96 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        onClick={scrollToTop}
                        aria-label="Back to top"
                        className="fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/80 shadow-[0_12px_22px_rgba(0,0,0,0.16)] backdrop-blur-md transition hover:bg-white/[0.10] hover:text-white sm:bottom-6 sm:right-6 sm:h-14 sm:w-14 sm:shadow-[0_14px_30px_rgba(0,0,0,0.18)]"
                    >
                        <motion.span
                            animate={shouldAnimateBackToTop ? { y: [0, -4, 0] } : undefined}
                            transition={
                                shouldAnimateBackToTop
                                    ? { repeat: Infinity, duration: 1.8, ease: "easeInOut" }
                                    : undefined
                            }
                            className="inline-flex"
                        >
                            <ArrowDown className="h-5 w-5 rotate-180 sm:h-6 sm:w-6" />
                        </motion.span>
                    </motion.button>
                )}
            </AnimatePresence>
        </section>
    );
}