<template>
  <div
    class="home flex flex-col items-center justify-center sm:px-16 px-5 pb-10 min-h-screen"
  >
    <div class="bg"></div>
    <div class="home-content mx-3 flex flex-col items-center justify-center">
      <div class="content-img w-72">
        <img
          class="w-full object-cover rounded-full"
          src="../assets/dastrurchi.jpg"
          alt="dasturchioka"
        />
      </div>
      <div class="content-titles text-center mt-6 text-white">
        <h1 class="font-mont text-3xl font-bold">
          Sardor Aminov <span class="text-green">.</span>
        </h1>
        <p class="text-xl mb-3">Dasturchi, mentor, content maker, YouTuber</p>
        <div class="links">
          <a
            target="_blank"
            class="link font-dmMono"
            href="https://t.me/dasturchiokauz"
            >telegram</a
          >
          <span class="text-green">/</span>
          <a
            target="_blank"
            class="link font-dmMono"
            href="https://instagram.com/dasturchioka"
            >instagram</a
          >
          <span class="text-green">/</span>
          <a
            target="_blank"
            class="link font-dmMono"
            href="https://www.youtube.com/channel/UC0gFVZdSnt4gAGsSQE_nlHw"
            >youtube</a
          >
        </div>
        <div class="contact mt-6 border p-4 pb-6">
          <p class="font-dm text-2xl font-bold text-green mb-4">Web-sayt, telegram bot kerakmi?</p>
          <a href="https://t.me/okashettalar_bot" class="bg-green rounded px-4 py-2" target="_blank">Yozib qoldiring</a>
        </div>
        
      </div>
    </div>
    <h1 class="title">DASTURCHIOKA</h1>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  computed: {
    age() {
      const ageInMilliseconds = new Date() - new Date("2006-03-07");
      return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365);
    },
  },
};
</script>

<style>
@media (max-width: 436px) {
  .text-xl {
    font-size: 14px;
    margin-top: 0;
    margin-bottom: 15px;
  }
}

@media (max-width: 314px) {
  .content-img {
    width: 100%;
  }

  h1 span {
    display: none;
  }
}

.home-content {
  z-index: 999;
}
.title {
  font-weight: 700;
  font-size: 80vw;
  line-height: 140px;
  -webkit-text-stroke: 4px;
  -webkit-text-stroke-color: #fff;
  color: #ffffff4a;
  z-index: -99;
  opacity: 0.1;
  position: fixed;
  top: 35%;
  left: 0;
  transform: translateX(20%);
  animation: move 30s linear infinite;
}

@keyframes move {
  to {
    transform: translateX(-100%);
  }
}

body {
  user-select: none;
  overflow-x: hidden;
  background: #111111;
  animation: opacity 2s ease-in-out;
}

*::-webkit-scrollbar {
  display: none;
}

@keyframes opacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
  z-index: -1;
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
