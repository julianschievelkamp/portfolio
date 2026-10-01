import { useEffect } from "react";

export const useOnClickOutside = (
    ref: React.RefObject<HTMLElement | null>,
    callback: (e: TouchEvent | MouseEvent) => void,
) => {
    useEffect(() => {
        const listener = (e: TouchEvent | MouseEvent) => {
            const target = e.target as HTMLElement;

            if (!ref.current || ref.current.contains(target)) {
                return;
            }

            callback(e);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, callback]);
};
