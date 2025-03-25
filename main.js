document.addEventListener("DOMContentLoaded", () => {
  const logo = document.getElementById("logo");
  const loaderContainer = document.getElementById("loader-container");

  // Адаптивные настройки анимации
  const startScale = window.innerWidth < 400 ? 2 : 3;
  const duration = window.innerWidth < 400 ? 1.5 : 1.2;

  // Первоначальная анимация появления логотипа
  const initAnimation = gsap.timeline({
    onComplete: () => {
      startHeartbeatEffect();

      // Анимация исчезновения контейнера загрузки
      gsap.to(loaderContainer, {
        opacity: 0,
        scale: 1.3,
        y: 0,
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => {
          loaderContainer.style.display = "none";
        },
      });
    },
  });

  initAnimation.from(logo, {
    scale: startScale,
    opacity: 0,
    rotation: 10 * Math.sin(window.innerWidth / 500),
    duration: duration,
    ease: "elastic.out(0.8, 0.6)",
    delay: 0.2,
  });

  function startHeartbeatEffect() {
    const heartbeatTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
    });

    heartbeatTimeline
      .to(logo, {
        scale: 1.1,
        opacity: 1,
        duration: 0.3,
        ease: "power1.inOut",
      })
      .to(logo, {
        scale: 1,
        opacity: 0.9,
        duration: 0.3,
        ease: "power1.inOut",
      });
  }
});
