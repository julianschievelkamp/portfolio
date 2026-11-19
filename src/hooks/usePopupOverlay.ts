import { RefObject, useEffect } from "react";
import { useStore } from "./useStore";
import { TRANSITION_DEFAULT } from "styles/variables";

export const usePopupOverlay = (
    popupRef: RefObject<HTMLDialogElement | null>,
) => {
    const popupOpen = useStore((state) => state.popupOpen);

    useEffect(() => {
        const dialog = popupRef.current;

        if (!dialog) return;

        if (popupOpen) {
            if (!dialog.open) {
                dialog.showModal();

                // Dialog statt CloseButton fokussieren, damit kein Fokusrahmen ablenkt
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
};
