<template>
	<div class="flex items-start mb-2">
		<div class="flex items-center h-5 mt-0.5">
			<input
				type="checkbox"
				:checked="block.to_do.checked"
				disabled
				class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
			/>
		</div>
		<div class="ml-3 text-sm">
			<div :class="block.to_do.checked ? 'line-through text-gray-500' : ''">
				<NotionRichText v-for="text in block.to_do.rich_text" :key="text.plain_text" :text="text" />
			</div>
			<div v-if="block.has_children && block.to_do.children" class="mt-1 ml-1">
				<NotionBlockRenderer
					v-for="childBlock in block.to_do.children"
					:key="childBlock.id"
					:blocks="[childBlock]"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import NotionBlockRenderer from './NotionRenderer.vue'
import NotionRichText from './NotionRichText.vue'
import type { NotionToDoBlock } from './types'

const props = defineProps<{
	block: NotionToDoBlock
}>()

const { block } = toRefs(props)
</script>
