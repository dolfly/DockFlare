/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { onMounted, watch } from 'vue';
import { useMail } from '../composables/useMail';
import { mailApi } from '../api/mail';
import MailLayout from '../components/mail/MailLayout.vue';
const { store, loadMailboxes } = useMail();
onMounted(() => {
    loadMailboxes();
});
watch(() => store.currentMailbox, async (addr) => {
    if (!addr)
        return;
    const fRes = await mailApi.getFolders(addr);
    store.folders = fRes.data;
    if (store.folders.length > 0) {
        store.currentFolder = store.folders[0].name;
    }
});
watch(() => [store.currentMailbox, store.currentFolder], async ([addr, folder]) => {
    if (!addr || !folder)
        return;
    const mRes = await mailApi.getMessages(addr, { folder });
    store.messages = mRes.data;
    store.currentMessage = null;
});
watch(() => store.currentMessage, async (msg) => {
    if (!msg || msg.html_body !== undefined)
        return;
    const res = await mailApi.getMessage(store.currentMailbox, msg.id);
    store.currentMessage = res.data;
    const idx = store.messages.findIndex(m => m.id === msg.id);
    if (idx !== -1) {
        store.messages[idx] = res.data;
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof MailLayout, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(MailLayout, new MailLayout({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_3 = {};
var __VLS_2;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            MailLayout: MailLayout,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=MailView.vue.js.map