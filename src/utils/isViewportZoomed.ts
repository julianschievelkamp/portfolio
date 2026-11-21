// Tolerance from which the viewport counts as zoomed in
const ZOOM_TOLERANCE = 0.05;

// Accesses window, so only call it in effects or event handlers.
export const isViewportZoomed = (): boolean => {
    const viewport = window.visualViewport;

    return !!viewport && Math.abs(viewport.scale - 1) > ZOOM_TOLERANCE;
};
