/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
const props = defineProps({
    defaultSize: { type: Number, default: 50 },
    minSize: { type: Number, default: 10 },
    class: { type: String, default: '' }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: (['flex-1 overflow-auto', props.class]) },
    ...{ style: ({ flexBasis: `${__VLS_ctx.defaultSize}%` }) },
});
var __VLS_0 = {};
// @ts-ignore
var __VLS_1 = __VLS_0;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        defaultSize: { type: Number, default: 50 },
        minSize: { type: Number, default: 10 },
        class: { type: String, default: '' }
    },
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        defaultSize: { type: Number, default: 50 },
        minSize: { type: Number, default: 10 },
        class: { type: String, default: '' }
    },
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=ResizablePanel.vue.js.map