<script setup lang="ts">
import { useMailStore } from '../../stores/mail'
import { computed } from 'vue'

const store = useMailStore()

const currentAddress = computed({
  get: () => store.currentMailbox,
  set: (val) => store.currentMailbox = val
})
</script>

<template>
  <div class="px-4 py-2 border-b">
    <select v-model="currentAddress" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
      <option v-for="mb in store.mailboxes" :key="mb.address" :value="mb.address">
        {{ mb.display_name }} ({{ mb.address }})
      </option>
    </select>
  </div>
</template>