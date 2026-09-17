import Text from "elements/components/text";
import {
    OuterWrapper,
    CloseTrigger,
    InnerWrapper,
    ItemContainer,
    PaletteItem,
    Arrow,
} from "../styles";
import Image from "elements/components/image";
import { useStore } from "hooks/useStore";
import { useMediaQuery } from "hooks/useMediaQuery";
import { queries } from "styles/variables";
import { mapIndex } from "utils/utils";
import { portfolioData } from "data/portfolioData";
import Video from "elements/components/video";
import Div from "elements/components/div";
import Button from "elements/components/button";
import { useEffect, useRef, useState } from "react";
import Icon from "elements/components/icon";

const SelectedItem = () => {
    const {
        setPopupOpen,
        currentPortfolioIndex,
        setCurrentPortfolioIndex,
        popupOpen,
    } = useStore();

    const isLandscape = useMediaQuery(queries.landscape);
    const isLandscapeLgMax = useMediaQuery(queries.landscapeLgMax);

    const activeItem = portfolioData[currentPortfolioIndex];
    const [currentItemLoaded, setCurrentItemLoaded] = useState(activeItem);

    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (!popupOpen) {
            videoRef?.current?.pause();
        }
    }, [popupOpen]);

    return (
        <OuterWrapper>
            <CloseTrigger onClick={() => setPopupOpen(false)} />
            <InnerWrapper>
                {isLandscape && !isLandscapeLgMax && (
                    <>
                        <Arrow>
                            <Button
                                ariaLabel="Previous"
                                onClick={() =>
                                    setCurrentPortfolioIndex(
                                        mapIndex(
                                            currentPortfolioIndex - 1,
                                            portfolioData.length - 1,
                                        ),
                                    )
                                }
                            >
                                <Icon name="chevronLeft" size="4rem" />
                            </Button>
                        </Arrow>
                        <Arrow $isRight>
                            <Button
                                ariaLabel="Next"
                                onClick={() =>
                                    setCurrentPortfolioIndex(
                                        mapIndex(
                                            currentPortfolioIndex + 1,
                                            portfolioData.length - 1,
                                        ),
                                    )
                                }
                            >
                                <Icon name="chevronRight" size="4rem" />
                            </Button>
                        </Arrow>
                    </>
                )}

                <ItemContainer>
                    <Image
                        src={activeItem.image}
                        alt={activeItem.title}
                        onLoad={() => setCurrentItemLoaded(activeItem)}
                        fadeInOnLoad
                    />

                    {activeItem.video && activeItem === currentItemLoaded && (
                        <Video
                            src={activeItem.video}
                            poster={activeItem.image}
                            ariaLabel={activeItem.title}
                            videoRef={videoRef}
                        />
                    )}

                    {!isLandscapeLgMax && (
                        <Div
                            position="absolute"
                            width="100%"
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="center"
                            overflow="hidden"
                            margin="0.25rem 0 0 0"
                        >
                            {activeItem.palette.map((color) => {
                                return (
                                    <PaletteItem
                                        key={color}
                                        $background={color}
                                    />
                                );
                            })}
                            <Text
                                bold
                                textAlign="right"
                                margin="0 0 0 0.25rem"
                                whiteSpace="nowrap"
                            >
                                {activeItem.title}
                            </Text>
                        </Div>
                    )}
                </ItemContainer>
            </InnerWrapper>
        </OuterWrapper>
    );
};

export default SelectedItem;
