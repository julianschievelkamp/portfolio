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

    return (
        <StyledItemButtons>
            <Notch>
                <Button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    disabled={!loadedItem.video}
                    ariaLabel="Toggle Video"
                >
                    <Icon
                        name={loadedItem.video && isVideoOn ? "close" : "play"}
                        size="1.5rem"
                        padding="0.5rem 0.25rem"
                        color={loadedItem.video ? colors.primary : "white"}
                    />
                </Button>
                <Button
                    onClick={() => setIsVolumeOn(!isVolumeOn)}
                    disabled={!loadedItem.video}
                    ariaLabel="Toggle Volume"
                >
                    <Icon
                        name={isVolumeOn ? "volumeOn" : "volumeOff"}
                        size="1.5rem"
                        padding="0.5rem 0.25rem"
                        color={loadedItem.video ? colors.primary : "white"}
                    />
                </Button>

                <Button
                    onClick={() => setIsInfoOn(!isInfoOn)}
                    ariaLabel="Toggle Info"
                >
                    <Icon
                        name={isInfoOn ? "infoFilled" : "info"}
                        color={isInfoOn ? colors.primary : "white"}
                        size="1.5rem"
                        padding="0.5rem 0.25rem"
                    />
                </Button>
                <Button
                    onClick={() => setPopupOpen(false)}
                    ariaLabel="Close Popup"
                >
                    <Icon
                        name="close"
                        size="1.5rem"
                        padding="0.5rem 0.25rem"
                        color="white"
                    />
                </Button>
            </Notch>
        </StyledItemButtons>
    );
};

export default ItemButtons;
