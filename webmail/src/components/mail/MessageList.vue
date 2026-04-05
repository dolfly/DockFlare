<script setup lang="ts">
import { useMailStore } from '../../stores/mail'
import MessageListItem from './MessageListItem.vue'

const store = useMailStore()

const selectMessage = (msg: any) => {
  store.currentMessage = msg
}
</script>

<template>
  <div class="flex flex-col gap-2 p-4 pt-0">
    <MessageListItem v-for="msg in store.messages" :key="msg.id" :message="msg" :selected="store.currentMessage?.id === msg.id" @click="selectMessage(msg)" />
    <div v-if="store.messages.length === 0" class="p-8 text-center text-muted-foreground">
      No messages found.
    </div>
  </div>
</template>