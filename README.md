# Dasturchioka (dasturchioka.uz)

Personal portfolio, projects showcase, and blog site for Sardor Aminov, powered by Nuxt 3.

## Features

- SSR & Static generation (SSG)
- Notion-enabled blog & product pages
- Tailwind CSS styling & Shiki code highlighting
- Pinia state management
- Vercel Analytics & Speed Insights
- Yandex Metrika integration

## Requirements

- Node.js >= 18
- npm or yarn

## Setup

Clone the repo and install dependencies:

```bash
git clone https://github.com/dasturchioka/dasturchiokauz.git
cd dasturchiokauz
npm install
```

## Environment Variables

Create a `.env` file in the project root and provide your Notion credentials (if you want to pull live content):

```bash
NOTION_API_KEY=your_notion_api_key
NOTION_BLOG_DATABASE_ID=your_blog_database_id
NOTION_PRODUCT_DATABASE_ID=your_product_database_id
```

> If you don't set these, the site will fall back to the local JSON data in `server/data`.

## Available Scripts

- `npm run dev`        
  Start the development server (uses `nuxt dev --host`).

- `npm run build`      
  Build the application for production.

- `npm run generate`   
  Generate static files for SSG.

- `npm run preview`    
  Preview the production build locally.

- `npm run postinstall`
  Prepare Nuxt once dependencies are installed.

## Deployment

Visit [Nuxt deployment docs](https://nuxt.com/docs/getting-started/deployment) for guidance on hosting this project.
