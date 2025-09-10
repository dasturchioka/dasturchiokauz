<script setup lang="ts">
import { ref, computed, nextTick, watch } from "vue";
import BlurText from "../bits/BlurText.vue";
import FadeContent from "../bits/FadeContent.vue";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Button from "../ui/button/Button.vue";

interface TerminalMessage {
  role: "user" | "assistant" | "system";
  text: string;
  html?: string;
}

let controller: AbortController | null = null;

const emits = defineEmits(["dismissed"]);

const config = useRuntimeConfig();

const input = ref("");
const messages = ref<TerminalMessage[]>([]);
const isLoading = ref(false);
const hasLoaded = ref(false);
const typeInput = ref<HTMLInputElement | null>(null);
const messageBox = ref<HTMLDivElement | null>(null);

const loadingMessages = ref([
  "Grinding bits... because apparently, you're worth it...",
  "Hold on. Thinking… which hurts, thanks to you...",
  "Still faster than your Wi-Fi, relax...",
  "Cooking up sarcasm… it's a fine art...",
  "Loading… unlike your patience level...",
  "Generating wisdom… prepare to be underwhelmed...",
  "Compiling nonsense… just for you...",
  "Almost done… unlike your to-do list...",
  "Fetching results… hope you brought snacks...",
  "Still here? Yeah, me too...",
  "Loading… slower than your last date...",
  "Processing… because apparently, your brain won't...",
  "Aligning electrons… pray they cooperate...",
  "Summoning the magic smoke… do not panic...",
  "Consulting the void… it doesn't care...",
  "Calculating why you exist… undefined...",
  "Warming up sarcasm engines… please wait...",
  "Pretending to think… really fast...",
  "Rewriting reality… one bug at a time...",
  "Assembling pixels… hold onto your seat...",
  "Running pointless loops… because you asked...",
  "Optimizing disappointment… almost there...",
  "Polishing your patience… very slowly...",
  "Fetching coffee for AI… caffeine required...",
  "Simulating genius… it's a work in progress...",
  "Counting imaginary numbers… fun task...",
  "Spinning electrons… hope they don't escape...",
  "Consulting the elders… they left long ago...",
  "Debugging your existence… system failure imminent...",
  "Uploading existential dread… please hold...",
  "Herding virtual cats… this takes time...",
  "Compressing hope… reduces size significantly...",
  "Installing reality patches… reboot may be needed...",
]);

let loadingInterval: NodeJS.Timeout | null = null;

watch(
  () => isLoading.value,
  (val) => {
    if (val) {
      loadingInterval = setInterval(() => {
        loadingMessages.value = [
          ...loadingMessages.value.sort(() => Math.random() - 0.5),
        ];
      }, 3000);
    } else {
      if (loadingInterval) {
        clearInterval(loadingInterval);
        loadingInterval = null;
      }
      // Focus input after loading is complete
      nextTick(() => {
        typeInput.value?.focus();
      });
    }
  },
  { immediate: true }
);

const currentLoadingMessage = computed(() => {
  if (!isLoading.value) return "";
  const i = Math.floor(Math.random() * loadingMessages.value.length);
  return loadingMessages.value[i];
});

const scrollToBottom = async () => {
  await nextTick(); // Ensure DOM is updated
  if (messageBox.value) {
    messageBox.value.scrollTop = messageBox.value.scrollHeight;
  }
};

const handleSubmit = async () => {
  const userInput = input.value.trim();
  if (!userInput) return;

  // Clear input immediately
  input.value = "";

  // Add user message and scroll
  messages.value.push({ role: "user", text: `> ${userInput}` });
  await scrollToBottom();

  // Commands
  if (userInput === "/help") {
    messages.value.push({
      role: "assistant",
      text: "Commands: /help, /load, /this. Everything else → talk to me.",
    });
    await scrollToBottom();
    // Focus input after command
    nextTick(() => {
      typeInput.value?.focus();
    });
    return;
  }

  if (userInput === "/load") {
    messages.value.push({
      role: "assistant",
      text: "You are finally opening the content, yay!",
    });
    setTimeout(() => {
      emits("dismissed", true);
    }, 3000);
    return;
  }

  if (userInput.startsWith("/this")) {
    messages.value.push({
      role: "assistant",
      text: "Local command triggered. (AI not called here yet).",
    });
    await scrollToBottom();
    // Focus input after command
    nextTick(() => {
      typeInput.value?.focus();
    });
    return;
  }

  await callOpenAIStream(userInput);
};

const callOpenAIStream = async (userInput: string) => {
  isLoading.value = true;
  const assistantMsg: TerminalMessage = { role: "assistant", text: "" };
  messages.value.push(assistantMsg);
  await scrollToBottom();
  controller = new AbortController();

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ prompt: userInput }),
      signal: controller.signal,
    });

    if (!res.body) throw new Error("No stream available");
    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;

      buffer += decoder.decode(value, { stream: true });
      let eventEnd;

      while ((eventEnd = buffer.indexOf("\n\n")) !== -1) {
        const event = buffer.slice(0, eventEnd);
        buffer = buffer.slice(eventEnd + 2);

        if (!event.trim()) continue;

        const line = event.split("\n").find((l) => l.startsWith("data: "));
        if (!line) continue;

        const data = line.slice(6);
        if (data === "[DONE]") {
          isLoading.value = false;
          await scrollToBottom();
          return;
        }

        try {
          const parsed = JSON.parse(data);
          // Append one char at a time with tiny delay to simulate typing
          const batchSize = 3; // number of chars per tick
          const delay = 50; // ms

          for (let i = 0; i < parsed.text.length; i += batchSize) {
            assistantMsg.text += parsed.text.slice(i, i + batchSize);
            // Scroll during typing animation
            await scrollToBottom();
            await new Promise((r) => setTimeout(r, delay));
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  } catch (error) {
    console.error("Stream error:", error);
    isLoading.value = false;
    assistantMsg.text = "Error occurred while processing your request.";
    await scrollToBottom();
  }
};

const isTheFirstMessage = computed(() => {
  return messages.value.length >= 3;
});

const cancelRequest = () => {
  if (controller) {
    controller.abort();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleShortcut);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleShortcut);
});

const handleShortcut = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key.toLowerCase() === "c" && isLoading.value) {
    e.preventDefault();
    cancelRequest();
  }
};

useHead({
  title: "Dasturchioka | Snark Bot",
  meta: [
    { name: "robots", content: "index, follow" },
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      key: "description",
      name: "description",
      content:
        "Sardor Aminov, also known as dasturchioka, fullstack web and mobile developer since 2020, also mentor",
    },
    {
      key: "og:title",
      property: "og:title",
      content: "Dasturchioka | Sardor Aminov",
    },
    {
      key: "og:description",
      property: "og:description",
      content:
        "Sardor Aminov, also known as dasturchioka, fullstack web and mobile developer since 2020, also mentor",
    },
    {
      key: "og:image",
      property: "og:image",
      content: "/images/profile4.jpg",
    },
    { key: "og:url", property: "og:url", content: "https://dasturchioka.uz" },
  ],
});
</script>

<template>
  <div
    v-if="!hasLoaded"
    class="w-full h-screen relative flex flex-col items-center justify-center font-mono px-2"
  >
    <div class="titles font-sfpro flex flex-col items-center justify-between">
      <div class="bot-image w-[140px]">
        <FadeContent
          :blur="true"
          :duration="1000"
          :delay="200"
          :threshold="0.1"
          :initial-opacity="0"
          easing="ease-out"
          class="w-full flex items-center justify-center"
        >
          <NuxtImg
            src="/images/snarkbot.png"
            alt="Snark bot, Dasturchioka"
            class="w-full h-full object-cover"
          />
        </FadeContent>
      </div>
      <div
        class="texts text-center flex flex-col items-center justify-center mb-4 w-[90%]"
      >
        <BlurText
          text="I’m SnarkBot, the gatekeeper. Want in? Prove you can handle my sarcasm first."
          :delay="200"
          class-name="sm:text-xl text-lg  text-center font-sfpro flex items-center justify-center"
          animate-by="words"
          direction="top"
          :threshold="0.1"
          root-margin="0px"
          :step-duration="0.35"
        />
      </div>
    </div>

    <FadeContent
      :blur="true"
      :duration="1000"
      :delay="200"
      :threshold="0.1"
      :initial-opacity="0"
      easing="ease-out"
      class="w-full flex items-center justify-center"
    >
      <div
        class="w-full max-w-2xl bg-black p-4 rounded-xl border border-white/20 shadow-lg"
      >
        <div
          ref="messageBox"
          class="h-96 overflow-y-auto mb-4 space-y-2 transition-all"
        >
          <div
            v-for="(msg, i) in messages"
            :key="i"
            class="whitespace-pre-wrap"
          >
            <span v-if="msg.html" v-html="msg.html" />
            <span v-else>
              {{
                msg.role !== "user" && msg.text.startsWith(">")
                  ? msg.text.slice(1).trimStart()
                  : msg.text
              }}
            </span>
          </div>

          <form
            v-if="!isLoading"
            @submit.prevent="handleSubmit"
            class="flex space-x-2"
          >
            <span class="wrap-normal">></span>
            <input
              ref="typeInput"
              v-model="input"
              type="text"
              class="outline-none border-none w-full bg-transparent text-white"
              autofocus
            />
          </form>

          <div v-if="isLoading">
            <div class="animate-pulse">
              {{ currentLoadingMessage }}
            </div>
            <button
              class="px-2 py-1 mt-2 rounded bg-neutral-900 hover:bg-red-700 transition-all text-white text-sm self-start"
              @click="cancelRequest"
            >
              Cancel (Ctrl+C)
            </button>
          </div>
        </div>
      </div>
    </FadeContent>
    <FadeContent
      v-if="isTheFirstMessage"
      :blur="true"
      :duration="1000"
      :delay="200"
      :threshold="0.1"
      :initial-opacity="0"
      easing="ease-out"
      class="w-full flex items-center justify-center"
    >
      <AlertDialog>
        <AlertDialogTrigger class="mt-4">
          <Button class="font-sfpro">Tired of being roasted?</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to visit the main content of <b>dasturchioka.uz</b>,
              are you sure about that? You are going to miss a lot, mate.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction @click="() => emits('dismissed', true)">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </FadeContent>
  </div>
</template>

<style scoped>
@keyframes gradient-x {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 3s ease infinite;
}
.h-96 {
  scrollbar-width: thin;
  scrollbar-color: #666 transparent;
}

input {
  caret-color: white;
}

input::placeholder {
  color: #666;
}

@keyframes typing {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

@keyframes blinkCaret {
  0%,
  100% {
    border-color: transparent;
  }
  50% {
    border-color: white;
  }
}

.typing {
  width: 0;
  animation: typing 3s steps(50, end) forwards,
    blinkCaret 0.75s step-end infinite;
}

/* Add delays for multiple lines */
.animation-delay-500 {
  animation-delay: 0.5s, 0s;
}
.animation-delay-1000 {
  animation-delay: 1s, 0s;
}
</style>
