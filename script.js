(function () {
  const slides = Array.from(document.querySelectorAll(".signal-slide"));
  const carouselButtons = Array.from(document.querySelectorAll("[data-carousel]"));
  let currentSlide = 0;

  function setSlide(index) {
    if (!slides.length) return;
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const isCurrent = slideIndex === currentSlide;
      slide.classList.toggle("is-current", isCurrent);
      slide.setAttribute("aria-hidden", isCurrent ? "false" : "true");
    });
  }

  carouselButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.dataset.carousel === "next" ? 1 : -1;
      setSlide(currentSlide + direction);
    });
  });

  setSlide(0);

  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".site-nav", {
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  });

  gsap.from(".hero h1, .hero-lede, .hero-actions", {
    y: 34,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: "power3.out"
  });

  gsap.from(".hero-portrait img", {
    scale: 0.88,
    opacity: 0,
    duration: 1,
    delay: 0.12,
    ease: "power3.out"
  });

  gsap.utils.toArray(".bento-card, .accordion-panel").forEach((element) => {
    gsap.from(element, {
      y: 42,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 86%",
        once: true
      }
    });
  });

  gsap.utils.toArray(".image-motion").forEach((image) => {
    gsap.fromTo(
      image,
      { scale: 0.8, opacity: 0.58 },
      {
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: image,
          start: "top 88%",
          end: "bottom 18%",
          scrub: true
        }
      }
    );

    gsap.to(image, {
      opacity: 0.2,
      ease: "none",
      scrollTrigger: {
        trigger: image,
        start: "bottom 44%",
        end: "bottom 8%",
        scrub: true
      }
    });
  });

  gsap.utils.toArray(".stack-card").forEach((card, index) => {
    gsap.fromTo(
      card,
      { y: 90, scale: 0.94 },
      {
        y: 0,
        scale: 1 - index * 0.015,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top 92%",
          end: "top 36%",
          scrub: true
        }
      }
    );
  });
})();
