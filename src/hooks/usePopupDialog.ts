import { useEffect, useRef } from "react";
import { useStore } from "./useStore";
import { TRANSITION_DEFAULT } from "styles/variables";

export const usePopupDialog = () => {
    const popupOpen = useStore((state) => state.popupOpen);
    const dialogRef = useRef<HTMLDialogElement>(null);

    // Store-Zustand mit dem nativen Dialog synchronisieren.
    // Das Ausblenden läuft über das Attribut data-visible, da Safari/iOS
    // display und overlay nicht diskret animiert: Der Dialog wird erst nach
    // Ende der Transition wirklich geschlossen.
    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        if (popupOpen) {
            if (!dialog.open) dialog.showModal();

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
    }, [popupOpen]);

    return dialogRef;
};
