import { defineStore } from "pinia"
import NovdaQuizCard from "@/assets/img/novda-quiz-card.png"

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
	])

	return { stuff }
})
