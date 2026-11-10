import { useEffect } from "react";
import { useStore } from "./useStore";
import { TRANSITION_DEFAULT } from "styles/variables";
import { useAbsoluteOverlay } from "./useAbsoluteOverlay";
import { usePopupControls } from "./usePopupControls";

export const usePopupOverlay = () => {
    const popupOpen = useStore((state) => state.popupOpen);
    const dialogRef = useAbsoluteOverlay<HTMLDialogElement>();

    usePopupControls();

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        if (popupOpen) {
            if (!dialog.open) {
                const trigger = document.activeElement;

                const isKeyboardUser =
                    trigger instanceof HTMLElement &&
                    trigger.matches(":focus-visible");

                // Bei Maus/Touch den Auslöser vorab entfokussieren, damit der
                // Browser beim Schließen keinen Fokus zurücksetzt
                if (!isKeyboardUser && trigger instanceof HTMLElement) {
                    trigger.blur();
                }

                dialog.showModal();

                // Fokus auf den Dialog selbst statt auf den CloseButton,
                // damit kein Fokusrahmen vom Hauptbild ablenkt
                if (!isKeyboardUser) dialog.focus({ preventScroll: true });
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
    }, [popupOpen, dialogRef]);

    return dialogRef;
};
