<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { type NotionBlock } from './NotionRenderer.vue'

const props = defineProps({
	block: {
		type: Object as PropType<NotionBlock>,
		required: true,
	},
})

const { block } = toRefs(props)

const languageClass = computed((): any => {
	return block.value.code.language
})
</script>

<template>
	<div class="notion-code rounded p-4 my-4 overflow-auto bg-[#0d1117]">
		<p class="text-xs pb-4 font-mono font-medium opacity-60">{{ languageClass }}</p>
		<Shiki :lang="languageClass" :code="block.code.rich_text[0].plain_text" />
		<div v-if="block.code.caption && block.code.caption.length > 0" class="mt-2 text-sm">
			{{ block.code.caption[0].plain_text }}
		</div>
	</div>
</template>
