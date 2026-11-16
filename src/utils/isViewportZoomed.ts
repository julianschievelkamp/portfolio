// Toleranz, ab der der Viewport als vergrößert gilt
const ZOOM_TOLERANCE = 0.05;

// Greift auf window zu, daher nur in Effects oder Event-Handlern aufrufen.
export const isViewportZoomed = (): boolean => {
    const viewport = window.visualViewport;

    return !!viewport && Math.abs(viewport.scale - 1) > ZOOM_TOLERANCE;
};
