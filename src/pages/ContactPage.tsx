import { motion } from "framer-motion";
import { Mail, Github, Youtube, Coffee } from "lucide-react";
import Spooders, {ClassicCornerWeb, DancingSpooder, TopWebRail} from "../components/Spooders";

const rise = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" },
};

export default function ContactPage() {
  return (
      <section
          id="contact-section"
          className="relative mx-auto w-full max-w-7xl scroll-mt-28 px-4 pb-24 pt-14 sm:px-6 sm:pb-24 sm:pt-8 md:px-10 lg:px-14"
      >
        <Spooders variant="shelf" className="z-0 opacity-55" />

        <div className="pointer-events-none relative z-10">
          <motion.p
              {...rise}
              className="text-center text-xl uppercase tracking-[0.24em] text-white/45 sm:text-2xl"
          >
            contact
          </motion.p>

          <div className="relative mt-6 sm:mt-8">
            <motion.div
                initial={{opacity: 0, y: 18}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.7, ease: "easeOut"}}
                className="relative z-10 mx-auto flex max-w-5xl flex-col items-center pt-24 text-center sm:pt-28"
            >
              <motion.h1
                  {...rise}
                  className="text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl"
              >
                Come hang out in the Cave!
              </motion.h1>

              <motion.p
                  {...rise}
                  transition={{duration: 0.7, ease: "easeOut", delay: 0.05}}
                  className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-white/75 sm:text-lg sm:leading-8"
              >
                If you want to talk about games, apps, nerd stuff, or a
                project idea you’re excited about, I’d love to hear from you.
              </motion.p>

              <motion.p
                  {...rise}
                  transition={{duration: 0.7, ease: "easeOut", delay: 0.1}}
                  className="mx-auto mt-3 max-w-2xl text-center text-base leading-7 text-white/68"
              >
                I’m especially into conversations about game development, coding, and cute pets.
              </motion.p>

              <motion.p
                  {...rise}
                  transition={{duration: 0.7, ease: "easeOut", delay: 0.15}}
                  className="mx-auto mt-3 max-w-2xl text-center text-base leading-7 text-white/68"
              >
                Also, feel free to remind me to touch grass. I need that sometimes!
              </motion.p>

              <div className="mt-10 grid w-full max-w-3xl gap-6 md:grid-cols-3">
                <motion.a
                    {...rise}
                    transition={{duration: 0.7, ease: "easeOut", delay: 0.18}}
                    href="mailto:caffeinecavern@gmail.com"
                    className="pointer-events-auto group flex h-full flex-col items-center rounded-[26px] border border-white/10 bg-white/[0.05] px-6 py-7 text-center shadow-[0_12px_38px_rgba(0,0,0,0.2)] backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/[0.08]"
                >
                  <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-white/8 p-3 text-pink-200">
                    <Mail className="h-5 w-5"/>
                  </div>
                  <h2 className="text-lg font-medium text-white">Email</h2>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-white/68">
                    Best for project ideas, work stuff, questions, or just saying hi!
                  </p>
                  <p className="mt-4 text-sm text-pink-100/85 transition group-hover:text-pink-100">
                    caffeinecavern@gmail.com
                  </p>
                </motion.a>

                <motion.a
                    {...rise}
                    transition={{duration: 0.7, ease: "easeOut", delay: 0.24}}
                    href="https://github.com/caffeinecavern"
                    target="_blank"
                    rel="noreferrer"
                    className="pointer-events-auto group flex h-full flex-col items-center rounded-[26px] border border-white/10 bg-white/[0.05] px-6 py-7 text-center shadow-[0_12px_38px_rgba(0,0,0,0.2)] backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/[0.08]"
                >
                  <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-white/8 p-3 text-violet-200">
                    <Github className="h-5 w-5"/>
                  </div>
                  <h2 className="text-lg font-medium text-white">GitHub</h2>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-white/68">
                    For code, experiments, half-finished ideas, and the usual cave activity.
                  </p>
                  <p className="mt-4 text-sm text-violet-100/85 transition group-hover:text-violet-100">
                    github.com/caffeinecavern
                  </p>
                </motion.a>

                <motion.a
                    {...rise}
                    transition={{duration: 0.7, ease: "easeOut", delay: 0.28}}
                    href="https://youtube.com/@CaffeineCavern"
                    target="_blank"
                    rel="noreferrer"
                    className="pointer-events-auto group flex h-full flex-col items-center rounded-[26px] border border-white/10 bg-white/[0.05] px-6 py-7 text-center shadow-[0_12px_38px_rgba(0,0,0,0.2)] backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/[0.08]"
                >
                  <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-white/8 p-3 text-rose-200">
                    <Youtube className="h-5 w-5"/>
                  </div>
                  <h2 className="text-lg font-medium text-white">YouTube</h2>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-white/68">
                    For dev videos, project updates, and whatever I decide to upload!
                  </p>
                  <p className="mt-4 text-sm text-rose-100/85 transition group-hover:text-rose-100">
                    youtube.com/@CaffeineCavern
                  </p>
                </motion.a>
              </div>

              <motion.div
                  {...rise}
                  transition={{duration: 0.7, ease: "easeOut", delay: 0.36}}
                  className="pointer-events-auto mt-10 flex w-full max-w-3xl flex-col items-center rounded-[28px] border border-white/10 bg-white/[0.04] px-6 py-8 text-center shadow-[0_12px_38px_rgba(0,0,0,0.2)] backdrop-blur-sm"
              >
                <ClassicCornerWeb side="left" />
                <ClassicCornerWeb side="right" />
                <TopWebRail />

                <div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  {[0, 1, 2].map((index) => (
                      <DancingSpooder
                          key={index}
                          size={index === 1 ? 32 : 24}
                          delay={index * 0.08}
                          className="mx-0.5"
                      />
                  ))}
                </div>

                <h2 className="text-xl font-medium text-white">Support the Cave</h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
                  If you’d like to support my work, you can fuel the coffee machine in the cave!
                  <br/>
                  It helps me keep coding away to make games and apps that make a difference!
                </p>

                <a
                    href="https://ko-fi.com/caffeinecavern"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-200 to-violet-200 px-6 py-3 text-sm font-medium text-[#22131b] transition hover:opacity-95"
                >
                  <Coffee className="h-6 w-6"/>
                  <p className="p-2">Support me on Ko-fi</p>
                </a>
              </motion.div>
            </motion.div>


            <motion.p
                {...rise}
                transition={{duration: 0.7, ease: "easeOut", delay: 0.3}}
                className="mx-auto mt-10 max-w-2xl text-center text-sm leading-6 text-white/62 sm:text-base"
            >
              I may not answer instantly, but I do check the cave mail!
            </motion.p>

          </div>
        </div>
      </section>
  );
}