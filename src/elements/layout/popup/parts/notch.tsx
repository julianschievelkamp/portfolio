import { NotchText, NotchWrapper, StyledNotch, VideoButtons } from "../styles";
import { PortfolioItem } from "data/portfolioData";
import { useEffect, useState } from "react";
import { languageData } from "data/languageData";
import Button from "elements/components/button";
import Icon from "elements/components/icon";

export interface NotchProps {
    activeItem: PortfolioItem;
    loadedItem: PortfolioItem;
    isVideoOn: boolean;
    setIsVideoOn: (videoOn: boolean) => void;
    isVolumeOn: boolean;
    setIsVolumeOn: (volumeOn: boolean) => void;
}

const Notch = ({
    activeItem,
    loadedItem,
    isVideoOn,
    setIsVideoOn,
    isVolumeOn,
    setIsVolumeOn,
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
                {loadedItem.video && (
                    <VideoButtons>
                        <Button
                            onClick={() => setIsVolumeOn(!isVolumeOn)}
                            disabled={!isVideoOn}
                            ariaLabel="Toggle Volume"
                        >
                            <Icon
                                name={
                                    isVolumeOn && isVideoOn
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
                            ariaLabel="Toggle Video"
                        >
                            <Icon
                                name={isVideoOn ? "videoOn" : "videoOff"}
                                size="1rem"
                                color="white"
                                padding="0.25rem"
                            />
                        </Button>
                    </VideoButtons>
                )}

                <NotchText bold fontSize="0.875rem">
                    {loadingIndicator ? languageData.loading : loadedItem.title}
                </NotchText>
            </StyledNotch>
        </NotchWrapper>
    );
};

export default Notch;
