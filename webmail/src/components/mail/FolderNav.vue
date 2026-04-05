<script setup lang="ts">
import { useMailStore } from '../../stores/mail'

const store = useMailStore()

const emit = defineEmits(['select'])

const selectFolder = (name: string) => {
  store.currentFolder = name
  emit('select', name)
}
</script>

<template>
  <nav class="flex flex-col gap-1 p-2">
    <button v-for="f in store.folders" :key="f.name"
      @click="selectFolder(f.name)"
      :class="['flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground', store.currentFolder === f.name ? 'bg-accent text-accent-foreground' : 'transparent']">
      {{ f.name }}
    </button>
  </nav>
</template>