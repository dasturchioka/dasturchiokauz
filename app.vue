<script setup>
useHead({
  link: [
    { rel: "icon", type: "image/x-icon", href: "../assets/brand.jpg" },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: true,
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@400;500;700&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap",
    },
  ],
});
</script>

<template>
  <div class="grab">
    <div class="bg"></div>
    <transition>
      <div>
        <NuxtPage />
      </div>
    </transition>
  </div>
</template>

<style>
* {
  -webkit-tap-highlight-color: transparent;
}
.page-enter-from {
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
* {
  user-select: none;
}
.grab {
  min-height: 100vh;
  background: #111111;
}
.bg {
  background: transparent url(./assets/noise.png) repeat 0 0;
  background-repeat: repeat;
  animation: bg-animation 0.2s infinite;
  width: 200%;
  height: 200vh;
  position: fixed;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  visibility: visible;
  pointer-events: none;
}

@keyframes bg-animation {
  0% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(-5%, -5%);
  }
  20% {
    transform: translate(-10%, 5%);
  }
  30% {
    transform: translate(5%, -10%);
  }
  40% {
    transform: translate(-5%, 15%);
  }
  50% {
    transform: translate(-10%, 5%);
  }
  60% {
    transform: translate(15%, 0);
  }
  70% {
    transform: translate(0, 10%);
  }
  80% {
    transform: translate(-15%, 0);
  }
  90% {
    transform: translate(10%, 5%);
  }
  100% {
    transform: translate(5%, 0);
  }
}
</style>
