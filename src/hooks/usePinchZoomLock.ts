import { useEffect } from "react";

// Verhindert das native Pinch-Zoomen der gesamten Seite
export const usePinchZoomLock = () => {
    useEffect(() => {
        const preventDefault = (e: Event) => {
            if (e.cancelable) {
                e.preventDefault();
            }
        };

        // Mehrfinger-Berührungen entsprechen einer Pinch-Geste
        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 1) {
                preventDefault(e);
            }
        };

        // Trackpad-Pinch (und Strg + Mausrad) auf dem Desktop
        const handleWheel = (e: WheelEvent) => {
            if (e.ctrlKey) {
                preventDefault(e);
            }
        };

        // Proprietäre Safari-Gesten-Events (iOS und macOS)
        const gestureEvents = ["gesturestart", "gesturechange", "gestureend"];

        document.addEventListener("touchmove", handleTouchMove, {
            passive: false,
        });
        document.addEventListener("wheel", handleWheel, { passive: false });
        gestureEvents.forEach((name) =>
            document.addEventListener(name, preventDefault, { passive: false }),
        );

        return () => {
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("wheel", handleWheel);
            gestureEvents.forEach((name) =>
                document.removeEventListener(name, preventDefault),
            );
        };
    }, []);
};
