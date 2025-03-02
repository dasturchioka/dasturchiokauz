<template>
	<div class="notion-renderer">
		<template v-for="(block, index) in blocks" :key="index">
			<component :is="getComponentForBlock(block)" :block="block" />
		</template>
	</div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'
import NotionParagraph from './NotionParagraph.vue'
import NotionHeading from './NotionHeading.vue'
import NotionCode from './NotionCode.vue'
import NotionImage from './NotionImage.vue'
import NotionBulletedList from './NotionBulletList.vue'
import NotionToDo from './NotionTodo.vue'
import NotionNumberedList from './NotionNumberedList.vue'
import NotionToggle from './NotionToggle.vue'
import NotionQuote from './NotionQuote.vue'
import NotionCallout from './NotionCallout.vue'
import NotionDivider from './NotionDivider.vue'
import NotionBookmark from './NotionBookmark.vue'
import NotionTable from './NotionTable.vue'

// Define TypeScript interfaces for Notion blocks
export interface NotionBlock {
	id: string
	type: string
	has_children: boolean
	[key: string]: any // For dynamic access to block-specific data
}

export interface NotionRichText {
	type: string
	text?: {
		content: string
		link: null | {
			url: string
		}
	}
	mention?: any
	equation?: any
	annotations: {
		bold: boolean
		italic: boolean
		strikethrough: boolean
		underline: boolean
		code: boolean
		color: string
	}
	plain_text: string
	href?: string | null
}

const props = defineProps({
	blocks: {
		type: Array as PropType<NotionBlock[]>,
		required: true,
	},
})

type BlockComponentMap = {
	[key: string]: any
}

const getComponentForBlock = (block: NotionBlock) => {
	const blockType = block.type

	const blockComponents: BlockComponentMap = {
		paragraph: NotionParagraph,
		heading_1: NotionHeading,
		heading_2: NotionHeading,
		heading_3: NotionHeading,
		bulleted_list_item: NotionBulletedList,
		numbered_list_item: NotionNumberedList,
		to_do: NotionToDo,
		toggle: NotionToggle,
		code: NotionCode,
		quote: NotionQuote,
		callout: NotionCallout,
		divider: NotionDivider,
		image: NotionImage,
		bookmark: NotionBookmark,
		table: NotionTable,
	}

	return blockComponents[blockType] || NotionParagraph
}
</script>
