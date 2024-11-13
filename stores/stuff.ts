import { defineStore } from 'pinia'
import NovdaQuizCard from '@/assets/img/novda-quiz-card.png'
import TeleSdkJs from '@/assets/img/tele-sdk-js-card.png'
import ChizzaroCard from '@/assets/img/chizzaro-card.jpg'

export const useStuffStore = defineStore('stuff-store', () => {
	const stuff = ref([
		{
			id: '1',
			title: 'Novda Quiz',
			shortDescription: 'Interactive online examination platform based on university classes',
			badges: [
				{
					name: 'typescript',
					classes: 'bg-blue-700',
				},
				{
					name: 'nodejs',
					classes: 'bg-green-700',
				},
				{
					name: 'postgresql',
					classes: 'bg-indigo-500',
				},
				{
					name: 'vuejs',
					classes: 'bg-emerald-600',
				},
			],
			thingsIMade: ['#student-panel', '#teacher-panel', '#server'],
			img: NovdaQuizCard,
			longDescription: `One of my teachers called me and said: "I don't want to bring hella papers to examine you guys", and I was like, I gotchu bro and came up with this simple idea. The app has still some needs for fixing and improving.`,
			demoLinks: [
				{ label: 'Teacher panel', href: 'https://novda-quiz-teacher.vercel.app/' },
				{ label: 'Student panel', href: 'https://novda-quiz-student.vercel.app/' },
			],
			sourceCodeLinks: [
				{ label: 'Server', href: 'https://github.com/dasturchioka/novda-quiz-server' },
				{ label: 'Teacher', href: 'https://github.com/dasturchioka/novda-quiz-teacher' },
				{ label: 'Student', href: 'https://github.com/dasturchioka/novda-quiz-student' },
			],
		},
		{
			id: '2',
			title: 'Telegram Client SDK',
			shortDescription:
				'JavaScript client SDK for the Telegram Bot API to integrate your Telegram Bot with your frontend app',
			badges: [
				{
					name: 'typescript',
					classes: 'bg-blue-700',
				},
				{
					name: 'javascript',
					classes: 'bg-yellow-400',
				},
			],
			thingsIMade: ['#npm-package'],
			img: TeleSdkJs,
			longDescription: `JavaScript client SDK for the Telegram Bot API, designed to simplify the process of integrating Telegram bots with your frontend app. When I was doing research on the internet, there is no any library or clients to work with Telegram Bot API on frontend apps, then I decided to make my own library and make it public so other developers can contribute too. If you are developer and interested in public contribution, this might be a good chance to start!`,
			demoLinks: [{ label: 'On NPM', href: 'https://www.npmjs.com/package/tele-sdk-js' }],
			sourceCodeLinks: [
				{ label: 'On Github', href: 'https://github.com/dasturchioka/tele-sdk-js' },
			],
		},
		{
			id: '3',
			title: 'Chizzaro Pizza Delivery',
			shortDescription: 'A delivery system of a pizzeria in Khorezm, Uzbekistan, called Chizzaro',
			badges: [
				{
					name: 'typescript',
					classes: 'bg-blue-700',
				},
				{
					name: 'nodejs',
					classes: 'bg-green-700',
				},
				{
					name: 'postgresql',
					classes: 'bg-indigo-500',
				},
				{
					name: 'vuejs',
					classes: 'bg-emerald-600',
				},
			],
			thingsIMade: ['#admin-dashboard', '#courier-mobile-app', '#customer-tg-bot', '#server'],
			img: ChizzaroCard,
			longDescription: `One of my old friends opened a new pizzeria in Khorezm that only makes and sells variety of pizza all over the region. I am currently building everything on my own: server side with Express.js using PostgreSQL as only database with Prisma, courier mobile app with Vue.js and I compile the code into native with Capacitor.js, admin panel and also Telegram Bot with Web App integration on it. I run the Telegram bot on the server itself, no need to make difficulties here!`,
			sourceCodeLinks: [
				{ label: 'Admin Dashboard', href: 'https://github.com/dasturchioka/chizzaro-pizza-admin' },
				{ label: 'Courier App', href: 'https://github.com/dasturchioka/chizzaro-pizza-courier' },
				{ label: 'Server', href: 'https://github.com/dasturchioka/chizzaro-server' },
				{
					label: 'Web App for customers',
					href: 'https://github.com/dasturchioka/chizzaro-pizza-client',
				},
			],
		},
	])

	return { stuff }
})
