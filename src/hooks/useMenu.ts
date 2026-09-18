import { useState, useEffect } from "react";
import { useStore } from "./useStore";

export const useMenu = () => {
    const [isVisible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { sidebarOpen } = useStore();

    const controlMenu = (e: Event) => {
        const target = e.target as HTMLElement;

        if (
            !sidebarOpen &&
            target.scrollTop > 120 &&
            target.scrollTop > lastScrollY
        ) {
            // if scroll down hide the menu
            setVisible(false);
        } else if (
            sidebarOpen ||
            target.scrollTop <= 120 ||
            target.scrollTop + 20 <= lastScrollY
        ) {
            // if scroll up show the menu
            setVisible(true);
        }

        // remember current page location to use in the next move
        setLastScrollY(target.scrollTop);
    };

    useEffect(() => {
        const pageContainer = document.getElementById("page-container");

        pageContainer?.addEventListener("scroll", controlMenu);

        return () => {
            pageContainer?.removeEventListener("scroll", controlMenu);
        };
    }, [lastScrollY]);

    return {
        isVisible,
    };
};
