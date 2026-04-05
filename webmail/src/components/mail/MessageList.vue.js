/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { useMailStore } from '../../stores/mail';
import MessageListItem from './MessageListItem.vue';
const store = useMailStore();
const selectMessage = (msg) => {
    store.currentMessage = msg;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex flex-col gap-2 p-4 pt-0" },
});
for (const [msg] of __VLS_getVForSourceType((__VLS_ctx.store.messages))) {
    /** @type {[typeof MessageListItem, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(MessageListItem, new MessageListItem({
        ...{ 'onClick': {} },
        key: (msg.id),
        message: (msg),
        selected: (__VLS_ctx.store.currentMessage?.id === msg.id),
    }));
    const __VLS_1 = __VLS_0({
        ...{ 'onClick': {} },
        key: (msg.id),
        message: (msg),
        selected: (__VLS_ctx.store.currentMessage?.id === msg.id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_3;
    let __VLS_4;
    let __VLS_5;
    const __VLS_6 = {
        onClick: (...[$event]) => {
            __VLS_ctx.selectMessage(msg);
        }
    };
    var __VLS_2;
}
if (__VLS_ctx.store.messages.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "p-8 text-center text-muted-foreground" },
    });
}
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-0']} */ ;
/** @type {__VLS_StyleScopedClasses['p-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            MessageListItem: MessageListItem,
            store: store,
            selectMessage: selectMessage,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=MessageList.vue.js.map