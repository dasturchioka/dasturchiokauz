<script setup></script>

<template>
  <main class="main container mx-auto sm:px-0 px-4">
    <div class="main-top flex flex-row items-center pt-12">
      <button class="fill-white text-white text-3xl" @click="$router.go(-1)">
        <p>&#8592;</p>
      </button>
      <h1 class="title text-[28px] font-bold font-mont text-white mt-2 ml-4">
        Tweets
      </h1>
    </div>
    <section class="main-tweets mt-10">
      <article class="tweet border-l px-6 py-8 text-white relative">
        <p class="tweet-date font-dmMono opacity-50 mb-3">07/03/2022 21:00</p>
        <p class="tweet-main font-mont leading-normal text-3xl">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto
          repudiandae vel dolores amet molestiae cumque perspiciatis officia
          pariatur natus, similique ullam sit recusandae ab sapiente?
        </p>
        <div class="article-down flex flex-row items-center space-x-4 mt-6">
          <button class="text-xl">
            <Heart class="text-white fill-white w-5 h-5" />
          </button>
          <button class="text-xl">
            <Share class="text-white fill-white w-5 h-5" />
          </button>
        </div>
      </article>
      <article class="tweet border-l px-6 py-8 text-white relative">
        <p class="tweet-date font-dmMono opacity-50 mb-3">07/03/2022 21:00</p>
        <p class="tweet-main font-mont leading-normal text-2xl">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto
          repudiandae vel dolores amet molestiae cumque perspiciatis officia
          pariatur natus, similique ullam sit recusandae ab sapiente?
        </p>
        <div class="article-down flex flex-row items-center space-x-4 mt-6">
          <button class="text-xl">
            <Heart class="text-white fill-white w-5 h-5" />
          </button>
          <button class="text-xl">
            <Share class="text-white fill-white w-5 h-5" />
          </button>
        </div>
      </article>
      <article class="tweet border-l px-6 py-8 text-white relative">
        <p class="tweet-date font-dmMono opacity-50 mb-3">07/03/2022 21:00</p>
        <p class="tweet-main font-mont leading-normal text-3xl">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto
          repudiandae vel dolores amet molestiae cumque perspiciatis officia
          pariatur natus, similique ullam sit recusandae ab sapiente?
        </p>
        <div class="article-down flex flex-row items-center space-x-4 mt-6">
          <button class="text-xl">
            <Heart class="text-white fill-white w-5 h-5" />
          </button>
          <button class="text-xl">
            <Share class="text-white fill-white w-5 h-5" />
          </button>
        </div>
      </article>
    </section>
  </main>
</template>
<style scoped>
@media (max-width: 572px) {
  .tweet-main {
    font-size: 20px;

    line-height: 34px;
  }
}
.tweet::before {
  content: "";
  position: absolute;
  left: -4.3px;
  top: 0;
  width: 8px;
  height: 8px;
  border-radius: 99px;
  background: #fff;
  z-index: 3;
}
</style>
