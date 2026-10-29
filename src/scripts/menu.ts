/* Menu highlights filter + full-menu sheet */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { $, $$, DESKTOP, REDUCED } from "./dom";
import { lockScroll } from "./scroll";

export function initFilters() {
  const buttons = $$(".filter");
  const bento = $("#bento");
  const bar = $("#bentoBar");
  const dishes = $$(".dish", bento);

  // swipe progress under the phone carousel
  const updateBar = () => {
    const max = bento.scrollWidth - bento.clientWidth;
    const visible = bento.clientWidth / bento.scrollWidth;
    bar.style.width = `${Math.min(100, visible * 100)}%`;
    bar.style.translate = `${max > 0 ? (bento.scrollLeft / max) * ((1 - visible) / visible) * 100 : 0}% 0`;
  };
  bento.addEventListener("scroll", updateBar, { passive: true });
  window.addEventListener("resize", updateBar);
  updateBar();

  buttons.forEach((btn) => btn.addEventListener("click", () => {
    const f = btn.dataset.filter;
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));

    const show = dishes.filter((d) => f === "all" || d.dataset.cat === f);
    dishes.forEach((d) => d.classList.toggle("is-filtered", !show.includes(d)));
    bento.scrollTo({ left: 0 });
    updateBar();

    if (!REDUCED) {
      gsap.fromTo(show, { opacity: 0, y: 30, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.05, ease: "power3.out", overwrite: true });
      ScrollTrigger.refresh();
    }
  }));
}

export function initSheet() {
  const sheet = $("#sheet");
  const panel = $("#sheetPanel");
  const head = $("#sheetHead");
  const tabs = $("#sheetTabs");
  const body = $("#sheetBody");
  const tabList = $$(".tab", tabs);
  let lastFocus: HTMLElement | null = null;

  const show = (id: string) => {
    const tab = tabList.find((t) => t.dataset.id === id) ?? tabList[0];
    tabList.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
    });
    $$("[data-panel]", body).forEach((p) => (p.hidden = p.dataset.panel !== tab.dataset.id));
    body.scrollTop = 0;
    tabs.scrollTo({ left: tab.offsetLeft - tabs.clientWidth / 2 + tab.offsetWidth / 2, behavior: sheet.hidden ? "instant" : "smooth" });
  };

  const open = (id: string) => {
    if (!sheet.hidden) return show(id);
    lastFocus = document.activeElement as HTMLElement;
    sheet.hidden = false;
    sheet.classList.remove("is-closing");
    panel.style.transform = "";
    lockScroll(true);
    show(id);
    $("[data-close].icon-btn", sheet).focus({ preventScroll: true });
  };
  const close = () => {
    if (sheet.hidden || sheet.classList.contains("is-closing")) return;
    sheet.classList.add("is-closing");
    setTimeout(() => { sheet.hidden = true; sheet.classList.remove("is-closing"); panel.style.transform = ""; }, REDUCED ? 0 : 320);
    lockScroll(false);
    lastFocus?.focus({ preventScroll: true });
  };

  tabs.addEventListener("click", (e) => { const t = (e.target as Element).closest<HTMLElement>(".tab"); if (t) show(t.dataset.id!); });
  tabs.addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const i = tabList.indexOf(document.activeElement as HTMLElement);
    if (i < 0) return;
    const next = tabList[(i + (e.key === "ArrowRight" ? 1 : -1) + tabList.length) % tabList.length];
    next.focus(); show(next.dataset.id!);
  });
  sheet.addEventListener("click", (e) => { if ((e.target as Element).closest("[data-close]")) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  document.addEventListener("click", (e) => {
    const trigger = (e.target as Element).closest<HTMLElement>("[data-open]");
    if (trigger) open(trigger.dataset.open!);
  });

  // phones: drag the sheet header down to dismiss
  let startY = 0, dy = 0, startT = 0, dragging = false;
  head.addEventListener("pointerdown", (e) => {
    if (DESKTOP.matches || (e.target as Element).closest("button")) return;
    dragging = true; startY = e.clientY; startT = e.timeStamp; dy = 0;
    head.setPointerCapture(e.pointerId);
    panel.style.transition = "none";
  });
  head.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    dy = Math.max(0, e.clientY - startY);
    panel.style.transform = `translateY(${dy}px)`;
  });
  const endDrag = (e: PointerEvent) => {
    if (!dragging) return;
    dragging = false;
    const fast = dy / Math.max(1, e.timeStamp - startT) > 0.6;
    panel.style.transition = "transform .3s cubic-bezier(.22,1,.36,1)";
    if (dy > panel.clientHeight * 0.22 || (fast && dy > 40)) {
      panel.style.transform = "translateY(100%)";
      setTimeout(() => { panel.style.transition = ""; close(); }, 200);
    } else {
      panel.style.transform = "";
      setTimeout(() => (panel.style.transition = ""), 300);
    }
  };
  head.addEventListener("pointerup", endDrag);
  head.addEventListener("pointercancel", endDrag);
}
