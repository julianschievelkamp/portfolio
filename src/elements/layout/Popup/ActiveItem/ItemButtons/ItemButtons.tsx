import { Notch, StyledItemButtons } from "./ItemButtons.styles";
import { PortfolioItem } from "data/portfolioData";
import Button from "elements/components/Button/Button";
import Icon from "elements/components/Icon/Icon";
import { useStore } from "hooks/useStore";
import { colors } from "styles/variables";

export interface ItemButtonsProps {
    loadedItem: PortfolioItem;
    isVideoOn: boolean;
    setIsVideoOn: (videoOn: boolean) => void;
    isVolumeOn: boolean;
    setIsVolumeOn: (volumeOn: boolean) => void;
    isInfoOn: boolean;
    setIsInfoOn: (infoOn: boolean) => void;
}

const ItemButtons = ({
    loadedItem,
    isVideoOn,
    setIsVideoOn,
    isVolumeOn,
    setIsVolumeOn,
    isInfoOn,
    setIsInfoOn,
}: ItemButtonsProps) => {
    const setPopupOpen = useStore((state) => state.setPopupOpen);

    const iconSize = "1rem";
    const iconPadding = "0.5rem";

    return (
        <StyledItemButtons>
            <Notch>
                <Button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    disabled={!loadedItem.video}
                    ariaLabel={isVideoOn ? "Pause Video" : "Play Video"}
                >
                    <Icon
                        name={isVideoOn ? "pause" : "play"}
                        color="white"
                        size={iconSize}
                        padding={iconPadding}
                    />
                </Button>
                <Button
                    onClick={() => setIsVolumeOn(!isVolumeOn)}
                    disabled={!loadedItem.video}
                    ariaLabel={isVolumeOn ? "Mute Video" : "Unmute Video"}
                >
                    <Icon
                        name={isVolumeOn ? "volumeOn" : "volumeOff"}
                        color="white"
                        size={iconSize}
                        padding={iconPadding}
                    />
                </Button>
                <Button
                    onClick={() => setIsInfoOn(!isInfoOn)}
                    ariaLabel={isInfoOn ? "Hide Info" : "Show Info"}
                >
                    <Icon
                        name={isInfoOn ? "infoFilled" : "info"}
                        color={isInfoOn ? colors.primary : "white"}
                        size={iconSize}
                        padding={iconPadding}
                    />
                </Button>
                <Button
                    onClick={() => setPopupOpen(false)}
                    ariaLabel="Close Popup"
                >
                    <Icon
                        name="close"
                        size={iconSize}
                        padding={iconPadding}
                        color="white"
                    />
                </Button>
            </Notch>
        </StyledItemButtons>
    );
};

export default ItemButtons;
