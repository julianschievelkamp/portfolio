import { useEffect, useState } from "react";
import type { PortfolioItem } from "data/portfolioData";

// Liefert das zuletzt vollständig geladene Item. Das Bild eines neuen Items wird
// zuerst unsichtbar vorgeladen, damit die Anzeige hart auf das neue Item umschaltet,
// sobald es fertig geladen ist. Bis dahin bleibt das alte Item stehen.
export const usePreloadedItem = (activeItem?: PortfolioItem) => {
    const [loadedItem, setLoadedItem] = useState(activeItem);

    useEffect(() => {
        if (!activeItem || activeItem === loadedItem) return;

        let cancelled = false;
        const preloader = new window.Image();
        preloader.src = activeItem.image;

        preloader
            .decode()
            // Auch bei Ladefehlern umschalten, damit die UI nicht hängen bleibt
            .catch(() => undefined)
            .then(() => {
                if (!cancelled) setLoadedItem(activeItem);
            });

        // Bei schnellem Weiterschalten werden veraltete Ladevorgänge verworfen
        return () => {
            cancelled = true;
        };
    }, [activeItem, loadedItem]);

    return loadedItem;
};
