import { useEffect, useRef } from "react";
import { useStore } from "hooks/useStore";
import {
    CloseButton,
    InnerWrapper,
    OuterWrapper,
    StyledPopup,
} from "./Popup.styles";
import Div from "elements/components/Div/Div";
import { usePopupControls } from "hooks/usePopupControls";
import Slider from "./Slider/Slider";
import Icon from "elements/components/Icon/Icon";
import ActiveItem from "./ActiveItem/ActiveItem";
import Arrows from "./Arrows/Arrows";
import { useMediaQuery } from "hooks/useMediaQuery";
import { queries, TRANSITION_DEFAULT } from "styles/variables";

const Popup = () => {
    const { popupOpen, setPopupOpen } = useStore();
    const dialogRef = useRef<HTMLDialogElement>(null);

    const isLandscape = useMediaQuery(queries.landscape);
    const isLandscapeLgMax = useMediaQuery(queries.landscapeLgMax);

    usePopupControls();

    // Store-Zustand mit dem nativen Dialog synchronisieren.
    // Das Ausblenden läuft über das Attribut data-visible, da Safari/iOS
    // display und overlay nicht diskret animiert: Der Dialog wird erst nach
    // Ende der Transition wirklich geschlossen.
    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        if (popupOpen) {
            if (!dialog.open) dialog.showModal();

            // Ein Frame Verzögerung, damit die Startwerte gerendert werden
            const frame = requestAnimationFrame(() => {
                dialog.setAttribute("data-visible", "true");
            });

            return () => cancelAnimationFrame(frame);
        }

        dialog.removeAttribute("data-visible");

        const timeout = setTimeout(() => {
            if (dialog.open) dialog.close();
        }, TRANSITION_DEFAULT);

        return () => clearTimeout(timeout);
    }, [popupOpen]);

    return (
        <StyledPopup
            ref={dialogRef}
            aria-label="Artwork Dialog"
            // ESC schließt nicht sofort, sondern über den Store (mit Transition)
            onCancel={(event) => {
                event.preventDefault();
                setPopupOpen(false);
            }}
            // Hält den Store synchron, falls der Dialog anderweitig schließt
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
