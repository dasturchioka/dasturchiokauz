<script lang="ts" setup>
definePageMeta({
	layout: 'default',
})
export interface NotionBlogPost {
	id: string
	title: string
	slug: string
	poster: string | null
	date: string | null
	description: string
	dateFormatted: string | null
	tags: object | any
}

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

const { data } = await useAsyncData('/api/blogs', () =>
	$fetch<NotionBlogPost[]>('/api/blogs', { cache: 'force-cache' })
)

useHead({
	title: 'Dasturchioka | Blog',
	link: [
		{
			rel: 'canonical',
			href() {
				return `https://dasturchioka.uz/blog/`
			},
		},
	],
	script: [
		{
			type: 'application/ld+json',
			children: JSON.stringify({
				'@context': 'https://schema.org',
				'@type': 'BlogPosting',
				headline: 'Dasturchioka | Blog',
				description: 'My Blog',
				image: '/images/profile4.jpg',
				url: 'https://dasturchioka.uz/blog',
			}),
		},
	],
	meta: [
		{ name: 'robots', content: 'index, follow' },
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ key: 'description', name: 'description', content: "Dasturchioka's blog" },
		{ key: 'og:title', property: 'og:title', content: 'Dasturchioka | blog' },
		{ key: 'og:description', property: 'og:description', content: "Dasturchioka's blog" },
		{
			key: 'og:image',
			property: 'og:image',
			content: '/images/profile4.jpg',
		},
		{ key: 'og:url', property: 'og:url', content: 'https://dasturchioka.uz/blog' },
	],
})
useSeoMeta({
	title: 'Dasturchioka | Blog',
	description: "Dasturchioka's blog",
	ogTitle: 'Dasturchioka | blog',
	ogDescription: "Dasturchioka's blog",
	ogImage: '/images/profile4.jpg',
	ogUrl: 'https://dasturchioka.uz/blog',
	author: 'Sardor Aminov, Dasturchioka',
	robots: 'index, follow',
	charset: 'utf-8',
})

const getTags = (tags: any) => tags?.multi_select || []
</script>

<template>
	<div class="h-screen text-white container sm:w-[800px] mx-auto">
		<h1 class="font-bold sm:text-lg text-base sm:my-8 font-mono my-6">
			My Blog <span class="text-[#00a6fb]">.</span>
		</h1>
		<div class="stuff-wrapper">
			<div class="grid grid-cols-1 md:grid-cols-1 gap-10">
				<div
					v-for="post in data"
					:key="post.id"
					class="transition-all opacity-20 hover:opacity-100 hover:-translate-y-2"
				>
					<NuxtLink :to="`/blog/${post.slug}`">
						<h1 class="sm:text-4xl text-2xl sm:mt-8 transition-all font-bold font-mont">
							{{ post.title }}
						</h1>
						<div class="credentials mt-2 font-normal">
							<p>{{ post.dateFormatted }}</p>
						</div>
						<p class="description mt-6 font-normal">{{ post.description }}</p>
						<div class="tags flex font-mono flex-wrap text-sm gap-4 mt-4">
							<p
								v-for="tag in getTags(post.tags)"
								:class="[colorMap[tag.color] || 'bg-gray-500 text-white']"
								class="px-1 rounded font-bold"
							>
								#{{ tag.name }}
							</p>
						</div>
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<style></style>
