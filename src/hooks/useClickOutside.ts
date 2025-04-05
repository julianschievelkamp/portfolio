import { useEffect } from "react";

export const useClickOutside = (
    ref: React.RefObject<HTMLElement | null>,
    handler: Function
) => {
    useEffect(() => {
        const listener = (event: Event) => {
            if (!ref.current || ref.current.contains(event.target as Element)) {
                return;
            }
            handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchend touchcancel", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchend touchcancel", listener);
        };
    }, [ref, handler]);
};
