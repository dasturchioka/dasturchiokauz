<script setup lang="ts">
import NotionRichText from './NotionRichText.vue';
import type { NotionNumberedListBlock } from './types'

const props = defineProps<{
	block: NotionNumberedListBlock
}>()

const { block } = toRefs(props)
</script>

<template>
	<li class="pl-2 mb-2">
		<div>
			<NotionRichText
				v-for="text in block.numbered_list_item.rich_text"
				:key="text.plain_text"
				:text="text"
			/>
		</div>
		<ol
			v-if="block.has_children && block.numbered_list_item.children"
			class="list-decimal list-inside ml-6 mt-1"
		>
			<NotionBlockRenderer
				v-for="childBlock in block.numbered_list_item.children"
				:key="childBlock.id"
				:block="childBlock"
			/>
		</ol>
	</li>
</template>
