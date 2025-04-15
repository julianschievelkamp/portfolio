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

const SelectedItem = () => {
    const {
        setPopupOpen,
        currentPortfolioIndex,
        setCurrentPortfolioIndex,
        theme,
    } = useStore();

    const isMd = useMediaQuery(queries.md);
    const isLandscape = useMediaQuery(queries.landscape);

    const activeItem = portfolioData[currentPortfolioIndex];
    const palette =
        theme === "light"
            ? activeItem.palette
            : [...activeItem.palette].reverse();

    return (
        <OuterWrapper>
            <CloseTrigger onClick={() => setPopupOpen(false)} />
            <InnerWrapper>
                {isMd && isLandscape && (
                    <>
                        <ArrowLeft>
                            <Button
                                iconSize="4rem"
                                iconName="chevronLeft"
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
                            <Button
                                iconSize="4rem"
                                iconName="chevronRight"
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
                            fadeInOnLoad
                        />
                    )}
                    <Div
                        position="absolute"
                        width="100%"
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        {palette.map((color) => {
                            return (
                                <PaletteItem key={color} $background={color} />
                            );
                        })}
                        <Text bold textAlign="right" margin="0 0 0 0.25rem">
                            {activeItem.title}
                        </Text>
                    </Div>
                </ItemContainer>
            </InnerWrapper>
        </OuterWrapper>
    );
};

export default SelectedItem;
