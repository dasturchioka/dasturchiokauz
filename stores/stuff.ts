import { defineStore } from 'pinia'
import NovdaQuizCard from '@/assets/img/novda-quiz-card.png'
import TeleSdkJs from '@/assets/img/tele-sdk-js-card.png'

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
			shortDescription: 'JavaScript client SDK for the Telegram Bot API to integrate your Telegram Bot with your frontend app',
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
			img: TeleSdkJs,
			longDescription: `JavaScript client SDK for the Telegram Bot API, designed to simplify the process of integrating Telegram bots with your frontend app. When I was doing research on the internet, there is no any library or clients to work with Telegram Bot API on frontend apps, then I decided to make my own library and make it public so other developers can contribute too. If you are developer and interested in public contribution, this might be a good chance to start!`,
			demoLinks: [{ label: 'On NPM', href: 'https://www.npmjs.com/package/tele-sdk-js' }],
			sourceCodeLinks: [
				{ label: 'On Github', href: 'https://github.com/dasturchioka/tele-sdk-js' },
			],
		},
	])

	return { stuff }
})
