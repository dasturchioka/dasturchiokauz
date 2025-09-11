<script setup lang="ts">
import { ref, computed, nextTick, watch } from "vue";
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
  id: string;
}

let controller: AbortController | null = null;
let messageIdCounter = 0;

const emits = defineEmits(["dismissed"]);

const config = useRuntimeConfig();

const input = ref("");
const messages = ref<TerminalMessage[]>([]);
const isLoading = ref(false);
const hasLoaded = ref(false);
const typeInput = ref<HTMLTextAreaElement | null>(null);
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

const adjustTextareaHeight = () => {
  if (typeInput.value) {
    typeInput.value.style.height = "auto";
    typeInput.value.style.height =
      Math.min(typeInput.value.scrollHeight, 120) + "px";
  }
};

const handleSubmit = async (e?: KeyboardEvent) => {
  const userInput = input.value.trim();
  if (!userInput) return;

  // Clear input immediately
  input.value = "";
  adjustTextareaHeight();

  // Add user message and scroll
  messages.value.push({
    role: "user",
    text: userInput,
    id: `msg-${messageIdCounter++}`,
  });
  await scrollToBottom();

  // Commands
  if (userInput === "/help") {
    messages.value.push({
      role: "assistant",
      text: "Commands: /help, /load, /this. Everything else → talk to me.",
      id: `msg-${messageIdCounter++}`,
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
      id: `msg-${messageIdCounter++}`,
    });
    setTimeout(() => {
      hasLoaded.value = true; // Trigger leave transition
    }, 2000);
    return;
  }

  if (userInput.startsWith("/this")) {
    messages.value.push({
      role: "assistant",
      text: "Local command triggered. (AI not called here yet).",
      id: `msg-${messageIdCounter++}`,
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
  const assistantMsg: TerminalMessage = {
    role: "assistant",
    text: "",
    id: `msg-${messageIdCounter++}`,
  };
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

const onEnter = (el: Element) => {
  // Optional: Add any enter animations here
};

const onLeave = (el: Element, done: () => void) => {
  // Emit dismissed after leave animation completes
  setTimeout(() => {
    emits("dismissed", true);
    done();
  }, 600); // Match transition duration
};

onMounted(() => {
  window.addEventListener("keydown", handleShortcut);
  adjustTextareaHeight();
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
  <transition
    name="website-loader"
    appear
    @enter="onEnter"
    @leave="onLeave"
  >
    <div
      v-if="!hasLoaded"
      class="w-full h-screen relative flex flex-col items-center justify-center font-mono px-2"
    >
      <div class="titles font-sfpro flex flex-col items-center justify-between">
        <div class="bot-image w-[140px]">
          <NuxtImg
            src="/images/snarkbot.png"
            alt="Snark bot, Dasturchioka"
            class="w-full h-full object-cover"
          />
        </div>
        <div
          class="texts text-center flex flex-col items-center justify-center mb-4 w-[90%]"
        >
          <h1 class="sm:text-xl text-lg text-center font-sfpro">
            I'm SnarkBot, the gatekeeper. Want in? Prove you can handle my sarcasm first.
          </h1>
        </div>
      </div>

      <div class="w-full max-w-4xl bg-black/90 backdrop-blur-sm rounded-xl border border-white/20 shadow-2xl overflow-hidden flex flex-col h-[500px]">
        <!-- Chat Messages Area -->
        <div
          ref="messageBox"
          class="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
        >
          <div
            v-for="(msg, i) in messages"
            :key="msg.id"
            class="message-animate"
            :class="
              msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'
            "
          >
            <!-- Assistant Message (Left side with robot icon) -->
            <div
              v-if="msg.text &&  msg.role === 'assistant'"
              class="flex items-start space-x-3 max-w-[80%]"
            >
              <div
                class="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  />
                </svg>
              </div>
              <div
                class="bg-gray-800/80 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 text-white/90 shadow-lg"
              >
                <div class="whitespace-pre-wrap break-words">
                  <span v-if="msg.html" v-html="msg.html" />
                  <span v-else>{{ msg.text }}</span>
                </div>
              </div>
            </div>

            <!-- User Message (Right side) -->
            <div
              v-else-if="msg.role === 'user'"
              class="flex items-start space-x-3 max-w-[80%]"
            >
              <div
                class="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl rounded-tr-sm px-4 py-3 text-white shadow-lg"
              >
                <div class="whitespace-pre-wrap break-words">
                  {{ msg.text }}
                </div>
              </div>
              <div
                class="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Loading indicator -->
          <div v-if="isLoading" class="flex justify-start">
            <div class="flex items-start space-x-3 max-w-[80%]">
              <div
                class="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-white animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
              <div
                class="bg-gray-800/60 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 text-white/70 shadow-lg"
              >
                <div class="flex items-center space-x-2">
                  <div class="animate-pulse">{{ currentLoadingMessage }}</div>
                </div>
                <button
                  class="mt-2 px-3 py-1 text-xs rounded-lg bg-red-600/80 hover:bg-red-700 transition-colors text-white"
                  @click="cancelRequest"
                >
                  Cancel (Ctrl+C)
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="border-t border-white/10 p-4 bg-black/50 backdrop-blur-sm">
          <div class="flex items-end space-x-3">
            <div class="flex-1 relative">
              <textarea
                ref="typeInput"
                v-model="input"
                @keydown.enter="handleSubmit"
                @input="adjustTextareaHeight"
                placeholder="Type your message..."
                class="w-full bg-gray-800/60 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 resize-none outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all min-h-[48px] max-h-[120px]"
                rows="1"
                :disabled="isLoading"
                autofocus
              />
            </div>
            <Button
              @click="handleSubmit"
              :disabled="!input.trim() || isLoading"
              class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl flex items-center justify-center text-white transition-all shadow-lg hover:shadow-xl"
            >
              <svg
                v-if="!isLoading"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
              <svg
                v-else
                class="w-5 h-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <div v-if="isTheFirstMessage" class="mt-4">
        <AlertDialog>
          <AlertDialogTrigger>
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
              <AlertDialogAction @click="() => { hasLoaded = true; }"
                >Continue</AlertDialogAction
              >
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  </transition>
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

@keyframes messageSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-animate {
  animation: messageSlideIn 0.3s ease-out forwards;
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 3s ease infinite;
}

/* Custom scrollbar */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

/* Textarea styling */
textarea {
  field-sizing: content;
}

textarea::placeholder {
  color: rgba(156, 163, 175, 0.7);
}

/* Message bubble shadows */
.bg-gray-800\/80,
.bg-gradient-to-br {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.3),
    0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

/* Smooth transitions */
* {
  transition: all 0.2s ease;
}

/* Component transition styles */
.website-loader-enter-active {
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.website-loader-leave-active {
  transition: all 0.6s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.website-loader-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}

.website-loader-leave-to {
  opacity: 0;
  transform: scale(1.05) translateY(-20px);
}
</style>