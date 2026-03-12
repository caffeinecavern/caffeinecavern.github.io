import { motion } from "framer-motion";
import { Heart, MoonStar } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../data/site";
import { usePerformanceMode } from "../hooks/usePerformanceMode";
import { Button, Card, CardContent, buttonClasses } from "./ui";

type Project = (typeof projects)[number];

export default function ProjectCard({
                                      project,
                                      index,
                                    }: {
  project: Project;
  index: number;
}) {
  const { isLowPerformanceMode, prefersReducedMotion } = usePerformanceMode();
  const tilt =
      index % 3 === 0
          ? "md:-rotate-[0.6deg]"
          : index % 3 === 1
              ? "md:rotate-[0.4deg]"
              : "md:-rotate-[0.2deg]";

  const enableHoverLift = !isLowPerformanceMode && !prefersReducedMotion;

  return (
      <motion.div
          layout={!isLowPerformanceMode}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          whileHover={enableHoverLift ? { y: -6, scale: 1.01, rotate: 0 } : undefined}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className={`relative ${tilt}`}
      >
        <div
            className={`absolute -inset-2 sm:-inset-3 rounded-[34px] bg-gradient-to-br ${project.accent} ${
                isLowPerformanceMode ? "opacity-20 blur-lg" : "opacity-32 blur-xl"
            }`}
        />

        <Card
            className={`group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/5 shadow-2xl ${
                isLowPerformanceMode ? "backdrop-blur-sm" : "backdrop-blur-lg"
            } sm:rounded-[28px]`}
            style={{
              boxShadow: isLowPerformanceMode
                  ? "0 12px 34px rgba(0,0,0,0.34)"
                  : "0 18px 60px rgba(0,0,0,0.45)",
            }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-55`} />
          <div
              className="absolute inset-[1px] rounded-[23px] sm:rounded-[27px]"
              style={{
                background:
                    "linear-gradient(180deg, rgba(24,17,29,0.94), rgba(16,12,20,0.90))",
              }}
          />

          <CardContent className="relative p-4 sm:p-6 md:p-7">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/70 sm:text-xs">
                  {project.status}
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {project.name}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-white/70">
                  {project.tagline}
                </p>
              </div>

              <motion.div
                  animate={
                    isLowPerformanceMode || prefersReducedMotion
                        ? undefined
                        : { rotate: [0, 6, -6, 0], y: [0, -2, 0] }
                  }
                  transition={
                    isLowPerformanceMode || prefersReducedMotion
                        ? undefined
                        : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }
                  }
                  className="w-fit rounded-2xl border border-white/10 bg-white/5 p-3 text-pink-200"
              >
                <Heart className="h-5 w-5" />
              </motion.div>
            </div>

            <div className="mb-5 rounded-[20px] border border-white/10 bg-black/20 p-3 sm:mb-6 sm:rounded-[22px] sm:p-4">
              <div
                  className="relative min-h-[220px] overflow-hidden rounded-[16px] border border-white/10 sm:min-h-[280px] sm:rounded-[18px] md:min-h-[320px]"
                  style={{
                    background: isLowPerformanceMode
                        ? "linear-gradient(180deg, rgba(34,22,38,0.88), rgba(20,12,22,0.96))"
                        : "radial-gradient(circle at 50% 35%, rgba(212,178,255,0.24), rgba(244,180,207,0.14) 26%, rgba(20,12,22,0.96) 78%)",
                  }}
              >
                {!isLowPerformanceMode && (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_10%),radial-gradient(circle_at_80%_35%,rgba(255,255,255,0.16),transparent_9%),radial-gradient(circle_at_50%_70%,rgba(255,255,255,0.12),transparent_8%)]" />
                )}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#201420] to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-8">
                  <motion.div
                      whileHover={enableHoverLift ? { scale: 1.04, rotate: 1.5 } : undefined}
                      transition={{ type: "spring", stiffness: 220, damping: 18 }}
                      className="relative flex items-center justify-center"
                  >
                    <div
                        className={`absolute h-28 w-28 rounded-full bg-pink-200/14 ${
                            isLowPerformanceMode ? "blur-xl" : "blur-2xl"
                        } sm:h-44 sm:w-44 md:h-52 md:w-52`}
                    />
                    {!isLowPerformanceMode && (
                        <div className="absolute h-24 w-24 rounded-full bg-violet-200/18 blur-xl sm:h-32 sm:w-32 md:h-40 md:w-40" />
                    )}

                    {project.logo ? (
                        <img
                            src={project.logo}
                            alt={`${project.name} logo`}
                            loading="lazy"
                            decoding="async"
                            className="relative z-10 h-32 w-32 object-contain drop-shadow-[0_0_18px_rgba(244,180,207,0.2)] sm:h-44 sm:w-44 md:h-56 md:w-56 sm:drop-shadow-[0_0_28px_rgba(244,180,207,0.28)]"
                        />
                    ) : (
                        <MoonStar className="relative z-10 h-20 w-20 text-pink-100 drop-shadow-[0_0_18px_rgba(244,180,207,0.2)] sm:h-24 sm:w-24 md:h-32 md:w-32 sm:drop-shadow-[0_0_28px_rgba(244,180,207,0.28)]" />
                    )}
                  </motion.div>
                </div>
              </div>
            </div>

            <p className="mb-6 text-sm leading-6 text-white/80">{project.description}</p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                  to={project.href}
                  className={buttonClasses("default", "default", "w-full justify-center rounded-full sm:w-auto")}
              >
                Explore project
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
  );
}