<template>
	<hr class="my-6 border-t border-gray-300" />
</template>

<script setup lang="ts">
import type { NotionDividerBlock } from './types'

defineProps<{
	block: NotionDividerBlock
}>()
</script>
