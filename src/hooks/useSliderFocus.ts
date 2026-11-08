import { FocusEvent, useEffect, useRef, useState } from "react";
import { useStore } from "./useStore";

export const useSliderFocus = () => {
    const { currentPortfolioIndex } = useStore();
    const containerRef = useRef<HTMLDivElement>(null);

    const [selectedIndex, setSelectedIndex] = useState(currentPortfolioIndex);
    const [prevPortfolioIndex, setPrevPortfolioIndex] = useState(
        currentPortfolioIndex,
    );

    // Bei Änderung des aktuellen Index wird der selectedIndex sofort angeglichen
    if (prevPortfolioIndex !== currentPortfolioIndex) {
        setPrevPortfolioIndex(currentPortfolioIndex);
        setSelectedIndex(currentPortfolioIndex);
    }

    // Liegt der Fokus bereits im Slider, folgt er dem per Tastatur gewechselten Index,
    // damit von dort aus weitergetabbt werden kann
    useEffect(() => {
        const container = containerRef.current;

        if (!container?.contains(document.activeElement)) return;

        const buttons = container.querySelectorAll("button");

        buttons[currentPortfolioIndex]?.focus({ preventScroll: true });
    }, [currentPortfolioIndex]);

    // Nur wenn per Tab fokussiert wird, folgt der Slider dem fokussierten Item
    const handleItemFocus = (e: FocusEvent<HTMLElement>, index: number) => {
        if (e.target.matches(":focus-visible")) {
            setSelectedIndex(index);
        }
    };

    // Verlässt der Fokus den Slider, wird wieder das aktuelle Bild zentriert
    const handleBlur = (e: FocusEvent<HTMLElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setSelectedIndex(currentPortfolioIndex);
        }
    };

    return { containerRef, selectedIndex, handleItemFocus, handleBlur };
};
