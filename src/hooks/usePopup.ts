import { useEffect, useState } from "react";
import { useStore } from "./useStore";
import { mapIndex } from "utils/utils";
import { PortfolioItem } from "data/types";

export const usePopup = (items: PortfolioItem[]) => {
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const { popupOpen, currentPortfolioIndex, setCurrentPortfolioIndex } =
        useStore();

    const showItem = (newIndex: number) => {
        setCurrentPortfolioIndex(mapIndex(newIndex, items.length - 1));
    };

    const onTouchStart = (e: any) => {
        if (!popupOpen) return;

        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: any) => {
        if (!popupOpen) return;

        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!popupOpen) return;
        if (!touchStart || !touchEnd) return;

        const minSwipeDistance = 50;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            showItem(currentPortfolioIndex + 1);
        } else if (isRightSwipe) {
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
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("touchstart", onTouchStart);
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("touchend", onTouchEnd);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }, [popupOpen, currentPortfolioIndex, touchStart, touchEnd]);
};
