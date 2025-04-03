import { useState, useEffect } from "react";

export const useMenu = () => {
    const [isVisible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlMenu = () => {
        if (window.scrollY > lastScrollY) {
            // if scroll down hide the navbar
            setVisible(false);
        } else {
            // if scroll up show the navbar
            setVisible(true);
        }

        // remember current page location to use in the next move
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", controlMenu);

        return () => {
            window.removeEventListener("scroll", controlMenu);
        };
    }, [lastScrollY]);

    return {
        isVisible,
    };
};
