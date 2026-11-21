import { useCallback } from "react";

import { languageData } from "data/languageData";
import { portfolioData } from "data/portfolioData";
import Headline from "elements/components/Headline/Headline";
import Popup from "elements/layout/Popup/Popup";
import { useStore } from "hooks/useStore";

import { PortfolioGrid } from "./Portfolio.styles";
import PortfolioThumbnail from "./PortfolioThumbnail/PortfolioThumbnail";

const Portfolio = () => {
    const setActiveIndex = useStore((state) => state.setActiveIndex);
    const setPopupOpen = useStore((state) => state.setPopupOpen);

    // Referentially stable so the memoized thumbnails do not re-render
    const handleSelect = useCallback(
        (index: number) => {
            setActiveIndex(index);
            setPopupOpen(true);
        },
        [setActiveIndex, setPopupOpen],
    );

    return (
        <>
            <section>
                <Headline type="h2" visuallyHidden>
                    {languageData.portfolio.headline}
                </Headline>
                <PortfolioGrid>
                    {portfolioData.map((item, index) => (
                        <PortfolioThumbnail
                            key={item.title}
                            index={index}
                            item={item}
                            onSelect={handleSelect}
                        />
                    ))}
                </PortfolioGrid>
            </section>

            <Popup />
        </>
    );
};

export default Portfolio;
