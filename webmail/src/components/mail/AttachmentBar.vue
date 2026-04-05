<script setup lang="ts">
import { mailApi } from '../../api/mail'
import Button from '../ui/Button.vue'

defineProps({
  attachments: { type: Array, default: () => [] }
})
</script>

<template>
  <div class="flex flex-wrap gap-2 border-t p-4" v-if="attachments && attachments.length > 0">
    <div v-for="att in (attachments as any[])" :key="att.id" class="flex items-center gap-2 rounded-md border p-2 text-sm">
      <span class="truncate max-w-[200px]">{{ att.filename }}</span>
      <span class="text-xs text-muted-foreground">{{ Math.round(att.size_bytes / 1024) }} KB</span>
      <Button variant="ghost" size="sm" as="a" :href="mailApi.getAttachmentUrl(att.id)" target="_blank" download>
        DL
      </Button>
    </div>
  </div>
</template>