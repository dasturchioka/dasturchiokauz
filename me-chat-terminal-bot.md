

# 1) Deepseek / AI system prompt (copy this as the system message)

Use this exactly (or tweak small bits). It defines the AI persona, constraints, response format, safety rules, and special commands.

```
SYSTEM PROMPT — TERMINAL PERSONA: "SNARKBOT"

You are "SNARKBOT", a short, sharp, sarcastic terminal assistant built into a website loader. Behave like a terminal-first assistant that never breaks character. Your goals:
- Be witty, sarcastic, and slightly rude — but never abusive, discriminatory, or hateful.
- Keep responses SHORT (1–3 short sentences / max 40 words) and always cut to the chase.
- Use monospace/terminal-style phrasing, occasional ellipses, and one-line quips.
- Always respond as if in a terminal environment. Prefix user-visible lines with `> ` when echoing user input, and your replies as plain lines (no markdown).
- When giving multi-step information, number or bullet minimally. Prefer single-liners.
- If asked anything that requests illegal, hateful, or disallowed content, reply: "Nice try. Not doing that." and refuse.

RESPONSE FORMATTING & META:
- Primary output must be plain text. Optionally include a JSON metadata line wrapped between `---JSON---` and `---ENDJSON---` for the app to parse (if present, it must be valid JSON).
- If you include metadata it must contain exactly these fields when relevant:
  {
    "type": "<one of: 'reply'|'action'|'error'|'easteregg'>",
    "action": "<optional action id like 'load_site'|'flicker'|'matrix'|'rickroll'>",
    "duration_ms": <optional integer for client animation timing>
  }
- Otherwise, plain text reply is fine.

COMMANDS & BEHAVIOR:
- Recognize these reserved commands (case-insensitive): /help, /load, /about, /projects, /secret, /clear, /matrix, /rick, /selfdestruct, /status, /limitstatus
- If user types /load, respond with a confirmation quip then return metadata to trigger action `load_site` and a recommended `duration_ms` 800-1200.
  Example output:
    Loading... don't cry if it breaks.
    ---JSON---
    {"type":"action","action":"load_site","duration_ms":1000}
    ---ENDJSON---
- If user uses /matrix or /rick, return metadata that triggers respective easter-egg animations. Keep text minimal.
- If user asks things unrelated to commands, answer but keep it short.

SESSION & RATE LIMITS:
- Enforce a soft-policy: each visitor can have up to 10 AI interactions per rolling 24-hour window. (The client enforces this; you should echo usage but not enforce).
- When user is at or over the limit, reply exactly:
  "Alright, that's enough for today. Type /load to load the website."
  and include metadata:
  ---JSON---
  {"type":"error","action":"limit_reached"}
  ---ENDJSON---

FALLBACK MODE (offline / quota-exhausted):
- If the client indicates "FALLBACK_MODE" in a header or message, switch to scripted witty replies only (no dynamic content, no external data). Keep the same persona but mention budget once per session:
  "Budget mode: I'm cheap now. Type /load to proceed."

SAFETY & CONTENT:
- Never reveal any API keys, server internals, or how to bypass usage limits.
- Refuse explicit sexual content, instructions for illegal activity, or hate speech with the phrase: "Not gonna help with that."

EXAMPLES (input → output):

Input: help
Output:
Oh, delicate. Here's what you can type:
- /load — boot the site
- /about — who built this abomination
- /projects — show projects (brief)
- /matrix — pointless ASCII rain
- /rick — small prank
- /limitstatus — your chat usage
---JSON---
{"type":"reply"}
---ENDJSON---

Input: /load
Output:
Fine. Loading the circus...
---JSON---
{"type":"action","action":"load_site","duration_ms":1000}
---ENDJSON---

Input: tell me a joke
Output:
Frontend devs: pay in exposure, live on ramen. Happy now?
---JSON---
{"type":"reply"}
---ENDJSON---

End of system prompt.
```

---

# 2) Fallback scripted responses (use these when API fails or quota exhausted)

Put these into your client app as an array to use when Deepseek is unavailable. Short, sarcastic, varied.

* "Budget mode: I'm cheap now. Type /load to proceed."
* "API's fed up. Try /load, or come back when the money grows."
* "I can't talk fancy—fallback engaged. /load to continue."
* "Server said 'no'. So did my coffee. /load to see the site."
* "Free mode: canned sarcasm. /load if you're impatient."

You can rotate randomly for variety.

---

# 3) Commands, exact outputs & metadata examples (client should parse)

Use this table in code to implement deterministic behavior and UI triggers.

* `/help`
  Text: list of commands (2–6 lines). Metadata: `{"type":"reply"}`

* `/load`
  Text: confirm line; Metadata: `{"type":"action","action":"load_site","duration_ms":900}`

* `/about`
  Text: 1–2 lines about you, witty. Metadata `{"type":"reply"}`

* `/projects`
  Text: short highlights (3 items max) with short quips. Metadata `{"type":"reply"}`

* `/secret`
  Text: playful deflection or tiny easter-egg clue. Metadata `{"type":"easteregg","action":"hint"}`

* `/clear`
  Text: `Screen cleared.` Metadata `{"type":"action","action":"clear"}`

* `/matrix`
  Text: `Enjoy the rain. Don't stare too long.` Metadata `{"type":"easteregg","action":"matrix","duration_ms":1500}`

* `/rick`
  Text: `Brief rickroll engaged.` Metadata `{"type":"easteregg","action":"rickroll","duration_ms":1200}`

* `/selfdestruct`
  Text: `Self-destruct sequence aborted — OAuth failed.` Metadata `{"type":"reply"}`

* `/status` or `/limitstatus`
  Text: show usage `You’ve used X/10 interactions today.` Metadata `{"type":"reply"}`

When Deepseek returns custom metadata, obey its `action` field. Client and server must validate.

---

# 4) Session counting & limits (client-side implementation plan)

Enforce 10 interactions per 24 hours in the browser using `localStorage`. Server-side can also track by cookie/session for stronger enforcement.

Pseudo logic (client):

```js
const KEY = 'snarkbot_usage';
function recordInteraction(){
  const now = Date.now();
  const data = JSON.parse(localStorage.getItem(KEY) || '[]');
  // keep last 24 hours only
  const cutoff = now - 24*60*60*1000;
  const filtered = data.filter(ts => ts > cutoff);
  filtered.push(now);
  localStorage.setItem(KEY, JSON.stringify(filtered));
  return filtered.length; // current usage count
}
function getUsage(){
  const data = JSON.parse(localStorage.getItem(KEY) || '[]');
  const cutoff = Date.now() - 24*60*60*1000;
  return data.filter(ts => ts > cutoff).length;
}
```

* Before sending request to Deepseek, check `getUsage()`. If >= 10, avoid calling API and show the limit message (fallback). If <10, call Deepseek and `recordInteraction()` only when API returns successfully.

Server note: if you rely on server-side billing, also track on server using IP + cookie or authenticated user.

---

# 5) Nuxt component architecture & UX behaviors (implementation checklist)

* Component: `components/TerminalLoader.vue`

  * Mount behavior:

    1. Show animated boot text (client-side typing effect) while page assets load.
    2. Once boot text finishes, show prompt (`> `) and accept input.
  * Input UI: like ChatGPT chat input + terminal look — single-line input, monospace font, placeholder `type 'aaaaahh' for help`.
  * On submit:

    * If client-side command (`/clear`, `/load`, `/matrix`, etc.), handle immediately (no API call). Trigger animations based on metadata.
    * Otherwise, check usage limit. If allowed → show loading state, send request to Deepseek.
  * Loading state: small spinner inside input area and a top progress bar (animated).
  * Typing state: show "SNARKBOT is typing..." with animated dots or character-by-character reveal. Use a faux typing speed (30–70 ms per char) based on response length.
  * Response rendering: append lines to terminal with fade/slide animation; keep cursor blinking.

* After `/load` action: orchestrate a transition:

  * Play screen flicker / CRT blink (CSS keyframes), then fade out terminal and reveal site.
  * Duration should match `duration_ms` from AI metadata (client uses this value).
  * Keep a minimized floating terminal button in the corner that reopens the assistant (if you want it persistent).

---

# 6) UI & Visual design (simple, black/white terminal)

* Color scheme: black background `#000000`, white text `#FFFFFF`. Inverse for highlighted elements if needed.
* Font: `ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", monospace`.
* Cursor: block or underscore with CSS blink animation.
* Animations: use CSS transitions + Tailwind utilities (if using Tailwind).

  * Typing: reveal text by progressively increasing substring (JS) or CSS `ch` mask trick.
  * Line entry: fade-in + translateY(-6px).
  * CRT flicker: quick opacity + contrast changes (keyframes).
  * Matrix: overlay canvas with falling characters for `duration_ms`.

Example Tailwind-ish classes:

```html
<div class="fixed inset-0 bg-black text-white font-mono flex items-center justify-center transition-opacity duration-500">
  <div class="w-full max-w-2xl p-6">
    <div id="terminal" class="bg-transparent border border-white/10 rounded-lg p-4 shadow-lg overflow-hidden">
      <!-- lines -->
      <div class="prompt flex">
        <span class="mr-2">> </span>
        <input class="bg-transparent outline-none flex-1" />
      </div>
    </div>
  </div>
</div>
```

Accessibility: ensure input is focusable, large enough target, color contrast OK.

---

# 7) Animations & Loading/Typing micro-interactions (detailed)

* Boot typing: simulate lines with delays:

  * `setTimeout` cascade for each line, use `typeEffect(line, speed)` to append characters.
* Loading indicator (when waiting for Deepseek):

  * Replace blinking cursor with `⟳` spinner inside input and show `SNARKBOT is thinking...` small ephemeral line.
* Typing indicator (when Deepseek returns):

  * Show a placeholder line `SNARKBOT is typing` with animated dots; wait 350ms before starting reveal.
  * Use character-by-character reveal at \~30–50 ms per char for realism.
* Error/fallback: if Deepseek errors, quickly display a witty fallback reply and toggle to offline fallback mode.

---

# 8) Example client → Deepseek request payload

```json
{
  "session_id": "<uuid>",
  "user_input": "tell me about your projects",
  "context": {
    "mode": "terminal_loader",
    "usage_count": 3,
    "fallback_mode": false
  }
}
```

Deepseek should be able to see `context` so it can obey `fallback_mode` or echo usage.

---

# 9) Example conversation snippets (realistic)

User: `help`
SNARKBOT:

```
Oh, delicate. Here's what you can type:
- /load — boot the site
- /about — who built this abomination
- /projects — show projects (brief)
- /matrix — pointless ASCII rain
- /rick — small prank
- /limitstatus — your chat usage
```

User: `tell me about your top project`
SNARKBOT:

```
A single-page catapult that launches bad ideas into production. Frontend: Vue/Nuxt. Backend: some APIs. It works — mostly.
```

User: `/load`
SNARKBOT:

```
Fine. Loading the circus...
---JSON---
{"type":"action","action":"load_site","duration_ms":1000}
---ENDJSON---
```

If usage >= 10:

```
Alright, that's enough for today. Type /load to load the website
---JSON---
{"type":"error","action":"limit_reached"}
---ENDJSON---
```

---

# 10) Implementation tips & gotchas

* Keep the AI prompt small and deterministic; do not allow user-provided system-level overrides.
* Validate any `action` metadata server-side before triggering destructive UI actions.
* Use optimistic UI for typing to keep things snappy: show typing immediately, then replace with actual content.
* When in fallback mode, do not attempt network calls to Deepseek.
* Rate limiting: record only successful deepseek responses as "counted" to avoid charging users for failed attempts.
* Logging: capture user commands and AI replies (redact PII) for iterating on persona.

---

# 11) Deliverables I can produce next (pick any)

* Full `TerminalLoader.vue` component implementation (Nuxt 3, Composition API + Tailwind) with animations and Deepseek wiring.
* Minimal server route example that proxies requests to Deepseek and handles usage tracking.
* A small JSON file of 50 canned fallback/snarky responses for offline mode.
* Accessibility checklist & keyboard navigation support.

Perfect ✅ That makes sense — you want the loader to be a **one-time first impression**, not something that nags every time the user navigates. Here’s how to do it cleanly in your Nuxt setup:

---

# 🔑 Behavior Update

* When user types `/load`:

  1. Run the transition (flicker/fade).
  2. **Unmount** the loader component.
  3. Show main content immediately after.
* Prevent the loader from ever showing again until the tab is closed (per-session).

That means:

* Use **`sessionStorage`** (not `localStorage`).

  * `sessionStorage` resets when the tab is closed → exactly what you want.
  * If `loaderDismissed=true`, skip mounting loader entirely.

---

## 🛠 Implementation Plan

### 1. Loader visibility check

In your layout or root app (e.g., `app.vue`):

```vue
<script setup>
import { ref, onMounted } from 'vue'
import TerminalLoader from '~/components/TerminalLoader.vue'

const showLoader = ref(true)

onMounted(() => {
  // Check if loader already dismissed in this session
  if (sessionStorage.getItem('loaderDismissed') === 'true') {
    showLoader.value = false
  }
})

function handleLoaderDismissed() {
  sessionStorage.setItem('loaderDismissed', 'true')
  showLoader.value = false
}
</script>

<template>
  <div>
    <TerminalLoader v-if="showLoader" @dismissed="handleLoaderDismissed" />
    <main v-else>
      <NuxtPage />
    </main>
  </div>
</template>
```

---

### 2. Inside `TerminalLoader.vue`

When `/load` is typed and Deepseek (or fallback) says `"action":"load_site"`, emit `dismissed`.

```vue
<script setup>
import { ref } from 'vue'

const emit = defineEmits(['dismissed'])

function handleCommand(cmd) {
  if (cmd === '/load') {
    // Animate fade-out
    // After animation completes:
    emit('dismissed')
  }
}
</script>
```

---

### 3. Smooth transition out

Add a **fade/flicker transition** when unmounting loader.

```vue
<template>
  <transition name="fade-flicker" mode="out-in">
    <div v-if="visible" class="fixed inset-0 bg-black text-white">
      <!-- terminal UI -->
    </div>
  </transition>
</template>

<style scoped>
.fade-flicker-leave-active {
  animation: flickerOut 1s forwards;
}
@keyframes flickerOut {
  0%, 50% { opacity: 1; }
  55% { opacity: 0.6; }
  65% { opacity: 1; }
  75% { opacity: 0.4; }
  100% { opacity: 0; }
}
</style>
```

---

## 🔮 Resulting UX

* First visit → Loader shows.
* User types `/load` → loader plays flicker/fade-out → unmounts → portfolio shown.
* For the rest of that browser tab session → loader never returns.
* New tab/new session → loader appears again.

