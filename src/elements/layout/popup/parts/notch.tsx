import { Buttons, NotchText, NotchWrapper, StyledNotch } from "../styles";
import { PortfolioItem } from "data/portfolioData";
import { useEffect, useState } from "react";
import { languageData } from "data/languageData";
import Button from "elements/components/button";
import Icon from "elements/components/icon";
import { colors } from "styles/variables";

export interface NotchProps {
    activeItem: PortfolioItem;
    loadedItem: PortfolioItem;
    isVideoOn: boolean;
    setIsVideoOn: (videoOn: boolean) => void;
    isVolumeOn: boolean;
    setIsVolumeOn: (volumeOn: boolean) => void;
    isInfoOn: boolean;
    setIsInfoOn: (infoOn: boolean) => void;
}

const Notch = ({
    activeItem,
    loadedItem,
    isVideoOn,
    setIsVideoOn,
    isVolumeOn,
    setIsVolumeOn,
    isInfoOn,
    setIsInfoOn,
}: NotchProps) => {
    const [loadingIndicator, setLoadingIndicator] = useState(false);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (activeItem !== loadedItem) {
            timer = setTimeout(() => {
                setLoadingIndicator(true);
            }, 500);
        } else {
            setLoadingIndicator(false);
        }

        return () => clearTimeout(timer);
    }, [activeItem, loadedItem]);

    return (
        <NotchWrapper>
            <StyledNotch>
                <Buttons>
                    <Button
                        onClick={() => setIsVolumeOn(!isVolumeOn)}
                        disabled={!loadedItem.video || !isVideoOn}
                        ariaLabel="Toggle Volume"
                    >
                        <Icon
                            name={
                                loadedItem.video && isVideoOn && isVolumeOn
                                    ? "volumeOn"
                                    : "volumeOff"
                            }
                            size="1rem"
                            color="white"
                            padding="0.25rem"
                        />
                    </Button>
                    <Button
                        onClick={() => setIsVideoOn(!isVideoOn)}
                        disabled={!loadedItem.video}
                        ariaLabel="Toggle Video"
                    >
                        <Icon
                            name={
                                loadedItem.video && isVideoOn
                                    ? "videoOn"
                                    : "videoOff"
                            }
                            size="1rem"
                            color="white"
                            padding="0.25rem"
                        />
                    </Button>
                </Buttons>
                <NotchText bold fontSize="0.875rem">
                    {loadingIndicator ? languageData.loading : loadedItem.title}
                </NotchText>
                <Buttons>
                    <Button
                        onClick={() => setIsInfoOn(!isInfoOn)}
                        ariaLabel="Toggle Info"
                    >
                        <Icon
                            name="info"
                            size="1rem"
                            color={isInfoOn ? colors.primary : "white"}
                            padding="0.25rem"
                        />
                    </Button>
                </Buttons>
            </StyledNotch>
        </NotchWrapper>
    );
};

export default Notch;
