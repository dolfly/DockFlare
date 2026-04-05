import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMailStore = defineStore('mail', () => {
  const mailboxes = ref<any[]>([])
  const currentMailbox = ref<string>('')
  const folders = ref<any[]>([])
  const currentFolder = ref<string>('')
  const messages = ref<any[]>([])
  const currentMessage = ref<any>(null)
  const isComposeOpen = ref(false)
  const composeDefaults = ref<{ to?: string; subject?: string; body?: string } | null>(null)
  const composeBody = ref('')

  return {
    mailboxes, currentMailbox,
    folders, currentFolder,
    messages, currentMessage,
    isComposeOpen, composeDefaults, composeBody
  }
})