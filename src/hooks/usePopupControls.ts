import { type RefObject, useEffect } from "react";

import { queries } from "styles/variables";
import { isViewportZoomed } from "utils/isViewportZoomed";

import { useMediaQuery } from "./useMediaQuery";
import { useStore } from "./useStore";

const MIN_SWIPE_DISTANCE = 50;

// Switches relative to the current index; reads the store directly,
// so the listeners are not re-registered on every index change
const showRelative = (offset: number) => {
    const { activeIndex, setActiveIndex } = useStore.getState();

    setActiveIndex(activeIndex + offset);
};

export const usePopupControls = (
    popupRef: RefObject<HTMLDialogElement | null>,
) => {
    const isLandscapeLgMax = useMediaQuery(queries.landscapeLgMax);
    const popupOpen = useStore((state) => state.popupOpen);

    useEffect(() => {
        // Listeners only exist while the popup is open
        if (!popupOpen) return;

        // Touch coordinates are only read in event handlers and need no rendering
        let touchStart: number | null = null;
        let touchEnd: number | null = null;

        const getPosition = (touch: Touch) =>
            isLandscapeLgMax ? touch.clientY : touch.clientX;

        const onTouchStart = (e: TouchEvent) => {
            touchEnd = null;

            if (e.touches.length > 1) return;

            touchStart = getPosition(e.touches[0]);
        };

        const onTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 1) {
                touchEnd = null;
                touchStart = null;
            } else {
                touchEnd = getPosition(e.touches[0]);
            }
        };

        const onTouchEnd = () => {
            if (!touchStart || !touchEnd) return;

            if (isViewportZoomed()) return;

            const distance = touchStart - touchEnd;

            if (distance > MIN_SWIPE_DISTANCE) {
                showRelative(1);
            } else if (distance < -MIN_SWIPE_DISTANCE) {
                showRelative(-1);
            }
        };

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

            showRelative(e.key === "ArrowLeft" ? -1 : 1);

            // Always focus the dialog after an image change via keyboard
            popupRef.current?.focus({ preventScroll: true });
        };

        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("touchstart", onTouchStart, {
            passive: true,
        });
        document.addEventListener("touchmove", onTouchMove, {
            passive: true,
        });
        document.addEventListener("touchend", onTouchEnd, {
            passive: true,
        });

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("touchstart", onTouchStart);
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("touchend", onTouchEnd);
        };
    }, [popupOpen, isLandscapeLgMax, popupRef]);
};
