import { Client } from '@notionhq/client'

export default defineEventHandler(async () => {
	const notion = new Client({ auth: process.env.NOTION_API_KEY })

	try {
		const databaseId = '1a8497557ef48083bbfdca28bb21a41a' // Replace with your actual database ID

		const response = await notion.databases.query({ database_id: databaseId })

		if (!response) {
			throw new Error('Response is not coming')
		}

		const blogs = response.results.map((page: any) => ({
			id: page.id,
			title: page.properties.Title?.title?.[0]?.plain_text || 'Untitled',
			slug: page.properties.Slug?.formula?.string || '',
			poster: page.properties.Poster?.files?.[0]?.file?.url || null,
			date: page.properties['Published Date']?.date?.start || null,
			dateFormatted: page.properties['Published Date Formatted']?.formula?.string || null,
			description: page.properties.Description?.rich_text?.[0]?.plain_text || '',
			tags: page.properties.Tags,
		}))

		return blogs
	} catch (error) {
		console.error('❌ Notion API Error:', error)
		return error
	}
})
