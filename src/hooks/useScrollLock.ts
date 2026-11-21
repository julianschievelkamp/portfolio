import { useEffect } from "react";

import { SCROLL_ALLOWED_ATTRIBUTE } from "styles/global";

// Checks whether the target is inside an allowed scroll area that is actually scrollable
const isInsideScrollableArea = (target: EventTarget | null): boolean => {
    if (!(target instanceof Element)) {
        return false;
    }

    const area = target.closest(`[${SCROLL_ALLOWED_ATTRIBUTE}]`);

    return area !== null && area.scrollHeight > area.clientHeight;
};

// Secures the scroll lock via JavaScript (wheel, touch, position)
export const useScrollLock = (active: boolean) => {
    useEffect(() => {
        if (!active) {
            return;
        }

        const { scrollX, scrollY } = window;

        const preventScroll = (e: Event) => {
            if (!isInsideScrollableArea(e.target)) {
                e.preventDefault();
            }
        };

        // Fallback: any scroll movement that still occurred is reset
        const restorePosition = () => {
            if (window.scrollX !== scrollX || window.scrollY !== scrollY) {
                window.scrollTo(scrollX, scrollY);
            }
        };

        document.addEventListener("wheel", preventScroll, { passive: false });
        document.addEventListener("touchmove", preventScroll, {
            passive: false,
        });
        window.addEventListener("scroll", restorePosition);

        return () => {
            document.removeEventListener("wheel", preventScroll);
            document.removeEventListener("touchmove", preventScroll);
            window.removeEventListener("scroll", restorePosition);
        };
    }, [active]);
};
