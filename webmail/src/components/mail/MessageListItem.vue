<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import Badge from '../ui/Badge.vue'

defineProps({
  message: { type: Object, required: true },
  selected: { type: Boolean, default: false }
})
</script>

<template>
  <button :class="['flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent', selected ? 'bg-muted' : 'bg-background']">
    <div class="flex w-full flex-col gap-1">
      <div class="flex items-center justify-between">
        <div class="font-semibold">{{ message.from_name || message.from_address }}</div>
        <div class="text-xs text-muted-foreground" v-if="message.received_at">
          {{ formatDistanceToNow(new Date(message.received_at), { addSuffix: true }) }}
        </div>
      </div>
      <div class="font-medium">{{ message.subject }}</div>
    </div>
    <div class="line-clamp-2 text-xs text-muted-foreground">
      {{ message.text_body?.substring(0, 100) || 'No content' }}
    </div>
    <div class="flex items-center gap-2" v-if="message.has_attachments">
      <Badge variant="secondary">Attachment</Badge>
    </div>
  </button>
</template>