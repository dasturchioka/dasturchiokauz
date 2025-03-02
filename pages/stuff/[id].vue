<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useStuffStore } from '~/stores/stuff'

const route = useRoute()
const stuffStore = useStuffStore()

const { stuff } = storeToRefs(stuffStore)

const currentStuff = computed(() => {
	return stuff.value.find(s => s.id === route.params.id)
})

definePageMeta({
	layout: 'default',
})

useHead({
	title() {
		return currentStuff.value?.title || 'Stuff'
	},
	link: [
		{
			rel: 'canonical',
			href() {
				return `https://dasturchioka.uz/stuff/${route.params.id}`
			},
		},
	],

	meta: [
		{ name: 'robots', content: 'index, follow' },
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{
			key: 'description',
			name: 'description',
			content: computed(() => currentStuff.value?.shortDescription || 'Stuff'),
		},
		{
			key: 'og:title',
			property: 'og:title',
			content: computed(() => currentStuff.value?.title || 'Stuff'),
		},
		{
			key: 'og:description',
			property: 'og:description',
			content: computed(() => currentStuff.value?.shortDescription || 'Stuff'),
		},
		{
			key: 'og:image',
			property: 'og:image',
			content: computed(() => currentStuff.value?.img || '/images/profile4.jpg'),
		},
		{
			key: 'og:url',
			property: 'og:url',
			content: computed(() => `https://dasturchioka.uz/stuff/${route.params.id}`),
		},
	],
})
useSeoMeta({
	title: computed(() => currentStuff.value?.title || 'Stuff'),
	description: computed(() => currentStuff.value?.shortDescription || 'Stuff'),
	ogTitle: computed(() => currentStuff.value?.title || 'Stuff'),
	ogDescription: computed(() => currentStuff.value?.shortDescription || 'Stuff'),
	ogImage: computed(
		() =>
			currentStuff.value?.img ||
			'https://www.dasturchioka.uz/_vercel/image?url=%2Fimages%2Fprofile1.jpg&w=1536&q=100'
	),
	ogUrl: computed(() => `https://dasturchioka.uz/stuff/${route.params.id}`),
	author: 'Sardor Aminov, Dasturchioka',
	robots: 'index, follow',
	charset: 'utf-8',
})
</script>

<template>
	<div class="text-white h-screen">
		<button
			@click="$router.push('/stuff')"
			class="flex items-center px-4 py-2 rounded-md transition-all text-white hover:bg-zinc-900 sm:my-6 my-4"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-chevron-left mr-2 size-5"
			>
				<path d="m15 18-6-6 6-6" />
			</svg>
			Back
		</button>
		<div v-if="currentStuff" class="stuff w-full">
			<div class="img md:h-[400px] sm:h-[200px] h-[100px] rounded-3xl overflow-hidden w-full">
				<NuxtImg class="w-full h-full object-cover" :src="currentStuff.img" alt="Novda quiz" />
			</div>
			<div class="main">
				<div class="titles my-4">
					<h1 class="font-bold sm:text-4xl text-2xl">{{ currentStuff.title }}</h1>
					<p class="text-sm italic opacity-80 mt-1">{{ currentStuff.shortDescription }}</p>
					<p class="text-lg font-semibold mt-3">{{ currentStuff.longDescription }}</p>
				</div>
				<div class="badges flex gap-1">
					<span
						v-for="badge in currentStuff.badges"
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
				<div class="links my-6 space-y-6">
					<div class="demo">
						<p class="flex items-center space-x-2 font-bold">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-link size-4 mr-2"
							>
								<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
								<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
							</svg>
							Try yourself
						</p>
						<div class="links flex sm:gap-4 gap-2">
							<NuxtLink
								v-for="link in currentStuff.demoLinks"
								:key="link.href"
								:href="link.href"
								class="underline text-wrap"
								target="_blank"
								>{{ link.label }}</NuxtLink
							>
							<div v-if="!currentStuff.demoLinks" class="italic text-sm">
								The project is still on development!
							</div>
						</div>
					</div>
					<div class="source">
						<p class="flex items-center space-x-2 font-bold">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-github size-4 mr-2"
							>
								<path
									d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
								/>
								<path d="M9 18c-4.51 2-5-2-7-2" />
							</svg>
							See codebase
						</p>
						<div class="links flex sm:gap-4 gap-2">
							<NuxtLink
								v-for="link in currentStuff.sourceCodeLinks"
								:key="link.href"
								:href="link.href"
								class="underline"
								target="_blank"
								>{{ link.label }}</NuxtLink
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style></style>
