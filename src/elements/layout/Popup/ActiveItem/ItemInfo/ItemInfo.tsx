import {
    BadgeItem,
    BadgesWrapper,
    ImageTitle,
    InnerWrapper,
    StyledItemInfo,
    TitleWrapper,
} from "./ItemInfo.styles";
import { badges, PortfolioItem } from "data/portfolioData";
import Text from "elements/components/Text/Text";
import Image from "elements/components/Image/Image";

export interface ItemInfoProps {
    loadedItem: PortfolioItem;
    isInfoOn: boolean;
}

const ItemInfo = ({ loadedItem, isInfoOn }: ItemInfoProps) => {
    return (
        <StyledItemInfo $isVisible={isInfoOn}>
            <InnerWrapper>
                <TitleWrapper>
                    <ImageTitle color="white" fontSize="0.875rem">
                        {loadedItem.title} / {loadedItem.year}
                    </ImageTitle>
                    <Text color="white" fontSize="0.875rem">
                        {loadedItem.type}
                    </Text>
                </TitleWrapper>

                {loadedItem.badges && (
                    <BadgesWrapper>
                        {loadedItem.badges.map((key) => {
                            const badge = badges[key];

                            return (
                                <BadgeItem key={key}>
                                    <Image
                                        src={badge.image}
                                        alt={badge.alt}
                                        loading="lazy"
                                        aspectRatio="1/1"
                                        width="2rem"
                                        height="2rem"
                                    />
                                </BadgeItem>
                            );
                        })}
                    </BadgesWrapper>
                )}
            </InnerWrapper>
        </StyledItemInfo>
    );
};

export default ItemInfo;
