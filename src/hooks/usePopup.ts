import { useEffect, useState } from "react";
import { useStore } from "./useStore";
import { mapIndex } from "utils/utils";
import { PortfolioItem } from "data/portfolioData";
import { useMediaQuery } from "./useMediaQuery";
import { queries } from "styles/variables";

export const usePopup = (items: PortfolioItem[]) => {
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const { popupOpen, currentPortfolioIndex, setCurrentPortfolioIndex } =
        useStore();
    const isLandscapeLgMax = useMediaQuery(queries.landscapeLgMax);

    const showItem = (newIndex: number) => {
        setCurrentPortfolioIndex(mapIndex(newIndex, items.length - 1));
    };

    const onTouchStart = (e: any) => {
        setTouchEnd(null);

        if (!popupOpen || e.touches.length > 1) return;

        setTouchStart(
            isLandscapeLgMax ? e.touches[0].clientY : e.touches[0].clientX,
        );
    };

    const onTouchMove = (e: any) => {
        if (!popupOpen) return;

        if (e.touches.length > 1) {
            setTouchEnd(null);
            setTouchStart(null);
        } else {
            setTouchEnd(
                isLandscapeLgMax ? e.touches[0].clientY : e.touches[0].clientX,
            );
        }
    };

    const onTouchEnd = () => {
        if (!popupOpen) return;

        if (!touchStart || !touchEnd) return;

        if (window.visualViewport) {
            if (Math.abs(window.visualViewport.scale - 1) > 0.05) {
                return;
            }
        }

        const minSwipeDistance = 50;
        const distance = touchStart - touchEnd;
        const isPreviousSwipe = distance > minSwipeDistance;
        const isNextSwipe = distance < -minSwipeDistance;

        if (isPreviousSwipe) {
            showItem(currentPortfolioIndex + 1);
        } else if (isNextSwipe) {
            showItem(currentPortfolioIndex - 1);
        }
    };

    const onKeyDown = (e: any) => {
        if (!popupOpen) return;

        if (e.keyCode === 37) {
            showItem(currentPortfolioIndex - 1);
        } else if (e.keyCode === 39) {
            showItem(currentPortfolioIndex + 1);
        }
    };

    useEffect(() => {
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
    }, [popupOpen, currentPortfolioIndex, touchStart, touchEnd]);
};
