import { useRef } from "react";

import Icon from "elements/components/Icon/Icon";
import { usePopupControls } from "hooks/usePopupControls";
import { usePopupOverlay } from "hooks/usePopupOverlay";
import { useStore } from "hooks/useStore";

import ActiveItem from "./ActiveItem/ActiveItem";
import {
    Background,
    CloseArea,
    CloseButton,
    StyledPopup,
} from "./Popup.styles";
import Slider from "./Slider/Slider";

const Popup = () => {
    const setPopupOpen = useStore((state) => state.setPopupOpen);
    const popupRef = useRef<HTMLDialogElement>(null);

    usePopupOverlay(popupRef);
    usePopupControls(popupRef);

    return (
        <>
            <Background />

            <StyledPopup
                ref={popupRef}
                aria-label="Popup"
                tabIndex={-1}
                // Keeps the store in sync in case the dialog closes otherwise
                onClose={() => setPopupOpen(false)}
                // ESC does not close immediately but via the store (with transition)
                onCancel={(event) => {
                    event.preventDefault();
                    setPopupOpen(false);
                }}
            >
                <CloseArea
                    aria-hidden="true"
                    onClick={() => setPopupOpen(false)}
                />
                <CloseButton
                    aria-label="Close popup"
                    onClick={() => setPopupOpen(false)}
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
