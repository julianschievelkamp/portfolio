import { useCallback } from "react";

import { PINCHING_ATTRIBUTE } from "styles/global";
import { isViewportZoomed } from "utils/isViewportZoomed";

export const PINCH_MAX_SCALE = 2;

// Time window after a gesture in which clicks are discarded
const CLICK_SUPPRESS_DURATION = 300;

interface Point {
    x: number;
    y: number;
}

interface PinchBaseline {
    distance: number;
    scale: number;
    // Point under the finger midpoint in untransformed element coordinates
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

// Directly instead of via React state, so the transition is removed in sync with the transformation
const setPinching = (active: boolean) =>
    document.documentElement.toggleAttribute(PINCHING_ATTRIBUTE, active);

// Pinch zoom and panning via touch; afterwards the element glides back.
// Writes "--pinch-transform" onto the element and the pinch attribute onto <html>, the styles
// apply them (transform-origin: 0 0). Callback ref, since the element only renders after loading.
export const usePinchZoom = <T extends HTMLElement>() =>
    useCallback((element: T | null) => {
        if (!element) return;

        let isActive = false;
        let scale = 1;
        let translate: Point = { x: 0, y: 0 };
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

        // Adopts the visible transformation so the element does not jump
        const startGesture = () => {
            const matrix = new DOMMatrixReadOnly(
                getComputedStyle(element).transform,
            );
            const rect = element.getBoundingClientRect();

            isActive = true;
            scale = Math.max(matrix.a, 1);
            translate = { x: matrix.e, y: matrix.f };
            origin = { x: rect.left - translate.x, y: rect.top - translate.y };

            // Holds the element at its current position before the transition is removed
            writeTransform();
            setPinching(true);
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

            setPinching(false);
            element.style.removeProperty("--pinch-transform");
        };

        const handleTouchStart = (event: TouchEvent) => {
            if (!isActive) {
                if (event.touches.length < 2) return;
                // When the viewport is zoomed in, only the page zooms, not the artwork
                if (isViewportZoomed()) return;
                startGesture();
            }

            syncTouches(event.touches);
        };

        const handleTouchMove = (event: TouchEvent) => {
            if (!isActive) return;

            // Prevents native gestures (e.g. Safari)
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

        // Discards clicks during and shortly after a gesture
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
            setPinching(false);
            element.style.removeProperty("--pinch-transform");
        };
    }, []);
