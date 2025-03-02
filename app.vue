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
	<div
		class="layout h-[100dvh] overflow-hidden bg-[#090909] flex flex-col items-center justify-between pb-6"
	>
		<div class="scroll-none bg-[#151515] w-full text-white enter-transition-layout">
			<NuxtLoadingIndicator color="#42b883" />
			<div class="flex justify-center items-center p-1 text-white font-mono text-xs">
				<div class="text-center">
					{{
						new Date(`${new Date().getFullYear()}-03-07`).getTime() - Date.now() > 0
							? Math.floor(
									(new Date(`${new Date().getFullYear()}-03-07`).getTime() - Date.now()) /
										(1000 * 60 * 60 * 24)
							  ) + ' days until my birthday'
							: "It's my birthday 🎂"
					}}
				</div>
			</div>
		</div>
		<NuxtPage
			class="enter-transition-layout scroll-none container mx-auto sm:px-4 px-2 overflow-x-hidden max-h-full overflow-y-scroll"
		></NuxtPage>
		<nav
			class="nav-links enter-transition-layout flex items-center space-x-4 font-mono sm:text-lg text-base"
		>
			<NuxtLink class="default-link" to="/">Home</NuxtLink>
			<NuxtLink to="/stuff" class="default-link">Stuff </NuxtLink>
			<NuxtLink to="/blog" class="default-link transition-all hover:text-white flex items-start"
				>Blog <span class="bg-[#00a6fb] px-1 rounded text-xs ml-1">new</span></NuxtLink
			>
		</nav>
		<SpeedInsights />
		<Analytics />
	</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:wght@300;400;500&display=swap');
a.router-link-active,
a.router-link-exact-active {
	@apply text-white transition font-bold;
}

.default-link:not(.router-link-active, .router-link-exact-active, .donation) {
	@apply text-[#565656];
}

.scroll-none::-webkit-scrollbar {
	display: none;
}

.page-enter-active,
.page-leave-active {
	transition: all 0.5s;
	opacity: 1;
}
.page-enter-from,
.page-leave-to {
	opacity: 0;
	transform: translateY(-10px);
}

.enter-transition-layout {
	transition: all 0.5s;
	opacity: 1;
	animation-name: enter;
	animation-duration: 0.6s;
}

@keyframes enter {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

a {
	-webkit-tap-highlight-color: transparent;
	font-weight: normal;
}
</style>
