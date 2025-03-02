<template>
	<span v-if="text">
		<template v-if="hasLink">
			<a
				:href="text.text?.link?.url || text.href"
				target="_blank"
				rel="noopener noreferrer"
				class="text-blue-600 hover:underline"
				:class="annotationClasses"
			>
				{{ text.plain_text }}
			</a>
		</template>
		<template v-else>
			<span :class="annotationClasses">{{ text.plain_text }}</span>
		</template>
	</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { NotionRichText } from './types'

const props = defineProps<{
	text: NotionRichText
}>()

const { text } = toRefs(props)

const hasLink = computed(() => {
	return !!props.text.text?.link?.url || !!props.text.href
})

const annotationClasses = computed(() => {
	const classes = []

	if (props.text.annotations.bold) classes.push('font-bold')
	if (props.text.annotations.italic) classes.push('italic')
	if (props.text.annotations.strikethrough) classes.push('line-through')
	if (props.text.annotations.underline) classes.push('underline')
	if (props.text.annotations.code)
		classes.push('font-mono bg-gray-100 text-pink-500 px-1 py-0.5 rounded')

	if (props.text.annotations.color && props.text.annotations.color !== 'default') {
		switch (props.text.annotations.color) {
			case 'blue':
				classes.push('text-blue-600')
				break
			case 'brown':
				classes.push('text-amber-800')
				break
			case 'gray':
				classes.push('text-gray-500')
				break
			case 'green':
				classes.push('text-green-600')
				break
			case 'orange':
				classes.push('text-orange-500')
				break
			case 'pink':
				classes.push('text-pink-500')
				break
			case 'purple':
				classes.push('text-purple-600')
				break
			case 'red':
				classes.push('text-red-600')
				break
			case 'yellow':
				classes.push('text-yellow-500')
				break
			case 'blue_background':
				classes.push('bg-blue-100')
				break
			case 'brown_background':
				classes.push('bg-amber-100')
				break
			case 'gray_background':
				classes.push('bg-gray-100')
				break
			case 'green_background':
				classes.push('bg-green-100')
				break
			case 'orange_background':
				classes.push('bg-orange-100')
				break
			case 'pink_background':
				classes.push('bg-pink-100')
				break
			case 'purple_background':
				classes.push('bg-purple-100')
				break
			case 'red_background':
				classes.push('bg-red-100')
				break
			case 'yellow_background':
				classes.push('bg-yellow-100')
				break
		}
	}

	return classes
})
</script>
