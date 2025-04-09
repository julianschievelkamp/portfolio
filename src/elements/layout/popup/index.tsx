import { useStore } from "hooks/useStore";
import { StyledPopup } from "./styles";
import Icon from "elements/components/icon";
import Div from "elements/components/div";
import { usePopup } from "hooks/usePopup";
import { portfolioData } from "data/portfolioData";
import SelectedItem from "./parts/selected-item";
import Slider from "./parts/slider";

const Popup = () => {
    const { popupOpen, setPopupOpen } = useStore();

    usePopup(portfolioData);

    return (
        <StyledPopup $isOpen={popupOpen}>
            <SelectedItem />

            <Slider />

            <Div position="absolute" top="1rem" right="1rem">
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
