import { useState, useEffect } from "react";

export const useMenu = () => {
    const [isVisible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlMenu = (e: any) => {
        if (e.target.scrollTop > 120 && e.target.scrollTop > lastScrollY) {
            // if scroll down hide the navbar
            setVisible(false);
        } else {
            // if scroll up show the navbar
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
    }, []);

    return {
        isVisible,
    };
};
