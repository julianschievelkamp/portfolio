import { FocusEvent, useEffect, useRef, useState } from "react";
import { useStore } from "./useStore";

export const useSliderFocus = () => {
    const activeIndex = useStore((state) => state.activeIndex);
    const containerRef = useRef<HTMLDivElement>(null);

    const [focusedIndex, setFocusedIndex] = useState(activeIndex);
    const [prevActiveIndex, setPrevActiveIndex] = useState(activeIndex);

    // Bei Änderung des aktuellen Index wird der focusedIndex sofort angeglichen
    if (prevActiveIndex !== activeIndex) {
        setPrevActiveIndex(activeIndex);
        setFocusedIndex(activeIndex);
    }

    // Liegt der Fokus bereits im Slider, folgt er dem per Tastatur gewechselten Index,
    // damit von dort aus weitergetabbt werden kann
    useEffect(() => {
        const container = containerRef.current;

        if (!container?.contains(document.activeElement)) return;

        const buttons = container.querySelectorAll("button");

        buttons[activeIndex]?.focus({ preventScroll: true });
    }, [activeIndex]);

    // Nur wenn per Tab fokussiert wird, folgt der Slider dem fokussierten Item
    const handleItemFocus = (e: FocusEvent<HTMLElement>, index: number) => {
        if (e.target.matches(":focus-visible")) {
            setFocusedIndex(index);
        }
    };

    // Verlässt der Fokus den Slider, wird wieder das aktuelle Bild zentriert
    const handleBlur = (e: FocusEvent<HTMLElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setFocusedIndex(activeIndex);
        }
    };

    return { containerRef, focusedIndex, handleItemFocus, handleBlur };
};
