<script setup lang="ts">
import { LucideApple, LucideBadgeInfo, LucideHome, LucidePencilRuler } from "#components";
import { useTheme } from "#imports";
import { gsap } from "gsap";
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  Transition,
  useTemplateRef,
  watch,
  type CSSProperties,
  type VNode,
} from "vue";

type MenuItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: {
    bgColor?: string;
    textColor?: string;
  };
  icon?: any;
};

export type BubbleMenuProps = {
  logo?: string | VNode;
  onMenuClick?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  items?: MenuItem[];
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
};

const { theme } = useTheme();

const DEFAULT_ITEMS: MenuItem[] = [
  {
    label: "Home",
    href: "/",
    ariaLabel: "Home",
    rotation: -8,
    hoverStyles: { bgColor: "#00a6fb", textColor: "#ffffff" },
    icon: LucideHome,
  },
  {
    label: "About",
    href: "/about",
    ariaLabel: "About",
    rotation: 4,
    hoverStyles: { bgColor: "#00a6fb", textColor: "#ffffff" },
    icon: LucideBadgeInfo
  },
  {
    label: "Products",
    href: "/products",
    ariaLabel: "Products",
    rotation: 8,
    hoverStyles: { bgColor: "#00a6fb", textColor: "#ffffff" },
    icon: LucideApple
  },
  {
    label: "Services",
    href: "/services",
    ariaLabel: "Services",
    rotation: 8,
    hoverStyles: { bgColor: "#00a6fb", textColor: "#ffffff" },
    icon: LucidePencilRuler
  },
];

const props = withDefaults(defineProps<BubbleMenuProps>(), {
  menuAriaLabel: "Toggle menu",
  menuBg: "#fff",
  menuContentColor: "#111",
  useFixedPosition: false,
  animationEase: "back.out(1.5)",
  animationDuration: 0.5,
  staggerDelay: 0.12,
});

const isMenuOpen = ref(false);
const showOverlay = ref(false);

const overlayRef = useTemplateRef("overlayRef");
const bubblesRef = ref<HTMLAnchorElement[]>([]);
const labelRefs = ref<HTMLSpanElement[]>([]);

const setBubbleRef = (el: HTMLAnchorElement | null, idx: number) => {
  if (el) {
    bubblesRef.value[idx] = el;
  }
};

const setLabelsRef = (el: HTMLSpanElement | null, idx: number) => {
  if (el) {
    labelRefs.value[idx] = el;
  }
};

const menuItems = computed(() =>
  props.items?.length ? props.items : DEFAULT_ITEMS
);

const handleToggle = () => {
  const nextState = !isMenuOpen.value;
  if (nextState) showOverlay.value = true;
  isMenuOpen.value = nextState;
  props.onMenuClick?.(nextState);
};

watch(
  () => [
    isMenuOpen.value,
    showOverlay.value,
    props.animationEase,
    props.animationDuration,
    props.staggerDelay,
  ],
  async () => {
    await nextTick();

    const overlay = overlayRef.value;
    const bubbles = bubblesRef.value.filter(Boolean);
    const labels = labelRefs.value.filter(Boolean);
    if (!overlay || !bubbles.length) return;

    if (isMenuOpen.value) {
      gsap.set(overlay, { display: "flex" });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * props.staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });
        tl.to(bubble, {
          scale: 1,
          duration: props.animationDuration,
          ease: props.animationEase,
        });
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: props.animationDuration,
              ease: "power3.out",
            },
            "-=" + props.animationDuration * 0.9
          );
        }
      });
    } else if (showOverlay.value) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: "power3.in",
      });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
          showOverlay.value = false;
        },
      });
    }
  },
  { deep: true }
);

let cleanupResizeListener: () => void;
const handleResize = () => {
  if (isMenuOpen.value) {
    const bubbles = bubblesRef.value.filter(Boolean);
    const isDesktop = window.innerWidth >= 900;
    bubbles.forEach((bubble, i) => {
      const item = menuItems.value[i];
      if (bubble && item) {
        const rotation = isDesktop ? item.rotation ?? 0 : 0;
        gsap.set(bubble, { rotation });
      }
    });
  }

  window.addEventListener("resize", handleResize);
  cleanupResizeListener = () =>
    window.removeEventListener("resize", handleResize);
};

onMounted(() => {
  handleResize();
});

onBeforeUnmount(() => {
  cleanupResizeListener?.();
});

watch(
  () => [isMenuOpen.value, menuItems.value],
  () => {
    cleanupResizeListener?.();
    handleResize();
  },
  { deep: true }
);
</script>

<template>
  <ClientOnly>
    <nav class="bubble-menu" :style="style" aria-label="Main navigation">
      <button
        type="button"
        :class="[
          'bubble toggle-bubble menu-btn transition-colors',
          isMenuOpen ? 'open' : '',
          'inline-flex flex-col items-center justify-center',
          'rounded-full',
          'shadow-[0_4px_16px_rgba(0,0,0,0.12)]',
          'pointer-events-auto',
          'w-12 h-12 md:w-14 md:h-14',
          'border-0 cursor-pointer p-0',
          'will-change-transform',
          'dark:bg-white bg-[#151515]',
        ]"
        @click="handleToggle"
        :aria-label="menuAriaLabel"
        :aria-pressed="isMenuOpen"
      >
        <span
          class="block mx-auto rounded-[2px] menu-line dark:bg-black bg-white"
          :style="{
            width: '26px',
            height: '2px',
            transform: isMenuOpen ? 'translateY(4px) rotate(45deg)' : 'none',
          }"
        />
        <span
          class="block mx-auto rounded-[2px] menu-line short dark:bg-black bg-white"
          :style="{
            marginTop: '6px',
            width: '26px',
            height: '2px',
            transform: isMenuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none',
          }"
        />
      </button>
    </nav>

    <div
      v-show="showOverlay"
      ref="overlayRef"
      :class="[
        'bubble-menu-items transition-all',
        useFixedPosition ? 'fixed' : 'absolute',
        'inset-0',
        'flex items-center justify-center',
        'pointer-events-none',
        theme === 'dark'
          ? 'bg-[rgba(0,0,0,0.7)]'
          : 'bg-[rgba(255,255,255,0.5)]',
        'z-[1000]',
      ]"
      :aria-hidden="!isMenuOpen"
    >
      <ul
        :class="[
          'pill-list',
          'list-none m-0 px-6',
          'w-full max-w-[1600px] mx-auto',
          'flex flex-wrap',
          'gap-x-0 gap-y-1',
          'pointer-events-auto',
        ]"
        role="menu"
        aria-label="Menu links"
      >
        <li
          v-for="(item, idx) in menuItems"
          :key="idx"
          role="none"
          :class="[
            'pill-col',
            'flex justify-center items-stretch',
            '[flex:0_0_calc(100%/3)]',
            'box-border',
          ]"
        >
          <NuxtLink
            @click="handleToggle"
            :to="item.href"
            custom
            v-slot="{ href, navigate }"
          >
            <a
              :href="href"
              @click="navigate"
              :ref="el => setBubbleRef(el as HTMLAnchorElement | null, idx)"
              role="menuitem"
              :aria-label="item.ariaLabel || item.label"
              :class="[
                'pill-link',
                'w-full',
                'rounded-[999px]',
                'no-underline',
                'text-inherit',
                'shadow-[0_4px_14px_rgba(0,0,0,0.10)]',
                'flex items-center justify-center',
                'relative',
                'transition-[background,color] duration-300 ease-in-out',
                'box-border',
                'whitespace-nowrap overflow-hidden',
                'bg-[#151515] dark:bg-white text-white dark:text-[#151515]',
              ]"
              :style="{
                '--item-rot': `${item.rotation ?? 0}deg`,
                '--hover-bg': item.hoverStyles?.bgColor || '#f3f4f6',
                '--hover-color':
                  item.hoverStyles?.textColor || menuContentColor,
                minHeight: 'var(--pill-min-h, 160px)',
                padding: 'clamp(1.5rem, 3vw, 8rem) 0',
                fontSize: 'clamp(1.5rem, 4vw, 4rem)',
                fontWeight: 400,
                lineHeight: 0,
                willChange: 'transform',
                height: '10px',
              }"
            >
              <span
                class="inline-block pill-label"
                :style="{
                  willChange: 'transform, opacity',
                  height: '1.2em',
                  lineHeight: 1.2,
                }"
                :ref="el => setLabelsRef(el as HTMLSpanElement | null, idx)"
              >
                <component
                  :style="{
                    willChange: 'transform, opacity',
                    height: '1.1em',
                    width: '1.1em',
                  }"
                  class="inline-block"
                  :is="item.icon"
                />
                {{ item.label }}
              </span>
            </a>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </ClientOnly>
</template>

<style scoped>
.bubble-menu .menu-line {
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform-origin: center;
}
.bubble-menu-items .pill-list .pill-col:nth-child(4):nth-last-child(2) {
  margin-left: calc(100% / 6);
}
.bubble-menu-items .pill-list .pill-col:nth-child(4):last-child {
  margin-left: calc(100% / 3);
}
@media (min-width: 900px) {
  .bubble-menu-items .pill-link {
    transform: rotate(var(--item-rot));
  }
  .bubble-menu-items .pill-link:hover {
    transform: rotate(var(--item-rot)) scale(1.06);
    background: var(--hover-bg) !important;
    color: var(--hover-color) !important;
  }
  .bubble-menu-items .pill-link:active {
    transform: rotate(var(--item-rot)) scale(0.94);
  }
}
@media (max-width: 899px) {
  .bubble-menu-items {
    padding-top: 120px;
    align-items: flex-start;
  }
  .bubble-menu-items .pill-list {
    row-gap: 16px;
  }
  .bubble-menu-items .pill-list .pill-col {
    flex: 0 0 100% !important;
    margin-left: 0 !important;
    overflow: visible;
  }
  .bubble-menu-items .pill-link {
    font-size: clamp(1.2rem, 3vw, 4rem);
    padding: clamp(1rem, 2vw, 2rem) 0;
    min-height: 80px !important;
  }
  .bubble-menu-items .pill-link:hover {
    transform: scale(1.06);
    background: var(--hover-bg);
    color: var(--hover-color);
  }
  .bubble-menu-items .pill-link:active {
    transform: scale(0.94);
  }
}
</style>
