import { useStore } from "hooks/useStore";
import {
    ArrowLeft,
    ArrowRight,
    CloseTrigger,
    InnerSliderContainer,
    InnerWrapper,
    ItemContainer,
    OuterWrapper,
    PaletteItem,
    SliderContainer,
    StyledPopup,
} from "./styles";
import Icon from "elements/components/icon";
import Div from "elements/components/div";
import Text from "elements/components/text";
import Image from "elements/components/image";
import Video from "elements/components/video";
import { usePopup } from "hooks/usePopup";
import { mapIndex } from "utils/utils";
import { useMediaQuery } from "hooks/useMediaQuery";
import { queries } from "styles/variables";
import { portfolioData } from "data/portfolioData";

const Popup = () => {
    const {
        popupOpen,
        setPopupOpen,
        currentPortfolioIndex,
        setCurrentPortfolioIndex,
    } = useStore();

    usePopup(portfolioData);

    const isMd = useMediaQuery(queries.md);
    const activeItem = portfolioData[currentPortfolioIndex];

    return (
        <StyledPopup $isOpen={popupOpen}>
            <OuterWrapper>
                <CloseTrigger onClick={() => setPopupOpen(false)} />
                <InnerWrapper>
                    {isMd && (
                        <>
                            <ArrowLeft>
                                <Icon
                                    size="4rem"
                                    name="chevronLeft"
                                    onClick={() =>
                                        setCurrentPortfolioIndex(
                                            mapIndex(
                                                currentPortfolioIndex - 1,
                                                portfolioData.length - 1
                                            )
                                        )
                                    }
                                />
                            </ArrowLeft>
                            <ArrowRight>
                                <Icon
                                    size="4rem"
                                    name="chevronRight"
                                    onClick={() =>
                                        setCurrentPortfolioIndex(
                                            mapIndex(
                                                currentPortfolioIndex + 1,
                                                portfolioData.length - 1
                                            )
                                        )
                                    }
                                />
                            </ArrowRight>
                        </>
                    )}

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
                        <Div
                            position="absolute"
                            width="100%"
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            {activeItem.palette.map((color) => {
                                return (
                                    <PaletteItem
                                        key={color}
                                        $background={color}
                                    />
                                );
                            })}
                            <Text bold textAlign="right" margin="0 0 0 0.25rem">
                                {activeItem.title}
                            </Text>
                        </Div>
                    </ItemContainer>
                </InnerWrapper>
            </OuterWrapper>

            <SliderContainer>
                <InnerSliderContainer
                    $opacity={popupOpen ? 1 : 0}
                    $currentPortfolioIndex={currentPortfolioIndex}
                >
                    {portfolioData.map((item, index) => {
                        return (
                            <Div
                                key={item.title}
                                margin="0 0.25rem 0 0"
                                height="3rem"
                                width="3rem"
                                overflow="hidden"
                                onClick={() => setCurrentPortfolioIndex(index)}
                                opacity={
                                    index === currentPortfolioIndex ? 1 : 0.5
                                }
                            >
                                <Image
                                    width="100%"
                                    src={item.image}
                                    alt={item.title}
                                />
                            </Div>
                        );
                    })}
                </InnerSliderContainer>
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
