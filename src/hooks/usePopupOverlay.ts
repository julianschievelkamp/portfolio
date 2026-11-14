import { useEffect, useRef } from "react";
import { useStore } from "./useStore";
import { TRANSITION_DEFAULT } from "styles/variables";
import { usePopupControls } from "./usePopupControls";

export const usePopupOverlay = () => {
    const popupOpen = useStore((state) => state.popupOpen);
    const popupRef = useRef<HTMLDialogElement>(null);

    usePopupControls();

    useEffect(() => {
        const dialog = popupRef.current;

        if (!dialog) return;

        if (popupOpen) {
            if (!dialog.open) {
                dialog.showModal();

                // Fokus auf den Dialog selbst statt auf den CloseButton,
                // damit kein Fokusrahmen vom Hauptbild ablenkt
                dialog.focus({ preventScroll: true });
            }

            // Ein Frame Verzögerung, damit die Startwerte gerendert werden
            const frame = requestAnimationFrame(() => {
                dialog.setAttribute("data-visible", "true");
            });

            return () => cancelAnimationFrame(frame);
        }

        dialog.removeAttribute("data-visible");

        const timeout = setTimeout(() => {
            if (dialog.open) dialog.close();
        }, TRANSITION_DEFAULT);

        return () => clearTimeout(timeout);
    }, [popupOpen, popupRef]);

    return popupRef;
};
