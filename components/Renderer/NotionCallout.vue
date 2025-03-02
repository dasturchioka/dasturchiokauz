<template>
	<div :class="calloutClasses">
		<div class="flex items-start">
			<div v-if="block.callout.icon" class="flex-shrink-0 mr-2">
				<template v-if="block.callout.icon.type === 'emoji'">
					<span class="text-lg">{{ block.callout.icon.emoji }}</span>
				</template>
				<template
					v-else-if="block.callout.icon.type === 'external' || block.callout.icon.type === 'file'"
				>
					<NuxtImg
						:src="
							block.callout.icon.type === 'external'
								? block.callout.icon.external?.url
								: block.callout.icon.file?.url
						"
						alt="Icon"
						class="w-5 h-5 object-contain"
					/>
				</template>
			</div>
			<div class="flex-1">
				<div>
					<NotionRichText
						v-for="text in block.callout.rich_text"
						:key="text.plain_text"
						:text="text"
					/>
				</div>
				<div v-if="block.has_children && block.callout.children" class="mt-2">
					<NotionBlockRenderer
						v-for="childBlock in block.callout.children"
						:key="childBlock.id"
						:block="childBlock"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { NotionCalloutBlock } from './types'
import NotionRichText from './NotionRichText.vue';

const props = defineProps<{
	block: NotionCalloutBlock
}>()

const { block } = toRefs(props)

const calloutClasses = computed(() => {
	const classes = ['p-4 rounded-lg mb-4']

	switch (props.block.callout.color) {
		case 'default':
		case 'gray_background':
			classes.push('bg-gray-100')
			break
		case 'blue_background':
			classes.push('bg-blue-100')
			break
		case 'brown_background':
			classes.push('bg-amber-100')
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
		default:
			classes.push('bg-gray-100')
			break
	}

	return classes
})
</script>
