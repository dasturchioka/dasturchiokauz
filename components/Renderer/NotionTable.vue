<template>
	<div class="notion-table">
		<!-- Only show the table if we have data -->
		<table v-if="tableData && tableData.length">
			<!-- COLUMN HEADER -->
			<thead v-if="hasColumnHeader && tableData[0]">
				<tr>
					<!-- If also has row header, the first cell of the header row is a <th> for both column & row header -->
					<th v-if="hasRowHeader" v-html="extractCellTexts(tableData[0])[0]"></th>
					<!-- Remaining header cells -->
					<th
						v-for="(cell, index) in extractCellTexts(tableData[0]).slice(hasRowHeader ? 1 : 0)"
						:key="index"
						v-html="cell"
					></th>
				</tr>
			</thead>

			<!-- TABLE BODY -->
			<tbody>
				<!-- If has_column_header, body rows start from the second row; otherwise, from the first -->
				<tr v-for="(row, rowIndex) in bodyRows" :key="rowIndex">
					<!-- ROW HEADER -->
					<th v-if="hasRowHeader" v-html="extractCellTexts(row)[0]"></th>

					<!-- Remaining body cells -->
					<td
						v-for="(cell, cellIndex) in extractCellTexts(row).slice(hasRowHeader ? 1 : 0)"
						:key="cellIndex"
						v-html="cell"
					></td>
				</tr>
			</tbody>
		</table>

		<div v-else>No table data available.</div>
	</div>
</template>

<script setup lang="ts">
import { computed, defineProps, toRefs } from 'vue'
import type { NotionBlock } from './NotionRenderer.vue'

const props = defineProps({
	block: {
		type: Object as () => NotionBlock,
		required: true,
	},
})

const { block } = toRefs(props)

/**
 * The table data is an array of rows,
 * each row is an array of cells,
 * each cell is an array of rich text objects.
 */
const tableData = computed(() => {
	const blockAny = block.value as any
	return blockAny.rows || []
})

/**
 * Check if the table is configured to have a column header.
 */
const hasColumnHeader = computed(() => {
	return block.value.table?.has_column_header
})

/**
 * Check if the table is configured to have a row header.
 */
const hasRowHeader = computed(() => {
	return block.value.table?.has_row_header
})

/**
 * The body rows:
 * - If we have a column header, skip the first row for the body.
 * - Otherwise, use all rows.
 */
const bodyRows = computed(() => {
	if (hasColumnHeader.value && tableData.value.length > 1) {
		return tableData.value.slice(1)
	}
	return tableData.value
})

/**
 * Formats a single rich text object based on annotations (bold, italic, etc.) and links.
 */
function formatRichText(richText: any): string {
	let text = richText.plain_text || ''

	// Apply annotations
	if (richText.annotations) {
		const { bold, italic, underline, strikethrough, code, color } = richText.annotations

		if (code) {
			text = `<code>${text}</code>`
		}
		if (bold) {
			text = `<strong>${text}</strong>`
		}
		if (italic) {
			text = `<em>${text}</em>`
		}
		if (underline) {
			text = `<u>${text}</u>`
		}
		if (strikethrough) {
			text = `<del>${text}</del>`
		}
		// If a custom color is specified and not default, wrap in a span with inline style
		if (color && color !== 'default') {
			text = `<span style="color:${color};">${text}</span>`
		}
	}

	// If there's a link, wrap the text in an anchor
	if (richText.text && richText.text.link && richText.text.link.url) {
		text = `<a href="${richText.text.link.url}" target="_blank" rel="noopener noreferrer">${text}</a>`
	}

	return text
}

/**
 * Helper function: Extracts and concatenates formatted HTML from each cell.
 * Each row is an array of cells, each cell is an array of rich text objects.
 */
function extractCellTexts(row: any): string[] {
	return row.map((cell: any) => {
		if (Array.isArray(cell)) {
			return cell.map((richText: any) => formatRichText(richText)).join('')
		}
		return ''
	})
}
</script>

<style scoped>
@reference "../../assets/css/main.css"
.notion-table table {
	@apply w-full border-collapse;
}

/* Column & row headers will appear in <th> tags */
.notion-table th {
	@apply border border-neutral-700 p-2 text-left bg-neutral-600;
}

/* Regular body cells */
.notion-table td {
	@apply border border-neutral-700 p-2 text-left;
}
</style>
