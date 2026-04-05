/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { mailApi } from '../../api/mail';
import Button from '../ui/Button.vue';
const __VLS_props = defineProps({
    attachments: { type: Array, default: () => [] }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
if (__VLS_ctx.attachments && __VLS_ctx.attachments.length > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex flex-wrap gap-2 border-t p-4" },
    });
    for (const [att] of __VLS_getVForSourceType(__VLS_ctx.attachments)) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (att.id),
            ...{ class: "flex items-center gap-2 rounded-md border p-2 text-sm" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "truncate max-w-[200px]" },
        });
        (att.filename);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "text-xs text-muted-foreground" },
        });
        (Math.round(att.size_bytes / 1024));
        /** @type {[typeof Button, typeof Button, ]} */ ;
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(Button, new Button({
            variant: "ghost",
            size: "sm",
            as: "a",
            href: (__VLS_ctx.mailApi.getAttachmentUrl(att.id)),
            target: "_blank",
            download: true,
        }));
        const __VLS_1 = __VLS_0({
            variant: "ghost",
            size: "sm",
            as: "a",
            href: (__VLS_ctx.mailApi.getAttachmentUrl(att.id)),
            target: "_blank",
            download: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_0));
        __VLS_2.slots.default;
        var __VLS_2;
    }
}
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[200px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            mailApi: mailApi,
            Button: Button,
        };
    },
    props: {
        attachments: { type: Array, default: () => [] }
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        attachments: { type: Array, default: () => [] }
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=AttachmentBar.vue.js.map