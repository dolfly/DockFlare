<script setup lang="ts">
import ResizablePanelGroup from '../ui/ResizablePanelGroup.vue'
import ResizablePanel from '../ui/ResizablePanel.vue'
import ResizableHandle from '../ui/ResizableHandle.vue'
import FolderNav from './FolderNav.vue'
import MessageList from './MessageList.vue'
import MessageDisplay from './MessageDisplay.vue'
import MailboxSelector from './MailboxSelector.vue'
import SearchBar from './SearchBar.vue'
import ComposeDialog from './ComposeDialog.vue'
import Button from '../ui/Button.vue'
import { useMailStore } from '../../stores/mail'
import { useAuth } from '../../composables/useAuth'

const store = useMailStore()
const { logout } = useAuth()
</script>

<template>
  <div class="h-screen w-screen overflow-hidden bg-background flex flex-col">
    <header class="flex h-14 items-center justify-between border-b px-4">
      <div class="flex items-center gap-2 font-semibold">
        DockFlare Webmail
      </div>
      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm" @click="store.isComposeOpen = true">Compose</Button>
        <Button variant="ghost" size="sm" @click="logout">Logout</Button>
      </div>
    </header>

    <ResizablePanelGroup class="flex-1">
      <ResizablePanel :defaultSize="20" :minSize="15" class="border-r flex flex-col hidden md:flex">
        <MailboxSelector />
        <FolderNav @select="() => {}" class="flex-1 overflow-auto" />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel :defaultSize="35" :minSize="25" class="border-r flex flex-col hidden sm:flex">
        <SearchBar />
        <MessageList class="flex-1 overflow-auto" />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel :defaultSize="45" :minSize="30" class="flex-1">
        <MessageDisplay :message="store.currentMessage" />
      </ResizablePanel>
    </ResizablePanelGroup>

    <ComposeDialog />
  </div>
</template>