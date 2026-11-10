import { useCallback } from "react";

// Maximaler Zoomfaktor, darüber hinaus wirken die Werke pixelig
export const PINCH_MAX_SCALE = 4;

// Zeitfenster nach einer Geste, in dem Klicks verworfen werden
const CLICK_SUPPRESS_DURATION = 300;

interface Point {
    x: number;
    y: number;
}

interface PinchBaseline {
    distance: number;
    scale: number;
    // Punkt unter dem Fingermittelpunkt in untransformierten Element-Koordinaten
    anchor: Point;
}

interface PanBaseline {
    touch: Point;
    translate: Point;
}

const getPoint = (touch: Touch): Point => ({
    x: touch.clientX,
    y: touch.clientY,
});

const getMidpoint = (a: Touch, b: Touch): Point => ({
    x: (a.clientX + b.clientX) / 2,
    y: (a.clientY + b.clientY) / 2,
});

const getDistance = (a: Touch, b: Touch) =>
    Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);

const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

// Ermöglicht das Zoomen eines Elements mit zwei Fingern.
// Solange mindestens ein Finger liegt, lässt sich das Element weiter verschieben.
// Sobald kein Finger mehr auf dem Display ist, gleitet es per Transition zurück.
// Der Hook schreibt die Transformation als CSS-Variable "--pinch-transform" auf das
// Element und markiert eine laufende Geste mit "data-pinching". Die Styles des
// Elements wenden die Variable an (mit transform-origin: 0 0) und steuern die Transition.
// Ein Callback-Ref wird genutzt, da das Element erst nach dem Laden eines Items gerendert wird.
export const usePinchZoom = <T extends HTMLElement>() =>
    useCallback((element: T | null) => {
        if (!element) return;

        let isActive = false;
        let scale = 1;
        let translate: Point = { x: 0, y: 0 };
        // Linke obere Ecke des untransformierten Elements im Viewport
        let origin: Point = { x: 0, y: 0 };
        let pinchBaseline: PinchBaseline | null = null;
        let panBaseline: PanBaseline | null = null;
        let frame = 0;
        let gestureEndTime = -Infinity;

        const writeTransform = () => {
            element.style.setProperty(
                "--pinch-transform",
                `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            );
        };

        const applyTransform = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(writeTransform);
        };

        // Übernimmt die sichtbare Transformation, z. B. wenn eine neue Geste während der
        // Rückkehr-Transition beginnt, damit das Element nicht springt
        const startGesture = () => {
            const matrix = new DOMMatrixReadOnly(
                getComputedStyle(element).transform,
            );
            const rect = element.getBoundingClientRect();

            isActive = true;
            scale = Math.max(matrix.a, 1);
            translate = { x: matrix.e, y: matrix.f };
            // Bei transform-origin 0 0 verschiebt nur translate die linke obere Ecke
            origin = { x: rect.left - translate.x, y: rect.top - translate.y };

            // Hält das Element an der aktuellen Position, bevor die Transition entfällt
            writeTransform();
            element.dataset.pinching = "true";
        };

        const startPinch = (a: Touch, b: Touch) => {
            const midpoint = getMidpoint(a, b);
            panBaseline = null;
            pinchBaseline = {
                distance: getDistance(a, b),
                scale,
                anchor: {
                    x: (midpoint.x - origin.x - translate.x) / scale,
                    y: (midpoint.y - origin.y - translate.y) / scale,
                },
            };
        };

        const startPan = (touch: Touch) => {
            pinchBaseline = null;
            panBaseline = { touch: getPoint(touch), translate };
        };

        // Übernimmt die aktuell aufliegenden Finger als neuen Ausgangspunkt der Geste
        const syncTouches = (touches: TouchList) => {
            if (touches.length >= 2) {
                startPinch(touches[0], touches[1]);
            } else if (touches.length === 1) {
                startPan(touches[0]);
            }
        };

        const reset = () => {
            cancelAnimationFrame(frame);
            isActive = false;
            scale = 1;
            translate = { x: 0, y: 0 };
            pinchBaseline = null;
            panBaseline = null;
            gestureEndTime = performance.now();

            // Ohne data-pinching greift wieder die Transition, das Werk gleitet zurück
            delete element.dataset.pinching;
            element.style.removeProperty("--pinch-transform");
        };

        const handleTouchStart = (event: TouchEvent) => {
            if (!isActive) {
                if (event.touches.length < 2) return;
                startGesture();
            }

            syncTouches(event.touches);
        };

        const handleTouchMove = (event: TouchEvent) => {
            if (!isActive) return;

            // Verhindert native Gesten (z. B. Safari), falls touch-action ignoriert wird
            if (event.cancelable) event.preventDefault();

            const [a, b] = [event.touches[0], event.touches[1]];

            if (pinchBaseline && a && b) {
                const midpoint = getMidpoint(a, b);
                scale = clamp(
                    (pinchBaseline.scale * getDistance(a, b)) /
                        pinchBaseline.distance,
                    1,
                    PINCH_MAX_SCALE,
                );
                // Der Punkt unter den Fingern bleibt unter dem Fingermittelpunkt
                translate = {
                    x: midpoint.x - origin.x - scale * pinchBaseline.anchor.x,
                    y: midpoint.y - origin.y - scale * pinchBaseline.anchor.y,
                };
            } else if (panBaseline && a) {
                translate = {
                    x:
                        panBaseline.translate.x +
                        a.clientX -
                        panBaseline.touch.x,
                    y:
                        panBaseline.translate.y +
                        a.clientY -
                        panBaseline.touch.y,
                };
            }

            applyTransform();
        };

        const handleTouchEnd = (event: TouchEvent) => {
            if (!isActive) return;

            if (event.touches.length === 0) {
                reset();
            } else {
                syncTouches(event.touches);
            }
        };

        // Verwirft Klicks während und direkt nach einer Geste, damit z. B. die Info
        // nicht geschlossen oder das Video nicht pausiert wird
        const handleClick = (event: MouseEvent) => {
            if (
                isActive ||
                performance.now() - gestureEndTime < CLICK_SUPPRESS_DURATION
            ) {
                event.preventDefault();
                event.stopPropagation();
            }
        };

        element.addEventListener("touchstart", handleTouchStart, {
            passive: true,
        });
        element.addEventListener("touchmove", handleTouchMove, {
            passive: false,
        });
        element.addEventListener("touchend", handleTouchEnd, { passive: true });
        element.addEventListener("touchcancel", handleTouchEnd, {
            passive: true,
        });
        element.addEventListener("click", handleClick, { capture: true });

        return () => {
            element.removeEventListener("touchstart", handleTouchStart);
            element.removeEventListener("touchmove", handleTouchMove);
            element.removeEventListener("touchend", handleTouchEnd);
            element.removeEventListener("touchcancel", handleTouchEnd);
            element.removeEventListener("click", handleClick, {
                capture: true,
            });
            cancelAnimationFrame(frame);
            delete element.dataset.pinching;
            element.style.removeProperty("--pinch-transform");
        };
    }, []);
