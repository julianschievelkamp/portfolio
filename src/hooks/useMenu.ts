import { useState, useEffect } from "react";
import { useStore } from "./useStore";

export const useMenu = () => {
    const [isVisible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { sidebarOpen } = useStore();

    const controlMenu = (e: any) => {
        if (
            !sidebarOpen &&
            e.target.scrollTop > 120 &&
            e.target.scrollTop > lastScrollY
        ) {
            // if scroll down hide the menu
            setVisible(false);
        } else {
            // if scroll up show the menu
            setVisible(true);
        }

        // remember current page location to use in the next move
        setLastScrollY(e.target.scrollTop);
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
