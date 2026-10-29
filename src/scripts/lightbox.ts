/* Gallery reels + menu boards lightbox, with swipe on touch screens */
import { $ } from "./dom";
import { lockScroll } from "./scroll";

type Slide = { src: string; alt: string };

export function initLightbox() {
  const box = $("#lightbox");
  const img = $<HTMLImageElement>("#lbImg");
  const count = $("#lbCount");
  const prev = $("#lbPrev");
  const next = $("#lbNext");
  const gallery: Slide[] = JSON.parse($("#reels").dataset.slides!);
  const boards: Slide[] = JSON.parse(box.dataset.boards!);
  let list: Slide[] = [], index = 0, lastFocus: HTMLElement | null = null;

  const render = () => {
    img.src = list[index].src;
    img.alt = list[index].alt;
    count.textContent = `${index + 1} / ${list.length}`;
    prev.hidden = next.hidden = list.length < 2;
  };
  const open = (items: Slide[], start: number) => {
    list = items; index = start; lastFocus = document.activeElement as HTMLElement;
    render(); box.hidden = false; lockScroll(true); $("#lbClose").focus({ preventScroll: true });
  };
  const close = () => {
    if (box.hidden) return;
    box.hidden = true; lockScroll(false); lastFocus?.focus({ preventScroll: true });
  };
  const step = (d: number) => { index = (index + d + list.length) % list.length; render(); };

  $("#lbClose").addEventListener("click", close);
  prev.addEventListener("click", () => step(-1));
  next.addEventListener("click", () => step(1));
  box.addEventListener("click", (e) => { if (e.target === box && !swiped) close(); });
  document.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  // swipe: left/right to browse, down to dismiss
  let sx = 0, sy = 0, tracking = false, swiped = false;
  box.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse" || (e.target as Element).closest("button")) return;
    tracking = true; swiped = false; sx = e.clientX; sy = e.clientY;
  });
  box.addEventListener("pointermove", (e) => {
    if (!tracking) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    img.style.transition = "none";
    img.style.translate = Math.abs(dx) > Math.abs(dy) ? `${dx}px 0` : `0 ${Math.max(0, dy)}px`;
    img.style.opacity = String(1 - Math.min(0.6, Math.max(0, dy) / 400));
  });
  const end = (e: PointerEvent) => {
    if (!tracking) return;
    tracking = false;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    swiped = Math.hypot(dx, dy) > 10;
    img.style.transition = img.style.translate = img.style.opacity = "";
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
    else if (dy > 90) close();
  };
  box.addEventListener("pointerup", end);
  box.addEventListener("pointercancel", end);

  $("#reels").addEventListener("click", (e) => {
    const b = (e.target as Element).closest<HTMLElement>("[data-i]");
    if (b) open(gallery, Number(b.dataset.i));
  });
  $("#viewBoards").addEventListener("click", () => open(boards, 0));
}
