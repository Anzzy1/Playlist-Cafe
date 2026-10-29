/* Motion (GSAP + ScrollTrigger) */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { $, $$, REDUCED } from "./dom";

function intro() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.from("[data-intro]", { y: 24, opacity: 0, duration: 0.9, stagger: 0.08 })
    .from("[data-intro-visual] figure:first-child", { opacity: 0, scale: 0.97, duration: 1.1 }, 0.1)
    .from("[data-intro-small]", { y: 30, opacity: 0, duration: 0.9 }, 0.4)
    .from("[data-intro-badge]", { scale: 0.6, opacity: 0, duration: 0.8, ease: "back.out(1.6)" }, 0.6);
}

export function initMotion() {
  if (REDUCED) return;
  intro();

  // generic reveals
  gsap.set("[data-reveal]", { y: 32, opacity: 0 });
  ScrollTrigger.batch("[data-reveal]", {
    start: "top 90%",
    once: true,
    onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 0.9, stagger: 0.07, ease: "power3.out" }),
  });

  // image clip reveals
  $$("[data-clip]").forEach((el) => {
    gsap.fromTo(el,
      { clipPath: "inset(100% 0% 0% 0% round 22px)" },
      { clipPath: "inset(0% 0% 0% 0% round 22px)", duration: 1.3, ease: "power4.inOut", scrollTrigger: { trigger: el, start: "top 88%" } });
  });

  // parallax images
  $$("[data-speed]").forEach((el) => {
    gsap.to(el, { yPercent: Number(el.dataset.speed), ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
  });

  // statement: words light up as you scroll
  const st = $("#statement");
  st.innerHTML = st.textContent!.trim().split(/\s+/).map((w) => `<span class="word">${w}</span>`).join(" ");
  gsap.to($$(".word", st), {
    opacity: 1, stagger: 0.1, ease: "none",
    scrollTrigger: { trigger: st, start: "top 85%", end: "bottom 45%", scrub: true },
  });

  // counters
  $$("[data-count]").forEach((el) => {
    const end = Number(el.dataset.count);
    const obj = { v: end > 1000 ? end - 30 : 0 };
    el.textContent = String(obj.v);
    gsap.to(obj, {
      v: end, duration: 1.8, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
      onUpdate: () => (el.textContent = String(Math.round(obj.v))),
    });
  });

  // now playing: vinyl slides out of its sleeve
  gsap.fromTo("#npVinyl", { xPercent: -32 }, {
    xPercent: 0, ease: "power2.out",
    scrollTrigger: { trigger: ".np", start: "top 75%", end: "center center", scrub: 1 },
  });
  gsap.from(".np-cover", { rotate: -6, scale: 0.9, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".np", start: "top 70%" } });

  // menu cards
  gsap.set("#bento .dish", { y: 50, opacity: 0 });
  ScrollTrigger.batch("#bento .dish", {
    start: "top 94%", once: true,
    onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 0.9, stagger: 0.07, ease: "power3.out" }),
  });

  // footer wordmark fills in as you scroll
  gsap.to(".footer-word", { backgroundSize: "100% 100%", ease: "none", scrollTrigger: { trigger: ".footer-word", start: "top 95%", end: "bottom 70%", scrub: true } });
  gsap.from(".footer-title", { y: 50, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".footer-title", start: "top 90%" } });

  window.addEventListener("load", () => ScrollTrigger.refresh());
}
