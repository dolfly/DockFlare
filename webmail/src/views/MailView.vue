<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useMail } from '../composables/useMail'
import { mailApi } from '../api/mail'
import MailLayout from '../components/mail/MailLayout.vue'

const { store, loadMailboxes } = useMail()

onMounted(() => {
  loadMailboxes()
})

watch(() => store.currentMailbox, async (addr) => {
  if (!addr) return
  try {
    const fRes = await mailApi.getFolders(addr)
    store.folders = fRes.data
    if (store.folders.length > 0) {
      store.currentFolder = store.folders[0].name
    }
  } catch (e) {
    console.error('Failed to load folders', e)
  }
})

watch(() => [store.currentMailbox, store.currentFolder], async ([addr, folder]) => {
  if (!addr || !folder) return
  try {
    const mRes = await mailApi.getMessages(addr as string, { folder })
    store.messages = mRes.data
    store.currentMessage = null
  } catch (e) {
    console.error('Failed to load messages', e)
  }
})

watch(() => store.currentMessage, async (msg) => {
  if (!msg || msg.html_body !== undefined) return
  try {
    const res = await mailApi.getMessage(store.currentMailbox, msg.id)
    store.currentMessage = res.data
    const idx = store.messages.findIndex((m: any) => m.id === msg.id)
    if (idx !== -1) {
      store.messages[idx] = res.data
    }
  } catch (e) {
    console.error('Failed to load message body', e)
  }
})
</script>

<template>
  <MailLayout />
</template>
