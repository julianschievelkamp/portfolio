import { useCallback, useState } from "react";

// Merkt sich, ob das Bild zur aktuellen src geladen ist, damit es danach einblenden kann.
// Der Callback-Ref erkennt auch Bilder, die schon vor der Hydration fertig geladen waren.
export const useImageFadeIn = (src: string) => {
    const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

    const markLoaded = useCallback(() => setLoadedSrc(src), [src]);

    const imageRef = useCallback(
        (image: HTMLImageElement | null) => {
            if (!image) return;

            if (image.complete) {
                markLoaded();
                return;
            }

            image.addEventListener("load", markLoaded, { once: true });

            return () => image.removeEventListener("load", markLoaded);
        },
        [markLoaded],
    );

    return {
        imageRef,
        isLoaded: loadedSrc === src,
        markLoaded,
    };
};
