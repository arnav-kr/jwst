import "./style.css";
import loadModel from "./model.js";
import initAudio from "./audio.js";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});

// prevent right click menu but allow double click to open right click menu
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  e.stopPropagation();
});




const canvas = document.getElementById("model-renderer");
loadModel(canvas);

gsap.registerPlugin(TextPlugin, ScrollTrigger);

gsap.fromTo(
  ".wlcm",
  {
    text: "",
  },
  {
    text: "Welcome Traveller!",
    duration: 2,
    ease: "power1.inOut",
    repeat: 0,
    yoyo: true,
  }
);

gsap.fromTo(".h-t", {
  opacity: 0,
}, {
  opacity: 1,
  duration: 0.35,
  ease: "power1.out",
  repeat: 0,
  yoyo: true,
  scrollTrigger: {
    trigger: ".model",
    start: "top center",
    end: "bottom bottom",
    scrub: 1,
  }
});

gsap.to(".h-sub", {
  text: "Capturing the universe in stunning detail 💫",
  duration: 0.6,
  ease: "power1.out",
  repeat: 0,
  delay: 1,
  yoyo: true,
  scrollTrigger: {
    trigger: ".model",
    start: "top center",
    end: "bottom bottom",
    scrub: 1,
  }
})

gsap.to(".scroll-indicator span", {
  top: "22px",
  duration: 1,
  ease: "out",
  repeat: -1,
});

document.getElementById("scroll").addEventListener("click", () => {
  document.querySelector(".model").scrollIntoView({ behavior: "smooth" });
});

const container = document.querySelector(".images");
const fPanels = gsap.utils.toArray(".images>.wrapper-1 .image");
const bPanels = gsap.utils.toArray(".images>.wrapper-2 .image");

gsap.to(fPanels, {
  x: () => -1 * ((container.scrollWidth - innerWidth) + 16),
  ease: "none",
  scrollTrigger: {
    trigger: ".images",
    pin: true,
    start: "top top",
    scrub: 1,
    end: () => "+=" + (container.scrollWidth - innerWidth),
  }
});

gsap.fromTo(bPanels,
  {
    x: () => -1 * ((container.scrollWidth - innerWidth) + 16),
  },
  {
    x: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".images",
      start: "top top",
      scrub: 1,
      end: () => "+=" + (container.scrollWidth - innerWidth),
    }
  });

initAudio();