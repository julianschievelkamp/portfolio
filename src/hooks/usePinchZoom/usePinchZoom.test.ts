import { renderHook } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { PINCHING_ATTRIBUTE } from "styles/global";
import { PINCH_MAX_SCALE, usePinchZoom } from "./usePinchZoom";

interface TouchPoint {
    clientX: number;
    clientY: number;
}

const point = (clientX: number, clientY: number): TouchPoint => ({
    clientX,
    clientY,
});

// Zwei Finger mit dem Abstand "distance" um den Mittelpunkt (200, 200)
const fingers = (distance: number): TouchPoint[] => [
    point(200 - distance / 2, 200),
    point(200 + distance / 2, 200),
];

const getTransform = (element: HTMLElement) =>
    element.style.getPropertyValue("--pinch-transform");

const isPinching = () =>
    document.documentElement.hasAttribute(PINCHING_ATTRIBUTE);

// jsdom kennt DOMMatrixReadOnly nicht; das Element startet untransformiert
class FakeDOMMatrix {
    a = 1;
    e = 0;
    f = 0;
}

describe("usePinchZoom", () => {
    let element: HTMLDivElement;
    let detach: (() => void) | void;

    const attach = () => {
        const { result } = renderHook(() => usePinchZoom<HTMLDivElement>());
        detach = result.current(element);
    };

    beforeEach(() => {
        element = document.createElement("div");
        document.body.appendChild(element);
        vi.stubGlobal("DOMMatrixReadOnly", FakeDOMMatrix);
        // Frames laufen synchron, damit die Transformation sofort geschrieben wird
        vi.stubGlobal("requestAnimationFrame", (callback: () => void) => {
            callback();
            return 1;
        });
        vi.stubGlobal("cancelAnimationFrame", vi.fn());
        vi.spyOn(element, "getBoundingClientRect").mockReturnValue(
            new DOMRect(0, 0, 400, 400),
        );
    });

    afterEach(() => {
        detach?.();
        element.remove();
        vi.unstubAllGlobals();
    });

    it("ignores a single finger", () => {
        attach();

        fireEvent.touchStart(element, { touches: [point(100, 100)] });
        fireEvent.touchMove(element, { touches: [point(150, 150)] });

        expect(getTransform(element)).toBe("");
        expect(isPinching()).toBe(false);
    });

    it("starts a gesture with two fingers and marks the document", () => {
        attach();

        fireEvent.touchStart(element, { touches: fingers(100) });

        expect(isPinching()).toBe(true);
        expect(getTransform(element)).toBe("translate(0px, 0px) scale(1)");
    });

    it("scales with the finger distance", () => {
        attach();
        fireEvent.touchStart(element, { touches: fingers(100) });

        fireEvent.touchMove(element, { touches: fingers(150) });

        expect(getTransform(element)).toContain("scale(1.5)");
    });

    it("keeps the point under the fingers in place while zooming", () => {
        attach();
        fireEvent.touchStart(element, { touches: fingers(100) });

        fireEvent.touchMove(element, { touches: fingers(150) });

        // Mittelpunkt 200 bei Skalierung 1.5: 200 - 1.5 * 200 = -100
        expect(getTransform(element)).toBe(
            "translate(-100px, -100px) scale(1.5)",
        );
    });

    it("limits the scale to the allowed range", () => {
        attach();
        fireEvent.touchStart(element, { touches: fingers(100) });

        fireEvent.touchMove(element, { touches: fingers(1000) });
        expect(getTransform(element)).toContain(`scale(${PINCH_MAX_SCALE})`);

        fireEvent.touchMove(element, { touches: fingers(10) });
        expect(getTransform(element)).toContain("scale(1)");
    });

    it("prevents native gestures while the gesture is active", () => {
        attach();
        fireEvent.touchStart(element, { touches: fingers(100) });

        const notPrevented = fireEvent.touchMove(element, {
            touches: fingers(120),
        });

        expect(notPrevented).toBe(false);
    });

    it("pans with one finger once a gesture is active", () => {
        attach();
        fireEvent.touchStart(element, { touches: fingers(100) });
        fireEvent.touchMove(element, { touches: fingers(150) });
        // Ein Finger wird abgehoben, der verbleibende verschiebt
        fireEvent.touchEnd(element, { touches: [point(250, 200)] });

        fireEvent.touchMove(element, { touches: [point(260, 220)] });

        expect(getTransform(element)).toBe(
            "translate(-90px, -80px) scale(1.5)",
        );
    });

    it("resets once all fingers are lifted", () => {
        attach();
        fireEvent.touchStart(element, { touches: fingers(100) });
        fireEvent.touchMove(element, { touches: fingers(150) });

        fireEvent.touchEnd(element, { touches: [] });

        expect(getTransform(element)).toBe("");
        expect(isPinching()).toBe(false);
    });

    it("resets when the gesture is cancelled", () => {
        attach();
        fireEvent.touchStart(element, { touches: fingers(100) });

        fireEvent.touchCancel(element, { touches: [] });

        expect(getTransform(element)).toBe("");
        expect(isPinching()).toBe(false);
    });

    it("does not start a gesture while the viewport is zoomed", () => {
        vi.stubGlobal("visualViewport", { scale: 2 });
        attach();

        fireEvent.touchStart(element, { touches: fingers(100) });

        expect(isPinching()).toBe(false);
        expect(getTransform(element)).toBe("");
    });

    it("swallows clicks during and shortly after a gesture", () => {
        vi.spyOn(performance, "now").mockReturnValue(1000);
        attach();
        const onClick = vi.fn();
        element.addEventListener("click", onClick);
        fireEvent.touchStart(element, { touches: fingers(100) });

        fireEvent.click(element);
        expect(onClick).not.toHaveBeenCalled();

        fireEvent.touchEnd(element, { touches: [] });
        vi.spyOn(performance, "now").mockReturnValue(1200);
        fireEvent.click(element);
        expect(onClick).not.toHaveBeenCalled();

        vi.spyOn(performance, "now").mockReturnValue(1500);
        fireEvent.click(element);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("lets clicks through without a gesture", () => {
        attach();
        const onClick = vi.fn();
        element.addEventListener("click", onClick);

        fireEvent.click(element);

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("cleans up listeners, styles and the document mark on detach", () => {
        attach();
        fireEvent.touchStart(element, { touches: fingers(100) });

        detach?.();
        detach = undefined;

        expect(getTransform(element)).toBe("");
        expect(isPinching()).toBe(false);

        fireEvent.touchStart(element, { touches: fingers(100) });
        expect(isPinching()).toBe(false);
    });

    it("does nothing without an element", () => {
        const { result } = renderHook(() => usePinchZoom<HTMLDivElement>());

        expect(result.current(null)).toBeUndefined();
    });
});
