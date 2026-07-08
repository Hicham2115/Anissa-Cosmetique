import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis;
}

export function scrollToSection(target: string, offset = -96) {
  if (instance) {
    instance.scrollTo(target, { offset });
    return;
  }
  document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
}
