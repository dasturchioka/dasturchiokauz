<template>
	<component :is="headingTag" class="notion-heading" :class="headingClass">
		<template v-for="(richText, i) in headingContent" :key="i">
			<span :class="getTextClasses(richText)">{{ richText.plain_text }}</span>
		</template>
	</component>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { type NotionBlock, type NotionRichText } from './NotionRenderer.vue'

const props = defineProps({
	block: {
		type: Object as PropType<NotionBlock>,
		required: true,
	},
})

const headingTag = computed((): string => {
	const level = props.block.type.split('_')[1]
	return `h${level}`
})

const headingContent = computed((): NotionRichText[] => {
	const type = props.block.type
	return props.block[type]?.rich_text || []
})

const headingClass = computed((): string => {
	const level = props.block.type.split('_')[1]
	const classes: Record<string, string> = {
		'1': 'text-3xl font-bold mt-8 mb-4',
		'2': 'text-2xl font-bold mt-6 mb-3',
		'3': 'text-xl font-bold mt-4 mb-2',
	}
	return classes[level] || ''
})

const getTextClasses = (richText: NotionRichText): string => {
	const classes: string[] = []
	if (richText.annotations.bold) classes.push('font-bold')
	if (richText.annotations.italic) classes.push('italic')
	if (richText.annotations.strikethrough) classes.push('line-through')
	if (richText.annotations.underline) classes.push('underline')
	if (richText.annotations.code) classes.push('bg-neutral-800 px-1 py-0.5 rounded font-mono text-sm')
	if (richText.annotations.color && richText.annotations.color !== 'default') {
		classes.push(`text-${richText.annotations.color.replace('_', '-')}`)
	}
	return classes.join(' ')
}
</script>
