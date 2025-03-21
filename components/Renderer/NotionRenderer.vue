<template>
	<Suspense>
		<template #default>
			<div class="notion-renderer">
				<template v-for="(block, index) in blocks" :key="index">
					<Suspense>
						<template #default>
							<component :is="getComponentForBlock(block)" :block="block" />
						</template>
						<template #fallback>
							<p class="text-white">Loading block...</p>
						</template>
					</Suspense>
				</template>
			</div>
		</template>
		<template #fallback>
			<p class="text-white">Loading content...</p>
		</template>
	</Suspense>
</template>

<script setup lang="ts">
import { type PropType, defineAsyncComponent } from 'vue'

// Dynamically import components
const NotionParagraph = defineAsyncComponent(() => import('./NotionParagraph.vue'))
const NotionHeading = defineAsyncComponent(() => import('./NotionHeading.vue'))
const NotionCode = defineAsyncComponent(() => import('./NotionCode.vue'))
const NotionImage = defineAsyncComponent(() => import('./NotionImage.vue'))
const NotionBulletedList = defineAsyncComponent(() => import('./NotionBulletList.vue'))
const NotionToDo = defineAsyncComponent(() => import('./NotionTodo.vue'))
const NotionNumberedList = defineAsyncComponent(() => import('./NotionNumberedList.vue'))
const NotionToggle = defineAsyncComponent(() => import('./NotionToggle.vue'))
const NotionQuote = defineAsyncComponent(() => import('./NotionQuote.vue'))
const NotionCallout = defineAsyncComponent(() => import('./NotionCallout.vue'))
const NotionDivider = defineAsyncComponent(() => import('./NotionDivider.vue'))
const NotionBookmark = defineAsyncComponent(() => import('./NotionBookmark.vue'))
const NotionTable = defineAsyncComponent(() => import('./NotionTable.vue'))

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
