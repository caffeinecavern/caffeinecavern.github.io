import { motion } from "framer-motion";
import type { ReactNode } from "react";
import BatProgramming from "../components/BatProgramming";

const rise = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" },
};

function SectionCard({
                       title,
                       delay,
                       children,
                     }: {
  title: string;
  delay: number;
  children: ReactNode;
}) {
  return (
      <motion.section
          {...rise}
          transition={{ duration: 0.7, ease: "easeOut", delay }}
          className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.045] px-5 py-6 shadow-[0_14px_44px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:px-7 sm:py-8"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/12" />
        <div className="pointer-events-none absolute -right-10 top-0 h-28 w-28 rounded-full bg-pink-200/10 blur-2xl" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-violet-200/10 blur-2xl" />

        <div className="relative">
          <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {title}
          </h2>

          <div className="mt-4 space-y-4 text-left">{children}</div>
        </div>
      </motion.section>
  );
}

export default function AboutPage() {
  return (
      <section
          id="about-section"
          className="relative mx-auto w-full max-w-7xl scroll-mt-28 px-4 pb-24 pt-14 sm:px-6 sm:pb-16 sm:pt-8 md:px-10 lg:px-14"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-56 max-w-5xl bg-[radial-gradient(circle_at_top,rgba(244,180,207,0.08),transparent_42%),radial-gradient(circle_at_top_right,rgba(212,178,255,0.06),transparent_34%)] blur-3xl" />

        <motion.div
            initial={{opacity: 0, y: 18}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.7, ease: "easeOut"}}
            className="relative z-10"
        >
          <motion.p
              {...rise}
              className="text-center text-xl uppercase tracking-[0.24em] text-white/45 sm:text-2xl"
          >
            about
          </motion.p>

          <div className="mx-auto mt-6 grid max-w-5xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            <motion.div
                {...rise}
                transition={{duration: 0.7, ease: "easeOut", delay: 0.05}}
                className="order-1 mx-auto w-full max-w-md"
            >
              <BatProgramming/>
            </motion.div>

            <div className="order-2 text-center lg:text-left">
              <motion.h1
                  {...rise}
                  transition={{duration: 0.7, ease: "easeOut", delay: 0.1}}
                  className="text-4xl font-semibold tracking-tight text-white sm:text-5xl"
              >
                Hi, I’m Caitie.
              </motion.h1>

              <motion.p
                  {...rise}
                  transition={{duration: 0.7, ease: "easeOut", delay: 0.14}}
                  className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8 lg:mx-0"
              >
                I make games and apps from the comfort of my cave.
              </motion.p>

              <motion.p
                  {...rise}
                  transition={{duration: 0.7, ease: "easeOut", delay: 0.18}}
                  className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/68 lg:mx-0"
              >
                I love building things that feel meaningful, creative, and worth
                spending time with.
              </motion.p>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-5xl space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <SectionCard title="How I got started" delay={0.22}>
                <p className="text-base leading-8 text-white/72">
                  My journey started during the horrible Covid-19 years.
                  During lockdown, I taught myself Java and programming by modding Minecraft.
                  That was my first real taste of how exciting it felt to change a world with code and make it behave
                  the way I imagined.
                  What started as curiosity turned into something much bigger for me very quickly.
                </p>
              </SectionCard>

              <SectionCard title="What I love about this" delay={0.26}>
                <p className="text-base leading-8 text-white/72">
                  I fell in love with the idea that programming could be both creative and technical at the same time.
                  I love designing stories in code and bringing them to life in a world within a screen.
                  I love the process of taking an idea that only exists in my head, building it piece by piece, and
                  slowly watching it become something real and interactive.
                  That feeling still hasn’t worn off.
                </p>
              </SectionCard>
            </div>

            <SectionCard title="What I make now" delay={0.3}>
              <p className="text-base leading-8 text-white/72">
                I also love pushing myself and seeing what more I can create with programming, so I moved on to making
                my own indie video games and apps.
                Games let me explore storytelling, atmosphere, and interaction in a way that feels really alive to me.
                Apps let me build things that are useful, thoughtful, and genuinely helpful in everyday life.
                I enjoy working in both spaces because they each let me create something different.
              </p>
            </SectionCard>

            <SectionCard title="What matters to me" delay={0.34}>
              <p className="text-base leading-8 text-white/72">
                I not only want to tell stories, but I want to make projects with purpose.
                One topic that is very close to my heart is mental health and spreading awareness for it.
                I want everyone to have easy access to tools that they can utilize for their mental wellbeing.
                I care a lot about making things that feel approachable, comforting, and safe to come back to.
              </p>

              <p className="text-base leading-8 text-white/72">
                That is why I am making the projects that are tied to mental health and wellbeing free and safe to use.
                I never want support, reflection, or emotional care to feel locked behind a paywall or treated like a
                luxury.
                If I can build something that helps even a little, then that matters to me.
                That kind of work feels personal, and I want to handle it with care.
              </p>
            </SectionCard>
          </div>

          <motion.section
              {...rise}
              transition={{duration: 0.7, ease: "easeOut", delay: 0.38}}
              className="relative mx-auto mt-10 max-w-3xl text-center"
          >
            <div
                className="pointer-events-none absolute left-1/2 top-0 h-28 w-28 -translate-x-1/2 rounded-full bg-pink-200/10 blur-2xl"/>

            <div className="relative">

              <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent"/>

              <div className="mt-6 space-y-4">
                <p className="mx-auto max-w-2xl text-base leading-8 text-white/78">
                  Feel free to reach out to me. Links are provided on the contact page.
                </p>

                <p className="mx-auto max-w-2xl text-base leading-8 text-white/72">
                  I really appreciate you stopping by! Sorry about the cobwebs, I haven't dusted lately...
                </p>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </section>
  );
}