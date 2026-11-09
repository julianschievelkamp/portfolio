import { useCallback } from "react";
import { PortfolioGrid } from "./Portfolio.styles";
import PortfolioThumbnail from "./PortfolioThumbnail/PortfolioThumbnail";
import { useStore } from "hooks/useStore";
import { portfolioData } from "data/portfolioData";
import Popup from "elements/layout/Popup/Popup";
import { Section } from "styles/variables";
import Headline from "elements/components/Headline/Headline";
import { languageData } from "data/languageData";

const Portfolio = () => {
    const setActiveIndex = useStore((state) => state.setActiveIndex);
    const setPopupOpen = useStore((state) => state.setPopupOpen);


    // Referenzstabil, damit die memoisierten Thumbnails nicht neu rendern
    const handleSelect = useCallback(
        (index: number) => {
            setActiveIndex(index);
            setPopupOpen(true);
        },
        [setActiveIndex, setPopupOpen],
    );

    return (
        <>
            <Section>
                <Headline type="h2" visuallyHidden>
                    {languageData.portfolio.headline}
                </Headline>
                <PortfolioGrid>
                    {portfolioData.map((item, index) => {
                        return (
                            <PortfolioThumbnail
                                key={item.title}
                                item={item}
                                index={index}
                                onSelect={handleSelect}
                            />
                        );
                    })}
                </PortfolioGrid>
            </Section>

            <Popup />
        </>
    );
};

export default Portfolio;
