<script lang="ts" setup>
import NotionRenderer from '../../components/Renderer/NotionRenderer.vue'

const colorMap: Record<string, string> = {
	default: 'bg-gray-300 text-black',
	gray: 'bg-gray-500 text-white',
	brown: 'bg-yellow-700 text-white',
	orange: 'bg-orange-500 text-white',
	yellow: 'bg-yellow-400 text-black',
	green: 'bg-green-500 text-white',
	blue: 'bg-blue-500 text-white',
	purple: 'bg-purple-500 text-white',
	pink: 'bg-pink-500 text-white',
	red: 'bg-red-500 text-white',
}

const { params } = useRoute()
const { slug } = params

const { data } = await useFetch<any>(`/api/blogs/${slug}`)

useHead({
	title() {
		return data.value.title || 'Blog'
	},
	link: [
		{
			rel: 'canonical',
			href() {
				return `https://dasturchioka.uz/blog/${slug}/`
			},
		},
	],
	meta: [
		{ charset: 'utf-8' },
		{ name: 'robots', content: 'index, follow' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{
			key: 'description',
			name: 'description',
			content: computed(() => data.value.description || 'Blog'),
		},
		{
			key: 'og:title',
			property: 'og:title',
			content: computed(() => data.value.title || 'Blog'),
		},
		{
			key: 'og:description',
			property: 'og:description',
			content: computed(() => data.value.description || 'Blog'),
		},
		{
			key: 'og:image',
			property: 'og:image',
			content: computed(
				() => 'https://www.dasturchioka.uz/_vercel/image?url=%2Fimages%2Fprofile1.jpg&w=1536&q=100'
			),
		},
		{
			key: 'og:url',
			property: 'og:url',
			content: computed(() => `https://dasturchioka.uz/blog/${slug}`),
		},
	],
})

useSeoMeta({
	title: computed(() => data.value.title || 'Blog'),
	description: computed(() => data.value.description || 'Blog'),
	ogTitle: computed(() => data.value.title || 'Blog'),
	ogDescription: computed(() => data.value.description || 'Blog'),
	ogImage: computed(
		() => 'https://www.dasturchioka.uz/_vercel/image?url=%2Fimages%2Fprofile1.jpg&w=1536&q=100'
	),
	ogUrl: computed(() => `https://dasturchioka.uz/blog/${slug}`),
	author: 'Sardor Aminov, Dasturchioka',
	robots: 'index, follow',
	charset: 'utf-8',
})
</script>

<template>
	<div class="text-white sm:w-[800px] mx-auto">
		<header class="header mb-4">
			<h1 class="sm:text-5xl text-2xl sm:mt-8 transition-all font-bold font-mont w-full">
				{{ data.title }}
			</h1>
			<div class="credentials mt-2 font-normal">
				<p class="sm:text-xl text-lg">{{ data.dateFormatted }}</p>
			</div>
			<p class="description mt-6 font-normal">{{ data.description }}</p>
			<div class="tags flex font-mono flex-wrap text-sm gap-4 mt-4 pb-8">
				<p
					v-for="tag in data.tags.multi_select"
					:class="[colorMap[tag.color] || 'bg-gray-500 text-white']"
					class="px-1 rounded font-bold"
				>
					#{{ tag.name }}
				</p>
			</div>
			<hr />
		</header>
		<NotionRenderer :blocks="data.blocks" />
	</div>
</template>
