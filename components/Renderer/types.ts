export interface NotionBlock {
	id: string
	type: string
	has_children: boolean
	[key: string]: any
}

export interface NotionNumberedListBlock extends NotionBlock {
	type: 'numbered_list_item'
	numbered_list_item: {
		rich_text: NotionRichText[]
		color: string
		children?: NotionBlock[]
	}
}

export interface NotionToDoBlock extends NotionBlock {
	type: 'to_do'
	to_do: {
		rich_text: NotionRichText[]
		checked: boolean
		color: string
		children?: NotionBlock[]
	}
}

export interface NotionToggleBlock extends NotionBlock {
	type: 'toggle'
	toggle: {
		rich_text: NotionRichText[]
		color: string
		children: NotionBlock[]
	}
}

export interface NotionQuoteBlock extends NotionBlock {
	type: 'quote'
	quote: {
		rich_text: NotionRichText[]
		color: string
		children?: NotionBlock[]
	}
}

export interface NotionCalloutBlock extends NotionBlock {
	type: 'callout'
	callout: {
		rich_text: NotionRichText[]
		icon: NotionIcon
		color: string
		children?: NotionBlock[]
	}
}

export interface NotionDividerBlock extends NotionBlock {
	type: 'divider'
	divider: {}
}

export interface NotionBookmarkBlock extends NotionBlock {
	type: 'bookmark'
	bookmark: {
		url: string
		caption?: NotionRichText[]
	}
}

export interface NotionTableBlock extends NotionBlock {
	type: 'table'
	table: {
		table_width: number
		has_column_header: boolean
		has_row_header: boolean
		children: NotionTableRowBlock[]
	}
}

export interface NotionTableRowBlock extends NotionBlock {
	type: 'table_row'
	table_row: {
		cells: NotionRichText[][]
	}
}

export interface NotionRichText {
	type: 'text' | 'mention' | 'equation'
	annotations: {
		bold: boolean
		italic: boolean
		strikethrough: boolean
		underline: boolean
		code: boolean
		color: string
	}
	plain_text: string
	href?: string
	text?: {
		content: string
		link?: {
			url: string
		}
	}
	mention?: any
	equation?: any
}

export interface NotionIcon {
	type: 'emoji' | 'external' | 'file'
	emoji?: string
	external?: {
		url: string
	}
	file?: {
		url: string
		expiry_time: string
	}
}
