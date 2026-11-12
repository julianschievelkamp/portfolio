import { useStore } from "hooks/useStore";
import { Backdrop, StyledPopup } from "./Popup.styles";
import { usePopupOverlay } from "hooks/usePopupOverlay";
import Slider from "./Slider/Slider";
import ActiveItem from "./ActiveItem/ActiveItem";

const Popup = () => {
    const setPopupOpen = useStore((state) => state.setPopupOpen);
    const popupRef = usePopupOverlay();

    return (
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
            <Backdrop onClick={() => setPopupOpen(false)} aria-hidden="true" />

            <ActiveItem />

            <Slider />
        </StyledPopup>
    );
};

export default Popup;
