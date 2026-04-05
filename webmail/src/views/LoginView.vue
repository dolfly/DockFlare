<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import Button from '../components/ui/Button.vue'

const route = useRoute()
const { login } = useAuth()

onMounted(() => {
  const token = route.query.token as string
  if (token) {
    login(token)
  }
})

const redirectToMaster = async () => {
  let masterUrl = import.meta.env.VITE_MASTER_URL
  if (!masterUrl) {
    try {
      const cfg = await fetch('/config.json').then(r => r.json())
      masterUrl = cfg.masterUrl
    } catch {}
  }
  if (!masterUrl) masterUrl = window.location.origin.replace('mail.', '')
  window.location.href = `${masterUrl}/email/sso/callback?return_to=${window.location.hostname}`
}
</script>

<template>
  <div class="flex h-screen w-screen items-center justify-center bg-background">
    <div class="w-full max-w-sm space-y-6 rounded-lg border p-8 shadow-sm">
      <div class="flex flex-col space-y-2 text-center">
        <h1 class="text-2xl font-semibold tracking-tight">Login to Webmail</h1>
        <p class="text-sm text-muted-foreground">Sign in via DockFlare Master</p>
      </div>
      <Button class="w-full" @click="redirectToMaster">Login with SSO</Button>
    </div>
  </div>
</template>