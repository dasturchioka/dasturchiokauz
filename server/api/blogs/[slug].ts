import { Client } from '@notionhq/client'

export default defineEventHandler(async event => {
	const notion = new Client({ auth: process.env.NOTION_API_KEY })
	const databaseId = '1a8497557ef48083bbfdca28bb21a41a'

	try {
		const slug = event.context.params?.slug
		if (!slug) throw new Error('Slug is required')

		const { results } = await notion.databases.query({
			database_id: databaseId,
			filter: {
				property: 'Slug',
				formula: { string: { equals: slug } },
			},
		})

		if (results.length === 0) {
			return { error: 'Post not found' }
		}

		const page = results[0]
		const properties = (page as any).properties || {}

		const title = properties.Title?.title?.[0]?.plain_text || 'Untitled'
		const slugValue = properties.Slug?.formula?.string || ''
		const poster = properties.Poster?.files?.[0]?.file?.url || null
		const date = properties['Published Date']?.date?.start || null
		const description = properties.Description?.rich_text?.[0]?.plain_text || ''

		// Fetch all blocks from the page
		const blocksResponse = await notion.blocks.children.list({
			block_id: page.id,
		})
		const blocks = blocksResponse.results || []

		// For each block that is a table, fetch its table_row children and attach them
		await Promise.all(
			blocks.map(async (block: any) => {
				if (block.type === 'table') {
					const tableRowsResponse = await notion.blocks.children.list({
						block_id: block.id,
					})
					// Map each table_row block to its cells (array of rich text arrays)
					block.rows = tableRowsResponse.results.map((row: any) => row.table_row.cells)
				}
			})
		)

		return {
			id: page.id,
			title,
			slug: slugValue,
			poster,
			date,
			description,
			blocks,
			tags: properties.Tags,
		}
	} catch (error) {
		console.error('❌ Notion API Error:', error)
		return { error: 'Failed to fetch blog post' }
	}
})
