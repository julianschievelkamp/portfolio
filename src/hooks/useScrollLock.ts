import { useEffect } from "react";
import { SCROLL_ALLOWED_ATTRIBUTE } from "styles/global";

// Prüft, ob das Ziel in einem erlaubten Scroll-Bereich liegt, der tatsächlich scrollbar ist
const isInsideScrollableArea = (target: EventTarget | null): boolean => {
    if (!(target instanceof Element)) {
        return false;
    }

    const area = target.closest(`[${SCROLL_ALLOWED_ATTRIBUTE}]`);

    return area !== null && area.scrollHeight > area.clientHeight;
};

// Sichert den Scroll-Lock per JavaScript ab (Wheel, Touch, Position)
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

        // Fallback: jede trotzdem entstandene Scroll-Bewegung wird zurückgesetzt
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
