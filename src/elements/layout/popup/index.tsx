import { useStore } from "hooks/useStore";
import {
    ImageContainer,
    InnerWrapper,
    OuterWrapper,
    SliderContainer,
    StyledPopup,
} from "./styles";
import { PortfolioItem } from "data/types";
import Icon from "elements/components/icon";
import Div from "elements/components/div";
import Text from "elements/components/text";
import Image from "elements/components/image";

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

    return (
        <StyledPopup $isOpen={popupOpen}>
            <OuterWrapper>
                <InnerWrapper>
                    <ImageContainer>
                        <Image
                            src={items[currentPortfolioIndex].image}
                            alt={items[currentPortfolioIndex].title}
                        />
                    </ImageContainer>

                    <Text textAlign="center" margin="1rem 0 0 0">
                        {items[currentPortfolioIndex].title}
                    </Text>

                    <Text textAlign="center" margin="1rem 0 0 0">
                        {items[currentPortfolioIndex].subTitle}
                    </Text>
                </InnerWrapper>
            </OuterWrapper>

            <SliderContainer>
                {items.map((item, index) => {
                    return (
                        <Div
                            display="flex"
                            margin="0 0.25rem 0 0"
                            onClick={() => setCurrentPortfolioIndex(index)}
                        >
                            <Image
                                height="3rem"
                                src={item.image}
                                alt={item.title}
                            />
                        </Div>
                    );
                })}
            </SliderContainer>

            <Div position="absolute" top="1.5rem" right="1rem">
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
