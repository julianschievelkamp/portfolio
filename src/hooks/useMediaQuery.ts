import { useState, useEffect } from "react";
import { useEventListener } from "./useEventListener";

export const useMediaQuery = (mediaQuery: string) => {
    const [isMatch, setMatch] = useState(false);
    const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList | null>(
        null
    );

    useEffect(() => {
        const list = window.matchMedia(mediaQuery);

        setMediaQueryList(list);
        setMatch(list.matches);
    }, [mediaQuery]);

    useEventListener(
        "change",
        (e: MediaQueryListEvent) => setMatch(e.matches),
        mediaQueryList
    );

    return isMatch;
};
