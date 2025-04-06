import { useStore } from "hooks/useStore";
import {
    InnerWrapper,
    ItemContainer,
    OuterWrapper,
    SliderContainer,
    StyledPopup,
} from "./styles";
import { PortfolioItem } from "data/types";
import Icon from "elements/components/icon";
import Div from "elements/components/div";
import Text from "elements/components/text";
import Image from "elements/components/image";
import Video from "elements/components/video";
import { usePopup } from "hooks/usePopup";

export interface PopupProps {
    items: PortfolioItem[];
}

const Popup = ({ items }: PopupProps) => {
    const {
        popupOpen,
        setPopupOpen,
        currentPortfolioIndex,
        setCurrentPortfolioIndex,
    } = useStore();

    usePopup(items);

    const activeItem = items[currentPortfolioIndex];

    return (
        <StyledPopup $isOpen={popupOpen}>
            <OuterWrapper>
                <InnerWrapper>
                    <ItemContainer>
                        {activeItem.video ? (
                            <Video
                                src={activeItem.video}
                                poster={activeItem.image}
                            />
                        ) : (
                            <Image
                                src={activeItem.image}
                                alt={activeItem.title}
                            />
                        )}
                    </ItemContainer>

                    <Text textAlign="center" margin="1rem 0 0 0">
                        {activeItem.title}
                    </Text>
                </InnerWrapper>
            </OuterWrapper>

            <SliderContainer>
                {items.map((item, index) => {
                    return (
                        <Div
                            key={item.title}
                            margin="0 0.25rem 0 0"
                            height="3rem"
                            width="3rem"
                            overflow="hidden"
                            onClick={() => setCurrentPortfolioIndex(index)}
                            opacity={index === currentPortfolioIndex ? 1 : 0.5}
                        >
                            <Image
                                width="100%"
                                src={item.image}
                                alt={item.title}
                            />
                        </Div>
                    );
                })}
            </SliderContainer>

            <Div position="absolute" top="1rem" right="1rem">
                <Icon
                    size="2rem"
                    name="close"
                    onClick={() => setPopupOpen(false)}
                />
            </Div>
        </StyledPopup>
    );
};

export default Popup;
