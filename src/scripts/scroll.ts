/* Smooth scroll (Lenis) on mouse/trackpad only; phones keep native momentum scrolling. */
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REDUCED } from "./dom";

gsap.registerPlugin(ScrollTrigger);

const FINE_POINTER = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export const lenis = !REDUCED && FINE_POINTER ? new Lenis({ lerp: 0.1, smoothWheel: true }) : null;
if (lenis) {
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

let locks = 0;
export function lockScroll(on: boolean) {
  locks = Math.max(0, locks + (on ? 1 : -1));
  const locked = locks > 0;
  document.documentElement.classList.toggle("is-locked", locked);
  if (lenis) locked ? lenis.stop() : lenis.start();
}

export function scrollToTarget(target: number | HTMLElement) {
  if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4 });
  else if (typeof target === "number") window.scrollTo({ top: target });
  else target.scrollIntoView();
}
