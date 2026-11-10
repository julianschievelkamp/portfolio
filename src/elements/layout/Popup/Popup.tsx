import { useStore } from "hooks/useStore";
import {
    Backdrop,
    CloseButton,
    InnerWrapper,
    OuterWrapper,
    StyledPopup,
} from "./Popup.styles";
import { usePopupOverlay } from "hooks/usePopupOverlay";
import Slider from "./Slider/Slider";
import Icon from "elements/components/Icon/Icon";
import ActiveItem from "./ActiveItem/ActiveItem";
import Arrows from "./Arrows/Arrows";
import { useMediaQuery } from "hooks/useMediaQuery";
import { queries } from "styles/variables";

const Popup = () => {
    const setPopupOpen = useStore((state) => state.setPopupOpen);

    const isLandscape = useMediaQuery(queries.landscape);
    const isLandscapeLgMax = useMediaQuery(queries.landscapeLgMax);

    const popupRef = usePopupOverlay();

    return (
        <StyledPopup
            ref={popupRef}
            aria-label="Artwork Dialog"
            // Macht den Dialog programmatisch fokussierbar (nicht per Tab)
            tabIndex={-1}
            // Hält den Store synchron, falls der Dialog anderweitig schließt
            onClose={() => setPopupOpen(false)}
            // ESC schließt nicht sofort, sondern über den Store (mit Transition)
            onCancel={(event) => {
                event.preventDefault();
                setPopupOpen(false);
            }}
        >
            <CloseButton
                onClick={() => setPopupOpen(false)}
                ariaLabel="Close Dialog"
            >
                <Icon name="close" size="2rem" />
            </CloseButton>

            <OuterWrapper>
                <Backdrop onClick={() => setPopupOpen(false)} />

                <InnerWrapper>
                    {isLandscape && !isLandscapeLgMax && <Arrows />}

                    <ActiveItem />
                </InnerWrapper>
            </OuterWrapper>

            <Slider />
        </StyledPopup>
    );
};

export default Popup;
