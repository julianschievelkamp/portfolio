import { useEffect, useRef } from "react";
import { useStore } from "./useStore";
import { useMediaQuery } from "./useMediaQuery";
import { queries } from "styles/variables";

export const usePopupControls = () => {
    const isLandscapeLgMax = useMediaQuery(queries.landscapeLgMax);
    const { popupOpen, currentPortfolioIndex, setCurrentPortfolioIndex } =
        useStore();

    // Touch-Koordinaten werden nur in Event-Handlern gelesen und brauchen kein Rendering
    const touchStart = useRef<number | null>(null);
    const touchEnd = useRef<number | null>(null);

    useEffect(() => {
        touchEnd.current = null;
        touchStart.current = null;
    }, [isLandscapeLgMax]);

    useEffect(() => {
        const onTouchStart = (e: TouchEvent) => {
            touchEnd.current = null;

            if (!popupOpen || e.touches.length > 1) return;

            touchStart.current = isLandscapeLgMax
                ? e.touches[0].clientY
                : e.touches[0].clientX;
        };

        const onTouchMove = (e: TouchEvent) => {
            if (!popupOpen) return;

            if (e.touches.length > 1) {
                touchEnd.current = null;
                touchStart.current = null;
            } else {
                touchEnd.current = isLandscapeLgMax
                    ? e.touches[0].clientY
                    : e.touches[0].clientX;
            }
        };

        const onTouchEnd = () => {
            if (!popupOpen) return;

            if (!touchStart.current || !touchEnd.current) return;

            if (window.visualViewport) {
                if (Math.abs(window.visualViewport.scale - 1) > 0.05) {
                    return;
                }
            }

            const minSwipeDistance = 50;
            const distance = touchStart.current - touchEnd.current;
            const isPreviousSwipe = distance > minSwipeDistance;
            const isNextSwipe = distance < -minSwipeDistance;

            if (isPreviousSwipe) {
                setCurrentPortfolioIndex(currentPortfolioIndex + 1);
            } else if (isNextSwipe) {
                setCurrentPortfolioIndex(currentPortfolioIndex - 1);
            }
        };

        const onKeyDown = (e: KeyboardEvent) => {
            if (!popupOpen) return;

            if (e.key === "ArrowLeft") {
                setCurrentPortfolioIndex(currentPortfolioIndex - 1);
            } else if (e.key === "ArrowRight") {
                setCurrentPortfolioIndex(currentPortfolioIndex + 1);
            }
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
    });
};
