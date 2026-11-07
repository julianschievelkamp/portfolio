import { useEffect, useRef } from "react";
import { useStore } from "hooks/useStore";
import { CloseButton, InnerWrapper, OuterWrapper, StyledPopup } from "./Popup.styles";
import Div from "elements/components/Div/Div";
import { usePopupControls } from "hooks/usePopupControls";
import Slider from "./Slider/Slider";
import Icon from "elements/components/Icon/Icon";
import ActiveItem from "./ActiveItem/ActiveItem";
import Arrows from "./Arrows/Arrows";
import { useMediaQuery } from "hooks/useMediaQuery";
import { queries } from "styles/variables";

const Popup = () => {
    const { popupOpen, setPopupOpen } = useStore();
    const dialogRef = useRef<HTMLDialogElement>(null);

    const isLandscape = useMediaQuery(queries.landscape);
    const isLandscapeLgMax = useMediaQuery(queries.landscapeLgMax);

    usePopupControls();

    // Store-Zustand mit dem nativen Dialog synchronisieren
    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        if (popupOpen && !dialog.open) {
            dialog.showModal();
        } else if (!popupOpen && dialog.open) {
            dialog.close();
        }
    }, [popupOpen]);

    return (
        <StyledPopup
            ref={dialogRef}
            aria-label="Artwork Dialog"
            // Wird auch bei ESC ausgelöst, damit der Store synchron bleibt
            onClose={() => setPopupOpen(false)}
        >
            <CloseButton onClick={() => setPopupOpen(false)} ariaLabel="Close">
                <Icon name="close" size="2rem" />
            </CloseButton>

            <OuterWrapper>
                <Div
                    position="absolute"
                    width="100%"
                    height="100%"
                    onClick={() => setPopupOpen(false)}
                />

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
