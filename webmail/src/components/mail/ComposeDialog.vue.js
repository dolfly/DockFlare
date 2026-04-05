/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { ref } from 'vue';
import { mailApi } from '../../api/mail';
import { useMailStore } from '../../stores/mail';
import Dialog from '../ui/Dialog.vue';
import Button from '../ui/Button.vue';
import Input from '../ui/Input.vue';
import ComposeEditor from './ComposeEditor.vue';
const store = useMailStore();
const to = ref('');
const subject = ref('');
const body = ref('');
const sending = ref(false);
const close = () => store.isComposeOpen = false;
const send = async () => {
    if (!store.currentMailbox)
        return;
    sending.value = true;
    try {
        await mailApi.sendMessage(store.currentMailbox, {
            to: to.value,
            subject: subject.value,
            html: body.value,
            text: body.value.replace(/<[^>]*>?/gm, '')
        });
        close();
        to.value = '';
        subject.value = '';
        body.value = '';
    }
    catch (e) {
        console.error(e);
    }
    finally {
        sending.value = false;
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof Dialog, typeof Dialog, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Dialog, new Dialog({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.store.isComposeOpen),
}));
const __VLS_1 = __VLS_0({
    ...{ 'onUpdate:open': {} },
    open: (__VLS_ctx.store.isComposeOpen),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    'onUpdate:open': (val => __VLS_ctx.store.isComposeOpen = val)
};
var __VLS_7 = {};
__VLS_2.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex flex-col gap-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-lg font-semibold" },
});
/** @type {[typeof Input, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(Input, new Input({
    modelValue: (__VLS_ctx.to),
    placeholder: "To",
}));
const __VLS_9 = __VLS_8({
    modelValue: (__VLS_ctx.to),
    placeholder: "To",
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
/** @type {[typeof Input, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(Input, new Input({
    modelValue: (__VLS_ctx.subject),
    placeholder: "Subject",
}));
const __VLS_12 = __VLS_11({
    modelValue: (__VLS_ctx.subject),
    placeholder: "Subject",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
/** @type {[typeof ComposeEditor, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(ComposeEditor, new ComposeEditor({
    modelValue: (__VLS_ctx.body),
}));
const __VLS_15 = __VLS_14({
    modelValue: (__VLS_ctx.body),
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex justify-end gap-2" },
});
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    variant: "ghost",
}));
const __VLS_18 = __VLS_17({
    ...{ 'onClick': {} },
    variant: "ghost",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_20;
let __VLS_21;
let __VLS_22;
const __VLS_23 = {
    onClick: (__VLS_ctx.close)
};
__VLS_19.slots.default;
var __VLS_19;
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.sending || !__VLS_ctx.to),
}));
const __VLS_25 = __VLS_24({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.sending || !__VLS_ctx.to),
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
let __VLS_27;
let __VLS_28;
let __VLS_29;
const __VLS_30 = {
    onClick: (__VLS_ctx.send)
};
__VLS_26.slots.default;
var __VLS_26;
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Dialog: Dialog,
            Button: Button,
            Input: Input,
            ComposeEditor: ComposeEditor,
            store: store,
            to: to,
            subject: subject,
            body: body,
            sending: sending,
            close: close,
            send: send,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=ComposeDialog.vue.js.map