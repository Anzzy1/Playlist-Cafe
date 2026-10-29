import type { ImageMetadata } from "astro";

import acoustic from "../assets/acoustic.jpg";
import building from "../assets/building.jpg";
import candlelit from "../assets/candlelit.jpg";
import cookies from "../assets/cookies.jpg";
import goldenHour from "../assets/golden-hour.jpg";
import hotCoffee from "../assets/hot-coffee.jpg";
import icedCoffee from "../assets/iced-coffee.jpg";
import matcha from "../assets/matcha.jpg";
import milkshakes from "../assets/milkshakes.jpg";
import proposal from "../assets/proposal.jpg";
import skyline from "../assets/skyline.jpg";
import terraceSunset from "../assets/terrace-sunset.jpg";
import ubeLattes from "../assets/ube-lattes.jpg";
import breakfast from "../assets/menu/breakfast.jpg";
import lasagna from "../assets/menu/lasagna.jpg";
import salpicao from "../assets/menu/salpicao.jpg";
import sandwich from "../assets/menu/sandwich.jpg";
import wings from "../assets/menu/wings.jpg";
import board1 from "../assets/boards/board-1.jpg";
import board2 from "../assets/boards/board-2.jpg";
import board3 from "../assets/boards/board-3.jpg";
import board4 from "../assets/boards/board-4.jpg";

export const IMG = {
  acoustic, building, candlelit, cookies, goldenHour, hotCoffee, icedCoffee, matcha,
  milkshakes, proposal, skyline, terraceSunset, ubeLattes, breakfast, lasagna, salpicao, sandwich, wings,
};

/* ---------------------------------------------------------
   Contact & links
   --------------------------------------------------------- */
export const SITE = {
  name: "Playlist Cafe Antipolo",
  phone: "0917 501 8816",
  tel: "tel:+639175018816",
  email: "playlistcafeantipolo@gmail.com",
  address: "Blk 16 Lt 18, Sierra Madre St., Grand Heights Subd., Antipolo, Rizal 1870",
  facebook: "https://www.facebook.com/playlistantipolo/",
  instagram: "https://www.instagram.com/playlistcafeantipolo/",
  maps: "https://www.google.com/maps/place/Playlist+Cafe+Antipolo/@14.576792,121.1612741,17z/data=!4m15!1m8!3m7!1s0x3397c7d506721d87:0xfaee585535a344b0!2sPlaylist+Cafe+Antipolo!8m2!3d14.5767551!4d121.1613602!10e1!16s%2Fg%2F11rgcqfll9!3m5!1s0x3397c7d506721d87:0xfaee585535a344b0!8m2!3d14.5767551!4d121.1613602!16s%2Fg%2F11rgcqfll9?entry=ttu&g_ep=EgoyMDI2MTAyNy4wIKXMDSoASAFQAw%3D%3D",
  mapEmbed: "https://maps.google.com/maps?q=Playlist%20Cafe%20Antipolo%4014.5767551,121.1613602&z=16&output=embed",
};

export const NAV = [
  { href: "#about", label: "About" },
  { href: "#menu", label: "Menu" },
  { href: "#experience", label: "Experience" },
  { href: "#gallery", label: "Gallery" },
  { href: "#visit", label: "Visit" },
];

/* ---------------------------------------------------------
   Full menu (transcribed from the in-store menu boards)
   --------------------------------------------------------- */
export type MenuCol = { label: string; size: string };
export type MenuItem = { name: string; badge?: string; desc?: string; prices?: string[] };
export type MenuGroup = {
  title: string;
  note?: string;
  cols?: MenuCol[];
  items: MenuItem[];
  chips?: { title: string; list: string[] }[];
};
export type MenuCategory = { id: string; label: string; icon: string; photo?: ImageMetadata; groups: MenuGroup[] };

export const MENU: MenuCategory[] = [
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
        title: "Coffee", cols: [{ label: "Hot", size: "8 | 12oz" }, { label: "Iced", size: "16 | 22oz" }],
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
    id: "drinks", label: "Shakes & Drinks", icon: "cup-soda", photo: milkshakes,
    groups: [
      {
        title: "Milkshakes", cols: [{ label: "Size", size: "16 | 22oz" }],
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
    id: "breakfast", label: "All-Day Breakfast", icon: "egg", photo: breakfast,
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
    id: "mains", label: "Top Hits", icon: "star", photo: salpicao,
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
    id: "wings", label: "Wings", icon: "drumstick", photo: wings,
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
    id: "bites", label: "Bites & Sandwiches", icon: "sandwich", photo: sandwich,
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
    id: "pasta", label: "Pasta", icon: "chef-hat", photo: lasagna,
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

export const MENU_BOARDS = [board1, board2, board3, board4];

/* ---------------------------------------------------------
   Menu highlights (bento on desktop, swipe cards on mobile)
   --------------------------------------------------------- */
export type Dish = {
  cat: "coffee" | "drinks" | "food";
  open: string;
  img: ImageMetadata;
  tag: string;
  icon: string;
  name: string;
  desc: string;
  price: string;
  size?: "xl" | "tall" | "wide";
  crop?: boolean;
};

export const DISHES: Dish[] = [
  { cat: "coffee", open: "coffee", img: icedCoffee, icon: "coffee", tag: "Most ordered", name: "Iced Lattes", desc: "Spanish, French, Macadamia & Caramel Macchiato in 16 or 22oz.", price: "from ₱130", size: "xl" },
  { cat: "coffee", open: "coffee", img: ubeLattes, icon: "sparkles", tag: "New", name: "Dirty Ube Latte", desc: "Sagada Arabica meets ube halaya.", price: "₱245", size: "tall", crop: true },
  { cat: "food", open: "breakfast", img: breakfast, icon: "sun", tag: "All-day breakfast", name: "Beef Tapa & more", desc: "With egg, garlic rice & iced tea.", price: "from ₱220" },
  { cat: "drinks", open: "drinks", img: milkshakes, icon: "cup-soda", tag: "Milkshakes", name: "Oreo, Salted Caramel & more", desc: "8 flavors in 16 or 22oz.", price: "from ₱145", crop: true },
  { cat: "food", open: "mains", img: salpicao, icon: "star", tag: "Top hits", name: "Beef Salpicao", desc: "Garlicky cubed sirloin with mashed potato or rice.", price: "₱390", size: "wide" },
  { cat: "food", open: "wings", img: wings, icon: "drumstick", tag: "Wings", name: "On the Wings! of Love", desc: "5 flavors, from Salted Egg to Wild Buffalo.", price: "from ₱280" },
  { cat: "drinks", open: "drinks", img: matcha, icon: "leaf", tag: "Matcha", name: "Matcha Green Tea", desc: "Earthy, creamy, made for sunny days.", price: "from ₱165" },
  { cat: "food", open: "pasta", img: lasagna, icon: "chef-hat", tag: "Pasta", name: "Baked Lasagna & more", desc: "With garlic bread & iced tea.", price: "₱280" },
  { cat: "food", open: "bites", img: sandwich, icon: "sandwich", tag: "Sandwiches", name: "Monte Cristo & Club", desc: "With chips and coffee or iced tea.", price: "from ₱220" },
  { cat: "coffee", open: "coffee", img: hotCoffee, icon: "coffee", tag: "Hot coffee", name: "Americano to Mocha", desc: "9 classics in 8 or 12oz.", price: "from ₱100", size: "wide" },
];

export const MOMENTS = [
  { img: goldenHour, alt: "Couple watching the sunset", icon: "sunset", title: "Golden hour", text: "Grab a seat by the railing. The sun sets right behind the Manila skyline." },
  { img: acoustic, alt: "Live acoustic duo performing", icon: "mic", title: "Acoustic nights", text: "Local artists, warm lights and a view that sounds as good as it looks." },
  { img: proposal, alt: "Proposal set-up overlooking the city lights", icon: "gem", title: "Proposals & celebrations", text: "Planning a big question or an anniversary? Call us and we'll help set the scene." },
  { img: candlelit, alt: "Candle-lit table for two with city lights", icon: "wine", title: "Candle-lit dinners", text: "When the city lights come on, the cafe becomes one of Antipolo's coziest dinner spots." },
];

export type Photo = { img: ImageMetadata; alt: string; ar: string };

export const GALLERY: { a: Photo[]; b: Photo[] } = {
  a: [
    { img: skyline, alt: "Sunset over the Metro Manila skyline", ar: "1/1" },
    { img: matcha, alt: "Matcha drink held up to the sky", ar: "4/5" },
    { img: acoustic, alt: "Live acoustic duo performing", ar: "4/3" },
    { img: cookies, alt: "Chocolate chip cookies with coffee", ar: "4/5" },
    { img: terraceSunset, alt: "Guests on the terrace at sunset", ar: "4/3" },
    { img: milkshakes, alt: "Four milkshakes lined up", ar: "1/1" },
  ],
  b: [
    { img: building, alt: "Playlist Cafe building lit up at dusk", ar: "3/4" },
    { img: proposal, alt: "Proposal set-up with city lights", ar: "8/7" },
    { img: hotCoffee, alt: "Hot coffee in Playlist Cafe cups", ar: "4/5" },
    { img: goldenHour, alt: "Couple watching the sunset", ar: "1/1" },
    { img: ubeLattes, alt: "Ube lattes", ar: "4/5" },
    { img: candlelit, alt: "Candle-lit table for two", ar: "2/3" },
    { img: icedCoffee, alt: "Iced coffees in front of the cafe", ar: "1/1" },
  ],
};
