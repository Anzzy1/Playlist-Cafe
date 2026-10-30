/* Top bar, mobile menu, bottom dock, anchors, scroll progress */
import { $, $$ } from "./dom";
import { lockScroll, scrollToTarget } from "./scroll";

export function initNav() {
  const nav = $("#nav");
  const toggle = $("#navToggle");
  const mobile = $("#mobileMenu");
  const dock = $("#dock");
  const toTop = $("#toTop");
  const ring = $("#toTopRing");
  const RING = 138.2;
  let lastY = window.scrollY;
  let down = false;
  let travel = 0; // distance scrolled in the current direction

  const onScroll = () => {
    const y = window.scrollY;
    const vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    const dy = y - lastY;
    lastY = y;

    // only flip the bar after a deliberate scroll, so small jitters don't make it flicker
    if (dy !== 0) {
      if (dy > 0 !== down) { down = dy > 0; travel = 0; }
      travel += Math.abs(dy);
    }
    nav.classList.toggle("is-scrolled", y > 20);
    if (!mobile.hidden || y < vh * 0.6 || (!down && travel > 60)) nav.classList.remove("is-hidden");
    else if (down && travel > 120) nav.classList.add("is-hidden");

    dock.classList.toggle("is-visible", y > vh * 0.55 && mobile.hidden);
    toTop.classList.toggle("is-visible", y > vh * 0.8);
    ring.style.strokeDashoffset = String(RING * (1 - (max > 0 ? y / max : 0)));
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setMenu = (open: boolean) => {
    if (open === !mobile.hidden) return;
    mobile.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    lockScroll(open);
    onScroll();
  };
  toggle.addEventListener("click", () => setMenu(mobile.hidden));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  // all in-page anchors go through smooth scroll
  document.addEventListener("click", (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href")!;
    if (id === "#main" || id.length < 2) return;
    const target = id === "#top" ? 0 : document.querySelector<HTMLElement>(id);
    if (target === null) return;
    e.preventDefault();
    setMenu(false);
    scrollToTarget(target);
  });

  // active link highlight
  const links = $$<HTMLAnchorElement>("#navLinks a");
  const spy = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${en.target.id}`));
    }),
    { rootMargin: "-45% 0px -50% 0px" },
  );
  links.forEach((l) => { const s = document.querySelector(l.getAttribute("href")!); if (s) spy.observe(s); });
}
