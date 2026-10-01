import { badges } from "data/languageData";
import { BadgesWrapper, StyledItemInfo } from "../styles";
import { PortfolioItem } from "data/portfolioData";
import Div from "elements/components/div";
import Headline from "elements/components/headline";
import Text from "elements/components/text";
import Image from "elements/components/image";

export interface ItemInfoProps {
    loadedItem: PortfolioItem;
    isInfoOn: boolean;
}

const ItemInfo = ({ loadedItem, isInfoOn }: ItemInfoProps) => {
    return (
        <StyledItemInfo $isVisible={isInfoOn}>
            <Div>
                <Headline type="h2" color="white" fontSize="0.875rem">
                    {loadedItem.title} / {loadedItem.year}
                </Headline>
                <Text color="white" fontSize="0.875rem">
                    {loadedItem.type}
                </Text>
            </Div>

            {loadedItem.badges && (
                <BadgesWrapper>
                    {loadedItem.badges.map((key) => {
                        const badge = badges[key];

                        return (
                            <Div
                                key={key}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                margin="0 0 0 0.5rem"
                            >
                                <Image
                                    src={badge.image}
                                    alt={badge.alt}
                                    loading="lazy"
                                    aspectRatio="1/1"
                                    width="2rem"
                                    height="2rem"
                                />
                            </Div>
                        );
                    })}
                </BadgesWrapper>
            )}
        </StyledItemInfo>
    );
};

export default ItemInfo;
