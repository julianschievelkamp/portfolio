import { BadgesWrapper, ImageTitle, StyledItemInfo } from "./ItemInfo.styles";
import { badges, PortfolioItem } from "data/portfolioData";
import Image from "elements/components/Image/Image";

export interface ItemInfoProps {
    loadedItem: PortfolioItem;
    isInfoOn: boolean;
}

const ItemInfo = ({ loadedItem, isInfoOn }: ItemInfoProps) => {
    return (
        <StyledItemInfo $isVisible={isInfoOn}>
            <ImageTitle color="white" fontSize="0.875rem">
                <span>
                    {loadedItem.title}, {loadedItem.year}
                </span>
                <br />
                {loadedItem.type}
            </ImageTitle>

            {loadedItem.badges && (
                <BadgesWrapper>
                    {loadedItem.badges.map((key) => {
                        const badge = badges[key];

                        return (
                            <Image
                                src={badge.image}
                                alt={badge.alt}
                                loading="lazy"
                                aspectRatio="1/1"
                                width="2rem"
                                height="2rem"
                                key={key}
                            />
                        );
                    })}
                </BadgesWrapper>
            )}
        </StyledItemInfo>
    );
};

export default ItemInfo;
