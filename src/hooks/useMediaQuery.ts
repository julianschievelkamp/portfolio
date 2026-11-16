import { useCallback, useSyncExternalStore } from "react";

export const useMediaQuery = (mediaQuery: string) => {
    // Abonniert Änderungen der Media Query; window wird nur im Browser berührt
    const subscribe = useCallback(
        (onChange: () => void) => {
            const list = window.matchMedia(mediaQuery);

            list.addEventListener("change", onChange);

            return () => list.removeEventListener("change", onChange);
        },
        [mediaQuery],
    );

    const getSnapshot = () => window.matchMedia(mediaQuery).matches;

    // Beim Pre-rendering gibt es kein window, daher false als Startwert
    const getServerSnapshot = () => false;

    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
