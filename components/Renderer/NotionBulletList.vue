<template>
	<ul v-if="isFirstInSequence" class="notion-bulleted-list list-disc pl-6 my-4">
		<li>
			<template v-for="(richText, i) in block.bulleted_list_item.rich_text" :key="i">
				<span :class="getTextClasses(richText)">{{ richText.plain_text }}</span>
			</template>
			<NotionRenderer
				v-if="block.bulleted_list_item.children"
				:blocks="block.bulleted_list_item.children"
			/>
		</li>
		<li v-for="(item, index) in listSequence" :key="`list-item-${index}`">
			<template v-for="(richText, i) in item.bulleted_list_item.rich_text" :key="i">
				<span :class="getTextClasses(richText)">{{ richText.plain_text }}</span>
			</template>
			<NotionRenderer
				v-if="item.bulleted_list_item.children"
				:blocks="item.bulleted_list_item.children"
			/>
		</li>
	</ul>
	<li v-else class="hidden"></li>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import NotionRenderer from './NotionRenderer.vue'
import { type NotionBlock, type NotionRichText } from './NotionRenderer.vue'

const props = defineProps({
	block: {
		type: Object as PropType<NotionBlock>,
		required: true,
	},
})

// We would need to implement logic to group list items
// For simplicity, this example assumes you have access to a method to determine
// if this is the first item in a sequence and what other items belong to this sequence
const isFirstInSequence = computed((): boolean => {
	// Implementation would check previous block
	return true
})

const listSequence = computed((): NotionBlock[] => {
	// Implementation would find all consecutive bulleted list items
	return []
})

const getTextClasses = (richText: NotionRichText): string => {
	const classes: string[] = []
	if (richText.annotations.bold) classes.push('font-bold')
	if (richText.annotations.italic) classes.push('italic')
	if (richText.annotations.strikethrough) classes.push('line-through')
	if (richText.annotations.underline) classes.push('underline')
	if (richText.annotations.code) classes.push('bg-gray-100 px-1 py-0.5 rounded font-mono text-sm')
	if (richText.annotations.color && richText.annotations.color !== 'default') {
		classes.push(`text-${richText.annotations.color.replace('_', '-')}`)
	}
	return classes.join(' ')
}
</script>
