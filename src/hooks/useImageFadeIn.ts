import { useCallback, useState } from "react";

// Remembers whether the image for the current src is loaded so the fader can fade out afterwards.
// The callback ref also detects images that were already fully loaded before hydration.
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
