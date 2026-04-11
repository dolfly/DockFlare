<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { Paperclip, X, Bold, Italic, Link2, List, ListOrdered, Minus } from 'lucide-vue-next'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import LinkExtension from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import { mailApi } from '../../api/mail'
import { useMailStore } from '../../stores/mail'
import Button from '../ui/Button.vue'
import Input from '../ui/Input.vue'

const store = useMailStore()

const to = ref('')
const subject = ref('')
const attachments = ref<File[]>([])
const sending = ref(false)
const error = ref('')
const minimized = ref(false)

const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024

const editor = useEditor({
  extensions: [
    StarterKit,
    LinkExtension.configure({ openOnClick: false }),
    Placeholder.configure({ placeholder: 'Write your message…' }),
    Typography,
  ],
  editorProps: {
    attributes: { class: 'tiptap-editor' },
  },
})

watch(() => store.isComposeOpen, (open) => {
  if (open && store.composeDefaults) {
    to.value = store.composeDefaults.to || ''
    subject.value = store.composeDefaults.subject || ''
    if (store.composeDefaults.body) {
      editor.value?.commands.setContent(store.composeDefaults.body)
    }
    minimized.value = false
  } else if (!open) {
    reset()
  }
})

onUnmounted(() => editor.value?.destroy())

const reset = () => {
  to.value = ''
  subject.value = ''
  attachments.value = []
  error.value = ''
  minimized.value = false
  editor.value?.commands.clearContent()
  store.composeDefaults = null
}

const close = () => {
  store.isComposeOpen = false
}

const toggleMinimize = () => {
  minimized.value = !minimized.value
}

const onFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (!input.files) return
  for (const file of Array.from(input.files)) {
    if (!attachments.value.find(f => f.name === file.name && f.size === file.size)) {
      attachments.value.push(file)
    }
  }
  input.value = ''
}

const removeAttachment = (index: number) => {
  attachments.value.splice(index, 1)
}

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const setLink = () => {
  const prev = editor.value?.getAttributes('link').href || ''
  const url = window.prompt('Enter URL', prev)
  if (url === null) return
  if (url === '') {
    editor.value?.chain().focus().unsetLink().run()
  } else {
    editor.value?.chain().focus().setLink({ href: url }).run()
  }
}

const send = async () => {
  if (!store.currentMailbox || !editor.value) return

  const totalSize = attachments.value.reduce((sum, f) => sum + f.size, 0)
  if (totalSize > MAX_ATTACHMENT_BYTES) {
    error.value = `Attachments exceed 10 MB limit (${formatBytes(totalSize)} total).`
    return
  }

  sending.value = true
  error.value = ''
  try {
    const html = editor.value.getHTML()
    const text = editor.value.getText()
    const formData = new FormData()
    formData.append('to', to.value)
    formData.append('subject', subject.value)
    formData.append('html', html)
    formData.append('text', text)
    for (const file of attachments.value) {
      formData.append('attachments', file)
    }
    await mailApi.sendMessage(store.currentMailbox, formData)
    close()
  } catch (e: any) {
    error.value = e?.response?.data?.error || 'Failed to send. Please try again.'
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <Transition name="compose-pop">
    <div
      v-if="store.isComposeOpen"
      class="fixed bottom-0 right-6 z-50 flex flex-col rounded-t-xl shadow-2xl border border-border bg-background"
      :style="minimized ? 'width:320px' : 'width:520px'"
    >
      <!-- Title bar -->
      <div
        class="flex items-center gap-2 rounded-t-xl bg-primary px-4 py-2.5 cursor-pointer select-none"
        @click="toggleMinimize"
      >
        <span class="flex-1 text-sm font-semibold text-primary-foreground truncate">
          {{ subject || 'New Message' }}
        </span>
        <button
          type="button"
          class="rounded p-0.5 text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10 transition-colors"
          title="Minimize"
          @click.stop="toggleMinimize"
        >
          <Minus class="size-4" />
        </button>
        <button
          type="button"
          class="rounded p-0.5 text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10 transition-colors"
          title="Close"
          @click.stop="close"
        >
          <X class="size-4" />
        </button>
      </div>

      <!-- Body — hidden when minimized -->
      <div v-show="!minimized" class="flex flex-col">
        <!-- Fields -->
        <div class="flex flex-col border-b border-border">
          <input
            v-model="to"
            placeholder="To"
            class="w-full border-b border-border px-4 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <input
            v-model="subject"
            placeholder="Subject"
            class="w-full px-4 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>

        <!-- Toolbar -->
        <div class="flex items-center gap-0.5 border-b border-border bg-muted/50 px-3 py-1">
          <button
            type="button"
            class="rounded p-1.5 hover:bg-accent transition-colors"
            :class="editor?.isActive('bold') ? 'bg-accent' : ''"
            @click="editor?.chain().focus().toggleBold().run()"
            title="Bold"
          >
            <Bold class="size-3.5" />
          </button>
          <button
            type="button"
            class="rounded p-1.5 hover:bg-accent transition-colors"
            :class="editor?.isActive('italic') ? 'bg-accent' : ''"
            @click="editor?.chain().focus().toggleItalic().run()"
            title="Italic"
          >
            <Italic class="size-3.5" />
          </button>
          <button
            type="button"
            class="rounded p-1.5 hover:bg-accent transition-colors"
            :class="editor?.isActive('strike') ? 'bg-accent' : ''"
            @click="editor?.chain().focus().toggleStrike().run()"
            title="Strikethrough"
          >
            <span class="text-xs font-bold line-through leading-none">S</span>
          </button>
          <div class="mx-1 h-4 w-px bg-border" />
          <button
            type="button"
            class="rounded p-1.5 hover:bg-accent transition-colors"
            :class="editor?.isActive('bulletList') ? 'bg-accent' : ''"
            @click="editor?.chain().focus().toggleBulletList().run()"
            title="Bullet list"
          >
            <List class="size-3.5" />
          </button>
          <button
            type="button"
            class="rounded p-1.5 hover:bg-accent transition-colors"
            :class="editor?.isActive('orderedList') ? 'bg-accent' : ''"
            @click="editor?.chain().focus().toggleOrderedList().run()"
            title="Ordered list"
          >
            <ListOrdered class="size-3.5" />
          </button>
          <div class="mx-1 h-4 w-px bg-border" />
          <button
            type="button"
            class="rounded p-1.5 hover:bg-accent transition-colors"
            :class="editor?.isActive('link') ? 'bg-accent' : ''"
            @click="setLink"
            title="Insert link"
          >
            <Link2 class="size-3.5" />
          </button>
        </div>

        <!-- Editor -->
        <EditorContent :editor="editor" class="compose-editor" />

        <!-- Attachment list -->
        <div v-if="attachments.length" class="flex flex-wrap gap-1.5 border-t border-border px-4 py-2">
          <div
            v-for="(file, i) in attachments"
            :key="i"
            class="flex items-center gap-1 bg-muted text-muted-foreground text-xs rounded px-2 py-1"
          >
            <span class="truncate max-w-[140px]">{{ file.name }}</span>
            <span class="text-muted-foreground/60">({{ formatBytes(file.size) }})</span>
            <button type="button" @click="removeAttachment(i)" class="ml-1 hover:text-destructive">
              <X :size="12" />
            </button>
          </div>
        </div>

        <div v-if="error" class="px-4 py-1 text-xs text-red-500">{{ error }}</div>

        <!-- Footer -->
        <div class="flex items-center justify-between gap-2 border-t border-border px-4 py-2.5">
          <label class="cursor-pointer flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <Paperclip :size="15" />
            <input type="file" multiple class="hidden" @change="onFileChange" />
          </label>
          <div class="flex gap-2">
            <Button
              as="button"
              type="button"
              size="sm"
              @click.prevent="send"
              :disabled="sending || !to"
            >
              {{ sending ? 'Sending…' : 'Send' }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
/* Tiptap editor inside compose */
.compose-editor .tiptap-editor {
  padding: 0.75rem 1rem;
  min-height: 200px;
  max-height: 320px;
  overflow-y: auto;
  font-size: 0.875rem;
  outline: none;
  line-height: 1.5;
}
.compose-editor .tiptap-editor p {
  margin: 0 0 0.35em;
}
.compose-editor .tiptap-editor p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  color: hsl(var(--muted-foreground));
  pointer-events: none;
  float: left;
  height: 0;
}
.compose-editor .tiptap-editor ul,
.compose-editor .tiptap-editor ol {
  padding-left: 1.25rem;
  margin: 0 0 0.35em;
}
.compose-editor .tiptap-editor a {
  color: hsl(var(--primary));
  text-decoration: underline;
}

/* Pop-up animation */
.compose-pop-enter-active { transition: transform 0.18s ease, opacity 0.18s ease; }
.compose-pop-leave-active { transition: transform 0.14s ease, opacity 0.14s ease; }
.compose-pop-enter-from  { transform: translateY(16px); opacity: 0; }
.compose-pop-leave-to    { transform: translateY(16px); opacity: 0; }
</style>
