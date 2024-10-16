<script lang="ts" setup>
const stuffStore = useStuffStore()

const { stuff } = storeToRefs(stuffStore)

useHead({
	title: 'Dasturchioka | Stuff',
	meta: [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ key: 'description', name: 'description', content: 'My Stuff' },
		{ key: 'og:title', property: 'og:title', content: 'Dasturchioka | Stuff' },
		{ key: 'og:description', property: 'og:description', content: 'My Stuff' },
		{
			key: 'og:image',
			property: 'og:image',
			content:
				'https://www.dasturchioka.uz/_vercel/image?url=%2Fimages%2Fprofile1.jpg&w=1536&q=100',
		},
		{ key: 'og:url', property: 'og:url', content: 'https://dasturchioka.uz/stuff' },
	],
})
</script>

<template>
	<div class="h-screen text-white">
		<h1 class="font-bold sm:text-4xl text-2xl sm:my-8 my-6">My Stuff</h1>
		<div class="stuff-wrapper">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<NuxtLink
					v-for="s in stuff"
					:key="s.id"
					:to="`/stuff/${s.id}`"
					class="card hover:bg-zinc-950 transition-all p-4 bg-zinc-900 rounded-lg"
				>
					<div class="img flex items-center justify-center overflow-hidden">
						<img :src="s.img" class="origin-bottom w-full rounded-xl" :alt="s.title" />
					</div>
					<div class="text-block sm:my-4 my-2">
						<h2 class="sm:text-3xl text-xl font-bold">{{ s.title }}</h2>
						<p>{{ s.shortDescription }}</p>
					</div>
					<div class="badges flex gap-1">
						<span
							v-for="badge in s.badges"
							:key="badge.name"
							:class="[
								badge.name === 'typescript'
									? 'bg-blue-700'
									: badge.name === 'vuejs'
									? 'bg-emerald-600'
									: badge.name === 'nodejs'
									? 'bg-green-700'
									: badge.name === 'postgresql'
									? 'bg-indigo-500'
									: badge.name === 'javascript'
									? 'bg-yellow-500'
									: '',
							]"
							class="rounded px-1 text-sm font-semibold"
							>{{ badge.name }}</span
						>
					</div>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<style></style>
