<template>
  <p ref="rootRef" :class="['blur-text', className, 'flex', 'flex-wrap']">
    <Motion
      v-for="(segment, index) in elements"
      :key="`${animationKey}-${index}`"
      tag="span"
      :initial="fromSnapshot"
      :animate="inView ? getAnimateKeyframes() : fromSnapshot"
      :transition="getTransition(index)"
      :style="{
        display: 'inline-block',
        willChange: 'transform, filter, opacity',
      }"
      @animation-complete="() => handleAnimationComplete(index)"
    >
      {{ segment === " " ? "\u00A0" : segment
      }}{{
        animateBy === "words" && index < elements.length - 1 ? "\u00A0" : ""
      }}
    </Motion>
  </p>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  watch,
  useTemplateRef,
} from "vue";
import { Motion } from "motion-v";

type AnimateBy = "words" | "letters";
type Direction = "top" | "bottom";
type AnimationSnapshot = Record<string, string | number>;

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: AnimateBy;
  direction?: Direction;
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimationSnapshot;
  animationTo?: AnimationSnapshot[];
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
}

const props = withDefaults(defineProps<BlurTextProps>(), {
  text: "",
  delay: 200,
  className: "",
  animateBy: "words" as AnimateBy,
  direction: "top" as Direction,
  threshold: 0.1,
  rootMargin: "0px",
  easing: (t: number) => t,
  stepDuration: 0.35,
});

const buildKeyframes = (
  from: AnimationSnapshot,
  steps: AnimationSnapshot[]
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((step) => Object.keys(step)),
  ]);

  const keyframes: Record<string, Array<string | number>> = {};

  for (const key of keys) {
    keyframes[key] = [from[key], ...steps.map((step) => step[key])];
  }

  return keyframes;
};

const elements = computed(() =>
  props.animateBy === "words" ? props.text.split(" ") : props.text.split("")
);

const defaultFrom = computed<AnimationSnapshot>(() =>
  props.direction === "top"
    ? { filter: "blur(10px)", opacity: 0, y: -50 }
    : { filter: "blur(10px)", opacity: 0, y: 50 }
);

const defaultTo = computed<AnimationSnapshot[]>(() => [
  {
    filter: "blur(5px)",
    opacity: 0.5,
    y: props.direction === "top" ? 5 : -5,
  },
  {
    filter: "blur(0px)",
    opacity: 1,
    y: 0,
  },
]);

const fromSnapshot = computed(() => props.animationFrom ?? defaultFrom.value);
const toSnapshots = computed(() => props.animationTo ?? defaultTo.value);

const stepCount = computed(() => toSnapshots.value.length + 1);
const totalDuration = computed(
  () => props.stepDuration * (stepCount.value - 1)
);
const times = computed(() =>
  Array.from({ length: stepCount.value }, (_, i) =>
    stepCount.value === 1 ? 0 : i / (stepCount.value - 1)
  )
);

const inView = ref(false);
const animationKey = ref(0);
const completionFired = ref(false);
const rootRef = useTemplateRef<HTMLParagraphElement>("rootRef");

let observer: IntersectionObserver | null = null;

const setupObserver = () => {
  if (!rootRef.value) return;

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        inView.value = true;
        observer?.unobserve(rootRef.value as Element);
      }
    },
    {
      threshold: props.threshold,
      rootMargin: props.rootMargin,
    }
  );

  observer.observe(rootRef.value);
};

const getAnimateKeyframes = () => {
  return buildKeyframes(fromSnapshot.value, toSnapshots.value);
};

const getTransition = (index: number) => {
  return {
    duration: totalDuration.value,
    times: times.value,
    delay: (index * props.delay) / 1000,
    ease: props.easing,
  };
};

const handleAnimationComplete = (index: number) => {
  if (
    index === elements.value.length - 1 &&
    !completionFired.value &&
    props.onAnimationComplete
  ) {
    completionFired.value = true;
    props.onAnimationComplete();
  }
};

onMounted(() => {
  setupObserver();
});

onUnmounted(() => {
  observer?.disconnect();
});

watch([() => props.threshold, () => props.rootMargin], () => {
  observer?.disconnect();
  setupObserver();
});

watch(
  [
    () => props.delay,
    () => props.stepDuration,
    () => props.animateBy,
    () => props.direction,
  ],
  () => {
    animationKey.value++;
    completionFired.value = false;
  }
);
</script>
