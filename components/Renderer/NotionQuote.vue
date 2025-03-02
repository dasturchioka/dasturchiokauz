<template>
	<blockquote :class="quoteClasses">
		<div>
			<NotionRichText v-for="text in block.quote.rich_text" :key="text.plain_text" :text="text" />
		</div>
		<div v-if="block.has_children && block.quote.children" class="mt-2">
			<NotionBlockRenderer
				v-for="childBlock in block.quote.children"
				:key="childBlock.id"
				:block="childBlock"
			/>
		</div>
	</blockquote>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { NotionQuoteBlock } from './types'
import NotionRichText from './NotionRichText.vue';

const props = defineProps<{
	block: NotionQuoteBlock
}>()

const { block } = toRefs(props)

const quoteClasses = computed(() => {
	const classes = ['pl-4 border-l-4 border-gray-300 italic mb-4']

	if (props.block.quote.color && props.block.quote.color !== 'default') {
		switch (props.block.quote.color) {
			case 'blue':
				classes.push('border-blue-500 text-blue-700')
				break
			case 'brown':
				classes.push('border-amber-700 text-amber-800')
				break
			case 'gray':
				classes.push('border-gray-500 text-gray-700')
				break
			case 'green':
				classes.push('border-green-500 text-green-700')
				break
			case 'orange':
				classes.push('border-orange-500 text-orange-700')
				break
			case 'pink':
				classes.push('border-pink-500 text-pink-700')
				break
			case 'purple':
				classes.push('border-purple-500 text-purple-700')
				break
			case 'red':
				classes.push('border-red-500 text-red-700')
				break
			case 'yellow':
				classes.push('border-yellow-500 text-yellow-700')
				break
			case 'blue_background':
				classes.push('bg-blue-50')
				break
			case 'brown_background':
				classes.push('bg-amber-50')
				break
			case 'gray_background':
				classes.push('bg-gray-50')
				break
			case 'green_background':
				classes.push('bg-green-50')
				break
			case 'orange_background':
				classes.push('bg-orange-50')
				break
			case 'pink_background':
				classes.push('bg-pink-50')
				break
			case 'purple_background':
				classes.push('bg-purple-50')
				break
			case 'red_background':
				classes.push('bg-red-50')
				break
			case 'yellow_background':
				classes.push('bg-yellow-50')
				break
		}
	}

	return classes
})
</script>
