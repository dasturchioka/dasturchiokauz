<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'
import { SpeedInsights } from '@vercel/speed-insights/nuxt'

// Disable automatic URL changes on page load
const router = useRouter()
onMounted(() => {
	// This prevents any automatic navigation from happening
	router.options.scrollBehavior = (to: any, from: any, savedPosition: any) => {
		// Return saved position if available
		if (savedPosition) {
			return savedPosition
		}
		// Don't change scroll position on same-page navigation
		if (to.path === from.path) {
			return false
		}
		// Otherwise, scroll to top
		return { top: 0 }
	}
})
</script>

<template>
	<div class="bg-[#090909]">
		<NuxtLayout>
			<div
				class="h-[100dvh] overflow-x-hidden flex flex-col items-center justify-between pb-6 overflow-y-scroll"
			>
				<div class="scroll-none bg-[#151515] w-full text-white enter-transition-layout">
					<NuxtLoadingIndicator color="#00a6fb" />
				</div>
				<NuxtPage
					class="enter-transition-layout scroll-none container mx-auto sm:px-4 px-2 overflow-x-hidden max-h-full overflow-y-scroll pb-12"
				></NuxtPage>
				<div class="free-space"></div>
				<nav
					class="nav-links enter-transition-layout flex items-center justify-center space-x-4 font-mono sm:text-lg text-base fixed bottom-0 bg-[#090909] w-full py-4"
				>
					<NuxtLink class="default-link" to="/">Home</NuxtLink>
					<NuxtLink to="/about" class="default-link">About </NuxtLink>
					<!-- <NuxtLink to="/blog" class="default-link transition-all hover:text-white flex items-start"
						>Blog <span class="bg-[#00a6fb] px-1 rounded text-xs ml-1">new</span></NuxtLink
					> -->
				</nav>
				<SpeedInsights />
				<Analytics />
			</div>
		</NuxtLayout>
	</div>
</template>
