<script setup lang="ts">
import { LucideLoader, LucideLoaderPinwheel } from "#components";
import { ref, reactive, computed, nextTick, watch } from "vue";

interface TerminalMessage {
  role: "user" | "assistant" | "system";
  text: string;
  html?: string;
}

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

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ prompt: userInput }),
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
</script>

<template>
  <ClientOnly>
    <div
      v-if="!hasLoaded"
      class="w-full h-screen bg-black text-white flex flex-col items-center justify-center font-mono"
    >
      <div
        class="w-full max-w-2xl bg-black p-4 rounded-xl border border-white/20 shadow-lg"
      >
        <div
          ref="messageBox"
          class="h-96 overflow-y-auto mb-4 space-y-2 transition-all"
        >
          <div class="space-y-2">
            <!-- Line 1 -->
            <p>
              Hello, this is a bot developed by
              <span class="text-blue-500">Dasturchioka</span> <br />

              Pass me through to access the website's content
              <br />
              Good luck, champ!
            </p>
            <!-- Line 2 -->
            <p
              class="typing overflow-hidden whitespace-nowrap border-r-2 border-white animate-typing animation-delay-500"
            ></p>
            <!-- Line 3 -->
            <p
              class="typing overflow-hidden whitespace-nowrap border-r-2 border-white animate-typing animation-delay-1000"
            ></p>
          </div>
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

          <div v-if="isLoading" class="animate-pulse">
            {{ currentLoadingMessage }}
          </div>
        </div>
      </div>
    </div>
    <template #fallback>
      <div
        class="fixed inset-0 w-full h-screen z-[100] flex items-center justify-center dark:bg-[#151515] bg-white dark:text-white text-black font-sfpro flex-col gap-4"
      >
        <LucideLoader class="size-10 animate-spin" />
      </div>
    </template>
  </ClientOnly>
</template>

<style scoped>
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
