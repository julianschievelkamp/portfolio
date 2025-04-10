import { useEffect, useState } from "react";
import { useStore } from "./useStore";

export const useTheme = () => {
    const { theme, setTheme } = useStore();
    const [isLoading, setIsLoading] = useState(true);

    const set = (mode: "light" | "dark") => {
        window.localStorage.setItem("theme", mode);

        setTheme(mode);
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem("theme");

        localTheme ? setTheme(localTheme) : set("light");

        setIsLoading(false);
    }, []);

    return { theme, set, isLoading };
};
