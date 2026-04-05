/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import ResizablePanelGroup from '../ui/ResizablePanelGroup.vue';
import ResizablePanel from '../ui/ResizablePanel.vue';
import ResizableHandle from '../ui/ResizableHandle.vue';
import FolderNav from './FolderNav.vue';
import MessageList from './MessageList.vue';
import MessageDisplay from './MessageDisplay.vue';
import MailboxSelector from './MailboxSelector.vue';
import SearchBar from './SearchBar.vue';
import ComposeDialog from './ComposeDialog.vue';
import Button from '../ui/Button.vue';
import { useMailStore } from '../../stores/mail';
import { useAuth } from '../../composables/useAuth';
const store = useMailStore();
const { logout } = useAuth();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "h-screen w-screen overflow-hidden bg-background flex flex-col" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    ...{ class: "flex h-14 items-center justify-between border-b px-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex items-center gap-2 font-semibold" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex items-center gap-2" },
});
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}));
const __VLS_1 = __VLS_0({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onClick: (...[$event]) => {
        __VLS_ctx.store.isComposeOpen = true;
    }
};
__VLS_2.slots.default;
var __VLS_2;
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "sm",
}));
const __VLS_8 = __VLS_7({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
let __VLS_10;
let __VLS_11;
let __VLS_12;
const __VLS_13 = {
    onClick: (__VLS_ctx.logout)
};
__VLS_9.slots.default;
var __VLS_9;
/** @type {[typeof ResizablePanelGroup, typeof ResizablePanelGroup, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(ResizablePanelGroup, new ResizablePanelGroup({
    ...{ class: "flex-1" },
}));
const __VLS_15 = __VLS_14({
    ...{ class: "flex-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_16.slots.default;
/** @type {[typeof ResizablePanel, typeof ResizablePanel, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(ResizablePanel, new ResizablePanel({
    defaultSize: (20),
    minSize: (15),
    ...{ class: "border-r flex flex-col hidden md:flex" },
}));
const __VLS_18 = __VLS_17({
    defaultSize: (20),
    minSize: (15),
    ...{ class: "border-r flex flex-col hidden md:flex" },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
/** @type {[typeof MailboxSelector, ]} */ ;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(MailboxSelector, new MailboxSelector({}));
const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
/** @type {[typeof FolderNav, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(FolderNav, new FolderNav({
    ...{ 'onSelect': {} },
    ...{ class: "flex-1 overflow-auto" },
}));
const __VLS_24 = __VLS_23({
    ...{ 'onSelect': {} },
    ...{ class: "flex-1 overflow-auto" },
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
let __VLS_26;
let __VLS_27;
let __VLS_28;
const __VLS_29 = {
    onSelect: (() => { })
};
var __VLS_25;
var __VLS_19;
/** @type {[typeof ResizableHandle, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(ResizableHandle, new ResizableHandle({}));
const __VLS_31 = __VLS_30({}, ...__VLS_functionalComponentArgsRest(__VLS_30));
/** @type {[typeof ResizablePanel, typeof ResizablePanel, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(ResizablePanel, new ResizablePanel({
    defaultSize: (35),
    minSize: (25),
    ...{ class: "border-r flex flex-col hidden sm:flex" },
}));
const __VLS_34 = __VLS_33({
    defaultSize: (35),
    minSize: (25),
    ...{ class: "border-r flex flex-col hidden sm:flex" },
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
/** @type {[typeof SearchBar, ]} */ ;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(SearchBar, new SearchBar({}));
const __VLS_37 = __VLS_36({}, ...__VLS_functionalComponentArgsRest(__VLS_36));
/** @type {[typeof MessageList, ]} */ ;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(MessageList, new MessageList({
    ...{ class: "flex-1 overflow-auto" },
}));
const __VLS_40 = __VLS_39({
    ...{ class: "flex-1 overflow-auto" },
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
var __VLS_35;
/** @type {[typeof ResizableHandle, ]} */ ;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(ResizableHandle, new ResizableHandle({}));
const __VLS_43 = __VLS_42({}, ...__VLS_functionalComponentArgsRest(__VLS_42));
/** @type {[typeof ResizablePanel, typeof ResizablePanel, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(ResizablePanel, new ResizablePanel({
    defaultSize: (45),
    minSize: (30),
    ...{ class: "flex-1" },
}));
const __VLS_46 = __VLS_45({
    defaultSize: (45),
    minSize: (30),
    ...{ class: "flex-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
__VLS_47.slots.default;
/** @type {[typeof MessageDisplay, ]} */ ;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent(MessageDisplay, new MessageDisplay({
    message: (__VLS_ctx.store.currentMessage),
}));
const __VLS_49 = __VLS_48({
    message: (__VLS_ctx.store.currentMessage),
}, ...__VLS_functionalComponentArgsRest(__VLS_48));
var __VLS_47;
var __VLS_16;
/** @type {[typeof ComposeDialog, ]} */ ;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(ComposeDialog, new ComposeDialog({}));
const __VLS_52 = __VLS_51({}, ...__VLS_functionalComponentArgsRest(__VLS_51));
/** @type {__VLS_StyleScopedClasses['h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['w-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-background']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-14']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['border-r']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['border-r']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ResizablePanelGroup: ResizablePanelGroup,
            ResizablePanel: ResizablePanel,
            ResizableHandle: ResizableHandle,
            FolderNav: FolderNav,
            MessageList: MessageList,
            MessageDisplay: MessageDisplay,
            MailboxSelector: MailboxSelector,
            SearchBar: SearchBar,
            ComposeDialog: ComposeDialog,
            Button: Button,
            store: store,
            logout: logout,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=MailLayout.vue.js.map