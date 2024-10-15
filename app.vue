<script setup lang="ts">
const quotes = [
	'passion for programming',
	'the more calm he is, the more strength he has',
	'intelligence is the sexiest thing humanity ever has',
	'Hurry up and live',
	'The best answer to anger is silence',
	"Don't care",
	'Man conquers the world by conquering himself',
]
</script>

<template>
	<div
		class="layout h-[100dvh] overflow-hidden bg-[#090909] flex flex-col items-center justify-between pb-6"
	>
		<Vue3Marquee class="scroll-none bg-[#151515] text-white enter-transition-layout">
			<div
				class="uppercase font-poppins font-medium tracking-wide flex items-center"
				v-for="(quote, index) in quotes"
				:key="index"
			>
				<p class="mx-4">•</p>
				<p>{{ quote }}</p>
			</div>
		</Vue3Marquee>
		<NuxtPage
			class="enter-transition-layout scroll-none container mx-auto sm:px-4 px-2 overflow-x-hidden max-h-full overflow-y-scroll"
		></NuxtPage>
		<nav
			class="nav-links enter-transition-layout flex items-center space-x-4 font-mono sm:text-lg text-base"
		>
			<NuxtLink class="default-link" to="/">Home</NuxtLink>
			<NuxtLink to="/stuff" class="default-link transition-all hover:text-white flex items-start"
				>Stuff <span class="bg-green-500 px-1 rounded text-xs ml-1">new</span></NuxtLink
			>
		</nav>
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

*,
* * {
	user-select: none;
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
}
</style>
