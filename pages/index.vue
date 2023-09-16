<script setup>
definePageMeta({
  name: "page",
});

useHead({
  title: "Dasturchioka | Sardor Aminov",
});
</script>

<template>
  <div class="home-page container mx-auto sm:px-4 px-2 text-white">
    <div class="images h-auto">
      <div class="img">
        <NuxtImg
          class="w-full h-full rounded-2xl object-cover"
          src="/images/profile1.jpg"
          alt="Sardor Aminov, dasturchioka"
        />
      </div>
      <div class="img">
        <NuxtImg
          class="w-full h-full rounded-2xl object-cover"
          src="/images/profile2.png"
          alt="Sardor Aminov, dasturchioka"
        />
      </div>
      <div class="img">
        <NuxtImg
          class="w-full h-full rounded-2xl object-cover"
          src="/images/profile3.jpg"
          alt="Sardor Aminov, dasturchioka"
        />
      </div>
    </div>
    <div class="text-container flex flex-col items-start">
      <div class="top flex flex-col items-start my-8">
        <h1
          class="title font-chaviera font-bold md:text-6xl sm:text-4xl text-3xl text-white"
        >
          Sardor Aminov
        </h1>
        <div
          class="badge rounded-full sm:px-4 sm:py-2 px-2 font-mont sm:text-lg text-sm border border-white w-auto"
        >
          Builder & doer & designer
        </div>
      </div>
      <div class="middle">
        <p class="font-mont md:text-4xl">
          Create elegant things by combining design and logic. Web developer,
          mostly frontender. Amateur trader & young entrepreneur.
        </p>
        <div class="social-media flex items-center space-x-4 mt-8">
          <TelegramIcon />
          <LinkedinLogo />
          <GithubIcon />
          <TwitterLogo />
          <YTLogo />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.images {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(195px, 1fr));
  gap: 15px;
}

.images .img {
  height: 190px;
}

@media (max-width: 768px) {
  .images {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  }

  .images .img {
    height: 140px;
  }
}

@media (max-width: 436px) {
  .images {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }

  .images .img {
    height: 110px;
  }
}

@media (max-width: 350px) {
  .images .img:nth-child(1),
  .images .img:nth-child(2) {
    display: none;
  }

  .images {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  }

  .images .img {
    height: 140px;
  }
}

.images img {
  filter: grayscale(100%);
}
</style>
