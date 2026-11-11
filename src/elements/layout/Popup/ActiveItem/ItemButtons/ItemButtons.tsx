import { StyledItemButtons } from "./ItemButtons.styles";
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
    const activeIndex = useStore((state) => state.activeIndex);
    const setActiveIndex = useStore((state) => state.setActiveIndex);

    return (
        <StyledItemButtons>
            <Button
                ariaLabel="Previous Artwork"
                onClick={() => setActiveIndex(activeIndex - 1)}
            >
                <Icon name="chevronLeft" size="2rem" padding="0.5rem" />
            </Button>
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
                    size="2rem"
                    padding="0.5rem"
                />
            </Button>
            <Button
                onClick={() => setIsVideoOn(!isVideoOn)}
                disabled={!loadedItem.video}
                ariaLabel="Toggle Video"
            >
                <Icon
                    name={
                        loadedItem.video && isVideoOn ? "videoOn" : "videoOff"
                    }
                    size="2rem"
                    padding="0.5rem"
                />
            </Button>
            <Button
                onClick={() => setIsInfoOn(!isInfoOn)}
                ariaLabel="Toggle Info"
            >
                <Icon
                    name={isInfoOn ? "infoFilled" : "info"}
                    color={isInfoOn ? colors.primary : undefined}
                    size="2rem"
                    padding="0.5rem"
                />
            </Button>
            <Button
                ariaLabel="Next Artwork"
                onClick={() => setActiveIndex(activeIndex + 1)}
            >
                <Icon name="chevronRight" size="2rem" padding="0.5rem" />
            </Button>
            <Button onClick={() => setPopupOpen(false)} ariaLabel="Close Popup">
                <Icon name="close" size="2rem" padding="0.5rem" />
            </Button>
        </StyledItemButtons>
    );
};

export default ItemButtons;
