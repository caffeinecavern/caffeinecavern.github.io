export const projects = [
  {
    id: "moodcast",
    name: "Moodcast",
    tagline: "A gentle weather themed wellbeing companion.",
    status: "Available Soon",
    description: "A free, customizable, and privacy-first mood tracker. No accounts or logins needed!",
    accent: "from-pink-300/30 via-fuchsia-300/20 to-violet-300/20",
    logo: "/projects/moodcast/moodcast-logo.png",
    href: "/moodcast"
  },
] as const;

export const palette = {
  bgTop: "#241c2b",
  bgBottom: "#151019",
  blush: "#f4bdd5",
  lilac: "#c8a7f2",

  shell: "rgba(255,255,255,0.06)",
  shellStrong: "rgba(255,255,255,0.085)",
  shellSoft: "rgba(255,255,255,0.04)",
  line: "rgba(255,255,255,0.12)",

  textSoft: "rgba(255,255,255,0.76)",
  textMute: "rgba(255,255,255,0.66)",

  glowPink: "rgba(122,92,116,0.08)",
  glowLilac: "rgba(116,96,140,0.07)",
};

export const batSippingCoffee = "/caffeinecavern-bat-sipping.gif";
export const batProgramming = "/caffeinecavern-bat-programming.gif";

export const menuItems = [
  { label: "Welcome", kind: "section", target: "welcome-section" },
  { label: "Projects", kind: "section", target: "projects-section" },
  { label: "About", kind: "page", href: "/about" },
  { label: "Contact", kind: "page", href: "/contact" },
] as const;