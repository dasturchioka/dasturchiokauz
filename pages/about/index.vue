<script lang="ts" setup>
definePageMeta({
	layout: 'default',
})

useHead({
	title: 'Dasturchioka | About',
	link: [
		{
			rel: 'canonical',
			href() {
				return `https://dasturchioka.uz/about/`
			},
		},
	],
	script: [
		{
			type: 'application/ld+json',
			children: JSON.stringify({
				'@context': 'https://schema.org',
				'@type': 'AbutPage',
				headline: 'Dasturchioka | About',
				description: 'About Dasturchioka',
				image: '/images/profile4.jpg',
				url: 'https://dasturchioka.uz/about',
			}),
		},
	],
	meta: [
		{ name: 'robots', content: 'index, follow' },
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ key: 'description', name: 'description', content: 'About Dasturchioka, About Sardor Aminov' },
		{ key: 'og:title', property: 'og:title', content: 'Dasturchioka | About' },
		{
			key: 'og:description',
			property: 'og:description',
			content: 'About Dasturchioka, About Sardor Aminov',
		},
		{
			key: 'og:image',
			property: 'og:image',
			content: '/images/profile4.jpg',
		},
		{ key: 'og:url', property: 'og:url', content: 'https://dasturchioka.uz/about' },
	],
})
useSeoMeta({
	title: 'Dasturchioka | About',
	description: `
	Born in 2006, Khorezm, Uzbekistan. My parents saw an earlier self development compared to my peers, so they took me to school at the age of 6. I have already knew reading, writing and do some basic arithmetic at the age of 5.

I was very interested in technologies, especially those mechanical cell phones, old digital cameras, nostalgic desktops and etc. The first game I played has to be GTA Vice City on my poor old desktop.

The motivation to learn foreign languages started to burn when I was 5th grade, and my mom took me to that local teacher to teach me some basic grammar and I didn't stop learning after that. In 2023, I got my first IELTS certificate, 6

I started learning to code back in 2020 in @DATA Ta'lim Stansiyasi taking backend-specialized web development course. Yeah, I was originally backender. After officially graduating the course, I didn't leave my teacher's side and stayed there as an intern assistant mentor. By the time I participated a lot of CRM, LMS projects led by my remarkable teacher Kamron aka

I have been currently working in @CoddyCamp IT Academy as a Mentor since 2024 December. Besides, I do websites and mobile applications from scratch in freelance.

I just started to realise that more you go down deeper into the programming languages, more you start feeling like a real dev. So, I am kind of in the progress of learning  Rust or  Golang.

I use  Arch Linux, btw
	`,
	ogTitle: 'Dasturchioka | About',
	ogDescription: 'Full information about Dasturchioka',
	ogImage: '/images/profile4.jpg',
	ogUrl: 'https://dasturchioka.uz/about',
	author: 'Sardor Aminov, Dasturchioka',
	robots: 'index, follow',
	charset: 'utf-8',
})
</script>

<template>
	<div class="h-screen text-white container sm:w-[800px] mx-auto">
		<h1 class="font-bold sm:text-lg text-base sm:my-8 font-mono my-6">
			About Me <span class="text-[#00a6fb]">.</span>
		</h1>
		<div class="about-wrapper">
			<div class="texts space-y-4 sm:text-lg text-base">
				<p class="flex items-center gap-4 font-semibold">
					<span class="ml-2 hotspot dots-container">
						<span class="hotspot dot1"></span>
						<span class="hotspot dot2"></span>
						<span class="hotspot dot3"></span>
					</span>
					Available for freelance projects
				</p>
				<p>
					Born in 2006, Khorezm, Uzbekistan. My parents saw an earlier self development compared to
					my peers, so they took me to school at the age of 6. I had already known how to read,
					write and do some basic arithmetic at the age of 5.
				</p>
				<p>
					I was very interested in technologies, especially those mechanical cell phones, old
					digital cameras, nostalgic desktops and etc. The first game I played has to be
					<b>GTA Vice City</b> on my poor old desktop.
				</p>
				<p>
					The motivation to learn foreign languages started to burn when I was in 5th grade, and my
					mom took me to a local teacher to teach me some basic grammar. I haven't stopped learning
					since then. In 2023, I got my first <b>IELTS certificate, 6</b>.
				</p>
				<p>
					I started learning to code back in 2020 at
					<a
						class="font-bold underline bg-[#3abff0] rounded px-1"
						target="_blank"
						href="https://www.datatalim.uz/"
						>@DATA Ta'lim Stansiyasi</a
					>, taking a backend-specialized web development course. Yeah, I was originally a
					<b>backender.</b> After officially graduating the course, I stayed as an
					<b>intern assistant mentor</b>. During that time, I participated in a lot of CRM and LMS
					projects led by my remarkable teacher
					<a class="font-bold underline" target="_blank" href="https://t.me/kamrondev">Kamron aka</a
					>.
				</p>
				<p>
					In May 2025, I finished my journey at
					<a
						class="font-bold underline bg-[#ff4f28] rounded px-1"
						target="_blank"
						href="https://coddycamp.uz/"
						>@CoddyCamp IT Academy</a
					>
					where I worked as a mentor. Right after that, I founded my own company —
					<a
						class="font-bold underline bg-blue-700 rounded px-1"
						target="_blank"
						href="https://novdaunion.uz"
						>@Novda Union</a
					>
					— with a talented team of 7, where I currently lead as the founder and tech lead. We work
					with big companies, schools, learning centers and manufacturers — including our first
					partners and sponsors,
					<a
						target="_blank"
						class="font-bold underline bg-red-500 rounded px-1"
						href="https://www.instagram.com/aplusacademy_ielts"
						>@AplusAcademy</a
					>.
				</p>
				<p>
					I just started to realize that the deeper you go into programming languages, the more you
					start feeling like a real dev. Currently, I’m exploring
					<span><i class="devicon-rust-original"></i> Rust </span> and
					<span><i class="devicon-go-plain colored"></i> Golang</span>.
				</p>
				<p>
					I use
					<span>
						<i class="devicon-archlinux-plain colored"></i>
						Arch Linux, btw
					</span>
				</p>
			</div>

			<NuxtMarquee
				:gradient="true"
				:gradient-color="'#090909'"
				:pause-on-hover="true"
				class="flex items-center justify-between mt-4 opacity-50 transition-all hover:opacity-100 cursor-default select-none grayscale hover:grayscale-0"
			>
				<div class="stack-wrapper flex items-center gap-4">
					<div class="stack"><i class="devicon-javascript-plain colored"></i> JavaScript</div>
					<div class="stack"><i class="devicon-typescript-plain colored"></i> TypeScript</div>
					<div class="stack"><i class="devicon-nodejs-plain colored"></i> Node.js</div>
					<div class="stack"><i class="devicon-express-original"></i> Express.js</div>
					<div class="stack"><i class="devicon-nestjs-original colored"></i> Nest.js</div>
					<div class="stack"><i class="devicon-postgresql-plain colored"></i> PostgreSQL</div>
					<div class="stack"><i class="devicon-prisma-original"></i> Prisma</div>
					<div class="stack"><i class="devicon-react-original colored"></i> React.js</div>
					<div class="stack flex gap-1">
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
					<div class="stack"><i class="devicon-svelte-plain colored"></i> Svelte.js</div>
					<div class="stack"><i class="devicon-nextjs-plain"></i> Next.js</div>
					<div class="stack"><i class="devicon-nuxtjs-plain colored"></i> Nuxt.js</div>
					<div class="stack"><i class="devicon-firebase-plain colored"></i> Firebase</div>
					<div class="stack mr-4">
						<i class="devicon-tailwindcss-original colored"></i> TailwindCSS
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
