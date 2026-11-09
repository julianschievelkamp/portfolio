import { useLayoutEffect } from "react";
import { TRANSITION_DEFAULT } from "styles/variables";

// Hinterlegt die Scrollposition als CSS-Variable am Wurzelelement, damit
// absolut positionierte Overlays genau im sichtbaren Bereich der Seite liegen.
// Die Position wird nachgeführt, solange das Overlay aktiv ist oder noch
// herausfährt, z. B. wenn der Seitenwechsel die Scrollposition zurücksetzt.
// Jedes Overlay nutzt eine eigene Variable, damit sich Overlays beim
// Zurücksetzen nicht gegenseitig beeinflussen.
export const useScrollOffset = (isActive: boolean, property: string) => {
    // Layout-Effekt, damit die Position vor dem ersten Frame der Animation steht
    useLayoutEffect(() => {
        const root = document.documentElement;

        const updateOffset = () => {
            // Negative Werte durch den Bounce-Effekt auf iOS ignorieren
            root.style.setProperty(property, `${Math.max(window.scrollY, 0)}px`);
        };

        window.addEventListener("scroll", updateOffset, { passive: true });

        if (isActive) {
            updateOffset();

            return () => window.removeEventListener("scroll", updateOffset);
        }

        // Erst nach der Schließen-Animation aufhören und zurücksetzen, damit
        // das Overlay nicht springt und die Seite am Ende nicht verlängert
        const timer = setTimeout(() => {
            window.removeEventListener("scroll", updateOffset);
            root.style.removeProperty(property);
        }, TRANSITION_DEFAULT);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("scroll", updateOffset);
        };
    }, [isActive, property]);
};
