import { type RefObject, useEffect, useRef } from "react";

import { TRANSITION_DEFAULT } from "styles/variables";

import { useStore } from "./useStore";

export const usePopupOverlay = (
    popupRef: RefObject<HTMLDialogElement | null>,
) => {
    const popupOpen = useStore((state) => state.popupOpen);

    const closedViaEscape = useRef(false);

    useEffect(() => {
        if (!popupOpen) return;

        closedViaEscape.current = false;

        const onKeyDown = (e: KeyboardEvent) => {
            closedViaEscape.current = e.key === "Escape";
        };

        document.addEventListener("keydown", onKeyDown);

        return () => document.removeEventListener("keydown", onKeyDown);
    }, [popupOpen]);

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
            if (!dialog.open) return;

            dialog.close();

            // close() restores focus to a trigger button (Safari picks the last one);
            // keep that only for keyboard users who closed via ESC
            if (!closedViaEscape.current) {
                const active = document.activeElement;

                if (active instanceof HTMLElement) active.blur();
            }
        }, TRANSITION_DEFAULT);

        return () => clearTimeout(timeout);
    }, [popupOpen, popupRef]);
};
