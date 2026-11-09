import { useEffect, useState } from "react";

// Wird sofort aktiv, bleibt nach dem Deaktivieren aber noch für die angegebene
// Dauer aktiv, z. B. bis eine Schließen-Animation abgeschlossen ist
export const useDelayedDeactivation = (isActive: boolean, delay: number) => {
    const [isLingering, setLingering] = useState(isActive);

    // Beim Aktivieren direkt während des Renderns nachziehen, damit es keinen
    // Frame ohne aktiven Zustand gibt
    if (isActive && !isLingering) {
        setLingering(true);
    }

    useEffect(() => {
        if (isActive) {
            return;
        }

        const timer = setTimeout(() => setLingering(false), delay);

        return () => clearTimeout(timer);
    }, [isActive, delay]);

    return isActive || isLingering;
};
