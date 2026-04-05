<script setup lang="ts">
import { ref, watch } from 'vue'
import { mailApi } from '../../api/mail'
import { useMailStore } from '../../stores/mail'
import Dialog from '../ui/Dialog.vue'
import Button from '../ui/Button.vue'
import Input from '../ui/Input.vue'

const store = useMailStore()

const to = ref('')
const subject = ref('')
const body = ref('')
const sending = ref(false)
const error = ref('')

watch(() => store.isComposeOpen, (open) => {
  if (open && store.composeDefaults) {
    to.value = store.composeDefaults.to || ''
    subject.value = store.composeDefaults.subject || ''
    body.value = store.composeDefaults.body || ''
  } else if (!open) {
    reset()
  }
})

const reset = () => {
  to.value = ''
  subject.value = ''
  body.value = ''
  error.value = ''
  store.composeDefaults = null
}

const close = () => {
  store.isComposeOpen = false
}

const send = async () => {
  if (!store.currentMailbox) return
  console.log('[ComposeDialog] send() called, body.value=', JSON.stringify(body.value), 'to=', to.value, 'subject=', subject.value)
  sending.value = true
  error.value = ''
  try {
    const payload = {
      to: to.value,
      subject: subject.value,
      html: body.value,
      text: body.value.replace(/<[^>]*>?/gm, '').trim()
    }
    console.log('[ComposeDialog] posting payload=', JSON.stringify(payload))
    await mailApi.sendMessage(store.currentMailbox, payload)
    close()
  } catch (e: any) {
    error.value = e?.response?.data?.error || 'Failed to send. Please try again.'
    console.error(e)
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <Dialog :open="store.isComposeOpen" @update:open="val => { if (!val) close() }">
    <div class="flex flex-col gap-4">
      <div class="text-lg font-semibold">New Message</div>
      <Input v-model="to" placeholder="To" />
      <Input v-model="subject" placeholder="Subject" />
      <textarea
        v-model="body"
        placeholder="Write your message..."
        class="border rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[160px]"
        @input="(e) => console.log('[ComposeDialog] textarea input, value=', JSON.stringify((e.target as HTMLTextAreaElement).value))"
      />
      <div v-if="error" class="text-sm text-red-500">{{ error }}</div>
      <div class="flex justify-end gap-2">
        <Button variant="ghost" @click="close">Discard</Button>
        <Button as="button" type="button" @click.prevent="send" :disabled="sending || !to">{{ sending ? 'Sending…' : 'Send' }}</Button>
      </div>
    </div>
  </Dialog>
</template>
