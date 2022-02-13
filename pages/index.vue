<template>
  <div class="home flex flex-col items-start sm:px-16 px-5 pb-10 min-h-screen">
    <div class="bg"></div>
    <div class="home-titles sm:mt-28 mt-16 mb-10 sm:mb-11">
      <h1
        class="font-mont font-extrabold text-white text-3xl sm:text-6xl mb-3 inline-block"
      >
        <span class="sm:inline hidden">👋</span> Assalomu Alaykum
        <span class="text-green">.</span>
      </h1>
      <div class="links font-dmMono text-sm">
        <a class="text-white font-light" href="https://instagram.com/dasturchioka">instagram</a>
        <span class="text-green">/</span>
        <a class="text-white font-light" href="https://github.com/sardoraminov">github</a>
        <span class="text-green">/</span>
        <a class="text-white font-light" href="https://t.me/dasturchiokauz">telegram</a>
      </div>
    </div>
    <div class="home-content sm:w-4/5">
      <p
        class="text-white font-dm sm:text-3xl text-lg sm:leading-10 leading-7 my-7 font-light"
      >
        Men Sardor Aminov, web dasturchi va UI/UX dizaynerman. 2020-yildan beri
        shu sohalarda faoliyat yuritib kelmoqdaman. Yoshim 16 da. Asli xorazmlik
        bo’lsam ham, hozirda O’zbekistonning poytaxti Toshkent shahrida
        istiqomat qilaman.
      </p>
      <p
        class="text-white font-dm sm:text-3xl text-lg sm:leading-10 leading-7 my-7 font-light"
      >
        Faoliyatim davomida turli xil web saytlar va ularning dizaynlari, smm
        posterlar qilganman. O’quv markazda ma’lum muddat davomida mentor
        sifatida amaliyot o’taganman. Hozirgi kunda
        <a class="text-green transition-colors hover:text-green-opacity" href=""
          >livecoders</a
        >
        milliy online ta’lim platformasining hammuassisiman. JavaScript
        dasturlash tili - asosiy ishlatadigan “qurolim” hisoblanadi. Bu til
        asosiga qurilgan texnologiyalardan Vue, Nuxt va Nodejs lardan ko’proq
        foydalanaman.
      </p>
      <p
        class="text-white font-dm sm:text-3xl text-lg sm:leading-10 leading-7 my-7 font-light"
      >
        Ilmiy kitoblar, dizayn sohasi va video o’yinlarga qiziqishim yuqori.
        Bo’sh vaqtlarimda futbol o’ynab turish yoqadi. O’zini prinsiplariga ega,
        yosh bo’lishiga qaramasdan kelajagi haqida ko’p qayg’uradigan, yangi
        muhitga tez moslasha oladigan, kamtarona hayot tarzini tanlagan oddiy
        yigitlardan biriman.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>

<style>
body {
  background: #111111;
  animation: opacity 2s ease-in-out;
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

h1 {
  animation: glitch 1s linear infinite;
}

@keyframes glitch {
  2%,
  64% {
    transform: translate(2px, 0) skew(0deg);
  }
  4%,
  60% {
    transform: translate(-2px, 0) skew(0deg);
  }
  62% {
    transform: translate(0, 0) skew(5deg);
  }
}

h1::before,
h1::after {
  content: "👋 Assalomu Alaykum ";
  position: absolute;
  left: 0;
}

h1::before {
  animation: glitchTop 1s linear infinite;
  clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
}

@keyframes glitchTop {
  2%,
  64% {
    transform: translate(2px, -2px);
  }
  4%,
  60% {
    transform: translate(-2px, 2px);
  }
  62% {
    transform: translate(13px, -1px) skew(-13deg);
  }
}

h1::after {
  animation: glitchBotom 1.5s linear infinite;
  clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
  -webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
}

@keyframes glitchBotom {
  2%,
  64% {
    transform: translate(-2px, 0);
  }
  4%,
  60% {
    transform: translate(-2px, 0);
  }
  62% {
    transform: translate(-22px, 5px) skew(21deg);
  }
}
</style>
