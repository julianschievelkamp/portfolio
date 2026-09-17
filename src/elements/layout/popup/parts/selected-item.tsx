import Text from "elements/components/text";
import {
    OuterWrapper,
    CloseTrigger,
    InnerWrapper,
    ArrowLeft,
    ArrowRight,
    ItemContainer,
    PaletteItem,
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

    const toggleVideo = () => {
        if (videoRef.current?.paused) {
            videoRef.current?.play();
        } else {
            videoRef.current?.pause();
        }
    };

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
                        <ArrowLeft>
                            <Button
                                iconSize="4rem"
                                iconName="chevronLeft"
                                onClick={() =>
                                    setCurrentPortfolioIndex(
                                        mapIndex(
                                            currentPortfolioIndex - 1,
                                            portfolioData.length - 1,
                                        ),
                                    )
                                }
                                ariaLabel="Previous"
                            />
                        </ArrowLeft>
                        <ArrowRight>
                            <Button
                                iconSize="4rem"
                                iconName="chevronRight"
                                onClick={() =>
                                    setCurrentPortfolioIndex(
                                        mapIndex(
                                            currentPortfolioIndex + 1,
                                            portfolioData.length - 1,
                                        ),
                                    )
                                }
                                ariaLabel="Next"
                            />
                        </ArrowRight>
                    </>
                )}

                <ItemContainer onClick={() => toggleVideo()}>
                    {activeItem.video && activeItem === currentItemLoaded && (
                        <Video
                            src={activeItem.video}
                            poster={activeItem.image}
                            ariaLabel={activeItem.title}
                            videoRef={videoRef}
                        />
                    )}

                    <Image
                        src={activeItem.image}
                        alt={activeItem.title}
                        onLoad={() => setCurrentItemLoaded(activeItem)}
                        fadeInOnLoad
                    />

                    {!isLandscapeLgMax && (
                        <Div
                            position="absolute"
                            width="100%"
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="center"
                            overflow="hidden"
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
