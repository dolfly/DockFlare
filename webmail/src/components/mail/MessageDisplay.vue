<script setup lang="ts">
import { computed } from 'vue'
import DOMPurify from 'dompurify'
import { format } from 'date-fns'
import Avatar from '../ui/Avatar.vue'
import Button from '../ui/Button.vue'
import Separator from '../ui/Separator.vue'
import AttachmentBar from './AttachmentBar.vue'
import { useMailStore } from '../../stores/mail'
import { mailApi } from '../../api/mail'

const props = defineProps({
  message: { type: Object, default: null }
})

const store = useMailStore()

const safeHtml = computed(() => {
  if (!props.message?.html_body) return ''
  return DOMPurify.sanitize(props.message.html_body)
})

const quotedBody = computed(() => {
  if (!props.message) return ''
  const from = props.message.from_address || ''
  const date = props.message.received_at ? format(new Date(props.message.received_at), 'PPpp') : ''
  const original = props.message.html_body || `<pre>${props.message.text_body || ''}</pre>`
  return `<p></p><blockquote style="border-left:2px solid #ccc;padding-left:1em;color:#555;"><p>On ${date}, ${from} wrote:</p>${original}</blockquote>`
})

const reply = () => {
  if (!props.message) return
  store.composeDefaults = {
    to: props.message.from_address,
    subject: props.message.subject?.startsWith('Re:') ? props.message.subject : `Re: ${props.message.subject || ''}`,
    body: quotedBody.value
  }
  store.isComposeOpen = true
}

const forward = () => {
  if (!props.message) return
  store.composeDefaults = {
    to: '',
    subject: props.message.subject?.startsWith('Fwd:') ? props.message.subject : `Fwd: ${props.message.subject || ''}`,
    body: quotedBody.value
  }
  store.isComposeOpen = true
}

const trash = async () => {
  if (!props.message || !store.currentMailbox) return
  try {
    await mailApi.deleteMessage(store.currentMailbox, props.message.id)
    store.messages = store.messages.filter((m: any) => m.id !== props.message!.id)
    store.currentMessage = null
  } catch (e) {
    console.error('Failed to trash message', e)
  }
}
</script>

<template>
  <div v-if="message" class="flex h-full flex-col">
    <div class="flex items-start p-4">
      <div class="flex items-start gap-4 text-sm">
        <Avatar :initials="message.from_name?.[0] || message.from_address?.[0] || '?'" />
        <div class="grid gap-1">
          <div class="font-semibold">{{ message.from_name }}</div>
          <div class="line-clamp-1 text-xs">{{ message.subject }}</div>
          <div class="line-clamp-1 text-xs">
            <span class="font-medium">From:</span> {{ message.from_address }}
          </div>
        </div>
      </div>
      <div v-if="message.received_at" class="ml-auto text-xs text-muted-foreground">
        {{ format(new Date(message.received_at), 'PPpp') }}
      </div>
    </div>
    <Separator />
    <div class="flex-1 overflow-y-auto p-4 text-sm">
      <div v-if="message.html_body" v-html="safeHtml" class="prose max-w-none dark:prose-invert"></div>
      <div v-else class="whitespace-pre-wrap">{{ message.text_body }}</div>
    </div>
    <AttachmentBar :attachments="message.attachments" />
    <Separator />
    <div class="p-4 flex gap-2">
      <Button @click="reply">Reply</Button>
      <Button variant="outline" @click="forward">Forward</Button>
      <Button variant="destructive" @click="trash">Trash</Button>
    </div>
  </div>
  <div v-else class="flex h-full items-center justify-center p-8 text-muted-foreground">
    No message selected
  </div>
</template>