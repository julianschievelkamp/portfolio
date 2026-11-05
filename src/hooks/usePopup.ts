import { useEffect, useRef } from "react";
import { useStore } from "./useStore";
import { mapIndex } from "utils/utils";
import { PortfolioItem } from "data/portfolioData";
import { useMediaQuery } from "./useMediaQuery";
import { queries } from "styles/variables";

export const usePopup = (items: PortfolioItem[]) => {
    // Touch-Koordinaten werden nur in Event-Handlern gelesen und brauchen kein Rendering
    const touchStart = useRef<number | null>(null);
    const touchEnd = useRef<number | null>(null);
    const {
        popupOpen,
        setPopupOpen,
        currentPortfolioIndex,
        setCurrentPortfolioIndex,
    } = useStore();
    const isLandscapeLgMax = useMediaQuery(queries.landscapeLgMax);

    useEffect(() => {
        touchEnd.current = null;
        touchStart.current = null;
    }, [isLandscapeLgMax]);

    useEffect(() => {
        const showItem = (newIndex: number) => {
            setCurrentPortfolioIndex(mapIndex(newIndex, items.length - 1));
        };

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
                showItem(currentPortfolioIndex + 1);
            } else if (isNextSwipe) {
                showItem(currentPortfolioIndex - 1);
            }
        };

        const onKeyDown = (e: KeyboardEvent) => {
            if (!popupOpen) return;

            if (e.key === "ArrowLeft") {
                showItem(currentPortfolioIndex - 1);
            } else if (e.key === "ArrowRight") {
                showItem(currentPortfolioIndex + 1);
            } else if (e.key === "Escape") {
                setPopupOpen(false);
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
