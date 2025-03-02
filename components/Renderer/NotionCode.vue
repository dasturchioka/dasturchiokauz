<script setup lang="ts">
import { computed, toRefs, type PropType } from 'vue'
import type { NotionBlock } from './NotionRenderer.vue'
import Shiki from './CustomShiki.vue'

const props = defineProps({
	block: {
		type: Object as PropType<NotionBlock>,
		required: true,
	},
})

const { block } = toRefs(props)

// Compute the language from the block data
const languageClass = computed(() => block.value.code.language)

console.log(languageClass.value)
</script>

<template>
	<div class="notion-code rounded p-4 my-4 overflow-auto bg-[#0d1117]">
		<p class="text-xs pb-4 font-mono font-medium opacity-60">{{ languageClass }}</p>
		<!-- Pass the dynamic language and code to the Shiki component -->
		<Shiki :lang="languageClass" :code="block.code.rich_text[0].plain_text" />
		<div v-if="block.code.caption && block.code.caption.length > 0" class="mt-2 text-sm">
			{{ block.code.caption[0].plain_text }}
		</div>
	</div>
</template>
