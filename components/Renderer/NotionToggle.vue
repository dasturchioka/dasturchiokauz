<template>
	<details class="mb-4 bg-white border border-gray-200 rounded-lg">
		<summary class="p-3 font-medium cursor-pointer">
			<NotionRichText v-for="text in block.toggle.rich_text" :key="text.plain_text" :text="text" />
		</summary>
		<div class="p-3 pt-0 border-t border-gray-200">
			<NotionBlockRenderer
				v-for="childBlock in block.toggle.children"
				:key="childBlock.id"
				:block="childBlock"
			/>
		</div>
	</details>
</template>

<script setup lang="ts">
import type { NotionToggleBlock } from './types'
import NotionRichText from './NotionRichText.vue';

const props = defineProps<{
	block: NotionToggleBlock
}>()

const { block } = toRefs(props)
</script>
