<template>
	<figure class="notion-image my-4">
		<NuxtImg :src="imageUrl" :alt="caption" class="max-w-full rounded" />
		<figcaption v-if="caption" class="text-sm text-gray-500 mt-2">
			{{ caption }}
		</figcaption>
	</figure>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { type NotionBlock } from './NotionRenderer.vue'

const props = defineProps({
	block: {
		type: Object as PropType<NotionBlock>,
		required: true,
	},
})

const imageUrl = computed((): string => {
	const image = props.block.image
	if (image.type === 'external') {
		return image.external.url
	} else if (image.type === 'file') {
		return image.file.url
	}
	return ''
})

const caption = computed((): string => {
	const captions = props.block.image.caption
	if (captions && captions.length > 0) {
		return captions[0].plain_text
	}
	return ''
})
</script>
