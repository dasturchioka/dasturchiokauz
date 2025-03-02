<script setup lang="ts">
import type { NotionBookmarkBlock } from './types'

const props = defineProps<{
	block: NotionBookmarkBlock
}>()

const { block } = toRefs(props)

const getDisplayUrl = (url: string) => {
	try {
		const urlObj = new URL(url)
		return urlObj.hostname + (urlObj.pathname !== '/' ? urlObj.pathname : '')
	} catch (e) {
		return url
	}
}
</script>

<template>
	<div class="notion-bookmark">
		<a :href="block.bookmark.url" target="_blank" rel="noopener noreferrer" class="bookmark-link">
			{{ block.bookmark.url }}
		</a>
	</div>
</template>

<style scoped>
.notion-bookmark {
	margin: 1rem 0;
}

.bookmark-link {
	color: #3b82f6;
	text-decoration: underline;
}
</style>
