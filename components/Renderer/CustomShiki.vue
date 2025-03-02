<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface ShikiProps {
	lang: string
	code: string
}

const props = defineProps<ShikiProps>()

const { code, lang } = toRefs(props)

// Reactive variable to hold the highlighted HTML
const highlightedCode = ref('')

// Function to load and highlight the code using Shiki
async function highlight() {
	// Dynamically import Shiki (only runs on client)
	const shiki = await import('shiki')
	// Create a highlighter instance with your chosen theme
	const highlighter = await shiki.getSingletonHighlighter({
		themes: ['github-dark-default'],
	})
	await highlighter.loadLanguage(lang.value as any)

	// Convert code to highlighted HTML using the dynamic language
	highlightedCode.value = highlighter.codeToHtml(code.value, {
		lang: lang.value,
		theme: 'github-dark-default',
	})
}

// Run on component mount
onMounted(async () => {
	await highlight()
})

// Re-run when the code or language changes
watch(
	() => [code.value, lang.value],
	async () => {
		await highlight()
	}
)
</script>

<template>
	<div v-html="highlightedCode" class="shiki-highlight" />
</template>

<style scoped>
/* You can add your custom styling for highlighted code here */
.shiki-highlight {
	overflow-x: auto;
}
</style>
