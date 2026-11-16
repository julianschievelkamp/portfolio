import { useStore } from "hooks/useStore";
import {
    Background,
    CloseArea,
    CloseButton,
    StyledPopup,
} from "./Popup.styles";
import { usePopupOverlay } from "hooks/usePopupOverlay";
import Slider from "./Slider/Slider";
import ActiveItem from "./ActiveItem/ActiveItem";
import Icon from "elements/components/Icon/Icon";

const Popup = () => {
    const setPopupOpen = useStore((state) => state.setPopupOpen);
    const popupRef = usePopupOverlay();

    return (
        <>
            <Background />

            <StyledPopup
                ref={popupRef}
                aria-label="Artwork Popup"
                tabIndex={-1}
                // Hält den Store synchron, falls der Dialog anderweitig schließt
                onClose={() => setPopupOpen(false)}
                // ESC schließt nicht sofort, sondern über den Store (mit Transition)
                onCancel={(event) => {
                    event.preventDefault();
                    setPopupOpen(false);
                }}
            >
                <CloseArea
                    onClick={() => setPopupOpen(false)}
                    aria-hidden="true"
                />
                <CloseButton
                    onClick={() => setPopupOpen(false)}
                    ariaLabel="Close Popup"
                >
                    <Icon name="close" size="2rem" />
                </CloseButton>

                <ActiveItem />
                <Slider />
            </StyledPopup>
        </>
    );
};

export default Popup;
