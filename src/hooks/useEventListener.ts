import { useEffect, useRef } from "react";

export const useEventListener = (
    eventType: string,
    callback: (e: Event & MediaQueryListEvent) => void,
    element: Window | MediaQueryList | null = window
) => {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const isSupported = element && element.addEventListener;

        if (!isSupported) return;

        const eventListener = (event: Event) =>
            callbackRef.current(event as MediaQueryListEvent);
        element.addEventListener(eventType, eventListener);

        return () => {
            element.removeEventListener(eventType, eventListener);
        };
    }, [eventType, element]);
};
