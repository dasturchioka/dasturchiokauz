<script lang="ts" setup>
definePageMeta({
  layout: "default",
});

useHead({
  title: "Dasturchioka | About",
  link: [
    {
      rel: "canonical",
      href: "https://dasturchioka.uz/about/",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        headline: "About Dasturchioka",
        description:
          "Full biography and professional background of Dasturchioka (Sardor Aminov).",
        image: "https://www.dasturchioka.uz/_vercel/image?url=%2Fimages%2Fprofile1.jpg&w=1536&q=100",
        url: "https://dasturchioka.uz/about",
        author: {
          "@type": "Person",
          name: "Sardor Aminov",
          url: "https://dasturchioka.uz",
        },
      }),
      tagPriority: "low",
    },
  ],
  meta: [
    { name: "robots", content: "index, follow" },
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      key: "description",
      name: "description",
      content:
        "Full biography, career background and expertise of Dasturchioka (Sardor Aminov).",
    },
    { key: "og:title", property: "og:title", content: "Dasturchioka | About" },
    {
      key: "og:description",
      property: "og:description",
      content:
        "Learn more about Dasturchioka (Sardor Aminov), his career, projects and skills.",
    },
    {
      key: "og:image",
      property: "og:image",
      content: "https://www.dasturchioka.uz/_vercel/image?url=%2Fimages%2Fprofile1.jpg&w=1536&q=100",
    },
    {
      key: "og:url",
      property: "og:url",
      content: "https://dasturchioka.uz/about",
    },
  ],
});

useSeoMeta({
  title: "Dasturchioka | About",
  description:
    "Biography and professional background of Sardor Aminov, also known as Dasturchioka. Fullstack web & mobile engineer from Uzbekistan.",
  ogTitle: "Dasturchioka | About",
  ogDescription:
    "Full information about Sardor Aminov (Dasturchioka): career, expertise and projects.",
  ogImage: "https://dasturchioka.uz/images/profile4.jpg",
  ogUrl: "https://dasturchioka.uz/about",
  author: "Sardor Aminov",
  robots: "index, follow",
  charset: "utf-8",
});

const { theme } = useTheme();
</script>

<template>
  <div class="h-screen container sm:w-[800px] mx-auto">
    <div class="toggler sm:my-10 my-4 flex items-center justify-between w-full">
      <h1
        class="font-bold sm:text-lg text-base font-sfpro dark:text-white text-black transition-all"
      >
        About Me <span class="text-[#00a6fb]">.</span>
      </h1>
    </div>

    <div class="about-wrapper font-sfpro">
      <div
        class="texts space-y-4 sm:text-lg text-base dark:text-white text-black"
      >
        <p
          class="flex items-center gap-4 font-semibold dark:text-white text-black transition-all font-sfpro"
        >
          <span class="ml-2 hotspot dots-container">
            <span class="hotspot dot1"></span>
            <span class="hotspot dot2"></span>
            <span class="hotspot dot3"></span>
          </span>
          Open to freelance opportunities
        </p>

      <p>
          I was born in 2006 in Khorezm, Uzbekistan. My parents noticed early
          development compared to my peers, so I began school at the age of six,
          already knowing how to read, write, and perform basic arithmetic.
        </p>

      <p>
          From a young age, I was fascinated by technology — from mechanical
          mobile phones and digital cameras to classic desktop computers. The
          first game I ever played was <b>GTA Vice City</b> on my old desktop.
        </p>

        <p>
          My journey into foreign languages began in the 5th grade, when I
          started learning English. Since then, I have continued improving, and
          in 2023 I earned my first <b>IELTS certificate with a score of 6</b>.
        </p>

        <p>
          I began programming in 2020 at
          <a
            class="font-bold underline text-white bg-[#3abff0] rounded px-1 transition-all"
            target="_blank"
            href="https://www.datatalim.uz/"
          >
            @DATA Ta'lim Stansiyasi </a
          >, where I completed a backend-focused web development program.
          Following my graduation, I remained at the academy as an
          <b>assistant mentor</b>, where I supported the lead instructor in
          teaching students, conducted supplementary online classes, and helped
          organize learning activities. Beyond mentoring, I collaborated closely
          with
          <a
            class="font-bold underline"
            target="_blank"
            href="https://t.me/kamrondev"
          >
            Kamron aka
          </a>
          on numerous large-scale CRM and LMS projects, gaining hands-on
          experience in building production-ready systems while refining both my
          technical and leadership skills.
        </p>

        <p>
          In May 2025, I concluded my time at
          <a
            class="font-bold underline bg-[#ff4f28] text-white rounded px-1 transition-all"
            target="_blank"
            href="https://coddycamp.uz/"
          >
            @CoddyCamp IT Academy </a
          >, where I have worked as a mentor for 6 months. Shortly after, I
          founded my own company with a talented team of seven. Today, I serve
          as the founder and tech lead, collaborating with major organizations,
          schools, learning centers, and manufacturers.
        </p>

        <p>
          The deeper I go into programming, the more I feel connected to the
          craft. Currently, I am exploring
          <span><i class="devicon-rust-original"></i> Rust</span> and
          <span><i class="devicon-go-plain colored"></i> Go</span>.
        </p>

        <p>
          My development environment of choice is
          <span class="dark:text-white text-black transition-all">
            <i class="devicon-archlinux-plain colored"></i>
            Arch Linux </span
          >.
        </p>
      </div>

      <NuxtMarquee
        :pause-on-hover="true"
        class="flex items-center justify-between mt-4 opacity-50 transition-all hover:opacity-100 cursor-default select-none grayscale hover:grayscale-0"
      >
        <div class="stack-wrapper flex items-center gap-4">
          <div class="stack dark:text-white text-black transition-all">
            <i class="devicon-javascript-plain colored"></i> JavaScript
          </div>
          <div class="stack dark:text-white text-black transition-all">
            <i class="devicon-typescript-plain colored"></i> TypeScript
          </div>
          <div class="stack dark:text-white text-black transition-all">
            <i class="devicon-nodejs-plain colored"></i> Node.js
          </div>
          <div class="stack dark:text-white text-black transition-all">
            <i class="devicon-express-original"></i> Express.js
          </div>
          <div class="stack dark:text-white text-black transition-all">
            <i class="devicon-nestjs-original colored"></i> Nest.js
          </div>
          <div class="stack dark:text-white text-black transition-all">
            <i class="devicon-postgresql-plain colored"></i> PostgreSQL
          </div>
          <div class="stack dark:text-white text-black transition-all">
            <i class="devicon-prisma-original"></i> Prisma
          </div>
          <div class="stack dark:text-white text-black transition-all">
            <i class="devicon-react-original colored"></i> React.js
          </div>
          <div
            class="stack flex gap-1 dark:text-white text-black transition-all"
          >
            <svg width="16" viewBox="0 0 128 128">
              <path
                d="M0 8.934l49.854.158 14.167 24.47 14.432-24.47L128 8.935l-63.834 110.14zm126.98.637l-24.36.02-38.476 66.053L25.691 9.592.942 9.572l63.211 107.89zm-25.149-.008l-22.745.168-15.053 24.647L49.216 9.73l-22.794-.168 37.731 64.476zm-75.834-.17l23.002.009m-23.002-.01l23.002.01"
                fill="none"
              ></path>
              <path
                d="M25.997 9.393l23.002.009L64.035 34.36 79.018 9.404 102 9.398 64.15 75.053z"
                fill="#35495e"
              ></path>
              <path
                d="M.91 9.569l25.067-.172 38.15 65.659L101.98 9.401l25.11.026-62.966 108.06z"
                fill="#41b883"
              ></path>
            </svg>
            Vue.js
          </div>
          <div class="stack dark:text-white text-black transition-all">
            <i class="devicon-svelte-plain colored"></i> Svelte.js
          </div>
          <div class="stack dark:text-white text-black transition-all">
            <i class="devicon-nextjs-plain"></i> Next.js
          </div>
          <div class="stack dark:text-white text-black transition-all">
            <i class="devicon-nuxtjs-plain colored"></i> Nuxt.js
          </div>
          <div class="stack dark:text-white text-black transition-all">
            <i class="devicon-firebase-plain colored"></i> Firebase
          </div>
        </div>
      </NuxtMarquee>
    </div>
  </div>
</template>

<style scoped>
.hotspot {
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  transform-origin: 50% 50%;
  border-radius: 50%;
  &.main-wrapper {
    position: absolute;
  }

  &.dots-container {
    position: relative;
  }
  &.dot1 {
    width: 10px;
    height: 10px;
    border: 5px solid #00a6fb;
    background-color: transparent;
    z-index: 1;
    opacity: 0.2;
    animation: dot1 2s infinite;
  }
  &.dot2 {
    width: 10px;
    height: 10px;
    background-color: #00a6fb;
    z-index: 2;
    animation: dot2 2s infinite;
  }
  &.dot3 {
    width: 10px;
    height: 10px;
    background-color: #00a6fb;
    z-index: 3;
    animation: dot3 1s alternate infinite;
  }
}

@keyframes dot1 {
  0% {
    opacity: 0.2;
    transform: translate(-50%, -50%);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(5);
  }
}

@keyframes dot2 {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(2);
  }
}

@keyframes dot3 {
  0% {
    transform: translate(-50%, -50%);
  }
  100% {
    transform: translate(-50%, -50%) scale(1.1);
  }
}
</style>
