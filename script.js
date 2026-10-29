/* =========================================================
   Playlist Cafe — interactions & motion
   GSAP + ScrollTrigger for motion, Lenis for smooth scroll,
   Lucide for icons. Everything degrades gracefully if a CDN fails.
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const HAS_GSAP = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

const icons = () => window.lucide && window.lucide.createIcons();

/* ---------------------------------------------------------
   Menu data (transcribed from the in-store menu boards)
   --------------------------------------------------------- */
const MENU = [
  {
    id: "coffee", label: "Coffee", icon: "coffee",
    groups: [
      {
        title: "Ube Series", note: "New favourites",
        items: [
          { name: "Ube Latte", badge: "New", desc: "Creamy milk and authentic ube halaya, topped with ube cloud foam.", prices: ["215"] },
          { name: "Dirty Ube Latte", badge: "New", desc: "Sagada Arabica, authentic ube halaya and ube cloud foam.", prices: ["245"] },
        ],
      },
      {
        title: "Coffee", cols: ["Hot 8|12oz", "Iced 16|22oz"],
        items: [
          { name: "Americano", prices: ["100 | 120", "130 | 160"] },
          { name: "Cafe Latte", prices: ["110 | 130", "140 | 170"] },
          { name: "Cafe Mocha", prices: ["110 | 130", "140 | 170"] },
          { name: "Cappuccino", prices: ["120 | 140", "140 | 160"] },
          { name: "Caramel Macchiato", prices: ["130 | 150", "160 | 190"] },
          { name: "French Latte", prices: ["130 | 150", "160 | 190"] },
          { name: "Macadamia Latte", prices: ["130 | 150", "160 | 190"] },
          { name: "Spanish Latte", prices: ["130 | 150", "160 | 190"] },
          { name: "White Chocolate Mocha", prices: ["135 | 155", "165 | 195"] },
        ],
      },
    ],
  },
  {
    id: "drinks", label: "Shakes & Drinks", icon: "cup-soda", photo: "playlist-drinks.-5.jpg",
    groups: [
      {
        title: "Milkshakes", cols: ["16 | 22oz"],
        items: [
          { name: "Strawberry Shortcake", prices: ["145 | 165"] },
          { name: "Blueberry Cheesecake", prices: ["145 | 165"] },
          { name: "Kiwi Madness", prices: ["145 | 165"] },
          { name: "Pure Vanilla", prices: ["145 | 165"] },
          { name: "Oreo Cookie", prices: ["165 | 185"] },
          { name: "Matcha Green Tea", prices: ["165 | 185"] },
          { name: "Salted Caramel", prices: ["165 | 185"] },
          { name: "Caramel Popcorn", prices: ["165 | 185"] },
        ],
      },
      {
        title: "Other Beverages",
        items: [
          { name: "Canned Soda", prices: ["70"] },
          { name: "Canned Pineapple Juice", prices: ["70"] },
          { name: "Stellina Lemonade", prices: ["90"] },
          { name: "SOLA Iced Tea", desc: "Bottled / Canned", prices: ["90 | 60"] },
          { name: "Bottled Water", prices: ["45"] },
        ],
      },
    ],
  },
  {
    id: "breakfast", label: "All-Day Breakfast", icon: "egg", photo: "images/menu/breakfast.jpg",
    groups: [
      {
        title: "All-Day Breakfast", note: "Served with egg, garlic rice and iced tea",
        items: [
          { name: "Pork Belly Sisig", prices: ["260"] },
          { name: "S. Fried Chicken", prices: ["260"] },
          { name: "Daing na Bangus", prices: ["230"] },
          { name: "Beef Tapa", prices: ["230"] },
          { name: "Gourmet Longganisa", desc: "Choice of hamonado or garlic", prices: ["230"] },
          { name: "Corned Beef", prices: ["220"] },
          { name: "Tocino", prices: ["220"] },
        ],
      },
      {
        title: "Extras",
        items: [
          { name: "White Rice", prices: ["40"] },
          { name: "Fried Rice", prices: ["50"] },
          { name: "Mashed Potato", prices: ["60"] },
          { name: "Garlic Bread", prices: ["40"] },
        ],
      },
    ],
  },
  {
    id: "mains", label: "Top Hits", icon: "star", photo: "images/menu/salpicao.jpg",
    groups: [
      {
        title: "Soloista", note: "Solo plates with mashed potato or rice",
        items: [
          { name: "T-bone Steak", desc: "Half-pound T-bone, pan-grilled in butter, with mushroom gravy.", prices: ["390"] },
          { name: "Roast Beef", desc: "Fresh beef sirloin, oven-roasted, with mushroom sauce.", prices: ["390"] },
          { name: "Beef Salpicao", desc: "Marinated cubed sirloin with garlic, Worcestershire and olive oil.", prices: ["390"] },
          { name: "Salisbury Steak", desc: "Well-seasoned ground beef simmered in mushroom sauce.", prices: ["390"] },
          { name: "Creamy Garlic Lemon Chicken", desc: "Chicken breast in lemon garlic cream sauce, with rice pilaf.", prices: ["380"] },
          { name: "Pan-crusted Fish Fillet", desc: "Golden fillet with classic tartar sauce and rice pilaf.", prices: ["350"] },
        ],
      },
      {
        title: "Le Familia", note: "Sharing plates, good for 3–4 pax",
        items: [
          { name: "Crispy Pata", desc: "Deep-fried pork knuckles with soy-vinegar dip.", prices: ["780"] },
          { name: "Signature Fried Chicken", desc: "Golden-brown deep-fried whole chicken.", prices: ["580"] },
          { name: "Crispy Pork Belly in Bagoong", desc: "Slow-cooked pork belly with our traditional bagoong sauce.", prices: ["550"] },
          { name: "Lechon Kawali", prices: ["550"] },
          { name: "Shanghai Rolls", desc: "Ground pork and spices in a crisp spring roll wrapper.", prices: ["280"] },
        ],
      },
    ],
  },
  {
    id: "wings", label: "Wings", icon: "drumstick", photo: "images/menu/wings.jpg",
    groups: [
      {
        title: "On the Wings! of Love",
        items: [
          { name: "½ Dozen", prices: ["280"] },
          { name: "1 Dozen", prices: ["550"] },
          { name: "1 Bucket", desc: "20 pieces", prices: ["880"] },
        ],
        chips: [
          { title: "Flavors", list: ["Wild Buffalo", "Salted Egg", "Garlic Parmesan", "Sweet Soy Sesame", "Southern Style"] },
          { title: "Dips · ₱15 each", list: ["Chili-Lime", "Aioli", "Ranch", "Gravy"] },
        ],
      },
    ],
  },
  {
    id: "bites", label: "Bites & Sandwiches", icon: "sandwich", photo: "images/menu/sandwich.jpg",
    groups: [
      {
        title: "Appetizer Radio",
        items: [
          { name: "Shrimp and Kalabasa Fritters", prices: ["280"] },
          { name: "Playlist Cheeseburger & Fries", prices: ["280"] },
          { name: "Filet-O-Fish Burger", prices: ["280"] },
          { name: "Fish and Chips", prices: ["280"] },
          { name: "Box-Office Cheese Fries", prices: ["280"] },
          { name: "Fil-Mex Nachos", prices: ["220"] },
          { name: "Calamari", prices: ["220"] },
          { name: "Just Fries", prices: ["180"] },
        ],
      },
      {
        title: "Sandwiches", note: "Served with chips, brewed coffee or iced tea",
        items: [
          { name: "Monte Cristo", prices: ["280"] },
          { name: "Classic Club", prices: ["260"] },
          { name: "Chicken Pesto", prices: ["260"] },
          { name: "Ham and Cheese", prices: ["220"] },
        ],
      },
    ],
  },
  {
    id: "pasta", label: "Pasta", icon: "chef-hat", photo: "images/menu/lasagna.jpg",
    groups: [
      {
        title: "Pasta · ₱280 each", note: "Served with garlic bread and iced tea",
        items: [
          { name: "Special Carbonara" },
          { name: "Baked Lasagna" },
          { name: "Baked Penne Pasta" },
          { name: "Pesto – Basil, Garlic & Nuts" },
          { name: "Pesto – Sundried Tomato" },
          { name: "Spaghetti Bolognese" },
          { name: "Shrimp Aglio Olio" },
        ],
      },
    ],
  },
];

const MENU_BOARDS = ["playlist-menu-4.jpg", "playlist-menu.jpg", "playlist-menu-3.jpg", "playlist-menu-2.jpg"];

const GALLERY = {
  a: [
    { src: "playlist-cover-3.jpg", alt: "Sunset over the Metro Manila skyline", ar: "1/1" },
    { src: "playlist-drinks.-3.jpg", alt: "Matcha drink held up to the sky", ar: "4/5" },
    { src: "playlist-highlighted.jpg", alt: "Live acoustic duo performing", ar: "4/3" },
    { src: "playlist-food.jpg", alt: "Chocolate chip cookies with coffee", ar: "4/5" },
    { src: "playlist-cover-2.jpg", alt: "Guests on the terrace at sunset", ar: "4/3" },
    { src: "playlist-drinks.-5.jpg", alt: "Four milkshakes lined up", ar: "1/1" },
  ],
  b: [
    { src: "playlist-building.jpg", alt: "Playlist Cafe building lit up at dusk", ar: "3/4" },
    { src: "playlist-highlighted-4.jpg", alt: "Proposal set-up with city lights", ar: "8/7" },
    { src: "playlist-drinks.-2jpg.jpg", alt: "Hot coffee in Playlist Cafe cups", ar: "4/5" },
    { src: "playlist-highlighted-2.jpg", alt: "Couple watching the sunset", ar: "1/1" },
    { src: "playlist-drinks.jpg", alt: "Ube lattes", ar: "4/5" },
    { src: "playlist-cover.jpg", alt: "Candle-lit table for two", ar: "2/3" },
    { src: "playlist-drinks.-4.jpg", alt: "Iced coffees in front of the cafe", ar: "1/1" },
  ],
};

/* ---------------------------------------------------------
   Smooth scroll (Lenis)
   --------------------------------------------------------- */
let lenis = null;
if (window.Lenis && !REDUCED) {
  lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true });
  if (HAS_GSAP) {
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
}
const lockScroll = (on) => {
  document.body.classList.toggle("is-locked", on);
  if (lenis) on ? lenis.stop() : lenis.start();
};
const scrollToTarget = (target) => {
  if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4 });
  else (typeof target === "number" ? window.scrollTo({ top: target }) : target.scrollIntoView());
};

/* ---------------------------------------------------------
   Nav, mobile menu, anchors, progress
   --------------------------------------------------------- */
function initNav() {
  const nav = $("#nav");
  const toggle = $("#navToggle");
  const mobile = $("#mobileMenu");
  const toTop = $("#toTop");
  const ring = $("#toTopRing");
  const RING = 138.2;
  let lastY = 0;

  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? y / max : 0;

    nav.classList.toggle("is-scrolled", y > 30);
    nav.classList.toggle("is-hidden", y > window.innerHeight && y > lastY && mobile.hidden);
    lastY = y;

    toTop.classList.toggle("is-visible", y > window.innerHeight * 0.8);
    ring.style.strokeDashoffset = RING * (1 - p);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setMenu = (open) => {
    mobile.hidden = !open;
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    lockScroll(open);
    if (open && HAS_GSAP && !REDUCED) {
      gsap.from($$("#mobileMenu nav a"), { yPercent: 60, opacity: 0, stagger: 0.06, duration: 0.6, ease: "power3.out" });
    }
  };
  toggle.addEventListener("click", () => setMenu(mobile.hidden));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !mobile.hidden) setMenu(false); });

  // all in-page anchors go through smooth scroll
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (id === "#main" || id.length < 2) return;
    const target = id === "#top" ? 0 : $(id);
    if (target === null) return;
    e.preventDefault();
    if (!mobile.hidden) setMenu(false);
    scrollToTarget(target);
  });

  // active link highlight
  const links = $$("#navLinks a");
  const spy = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${en.target.id}`));
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  links.forEach((l) => { const s = $(l.getAttribute("href")); if (s) spy.observe(s); });
}

/* ---------------------------------------------------------
   Live status: Manila clock, open/closed, today's day
   --------------------------------------------------------- */
function initStatus() {
  const fmtTime = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Manila", hour: "numeric", minute: "2-digit" });
  const fmtParts = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Manila", hour: "numeric", hourCycle: "h23", weekday: "short" });
  const DAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  const update = () => {
    const now = new Date();
    const parts = Object.fromEntries(fmtParts.formatToParts(now).map((p) => [p.type, p.value]));
    const hour = Number(parts.hour);
    const open = hour >= 10; // 10:00 AM – 12:00 MN

    $("#manilaTime").textContent = fmtTime.format(now);
    const status = $("#openStatus");
    status.textContent = open ? "Open now · until 12 midnight" : "Closed · opens 10am";
    status.classList.toggle("is-open", open);

    $$("[data-status-dot]").forEach((d) => { d.classList.toggle("is-open", open); d.classList.toggle("is-closed", !open); });
    $$("[data-status-short]").forEach((el) => (el.textContent = open ? "Open now" : "Closed now"));

    const badge = $("#hoursBadge");
    badge.textContent = open ? "Open now" : "Closed now";
    badge.classList.toggle("is-open", open);
    badge.classList.toggle("is-closed", !open);

    $$("#hoursDays li").forEach((li) => li.classList.toggle("is-today", Number(li.dataset.day) === DAYS[parts.weekday]));
  };
  update();
  setInterval(update, 30 * 1000);
}

/* ---------------------------------------------------------
   Menu highlights filter
   --------------------------------------------------------- */
function initFilters() {
  const buttons = $$(".filter");
  const dishes = $$("#bento .dish");

  buttons.forEach((btn) => btn.addEventListener("click", () => {
    const f = btn.dataset.filter;
    buttons.forEach((b) => { b.classList.toggle("is-active", b === btn); b.setAttribute("aria-pressed", b === btn); });

    const show = dishes.filter((d) => f === "all" || d.dataset.cat === f);
    dishes.forEach((d) => d.classList.toggle("is-filtered", !show.includes(d)));

    if (HAS_GSAP && !REDUCED) {
      gsap.fromTo(show, { opacity: 0, y: 30, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.05, ease: "power3.out", overwrite: true });
      ScrollTrigger.refresh();
    }
  }));
}

/* ---------------------------------------------------------
   Full menu drawer
   --------------------------------------------------------- */
function renderGroup(g) {
  const cols = g.cols ? `<div class="mgroup__cols">${g.cols.map((c) => `<span>${esc(c)}</span>`).join("")}</div>` : "";
  const items = g.items.map((it) => `
    <li class="mitem">
      <div class="mitem__main">
        <span class="mitem__name">${esc(it.name)}</span>${it.badge ? `<span class="mbadge">${esc(it.badge)}</span>` : ""}
        ${it.desc ? `<span class="mitem__desc">${esc(it.desc)}</span>` : ""}
      </div>
      <div class="mitem__prices">${(it.prices || []).map((p) => `<span><small>₱</small>${esc(p)}</span>`).join("")}</div>
    </li>`).join("");
  const chips = (g.chips || []).map((c) => `
    <p class="mgroup__note" style="margin-top:20px">${esc(c.title)}</p>
    <div class="mchips">${c.list.map((x) => `<span>${esc(x)}</span>`).join("")}</div>`).join("");

  return `<section class="mgroup">
    <div class="mgroup__head"><h3>${esc(g.title)}</h3>${cols}</div>
    ${g.note ? `<p class="mgroup__note">${esc(g.note)}</p>` : ""}
    <ul>${items}</ul>${chips}
  </section>`;
}

function initDrawer() {
  const drawer = $("#drawer");
  const tabs = $("#drawerTabs");
  const body = $("#drawerBody");
  let lastFocus = null;

  tabs.innerHTML = MENU.map((c) =>
    `<button class="drawer__tab" role="tab" id="dtab-${c.id}" data-id="${c.id}" aria-selected="false"><i data-lucide="${c.icon}"></i>${esc(c.label)}</button>`
  ).join("");

  const show = (id) => {
    const cat = MENU.find((c) => c.id === id) || MENU[0];
    $$(".drawer__tab", tabs).forEach((t) => t.setAttribute("aria-selected", t.dataset.id === cat.id));
    body.setAttribute("aria-labelledby", `dtab-${cat.id}`);
    body.innerHTML = (cat.photo ? `<figure class="mphoto"><img src="${cat.photo}" alt=""></figure>` : "") + cat.groups.map(renderGroup).join("");
    body.scrollTop = 0;
    const active = $(`#dtab-${cat.id}`);
    active.scrollIntoView({ block: "nearest", inline: "center" });
    icons();
  };

  const open = (id) => {
    lastFocus = document.activeElement;
    drawer.hidden = false;
    drawer.classList.remove("is-closing");
    lockScroll(true);
    show(id);
    $(".drawer__head .icon-btn", drawer).focus();
  };
  const close = () => {
    drawer.classList.add("is-closing");
    setTimeout(() => { drawer.hidden = true; drawer.classList.remove("is-closing"); }, REDUCED ? 0 : 380);
    lockScroll(false);
    if (lastFocus) lastFocus.focus();
  };

  tabs.addEventListener("click", (e) => { const t = e.target.closest(".drawer__tab"); if (t) show(t.dataset.id); });
  tabs.addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const all = $$(".drawer__tab", tabs);
    const i = all.indexOf(document.activeElement);
    if (i < 0) return;
    const next = all[(i + (e.key === "ArrowRight" ? 1 : -1) + all.length) % all.length];
    next.focus(); show(next.dataset.id);
  });
  drawer.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !drawer.hidden) close(); });

  $$("[data-open]").forEach((el) => el.addEventListener("click", () => open(el.dataset.open)));
}

/* ---------------------------------------------------------
   Gallery reels + lightbox
   --------------------------------------------------------- */
function initGalleryAndLightbox() {
  const box = $("#lightbox");
  const img = $("#lbImg");
  const count = $("#lbCount");
  let list = [], index = 0, lastFocus = null;

  const render = () => {
    img.src = list[index].src;
    img.alt = list[index].alt;
    count.textContent = `${index + 1} / ${list.length}`;
    const multi = list.length > 1;
    $("#lbPrev").hidden = !multi;
    $("#lbNext").hidden = !multi;
  };
  const open = (items, start) => {
    list = items; index = start; lastFocus = document.activeElement;
    render(); box.hidden = false; lockScroll(true); $("#lbClose").focus();
  };
  const close = () => { box.hidden = true; lockScroll(false); if (lastFocus) lastFocus.focus(); };
  const step = (d) => { index = (index + d + list.length) % list.length; render(); };

  $("#lbClose").addEventListener("click", close);
  $("#lbPrev").addEventListener("click", () => step(-1));
  $("#lbNext").addEventListener("click", () => step(1));
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  // reels: render each set twice so the CSS marquee loops seamlessly
  const all = [...GALLERY.a, ...GALLERY.b];
  const build = (el, items, offset) => {
    const html = (copy) => items.map((it, i) => `
      <button class="reel__item" style="--ar:${it.ar}" data-i="${offset + i}" ${copy ? 'aria-hidden="true" tabindex="-1"' : `aria-label="View photo: ${esc(it.alt)}"`}>
        <img src="${it.src}" alt="" loading="lazy">
      </button>`).join("");
    el.innerHTML = html(false) + html(true);
    el.addEventListener("click", (e) => { const b = e.target.closest(".reel__item"); if (b) open(all, Number(b.dataset.i)); });
  };
  build($("#reelA"), GALLERY.a, 0);
  build($("#reelB"), GALLERY.b, GALLERY.a.length);

  $("#viewBoards").addEventListener("click", () =>
    open(MENU_BOARDS.map((src, i) => ({ src, alt: `Playlist Cafe menu board ${i + 1}` })), 0));
}

/* ---------------------------------------------------------
   Motion (GSAP)
   --------------------------------------------------------- */
function introAnim() {
  if (!HAS_GSAP || REDUCED) return;
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.from("[data-intro]", { y: 24, opacity: 0, duration: 0.9, stagger: 0.08 })
    .from("[data-intro-visual] .intro__photo:first-child", { opacity: 0, scale: 0.97, duration: 1.1 }, 0.1)
    .from("[data-intro-visual] .intro__photo--small", { y: 30, opacity: 0, duration: 0.9 }, 0.4)
    .from("[data-intro-visual] .status-card", { y: 20, opacity: 0, duration: 0.8 }, 0.55)
    .from("[data-intro-visual] .est-badge", { scale: 0.6, opacity: 0, duration: 0.8, ease: "back.out(1.6)" }, 0.6);
}

function initMotion() {
  if (!HAS_GSAP || REDUCED) return;
  gsap.registerPlugin(ScrollTrigger);

  // generic reveals
  gsap.set("[data-reveal]", { y: 40, opacity: 0 });
  ScrollTrigger.batch("[data-reveal]", {
    start: "top 88%",
    once: true,
    onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "power3.out" }),
  });

  // image clip reveals
  $$("[data-clip]").forEach((el) => {
    gsap.fromTo(el,
      { clipPath: "inset(100% 0% 0% 0% round 28px)" },
      { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.4, ease: "power4.inOut", scrollTrigger: { trigger: el, start: "top 85%" } });
  });

  // parallax images
  $$("[data-speed]").forEach((el) => {
    gsap.to(el, { yPercent: Number(el.dataset.speed), ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
  });

  // statement: words light up as you scroll
  const st = $("#statement");
  st.innerHTML = st.textContent.trim().split(/\s+/).map((w) => `<span class="word">${esc(w)}</span>`).join(" ");
  gsap.to($$(".word", st), {
    opacity: 1, stagger: 0.1, ease: "none",
    scrollTrigger: { trigger: st, start: "top 80%", end: "bottom 40%", scrub: true },
  });

  // counters
  $$("[data-count]").forEach((el) => {
    const end = Number(el.dataset.count);
    const from = end > 1000 ? end - 30 : 0;
    const obj = { v: from };
    el.textContent = from;
    gsap.to(obj, {
      v: end, duration: 1.8, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => (el.textContent = Math.round(obj.v)),
    });
  });

  // now playing: vinyl slides out of its sleeve
  gsap.fromTo("#npVinyl", { xPercent: -32 }, {
    xPercent: 0, ease: "power2.out",
    scrollTrigger: { trigger: ".np", start: "top 75%", end: "center center", scrub: 1 },
  });
  gsap.from(".np__cover", { rotate: -6, scale: 0.9, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".np", start: "top 70%" } });

  // bento cards
  gsap.set("#bento .dish", { y: 60, opacity: 0 });
  ScrollTrigger.batch("#bento .dish", {
    start: "top 92%", once: true,
    onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "power3.out" }),
  });

  // footer wordmark fills in as you scroll
  gsap.to(".footer__word", { backgroundSize: "100% 100%", ease: "none", scrollTrigger: { trigger: ".footer__word", start: "top 95%", end: "bottom 70%", scrub: true } });
  gsap.from(".footer__title", { y: 60, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".footer", start: "top 80%" } });

  window.addEventListener("load", () => ScrollTrigger.refresh());
}

/* ---------------------------------------------------------
   Boot
   --------------------------------------------------------- */
$("#year").textContent = new Date().getFullYear();
icons();
initNav();
initStatus();
initFilters();
initDrawer();
initGalleryAndLightbox();
initMotion();
introAnim();
