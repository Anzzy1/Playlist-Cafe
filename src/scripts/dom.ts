export const $ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => root.querySelector<T>(s)!;
export const $$ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => [...root.querySelectorAll<T>(s)];

export const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const DESKTOP = window.matchMedia("(min-width: 1024px)");
