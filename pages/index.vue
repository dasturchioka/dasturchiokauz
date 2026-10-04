<script setup lang="ts">
const profileName = "Sardor Aminov";
const profileTitle = "Software Engineer";
const letterInterval = 45;
const letterDuration = 360;
const revealPause = 100;
const iconDuration = 460;

const nameStart = 120;
const titleStart =
  nameStart +
  (profileName.length - 1) * letterInterval +
  letterDuration +
  revealPause;
const telegramStart =
  titleStart +
  (profileTitle.length - 1) * letterInterval +
  letterDuration +
  revealPause;
const linkedinStart = telegramStart + iconDuration + revealPause;
const avatarStart = linkedinStart + iconDuration + revealPause;

const sequenceStyles = {
  "--letter-duration": `${letterDuration}ms`,
  "--icon-duration": `${iconDuration}ms`,
  "--telegram-delay": `${telegramStart}ms`,
  "--linkedin-delay": `${linkedinStart}ms`,
  "--avatar-delay": `${avatarStart}ms`,
};

definePageMeta({
  layout: "default",
});
useHead({
  title: "Dasturchioka | Sardor Aminov",
  meta: [
    { name: "robots", content: "index, follow" },
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      key: "description",
      name: "description",
      content:
        "Sardor Aminov, also known as dasturchioka, fullstack web and mobile developer since 2020, also mentor",
    },
    {
      key: "og:title",
      property: "og:title",
      content: "Dasturchioka | Sardor Aminov",
    },
    {
      key: "og:description",
      property: "og:description",
      content:
        "Sardor Aminov, also known as dasturchioka, fullstack web and mobile developer since 2020, also mentor",
    },
    {
      key: "og:image",
      property: "og:image",
      content:
        "https://www.dasturchioka.uz/_vercel/image?url=%2Fimages%2Fprofile1.jpg&w=1536&q=100",
    },
    { key: "og:url", property: "og:url", content: "https://dasturchioka.uz" },
  ],
});
</script>

<template>
  <div
    class="home-page min-h-svh flex items-center justify-center container mx-auto sm:px-4 px-2 py-12 text-white font-sfpro"
    :style="sequenceStyles"
  >
    <div
      class="text-container flex max-w-full flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-10"
    >
      <div class="img-container avatar-reveal fade-in size-40 shrink-0">
        <NuxtImg
          src="/Sardor-Aminov.png"
          alt="Sardor Aminov"
          width="160"
          height="160"
          loading="eager"
          fetchpriority="high"
          class="grayscale size-full object-cover rounded-full"
        />
      </div>
      <div class="min-w-0">
        <h1
          class="title font-bold text-4xl md:text-6xl tracking-tight"
        >
          <span class="sr-only">{{ profileName }}</span>
          <span aria-hidden="true">
            <span
              v-for="(character, index) in profileName.split('')"
              :key="index"
              class="typing-letter"
              :style="{
                '--letter-delay': `${nameStart + index * letterInterval}ms`,
              }"
            >{{ character }}</span>
          </span>
        </h1>
        <p class="mt-2 md:text-3xl text-xl italic">
          <span class="sr-only">{{ profileTitle }}</span>
          <span aria-hidden="true">
            <span
              v-for="(character, index) in profileTitle.split('')"
              :key="index"
              class="typing-letter"
              :style="{
                '--letter-delay': `${titleStart + index * letterInterval}ms`,
              }"
            >{{ character }}</span>
          </span>
        </p>
        <nav class="mt-4 flex items-center" aria-label="Social profiles">
          <a
            href="https://t.me/dasturchioka"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram — @dasturchioka"
            class="social-link social-link-telegram fade-in pl-0 pr-4"
            style="--fade-delay: var(--telegram-delay)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M9.78 18.65l.28-4.23 7.68-6.93c.34-.31-.07-.46-.52-.19L7.74 13.3l-4.1-1.28c-.88-.28-.9-.88.2-1.32L19.8 4.55c.73-.33 1.43.18 1.15 1.3L18.23 18.65c-.19.91-.74 1.13-1.5.71l-4.14-3.06-1.99 1.94c-.23.23-.42.41-.82.41z"
              />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/dasturchioka/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn — dasturchioka"
            class="social-link social-link-linkedin fade-in pl-2"
            style="--fade-delay: var(--linkedin-delay)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z"
              />
            </svg>
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>
