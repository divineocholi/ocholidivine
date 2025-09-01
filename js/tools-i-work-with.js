
// tools

// Animate on scroll using GSAP
gsap.registerPlugin(ScrollTrigger);

gsap.from(".tools-i-work-with-container", {
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "back.out(1.7)",
  scrollTrigger: {
    trigger: "#tools-i-work-with",
    start: "top 80%",
  }
});

// Subtle floating effect
gsap.to(".tools-i-work-with-container", {
  y: -10,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  stagger: 0.3
});

