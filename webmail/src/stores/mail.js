import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useMailStore = defineStore('mail', () => {
    const mailboxes = ref([]);
    const currentMailbox = ref('');
    const folders = ref([]);
    const currentFolder = ref('');
    const messages = ref([]);
    const currentMessage = ref(null);
    const isComposeOpen = ref(false);
    return {
        mailboxes, currentMailbox,
        folders, currentFolder,
        messages, currentMessage,
        isComposeOpen
    };
});
//# sourceMappingURL=mail.js.map