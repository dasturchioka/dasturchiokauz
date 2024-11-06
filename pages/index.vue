<script setup lang="ts">
useHead({
	title: 'Dasturchioka | Sardor Aminov',
	meta: [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{
			key: 'description',
			name: 'description',
			content:
				'Sardor Aminov, also known as dasturchioka, is a young Uzbek developer who builds stuff.',
		},
		{ key: 'og:title', property: 'og:title', content: 'Dasturchioka | Sardor Aminov' },
		{
			key: 'og:description',
			property: 'og:description',
			content:
				'Sardor Aminov, also known as dasturchioka, is a young Uzbek developer who builds stuff.',
		},
		{
			key: 'og:image',
			property: 'og:image',
			content:
				'https://www.dasturchioka.uz/_vercel/image?url=%2Fimages%2Fprofile1.jpg&w=1536&q=100',
		},
		{ key: 'og:url', property: 'og:url', content: 'https://dasturchioka.uz' },
	],
})
</script>

<template>
	<div class="home-page container mx-auto sm:px-4 px-2 text-white">
		<div class="images h-auto">
			<div class="img">
				<NuxtImg
					loading="lazy"
					class="w-full h-full rounded-2xl object-cover"
					src="/images/profile1.jpg"
					alt="Sardor Aminov, dasturchioka"
				/>
			</div>
			<div class="img">
				<NuxtImg
					loading="lazy"
					class="w-full h-full rounded-2xl object-cover"
					src="/images/profile3.jpg"
					alt="Sardor Aminov, dasturchioka"
				/>
			</div>
			<div class="img">
				<NuxtImg
					loading="lazy"
					class="w-full h-full rounded-2xl object-cover"
					src="/images/profile4.jpg"
					alt="Sardor Aminov, dasturchioka"
				/>
			</div>
		</div>
		<div class="text-container flex flex-col items-start space-y-2">
			<div class="top flex flex-col items-start my-4">
				<h1 class="title font-chaviera font-bold md:text-6xl mb-2 sm:text-4xl text-4xl text-white">
					Sardor Aminov
				</h1>
				<div
					class="badge rounded-full sm:px-4 sm:py-2 px-2 font-mont text-lg border border-white w-auto"
				>
					18 y.o, Uzbek
				</div>
			</div>
			<div class="middle">
				<p class="font-mont text-3xl">I build stuff.</p>
				<div class="social-media flex items-center space-x-4 mt-8">
					<TelegramIcon />
					<LinkedinLogo />
					<GithubIcon />
					<TwitterLogo />
					<YTLogo />
				</div>
				<a
					href="https://tirikchilik.uz/dasturchioka"
					target="_blank"
					class="font-mont md:text-xl my-6 text-white transition-all hover:underline flex items-center w-full justify-start donation-text"
					><LinkIcon class="mr-2 w-[18px]" />Yo, you got my money on your wallet, give it up now!
				</a>
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
