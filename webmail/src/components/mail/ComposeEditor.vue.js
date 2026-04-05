/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Typography from '@tiptap/extension-typography';
import Placeholder from '@tiptap/extension-placeholder';
const props = defineProps({
    modelValue: { type: String, default: '' }
});
const emit = defineEmits(['update:modelValue']);
const editor = useEditor({
    content: props.modelValue,
    extensions: [
        StarterKit,
        Link,
        Image,
        Typography,
        Placeholder.configure({ placeholder: 'Write your message...' })
    ],
    onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.getHTML());
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex flex-col border rounded-md h-64 overflow-hidden" },
});
if (__VLS_ctx.editor) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex flex-wrap gap-1 p-1 border-b bg-muted/50" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.editor))
                    return;
                __VLS_ctx.editor.chain().focus().toggleBold().run();
            } },
        ...{ class: (['px-2 py-1 rounded text-sm', __VLS_ctx.editor.isActive('bold') ? 'bg-muted font-bold' : '']) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.editor))
                    return;
                __VLS_ctx.editor.chain().focus().toggleItalic().run();
            } },
        ...{ class: (['px-2 py-1 rounded text-sm', __VLS_ctx.editor.isActive('italic') ? 'bg-muted italic' : '']) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.editor))
                    return;
                __VLS_ctx.editor.chain().focus().toggleStrike().run();
            } },
        ...{ class: (['px-2 py-1 rounded text-sm', __VLS_ctx.editor.isActive('strike') ? 'bg-muted line-through' : '']) },
    });
}
const __VLS_0 = {}.EditorContent;
/** @type {[typeof __VLS_components.EditorContent, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    editor: (__VLS_ctx.editor),
    ...{ class: "flex-1 overflow-y-auto p-4 prose max-w-none dark:prose-invert focus:outline-none" },
}));
const __VLS_2 = __VLS_1({
    editor: (__VLS_ctx.editor),
    ...{ class: "flex-1 overflow-y-auto p-4 prose max-w-none dark:prose-invert focus:outline-none" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['h-64']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-muted/50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['prose']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-none']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:prose-invert']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            EditorContent: EditorContent,
            editor: editor,
        };
    },
    emits: {},
    props: {
        modelValue: { type: String, default: '' }
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    props: {
        modelValue: { type: String, default: '' }
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=ComposeEditor.vue.js.map