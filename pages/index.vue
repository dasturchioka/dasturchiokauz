<script setup lang="ts">
useHead({
	title: 'Dasturchioka | Sardor Aminov',
})
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
