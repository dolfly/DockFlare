/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { SplitterGroup, SplitterPanel, SplitterResizeHandle, TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent, TooltipPortal, } from 'radix-vue';
import { defineAsyncComponent, ref, watch, computed } from 'vue';
import { PenSquare, Sun, Moon, LogOut, Settings, Columns2, Maximize2, ChevronLeft, Menu } from 'lucide-vue-next';
import { cn } from '../../lib/utils';
import MailboxSelector from './MailboxSelector.vue';
import FolderNav from './FolderNav.vue';
import MessageList from './MessageList.vue';
import MessageDisplay from './MessageDisplay.vue';
import ComposeDialog from './ComposeDialog.vue';
import { useMailStore } from '../../stores/mail';
import { useAuth } from '../../composables/useAuth';
import { useBreakpoint } from '../../composables/useBreakpoint';
const SettingsDialog = defineAsyncComponent(() => import('./SettingsDialog.vue'));
const store = useMailStore();
const { logout } = useAuth();
const { isMobile } = useBreakpoint();
const onCollapse = () => { store.isCollapsed = true; };
const onExpand = () => { store.isCollapsed = false; };
const compose = () => {
    store.composeDefaults = null;
    store.isComposeOpen = true;
};
const mobilePanel = ref('list');
watch(() => store.currentFolder, () => {
    if (isMobile.value)
        mobilePanel.value = 'list';
});
watch(() => store.currentMessage, (msg) => {
    if (isMobile.value && msg)
        mobilePanel.value = 'detail';
});
const goBack = () => {
    if (mobilePanel.value === 'detail') {
        store.currentMessage = null;
        mobilePanel.value = 'list';
    }
    else if (mobilePanel.value === 'list') {
        mobilePanel.value = 'folders';
    }
};
const mobileTitle = computed(() => {
    if (mobilePanel.value === 'folders')
        return store.currentMailbox || 'Folders';
    if (mobilePanel.value === 'list')
        return store.currentFolder || 'Inbox';
    return store.currentMessage?.subject || 'Message';
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['df-compose-btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.TooltipProvider;
/** @type {[typeof __VLS_components.TooltipProvider, typeof __VLS_components.TooltipProvider, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    delayDuration: (0),
}));
const __VLS_2 = __VLS_1({
    delayDuration: (0),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
if (__VLS_ctx.isMobile) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex flex-col h-[100dvh] w-screen bg-background overflow-hidden" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "h-14 flex items-center gap-2 px-3 border-b border-border flex-shrink-0 bg-background" },
    });
    if (__VLS_ctx.mobilePanel !== 'folders') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.goBack) },
            ...{ class: "inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent transition-colors flex-shrink-0" },
        });
        const __VLS_5 = {}.ChevronLeft;
        /** @type {[typeof __VLS_components.ChevronLeft, ]} */ ;
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
            ...{ class: "size-5" },
        }));
        const __VLS_7 = __VLS_6({
            ...{ class: "size-5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.isMobile))
                        return;
                    if (!!(__VLS_ctx.mobilePanel !== 'folders'))
                        return;
                    __VLS_ctx.store.isSettingsOpen = true;
                } },
            ...{ class: "inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent transition-colors flex-shrink-0" },
        });
        const __VLS_9 = {}.Settings;
        /** @type {[typeof __VLS_components.Settings, ]} */ ;
        // @ts-ignore
        const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
            ...{ class: "size-4" },
        }));
        const __VLS_11 = __VLS_10({
            ...{ class: "size-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "flex-1 text-base font-semibold truncate" },
    });
    (__VLS_ctx.mobileTitle);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.isMobile))
                    return;
                __VLS_ctx.store.toggleTheme();
            } },
        ...{ class: "inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent transition-colors flex-shrink-0" },
    });
    if (__VLS_ctx.store.isDark) {
        const __VLS_13 = {}.Sun;
        /** @type {[typeof __VLS_components.Sun, ]} */ ;
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
            ...{ class: "size-4" },
        }));
        const __VLS_15 = __VLS_14({
            ...{ class: "size-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    }
    else {
        const __VLS_17 = {}.Moon;
        /** @type {[typeof __VLS_components.Moon, ]} */ ;
        // @ts-ignore
        const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
            ...{ class: "size-4" },
        }));
        const __VLS_19 = __VLS_18({
            ...{ class: "size-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.logout) },
        ...{ class: "inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent transition-colors flex-shrink-0" },
    });
    const __VLS_21 = {}.LogOut;
    /** @type {[typeof __VLS_components.LogOut, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
        ...{ class: "size-4" },
    }));
    const __VLS_23 = __VLS_22({
        ...{ class: "size-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex-1 min-h-0 overflow-hidden" },
    });
    if (__VLS_ctx.mobilePanel === 'folders') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "h-full flex flex-col overflow-y-auto" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "px-3 py-3 border-b border-border" },
        });
        /** @type {[typeof MailboxSelector, ]} */ ;
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(MailboxSelector, new MailboxSelector({
            isCollapsed: (false),
        }));
        const __VLS_26 = __VLS_25({
            isCollapsed: (false),
        }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        /** @type {[typeof FolderNav, ]} */ ;
        // @ts-ignore
        const __VLS_28 = __VLS_asFunctionalComponent(FolderNav, new FolderNav({
            isCollapsed: (false),
        }));
        const __VLS_29 = __VLS_28({
            isCollapsed: (false),
        }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    }
    else if (__VLS_ctx.mobilePanel === 'list') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "h-full flex flex-col overflow-hidden" },
        });
        /** @type {[typeof MessageList, ]} */ ;
        // @ts-ignore
        const __VLS_31 = __VLS_asFunctionalComponent(MessageList, new MessageList({}));
        const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
    }
    else if (__VLS_ctx.mobilePanel === 'detail') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "h-full flex flex-col overflow-hidden" },
        });
        /** @type {[typeof MessageDisplay, ]} */ ;
        // @ts-ignore
        const __VLS_34 = __VLS_asFunctionalComponent(MessageDisplay, new MessageDisplay({
            message: (__VLS_ctx.store.currentMessage ?? undefined),
        }));
        const __VLS_35 = __VLS_34({
            message: (__VLS_ctx.store.currentMessage ?? undefined),
        }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "h-16 flex items-center justify-around border-t border-border flex-shrink-0 bg-background pb-safe" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.isMobile))
                    return;
                __VLS_ctx.mobilePanel = 'folders';
            } },
        ...{ class: "flex flex-col items-center gap-0.5 px-4 py-2 rounded-lg transition-colors" },
        ...{ class: (__VLS_ctx.mobilePanel === 'folders' ? 'text-primary' : 'text-muted-foreground hover:text-foreground') },
    });
    const __VLS_37 = {}.Menu;
    /** @type {[typeof __VLS_components.Menu, ]} */ ;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
        ...{ class: "size-5" },
    }));
    const __VLS_39 = __VLS_38({
        ...{ class: "size-5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "text-[10px] font-medium" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.compose) },
        ...{ class: "flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors" },
    });
    const __VLS_41 = {}.PenSquare;
    /** @type {[typeof __VLS_components.PenSquare, ]} */ ;
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
        ...{ class: "size-5" },
    }));
    const __VLS_43 = __VLS_42({
        ...{ class: "size-5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_42));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.isMobile))
                    return;
                __VLS_ctx.mobilePanel = 'list';
            } },
        ...{ class: "flex flex-col items-center gap-0.5 px-4 py-2 rounded-lg transition-colors" },
        ...{ class: (__VLS_ctx.mobilePanel === 'list' ? 'text-primary' : 'text-muted-foreground hover:text-foreground') },
    });
    const __VLS_45 = {}.Columns2;
    /** @type {[typeof __VLS_components.Columns2, ]} */ ;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
        ...{ class: "size-5" },
    }));
    const __VLS_47 = __VLS_46({
        ...{ class: "size-5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_46));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "text-[10px] font-medium" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "h-screen w-screen overflow-hidden" },
    });
    const __VLS_49 = {}.SplitterGroup;
    /** @type {[typeof __VLS_components.SplitterGroup, typeof __VLS_components.SplitterGroup, ]} */ ;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
        id: "mail-layout",
        direction: "horizontal",
        ...{ class: "h-full w-full items-stretch" },
    }));
    const __VLS_51 = __VLS_50({
        id: "mail-layout",
        direction: "horizontal",
        ...{ class: "h-full w-full items-stretch" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_50));
    __VLS_52.slots.default;
    const __VLS_53 = {}.SplitterPanel;
    /** @type {[typeof __VLS_components.SplitterPanel, typeof __VLS_components.SplitterPanel, ]} */ ;
    // @ts-ignore
    const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
        ...{ 'onCollapse': {} },
        ...{ 'onExpand': {} },
        id: "sidebar",
        defaultSize: (20),
        collapsedSize: (4),
        collapsible: true,
        minSize: (15),
        maxSize: (22),
        ...{ class: (__VLS_ctx.cn('flex flex-col relative', __VLS_ctx.store.isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')) },
        ...{ style: {} },
    }));
    const __VLS_55 = __VLS_54({
        ...{ 'onCollapse': {} },
        ...{ 'onExpand': {} },
        id: "sidebar",
        defaultSize: (20),
        collapsedSize: (4),
        collapsible: true,
        minSize: (15),
        maxSize: (22),
        ...{ class: (__VLS_ctx.cn('flex flex-col relative', __VLS_ctx.store.isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')) },
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_54));
    let __VLS_57;
    let __VLS_58;
    let __VLS_59;
    const __VLS_60 = {
        onCollapse: (__VLS_ctx.onCollapse)
    };
    const __VLS_61 = {
        onExpand: (__VLS_ctx.onExpand)
    };
    __VLS_56.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
        ...{ class: "absolute top-0 left-0 right-0 h-px pointer-events-none z-10" },
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "h-[54px] flex items-center px-[14px] flex-shrink-0" },
    });
    if (!__VLS_ctx.store.isCollapsed) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "font-['Outfit'] font-extrabold text-[17px] tracking-[-0.01em] leading-none select-none" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "text-[#194466] dark:text-[#5EB1E5]" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "text-[#FBA612]" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "ml-auto flex items-center gap-1" },
        });
        const __VLS_62 = {}.TooltipRoot;
        /** @type {[typeof __VLS_components.TooltipRoot, typeof __VLS_components.TooltipRoot, ]} */ ;
        // @ts-ignore
        const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({
            delayDuration: (0),
        }));
        const __VLS_64 = __VLS_63({
            delayDuration: (0),
        }, ...__VLS_functionalComponentArgsRest(__VLS_63));
        __VLS_65.slots.default;
        const __VLS_66 = {}.TooltipTrigger;
        /** @type {[typeof __VLS_components.TooltipTrigger, typeof __VLS_components.TooltipTrigger, ]} */ ;
        // @ts-ignore
        const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({
            asChild: true,
        }));
        const __VLS_68 = __VLS_67({
            asChild: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_67));
        __VLS_69.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.isMobile))
                        return;
                    if (!(!__VLS_ctx.store.isCollapsed))
                        return;
                    __VLS_ctx.store.toggleViewMode();
                } },
            ...{ class: "inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent/60 transition-colors" },
        });
        if (__VLS_ctx.store.viewMode === 'full') {
            const __VLS_70 = {}.Columns2;
            /** @type {[typeof __VLS_components.Columns2, ]} */ ;
            // @ts-ignore
            const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({
                ...{ class: "size-3.5" },
            }));
            const __VLS_72 = __VLS_71({
                ...{ class: "size-3.5" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_71));
        }
        else {
            const __VLS_74 = {}.Maximize2;
            /** @type {[typeof __VLS_components.Maximize2, ]} */ ;
            // @ts-ignore
            const __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({
                ...{ class: "size-3.5" },
            }));
            const __VLS_76 = __VLS_75({
                ...{ class: "size-3.5" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_75));
        }
        var __VLS_69;
        const __VLS_78 = {}.TooltipPortal;
        /** @type {[typeof __VLS_components.TooltipPortal, typeof __VLS_components.TooltipPortal, ]} */ ;
        // @ts-ignore
        const __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({}));
        const __VLS_80 = __VLS_79({}, ...__VLS_functionalComponentArgsRest(__VLS_79));
        __VLS_81.slots.default;
        const __VLS_82 = {}.TooltipContent;
        /** @type {[typeof __VLS_components.TooltipContent, typeof __VLS_components.TooltipContent, ]} */ ;
        // @ts-ignore
        const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({
            side: "bottom",
            ...{ class: "z-50 rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md" },
        }));
        const __VLS_84 = __VLS_83({
            side: "bottom",
            ...{ class: "z-50 rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_83));
        __VLS_85.slots.default;
        (__VLS_ctx.store.viewMode === 'full' ? 'Split view' : 'Full view');
        var __VLS_85;
        var __VLS_81;
        var __VLS_65;
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "font-['Outfit'] font-extrabold text-[15px] leading-none select-none mx-auto" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "text-[#194466] dark:text-[#5EB1E5]" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "text-[#FBA612]" },
        });
    }
    if (__VLS_ctx.store.mailboxes.length > 1 && !__VLS_ctx.store.isCollapsed) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "px-3 pb-2 flex-shrink-0" },
        });
        /** @type {[typeof MailboxSelector, ]} */ ;
        // @ts-ignore
        const __VLS_86 = __VLS_asFunctionalComponent(MailboxSelector, new MailboxSelector({
            isCollapsed: (false),
        }));
        const __VLS_87 = __VLS_86({
            isCollapsed: (false),
        }, ...__VLS_functionalComponentArgsRest(__VLS_86));
    }
    else if (__VLS_ctx.store.mailboxes.length > 1 && __VLS_ctx.store.isCollapsed) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex justify-center pb-2 flex-shrink-0" },
        });
        /** @type {[typeof MailboxSelector, ]} */ ;
        // @ts-ignore
        const __VLS_89 = __VLS_asFunctionalComponent(MailboxSelector, new MailboxSelector({
            isCollapsed: (true),
        }));
        const __VLS_90 = __VLS_89({
            isCollapsed: (true),
        }, ...__VLS_functionalComponentArgsRest(__VLS_89));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "px-3 pb-3 flex-shrink-0" },
    });
    if (!__VLS_ctx.store.isCollapsed) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.compose) },
            ...{ class: "df-compose-btn w-full flex items-center justify-center gap-2 rounded-xl py-2 text-sm font-semibold transition-all" },
        });
        const __VLS_92 = {}.PenSquare;
        /** @type {[typeof __VLS_components.PenSquare, ]} */ ;
        // @ts-ignore
        const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
            ...{ class: "size-4" },
        }));
        const __VLS_94 = __VLS_93({
            ...{ class: "size-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_93));
    }
    else {
        const __VLS_96 = {}.TooltipRoot;
        /** @type {[typeof __VLS_components.TooltipRoot, typeof __VLS_components.TooltipRoot, ]} */ ;
        // @ts-ignore
        const __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({
            delayDuration: (0),
        }));
        const __VLS_98 = __VLS_97({
            delayDuration: (0),
        }, ...__VLS_functionalComponentArgsRest(__VLS_97));
        __VLS_99.slots.default;
        const __VLS_100 = {}.TooltipTrigger;
        /** @type {[typeof __VLS_components.TooltipTrigger, typeof __VLS_components.TooltipTrigger, ]} */ ;
        // @ts-ignore
        const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({
            asChild: true,
        }));
        const __VLS_102 = __VLS_101({
            asChild: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_101));
        __VLS_103.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.compose) },
            ...{ class: "df-compose-btn inline-flex h-[34px] w-[34px] items-center justify-center rounded-full transition-all mx-auto" },
        });
        const __VLS_104 = {}.PenSquare;
        /** @type {[typeof __VLS_components.PenSquare, ]} */ ;
        // @ts-ignore
        const __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104({
            ...{ class: "size-4" },
        }));
        const __VLS_106 = __VLS_105({
            ...{ class: "size-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_105));
        var __VLS_103;
        const __VLS_108 = {}.TooltipPortal;
        /** @type {[typeof __VLS_components.TooltipPortal, typeof __VLS_components.TooltipPortal, ]} */ ;
        // @ts-ignore
        const __VLS_109 = __VLS_asFunctionalComponent(__VLS_108, new __VLS_108({}));
        const __VLS_110 = __VLS_109({}, ...__VLS_functionalComponentArgsRest(__VLS_109));
        __VLS_111.slots.default;
        const __VLS_112 = {}.TooltipContent;
        /** @type {[typeof __VLS_components.TooltipContent, typeof __VLS_components.TooltipContent, ]} */ ;
        // @ts-ignore
        const __VLS_113 = __VLS_asFunctionalComponent(__VLS_112, new __VLS_112({
            side: "right",
            ...{ class: "z-50 rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md" },
        }));
        const __VLS_114 = __VLS_113({
            side: "right",
            ...{ class: "z-50 rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_113));
        __VLS_115.slots.default;
        var __VLS_115;
        var __VLS_111;
        var __VLS_99;
    }
    /** @type {[typeof FolderNav, ]} */ ;
    // @ts-ignore
    const __VLS_116 = __VLS_asFunctionalComponent(FolderNav, new FolderNav({
        isCollapsed: (__VLS_ctx.store.isCollapsed),
    }));
    const __VLS_117 = __VLS_116({
        isCollapsed: (__VLS_ctx.store.isCollapsed),
    }, ...__VLS_functionalComponentArgsRest(__VLS_116));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: (__VLS_ctx.store.isCollapsed
                ? 'flex flex-col items-center gap-1 px-2 py-3 flex-shrink-0'
                : 'px-3 py-3 flex-shrink-0 space-y-0.5') },
        ...{ style: {} },
    });
    if (!__VLS_ctx.store.isCollapsed) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.isMobile))
                        return;
                    if (!(!__VLS_ctx.store.isCollapsed))
                        return;
                    __VLS_ctx.store.toggleTheme();
                } },
            ...{ class: "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent/60 hover:text-foreground transition-colors" },
        });
        if (__VLS_ctx.store.isDark) {
            const __VLS_119 = {}.Sun;
            /** @type {[typeof __VLS_components.Sun, ]} */ ;
            // @ts-ignore
            const __VLS_120 = __VLS_asFunctionalComponent(__VLS_119, new __VLS_119({
                ...{ class: "size-4" },
            }));
            const __VLS_121 = __VLS_120({
                ...{ class: "size-4" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_120));
        }
        else {
            const __VLS_123 = {}.Moon;
            /** @type {[typeof __VLS_components.Moon, ]} */ ;
            // @ts-ignore
            const __VLS_124 = __VLS_asFunctionalComponent(__VLS_123, new __VLS_123({
                ...{ class: "size-4" },
            }));
            const __VLS_125 = __VLS_124({
                ...{ class: "size-4" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_124));
        }
        (__VLS_ctx.store.isDark ? 'Light mode' : 'Dark mode');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.isMobile))
                        return;
                    if (!(!__VLS_ctx.store.isCollapsed))
                        return;
                    __VLS_ctx.store.isSettingsOpen = true;
                } },
            ...{ class: "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent/60 hover:text-foreground transition-colors" },
        });
        const __VLS_127 = {}.Settings;
        /** @type {[typeof __VLS_components.Settings, ]} */ ;
        // @ts-ignore
        const __VLS_128 = __VLS_asFunctionalComponent(__VLS_127, new __VLS_127({
            ...{ class: "size-4" },
        }));
        const __VLS_129 = __VLS_128({
            ...{ class: "size-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_128));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.logout) },
            ...{ class: "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent/60 hover:text-foreground transition-colors" },
        });
        const __VLS_131 = {}.LogOut;
        /** @type {[typeof __VLS_components.LogOut, ]} */ ;
        // @ts-ignore
        const __VLS_132 = __VLS_asFunctionalComponent(__VLS_131, new __VLS_131({
            ...{ class: "size-4" },
        }));
        const __VLS_133 = __VLS_132({
            ...{ class: "size-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_132));
    }
    else {
        const __VLS_135 = {}.TooltipRoot;
        /** @type {[typeof __VLS_components.TooltipRoot, typeof __VLS_components.TooltipRoot, ]} */ ;
        // @ts-ignore
        const __VLS_136 = __VLS_asFunctionalComponent(__VLS_135, new __VLS_135({
            delayDuration: (0),
        }));
        const __VLS_137 = __VLS_136({
            delayDuration: (0),
        }, ...__VLS_functionalComponentArgsRest(__VLS_136));
        __VLS_138.slots.default;
        const __VLS_139 = {}.TooltipTrigger;
        /** @type {[typeof __VLS_components.TooltipTrigger, typeof __VLS_components.TooltipTrigger, ]} */ ;
        // @ts-ignore
        const __VLS_140 = __VLS_asFunctionalComponent(__VLS_139, new __VLS_139({
            asChild: true,
        }));
        const __VLS_141 = __VLS_140({
            asChild: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_140));
        __VLS_142.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.isMobile))
                        return;
                    if (!!(!__VLS_ctx.store.isCollapsed))
                        return;
                    __VLS_ctx.store.toggleTheme();
                } },
            ...{ class: "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent transition-colors" },
        });
        if (__VLS_ctx.store.isDark) {
            const __VLS_143 = {}.Sun;
            /** @type {[typeof __VLS_components.Sun, ]} */ ;
            // @ts-ignore
            const __VLS_144 = __VLS_asFunctionalComponent(__VLS_143, new __VLS_143({
                ...{ class: "size-4" },
            }));
            const __VLS_145 = __VLS_144({
                ...{ class: "size-4" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_144));
        }
        else {
            const __VLS_147 = {}.Moon;
            /** @type {[typeof __VLS_components.Moon, ]} */ ;
            // @ts-ignore
            const __VLS_148 = __VLS_asFunctionalComponent(__VLS_147, new __VLS_147({
                ...{ class: "size-4" },
            }));
            const __VLS_149 = __VLS_148({
                ...{ class: "size-4" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_148));
        }
        var __VLS_142;
        const __VLS_151 = {}.TooltipPortal;
        /** @type {[typeof __VLS_components.TooltipPortal, typeof __VLS_components.TooltipPortal, ]} */ ;
        // @ts-ignore
        const __VLS_152 = __VLS_asFunctionalComponent(__VLS_151, new __VLS_151({}));
        const __VLS_153 = __VLS_152({}, ...__VLS_functionalComponentArgsRest(__VLS_152));
        __VLS_154.slots.default;
        const __VLS_155 = {}.TooltipContent;
        /** @type {[typeof __VLS_components.TooltipContent, typeof __VLS_components.TooltipContent, ]} */ ;
        // @ts-ignore
        const __VLS_156 = __VLS_asFunctionalComponent(__VLS_155, new __VLS_155({
            side: "right",
            ...{ class: "z-50 rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md" },
        }));
        const __VLS_157 = __VLS_156({
            side: "right",
            ...{ class: "z-50 rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_156));
        __VLS_158.slots.default;
        (__VLS_ctx.store.isDark ? 'Light mode' : 'Dark mode');
        var __VLS_158;
        var __VLS_154;
        var __VLS_138;
        const __VLS_159 = {}.TooltipRoot;
        /** @type {[typeof __VLS_components.TooltipRoot, typeof __VLS_components.TooltipRoot, ]} */ ;
        // @ts-ignore
        const __VLS_160 = __VLS_asFunctionalComponent(__VLS_159, new __VLS_159({
            delayDuration: (0),
        }));
        const __VLS_161 = __VLS_160({
            delayDuration: (0),
        }, ...__VLS_functionalComponentArgsRest(__VLS_160));
        __VLS_162.slots.default;
        const __VLS_163 = {}.TooltipTrigger;
        /** @type {[typeof __VLS_components.TooltipTrigger, typeof __VLS_components.TooltipTrigger, ]} */ ;
        // @ts-ignore
        const __VLS_164 = __VLS_asFunctionalComponent(__VLS_163, new __VLS_163({
            asChild: true,
        }));
        const __VLS_165 = __VLS_164({
            asChild: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_164));
        __VLS_166.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.isMobile))
                        return;
                    if (!!(!__VLS_ctx.store.isCollapsed))
                        return;
                    __VLS_ctx.store.isSettingsOpen = true;
                } },
            ...{ class: "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent transition-colors" },
        });
        const __VLS_167 = {}.Settings;
        /** @type {[typeof __VLS_components.Settings, ]} */ ;
        // @ts-ignore
        const __VLS_168 = __VLS_asFunctionalComponent(__VLS_167, new __VLS_167({
            ...{ class: "size-4" },
        }));
        const __VLS_169 = __VLS_168({
            ...{ class: "size-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_168));
        var __VLS_166;
        const __VLS_171 = {}.TooltipPortal;
        /** @type {[typeof __VLS_components.TooltipPortal, typeof __VLS_components.TooltipPortal, ]} */ ;
        // @ts-ignore
        const __VLS_172 = __VLS_asFunctionalComponent(__VLS_171, new __VLS_171({}));
        const __VLS_173 = __VLS_172({}, ...__VLS_functionalComponentArgsRest(__VLS_172));
        __VLS_174.slots.default;
        const __VLS_175 = {}.TooltipContent;
        /** @type {[typeof __VLS_components.TooltipContent, typeof __VLS_components.TooltipContent, ]} */ ;
        // @ts-ignore
        const __VLS_176 = __VLS_asFunctionalComponent(__VLS_175, new __VLS_175({
            side: "right",
            ...{ class: "z-50 rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md" },
        }));
        const __VLS_177 = __VLS_176({
            side: "right",
            ...{ class: "z-50 rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_176));
        __VLS_178.slots.default;
        var __VLS_178;
        var __VLS_174;
        var __VLS_162;
        const __VLS_179 = {}.TooltipRoot;
        /** @type {[typeof __VLS_components.TooltipRoot, typeof __VLS_components.TooltipRoot, ]} */ ;
        // @ts-ignore
        const __VLS_180 = __VLS_asFunctionalComponent(__VLS_179, new __VLS_179({
            delayDuration: (0),
        }));
        const __VLS_181 = __VLS_180({
            delayDuration: (0),
        }, ...__VLS_functionalComponentArgsRest(__VLS_180));
        __VLS_182.slots.default;
        const __VLS_183 = {}.TooltipTrigger;
        /** @type {[typeof __VLS_components.TooltipTrigger, typeof __VLS_components.TooltipTrigger, ]} */ ;
        // @ts-ignore
        const __VLS_184 = __VLS_asFunctionalComponent(__VLS_183, new __VLS_183({
            asChild: true,
        }));
        const __VLS_185 = __VLS_184({
            asChild: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_184));
        __VLS_186.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.logout) },
            ...{ class: "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent transition-colors" },
        });
        const __VLS_187 = {}.LogOut;
        /** @type {[typeof __VLS_components.LogOut, ]} */ ;
        // @ts-ignore
        const __VLS_188 = __VLS_asFunctionalComponent(__VLS_187, new __VLS_187({
            ...{ class: "size-4" },
        }));
        const __VLS_189 = __VLS_188({
            ...{ class: "size-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_188));
        var __VLS_186;
        const __VLS_191 = {}.TooltipPortal;
        /** @type {[typeof __VLS_components.TooltipPortal, typeof __VLS_components.TooltipPortal, ]} */ ;
        // @ts-ignore
        const __VLS_192 = __VLS_asFunctionalComponent(__VLS_191, new __VLS_191({}));
        const __VLS_193 = __VLS_192({}, ...__VLS_functionalComponentArgsRest(__VLS_192));
        __VLS_194.slots.default;
        const __VLS_195 = {}.TooltipContent;
        /** @type {[typeof __VLS_components.TooltipContent, typeof __VLS_components.TooltipContent, ]} */ ;
        // @ts-ignore
        const __VLS_196 = __VLS_asFunctionalComponent(__VLS_195, new __VLS_195({
            side: "right",
            ...{ class: "z-50 rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md" },
        }));
        const __VLS_197 = __VLS_196({
            side: "right",
            ...{ class: "z-50 rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_196));
        __VLS_198.slots.default;
        var __VLS_198;
        var __VLS_194;
        var __VLS_182;
    }
    var __VLS_56;
    const __VLS_199 = {}.SplitterResizeHandle;
    /** @type {[typeof __VLS_components.SplitterResizeHandle, ]} */ ;
    // @ts-ignore
    const __VLS_200 = __VLS_asFunctionalComponent(__VLS_199, new __VLS_199({
        id: "sidebar-handle",
        ...{ class: "self-stretch w-[3px] bg-transparent hover:bg-border active:bg-primary/40 transition-colors" },
    }));
    const __VLS_201 = __VLS_200({
        id: "sidebar-handle",
        ...{ class: "self-stretch w-[3px] bg-transparent hover:bg-border active:bg-primary/40 transition-colors" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_200));
    if (__VLS_ctx.store.viewMode === 'split') {
        const __VLS_203 = {}.SplitterPanel;
        /** @type {[typeof __VLS_components.SplitterPanel, typeof __VLS_components.SplitterPanel, ]} */ ;
        // @ts-ignore
        const __VLS_204 = __VLS_asFunctionalComponent(__VLS_203, new __VLS_203({
            id: "mail-list",
            defaultSize: (35),
            minSize: (25),
            ...{ class: "flex flex-col overflow-hidden" },
            ...{ style: {} },
        }));
        const __VLS_205 = __VLS_204({
            id: "mail-list",
            defaultSize: (35),
            minSize: (25),
            ...{ class: "flex flex-col overflow-hidden" },
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_204));
        __VLS_206.slots.default;
        /** @type {[typeof MessageList, ]} */ ;
        // @ts-ignore
        const __VLS_207 = __VLS_asFunctionalComponent(MessageList, new MessageList({}));
        const __VLS_208 = __VLS_207({}, ...__VLS_functionalComponentArgsRest(__VLS_207));
        var __VLS_206;
        const __VLS_210 = {}.SplitterResizeHandle;
        /** @type {[typeof __VLS_components.SplitterResizeHandle, ]} */ ;
        // @ts-ignore
        const __VLS_211 = __VLS_asFunctionalComponent(__VLS_210, new __VLS_210({
            id: "display-handle",
            ...{ class: "self-stretch w-[3px] bg-transparent hover:bg-border active:bg-primary/40 transition-colors" },
        }));
        const __VLS_212 = __VLS_211({
            id: "display-handle",
            ...{ class: "self-stretch w-[3px] bg-transparent hover:bg-border active:bg-primary/40 transition-colors" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_211));
        const __VLS_214 = {}.SplitterPanel;
        /** @type {[typeof __VLS_components.SplitterPanel, typeof __VLS_components.SplitterPanel, ]} */ ;
        // @ts-ignore
        const __VLS_215 = __VLS_asFunctionalComponent(__VLS_214, new __VLS_214({
            id: "mail-display",
            defaultSize: (45),
            minSize: (30),
            ...{ class: "flex flex-col overflow-hidden" },
            ...{ style: {} },
        }));
        const __VLS_216 = __VLS_215({
            id: "mail-display",
            defaultSize: (45),
            minSize: (30),
            ...{ class: "flex flex-col overflow-hidden" },
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_215));
        __VLS_217.slots.default;
        if (__VLS_ctx.store.isComposeOpen && __VLS_ctx.store.isComposeFullView) {
            /** @type {[typeof ComposeDialog, ]} */ ;
            // @ts-ignore
            const __VLS_218 = __VLS_asFunctionalComponent(ComposeDialog, new ComposeDialog({
                panelMode: (true),
            }));
            const __VLS_219 = __VLS_218({
                panelMode: (true),
            }, ...__VLS_functionalComponentArgsRest(__VLS_218));
        }
        else {
            /** @type {[typeof MessageDisplay, ]} */ ;
            // @ts-ignore
            const __VLS_221 = __VLS_asFunctionalComponent(MessageDisplay, new MessageDisplay({
                message: (__VLS_ctx.store.currentMessage ?? undefined),
            }));
            const __VLS_222 = __VLS_221({
                message: (__VLS_ctx.store.currentMessage ?? undefined),
            }, ...__VLS_functionalComponentArgsRest(__VLS_221));
        }
        var __VLS_217;
    }
    else {
        const __VLS_224 = {}.SplitterPanel;
        /** @type {[typeof __VLS_components.SplitterPanel, typeof __VLS_components.SplitterPanel, ]} */ ;
        // @ts-ignore
        const __VLS_225 = __VLS_asFunctionalComponent(__VLS_224, new __VLS_224({
            id: "mail-content",
            defaultSize: (80),
            minSize: (30),
            ...{ class: "flex flex-col overflow-hidden" },
            ...{ style: {} },
        }));
        const __VLS_226 = __VLS_225({
            id: "mail-content",
            defaultSize: (80),
            minSize: (30),
            ...{ class: "flex flex-col overflow-hidden" },
            ...{ style: {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_225));
        __VLS_227.slots.default;
        if (__VLS_ctx.store.isComposeOpen && __VLS_ctx.store.isComposeFullView) {
            /** @type {[typeof ComposeDialog, ]} */ ;
            // @ts-ignore
            const __VLS_228 = __VLS_asFunctionalComponent(ComposeDialog, new ComposeDialog({
                panelMode: (true),
            }));
            const __VLS_229 = __VLS_228({
                panelMode: (true),
            }, ...__VLS_functionalComponentArgsRest(__VLS_228));
        }
        else {
            if (!__VLS_ctx.store.currentMessage) {
                /** @type {[typeof MessageList, ]} */ ;
                // @ts-ignore
                const __VLS_231 = __VLS_asFunctionalComponent(MessageList, new MessageList({}));
                const __VLS_232 = __VLS_231({}, ...__VLS_functionalComponentArgsRest(__VLS_231));
            }
            else {
                /** @type {[typeof MessageDisplay, ]} */ ;
                // @ts-ignore
                const __VLS_234 = __VLS_asFunctionalComponent(MessageDisplay, new MessageDisplay({
                    message: (__VLS_ctx.store.currentMessage ?? undefined),
                }));
                const __VLS_235 = __VLS_234({
                    message: (__VLS_ctx.store.currentMessage ?? undefined),
                }, ...__VLS_functionalComponentArgsRest(__VLS_234));
            }
        }
        var __VLS_227;
    }
    var __VLS_52;
}
if (!__VLS_ctx.isMobile) {
    /** @type {[typeof ComposeDialog, ]} */ ;
    // @ts-ignore
    const __VLS_237 = __VLS_asFunctionalComponent(ComposeDialog, new ComposeDialog({}));
    const __VLS_238 = __VLS_237({}, ...__VLS_functionalComponentArgsRest(__VLS_237));
}
else {
    const __VLS_240 = {}.Teleport;
    /** @type {[typeof __VLS_components.Teleport, typeof __VLS_components.Teleport, ]} */ ;
    // @ts-ignore
    const __VLS_241 = __VLS_asFunctionalComponent(__VLS_240, new __VLS_240({
        to: "body",
    }));
    const __VLS_242 = __VLS_241({
        to: "body",
    }, ...__VLS_functionalComponentArgsRest(__VLS_241));
    __VLS_243.slots.default;
    if (__VLS_ctx.store.isComposeOpen) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "fixed inset-0 z-50 flex flex-col bg-background" },
        });
        /** @type {[typeof ComposeDialog, ]} */ ;
        // @ts-ignore
        const __VLS_244 = __VLS_asFunctionalComponent(ComposeDialog, new ComposeDialog({
            panelMode: (true),
        }));
        const __VLS_245 = __VLS_244({
            panelMode: (true),
        }, ...__VLS_functionalComponentArgsRest(__VLS_244));
    }
    var __VLS_243;
}
const __VLS_247 = {}.SettingsDialog;
/** @type {[typeof __VLS_components.SettingsDialog, ]} */ ;
// @ts-ignore
const __VLS_248 = __VLS_asFunctionalComponent(__VLS_247, new __VLS_247({}));
const __VLS_249 = __VLS_248({}, ...__VLS_functionalComponentArgsRest(__VLS_248));
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[100dvh]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-background']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['h-14']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-border']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-background']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-9']} */ ;
/** @type {__VLS_StyleScopedClasses['w-9']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-accent']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['size-5']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-9']} */ ;
/** @type {__VLS_StyleScopedClasses['w-9']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-accent']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-9']} */ ;
/** @type {__VLS_StyleScopedClasses['w-9']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-accent']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-9']} */ ;
/** @type {__VLS_StyleScopedClasses['w-9']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-accent']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-0']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-border']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-around']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['border-border']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-background']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-safe']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['size-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['h-12']} */ ;
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-primary/90']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['size-5']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['size-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['w-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['items-stretch']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['h-px']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[54px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['px-[14px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['font-[\'Outfit\']']} */ ;
/** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[17px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-[-0.01em]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-none']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#194466]']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-[#5EB1E5]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#FBA612]']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-7']} */ ;
/** @type {__VLS_StyleScopedClasses['w-7']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-accent/60']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-popover']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-popover-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['font-[\'Outfit\']']} */ ;
/** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[15px]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-none']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#194466]']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-[#5EB1E5]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#FBA612]']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['df-compose-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['df-compose-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[34px]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[34px]']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-popover']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-popover-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-accent/60']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-accent/60']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-accent/60']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['w-8']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-accent']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-popover']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-popover-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['w-8']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-accent']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-popover']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-popover-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['w-8']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-accent']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-popover']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-popover-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['self-stretch']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[3px]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-border']} */ ;
/** @type {__VLS_StyleScopedClasses['active:bg-primary/40']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['self-stretch']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[3px]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-border']} */ ;
/** @type {__VLS_StyleScopedClasses['active:bg-primary/40']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-background']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            SplitterGroup: SplitterGroup,
            SplitterPanel: SplitterPanel,
            SplitterResizeHandle: SplitterResizeHandle,
            TooltipProvider: TooltipProvider,
            TooltipRoot: TooltipRoot,
            TooltipTrigger: TooltipTrigger,
            TooltipContent: TooltipContent,
            TooltipPortal: TooltipPortal,
            PenSquare: PenSquare,
            Sun: Sun,
            Moon: Moon,
            LogOut: LogOut,
            Settings: Settings,
            Columns2: Columns2,
            Maximize2: Maximize2,
            ChevronLeft: ChevronLeft,
            Menu: Menu,
            cn: cn,
            MailboxSelector: MailboxSelector,
            FolderNav: FolderNav,
            MessageList: MessageList,
            MessageDisplay: MessageDisplay,
            ComposeDialog: ComposeDialog,
            SettingsDialog: SettingsDialog,
            store: store,
            logout: logout,
            isMobile: isMobile,
            onCollapse: onCollapse,
            onExpand: onExpand,
            compose: compose,
            mobilePanel: mobilePanel,
            goBack: goBack,
            mobileTitle: mobileTitle,
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