<template>
	<p class="notion-paragraph my-4">
		<template v-for="(richText, i) in block.paragraph.rich_text" :key="i">
			<span :class="getTextClasses(richText)">{{ richText.plain_text }}</span>
		</template>
	</p>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'
import { type NotionBlock, type NotionRichText } from './NotionRenderer.vue'

const props = defineProps({
	block: {
		type: Object as PropType<NotionBlock>,
		required: true,
	},
})

const getTextClasses = (richText: NotionRichText): string => {
	const classes: string[] = []
	if (richText.annotations.bold) classes.push('font-bold')
	if (richText.annotations.italic) classes.push('italic')
	if (richText.annotations.strikethrough) classes.push('line-through')
	if (richText.annotations.underline) classes.push('underline')
	if (richText.annotations.code)
		classes.push('bg-neutral-800 px-1 py-0.5 rounded font-mono text-sm')
	if (richText.annotations.color && richText.annotations.color !== 'default') {
		classes.push(`text-${richText.annotations.color.replace('_', '-')}`)
	}
	return classes.join(' ')
}
</script>
