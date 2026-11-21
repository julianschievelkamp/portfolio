import { useCallback, useSyncExternalStore } from "react";

export const useMediaQuery = (mediaQuery: string) => {
    // Subscribes to media query changes; window is only touched in the browser
    const subscribe = useCallback(
        (onChange: () => void) => {
            const list = window.matchMedia(mediaQuery);

            list.addEventListener("change", onChange);

            return () => list.removeEventListener("change", onChange);
        },
        [mediaQuery],
    );

    const getSnapshot = () => window.matchMedia(mediaQuery).matches;

    // There is no window during pre-rendering, hence false as the initial value
    const getServerSnapshot = () => false;

    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
