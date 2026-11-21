import { type RefObject, useEffect } from "react";

import { TRANSITION_DEFAULT } from "styles/variables";

import { useStore } from "./useStore";

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

                // Focus the dialog instead of the CloseButton so no focus ring distracts
                dialog.focus({ preventScroll: true });
            }

            // One frame of delay so the initial values are rendered
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
