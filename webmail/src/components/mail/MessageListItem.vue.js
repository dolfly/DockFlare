/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { formatDistanceToNow } from 'date-fns';
import Badge from '../ui/Badge.vue';
const __VLS_props = defineProps({
    message: { type: Object, required: true },
    selected: { type: Boolean, default: false }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ class: (['flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent', __VLS_ctx.selected ? 'bg-muted' : 'bg-background']) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex w-full flex-col gap-1" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex items-center justify-between" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "font-semibold" },
});
(__VLS_ctx.message.from_name || __VLS_ctx.message.from_address);
if (__VLS_ctx.message.received_at) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-xs text-muted-foreground" },
    });
    (__VLS_ctx.formatDistanceToNow(new Date(__VLS_ctx.message.received_at), { addSuffix: true }));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "font-medium" },
});
(__VLS_ctx.message.subject);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "line-clamp-2 text-xs text-muted-foreground" },
});
(__VLS_ctx.message.text_body?.substring(0, 100) || 'No content');
if (__VLS_ctx.message.has_attachments) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex items-center gap-2" },
    });
    /** @type {[typeof Badge, typeof Badge, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(Badge, new Badge({
        variant: "secondary",
    }));
    const __VLS_1 = __VLS_0({
        variant: "secondary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    __VLS_2.slots.default;
    var __VLS_2;
}
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['line-clamp-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            formatDistanceToNow: formatDistanceToNow,
            Badge: Badge,
        };
    },
    props: {
        message: { type: Object, required: true },
        selected: { type: Boolean, default: false }
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        message: { type: Object, required: true },
        selected: { type: Boolean, default: false }
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=MessageListItem.vue.js.map