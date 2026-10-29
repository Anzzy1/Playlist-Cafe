/* Live open/closed status (Manila time) */
import { $$ } from "./dom";

export function initStatus() {
  const fmtHour = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Manila", hour: "numeric", hourCycle: "h23" });

  const update = () => {
    const open = Number(fmtHour.format(new Date())) % 24 >= 10; // 10:00 AM – 12:00 MN
    document.documentElement.dataset.shop = open ? "open" : "closed";
    $$("[data-status-short]").forEach((el) => (el.textContent = open ? "Open now" : "Closed"));
    $$("[data-status-until]").forEach((el) => (el.textContent = open ? "· till 12MN" : "· opens 10AM"));
  };
  update();
  setInterval(update, 60 * 1000);
}
