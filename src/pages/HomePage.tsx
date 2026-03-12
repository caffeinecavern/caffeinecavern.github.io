import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeroLogo from "../components/HeroLogo";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/site";
import { Button } from "../components/ui";
import Spooders, {ClassicCornerWeb, DancingSpooder, TopWebRail} from "../components/Spooders";

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;

    if (!state?.scrollTo) {
      return;
    }

    requestAnimationFrame(() => {
      document.getElementById(state.scrollTo || "")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

  return (
      <>
        <section id="welcome-section" className="relative isolate overflow-visible scroll-mt-28">
          <Spooders variant="hero" className="z-10 opacity-60" />

          <div className="pointer-events-none relative z-20 mx-auto flex min-h-[calc(92svh-4.5rem)] w-full max-w-7xl flex-col px-4 pb-10 pt-20 sm:min-h-[calc(100vh-5rem)] sm:px-6 sm:pb-12 sm:pt-24 md:px-10 lg:px-14 lg:pt-28">
            <div className="flex flex-1 items-center">
              <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
                <motion.section
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                    className="pointer-events-auto order-2 mx-auto max-w-2xl text-center lg:order-1 lg:mx-0 lg:text-left"
                >
                  <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
                    Welcome to the Cave
                  </h1>

                  <p className="mt-5 max-w-xl text-base leading-7 text-white/72 sm:mt-6 sm:text-lg sm:leading-8 md:text-xl">
                    Good to have you here! Check out what I've been working on!
                  </p>

                  <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                    <Button
                        onClick={() => scrollToSection("projects-section")}
                        className="w-full max-w-[280px] justify-center rounded-full bg-gradient-to-r from-pink-200 to-violet-200 px-6 text-[#22131b] hover:opacity-95 sm:w-auto sm:max-w-none"
                    >
                      Enter the project shelf
                    </Button>

                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65 backdrop-blur-md">
                      <span className="h-2 w-2 rounded-full bg-pink-200" />
                      more cave rooms coming soon
                    </div>
                  </div>
                </motion.section>

                <div className="order-1 mx-auto pb-2 lg:order-2 lg:pb-0">
                  <HeroLogo />
                </div>
              </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="pointer-events-auto hidden pb-6 sm:block"
            >
              <button
                  onClick={() => scrollToSection("projects-section")}
                  className="group inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white/90"
              >
                <span>Enter the project shelf</span>
                <motion.span
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                >
                  <ArrowDown className="h-4 w-4" />
                </motion.span>
              </button>
            </motion.div>
          </div>
        </section>

        <section
            id="projects-section"
            className="cv-auto relative isolate mx-auto w-full max-w-7xl scroll-mt-28 px-4 pb-24 pt-20 sm:px-6 sm:pb-20 sm:pt-24 md:px-10 lg:px-14 lg:pt-24"
        >
          <div className="relative z-20">
            <motion.div
                initial={{opacity: 0, y: 24}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.2}}
                transition={{duration: 0.8, delay: 0.1, ease: "easeOut"}}
                className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
            >
              <div>
                <p className="text-center text-xl uppercase tracking-[0.24em] text-white/45 sm:text-2xl">
                  projects
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {projects.length === 0 ? (
                  <motion.div
                      initial={{opacity: 0, y: 18}}
                      whileInView={{opacity: 1, y: 0}}
                      viewport={{once: true, amount: 0.3}}
                      transition={{duration: 0.7, ease: "easeOut"}}
                      className="relative flex min-h-[280px] items-center justify-center py-8 text-center lg:col-span-2 xl:col-span-3"
                  >
                    <div
                        className="pointer-events-none absolute left-1/2 top-10 h-32 w-32 -translate-x-1/2 rounded-full bg-pink-200/8 blur-3xl"/>
                    <div
                        className="pointer-events-none absolute left-1/2 top-24 h-24 w-24 -translate-x-1/2 rounded-full bg-violet-200/8 blur-3xl"/>

                    <ClassicCornerWeb side="left"/>
                    <ClassicCornerWeb side="right"/>
                    <TopWebRail/>

                    <div className="relative flex w-full max-w-2xl flex-col items-center text-center">
                      <DancingSpooder size={32}/>
                      <div className="mb-6 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent"/>

                      <p className="text-2xl font-medium tracking-tight text-white/64 sm:text-3xl">
                        A bit dusty here!
                      </p>

                      <p className="mt-3 text-sm leading-7 text-white/32 sm:text-base">
                        Projects coming soon.
                      </p>
                    </div>
                  </motion.div>
              ) : (
                  <>
                    {projects.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i}/>
                    ))}
                  </>
              )}
            </div>
          </div>
        </section>
      </>
  );
}