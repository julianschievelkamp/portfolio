import { NotchWrapper, StyledNotch } from "../styles";
import { PortfolioItem } from "data/portfolioData";
import Button from "elements/components/button";
import Icon from "elements/components/icon";
import { colors, queries } from "styles/variables";
import { useMediaQuery } from "hooks/useMediaQuery";

export interface NotchProps {
    loadedItem: PortfolioItem;
    isVideoOn: boolean;
    setIsVideoOn: (videoOn: boolean) => void;
    isVolumeOn: boolean;
    setIsVolumeOn: (volumeOn: boolean) => void;
    isInfoOn: boolean;
    setIsInfoOn: (infoOn: boolean) => void;
}

const Notch = ({
    loadedItem,
    isVideoOn,
    setIsVideoOn,
    isVolumeOn,
    setIsVolumeOn,
    isInfoOn,
    setIsInfoOn,
}: NotchProps) => {
    const isHover = useMediaQuery(queries.hover);

    return (
        <NotchWrapper>
            <StyledNotch>
                <Button
                    onClick={() => setIsVolumeOn(!isVolumeOn)}
                    disabled={!loadedItem.video || !isVideoOn}
                    ariaLabel="Toggle Volume"
                    hoverStyles={isHover}
                >
                    <Icon
                        name={
                            loadedItem.video && isVideoOn && isVolumeOn
                                ? "volumeOn"
                                : "volumeOff"
                        }
                        color="white"
                        size="1rem"
                        padding="0.25rem"
                    />
                </Button>
                <Button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    disabled={!loadedItem.video}
                    ariaLabel="Toggle Video"
                    hoverStyles={isHover}
                >
                    <Icon
                        name={
                            loadedItem.video && isVideoOn
                                ? "videoOn"
                                : "videoOff"
                        }
                        color="white"
                        size="1rem"
                        padding="0.25rem"
                    />
                </Button>
                <Button
                    onClick={() => setIsInfoOn(!isInfoOn)}
                    ariaLabel="Toggle Info"
                    hoverStyles={isHover}
                >
                    <Icon
                        name={isInfoOn ? "infoFilled" : "info"}
                        color={isInfoOn ? colors.primary : "white"}
                        size="1rem"
                        padding="0.25rem"
                    />
                </Button>
            </StyledNotch>
        </NotchWrapper>
    );
};

export default Notch;
