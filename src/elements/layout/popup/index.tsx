import { useStore } from "hooks/useStore";
import { StyledPopup } from "./styles";
import Div from "elements/components/div";
import { usePopup } from "hooks/usePopup";
import { portfolioData } from "data/portfolioData";
import SelectedItem from "./parts/selected-item";
import Slider from "./parts/slider";
import Button from "elements/components/button";
import Icon from "elements/components/icon";

const Popup = () => {
    const { popupOpen, setPopupOpen } = useStore();

    usePopup(portfolioData);

    return (
        <StyledPopup $isOpen={popupOpen}>
            <SelectedItem />

            <Slider />

            <Div
                position="absolute"
                top="1rem"
                right="1rem"
                zIndex={1}
                background="white"
                width="2rem"
                height="2rem"
            >
                <Button onClick={() => setPopupOpen(false)} ariaLabel="Close">
                    <Icon name="close" size="2rem" />
                </Button>
            </Div>
        </StyledPopup>
    );
};

export default Popup;
