const logo = document.getElementById("logo");
const loaderContainer = document.getElementById("loader-container");

// Рассчитываем время загрузки страницы
const pageLoadTime = Math.max(
  performance.now() - performance.timing.navigationStart,
  0
);
const animationDuration = Math.min(Math.max(pageLoadTime / 1000, 1), 5); // Ограничиваем от 1 до 5 секунд

// Адаптивные настройки анимации
const startScale = window.innerWidth < 400 ? 2 : 3;

// Первоначальная анимация появления логотипа
const initAnimation = gsap.timeline({
  onComplete: () => {
    startHeartbeatEffect();

    // Ждем окончания загрузки страницы перед началом анимации исчезновения контейнера загрузки
    const startAnimation = () => {
      gsap.to(loaderContainer, {
        opacity: 0,
        scale: 1 + Math.log(animationDuration + 1), // Плавное увеличение scale с использованием логарифма
        duration: 3,
        ease: "power3.inOut",
        onComplete: () => {
          loaderContainer.style.display = "none";
        },
      });
    };

    if (document.readyState === "complete") {
      startAnimation();
    } else {
      window.addEventListener("load", startAnimation);
    }
  },
});

initAnimation.from(logo, {
  scale: startScale,
  opacity: 0,
  rotation: 10 * Math.sin(window.innerWidth / 500),
  duration: animationDuration,
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

  // Останавливаем анимацию через время, равное времени загрузки страницы
  const pageLoadTime =
    performance.timing.domContentLoadedEventEnd -
    performance.timing.navigationStart;

  setTimeout(() => {
    heartbeatTimeline.kill();
  }, pageLoadTime);
}
