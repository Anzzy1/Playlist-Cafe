/* Playlist Cafe — interactions & motion */
import { $ } from "./dom";
import { initNav } from "./nav";
import { initStatus } from "./status";
import { initFilters, initSheet } from "./menu";
import { initLightbox } from "./lightbox";
import { initMotion } from "./motion";

$("#year").textContent = String(new Date().getFullYear());
initNav();
initStatus();
initFilters();
initSheet();
initLightbox();
initMotion();
