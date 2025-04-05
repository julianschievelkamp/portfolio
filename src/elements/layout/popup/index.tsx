import { useStore } from "hooks/useStore";
import { ImageContainer, StyledPopup } from "./styles";
import Image from "elements/components/image";
import { PortfolioItem } from "data/types";
import Icon from "elements/components/icon";
import Div from "elements/components/div";

export interface PopupProps {
    items: PortfolioItem[];
}

const Popup = ({ items }: PopupProps) => {
    const { popupOpen, setPopupOpen, currentPortfolioIndex } = useStore();

    return (
        <StyledPopup $isOpen={popupOpen}>
            <ImageContainer>
                <Image
                    width="10rem"
                    height="10rem"
                    src={items[currentPortfolioIndex].image}
                    alt={items[currentPortfolioIndex].title}
                />
            </ImageContainer>

            <Div position="absolute" top="2rem" right="2rem">
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
