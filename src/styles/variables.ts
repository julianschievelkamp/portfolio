import { css, styled } from "styled-components";

export const Section = styled.section``;
export const Footer = styled.footer``;
export const Div = styled.div``;

export const TRANSITION_DEFAULT = 300;
export const transition = {
    default: `${TRANSITION_DEFAULT}ms ease-out`,
    defaultIn: `${TRANSITION_DEFAULT}ms ease-in`,
    fast: `${TRANSITION_DEFAULT / 3}ms ease-out`,
};

export const colors = {
    primary: "#ffca00",
    secondary: "rgb(0, 0, 0, 0.5)",
};

export const queries = {
    sm: "screen and (min-width: 576px)",
    md: "screen and (min-width: 768px)",
    lg: "screen and (min-width: 992px)",
    xl: "screen and (min-width: 1200px)",
    hover: "(hover: hover)",
    portrait: "(orientation: portrait)",
    landscape: "(orientation: landscape)",
    landscapeLgMax:
        "screen and (max-width: 991px) and (orientation: landscape)",
};

// CSS-Variablen, in denen useScrollOffset die Scrollposition je Overlay ablegt
export const scrollOffsets = {
    sidebar: "--sidebar-scroll-offset",
    popup: "--popup-scroll-offset",
};

// Zusätzliche Höhe der Overlays über den großen Viewport hinaus
const OVERLAY_EXTRA_HEIGHT = "10rem";

// Abstand, den Inhalte am unteren Ende eines Overlays brauchen, damit sie
// nicht hinter der Adressleiste bzw. in der Zugabe verschwinden
export const overlayBottomInset = `calc(var(--100lvh) - var(--100svh) + ${OVERLAY_EXTRA_HEIGHT})`;

// Berührt ein sichtbares fixed-Element den unteren Rand, füllt Safari (iOS)
// die Fläche hinter der Adressleiste mit der Seitenfarbe. Absolut positionierte
// Elemente lösen das nicht aus. Da die Seite bei geöffnetem Overlay gesperrt
// ist, liegt es über die Scrollposition (useScrollOffset) trotzdem genau im
// sichtbaren Bereich.
export const overlayPositionStyles = (offsetProperty: string) => css`
    position: absolute;
    top: var(${offsetProperty}, 0);
    left: 0;
`;

// Wie overlayPositionStyles, reicht aber bis hinter die Adressleiste
export const viewportOverlayStyles = (offsetProperty: string) => css`
    ${overlayPositionStyles(offsetProperty)}

    /* Bis hinter die Adressleiste, mit Zugabe, damit unten keine Lücke bleibt */
    height: calc(var(--100lvh) + ${OVERLAY_EXTRA_HEIGHT});
`;

export const thumbnailSize = "(max-width: 1200px) 300px, 600px";

export const scrollStyles = css`
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE und Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const mainTitleStyles = css`
    text-transform: uppercase;
    font-family: "PlayfairDisplay", sans-serif;
    font-weight: 900;
    font-size: 1.25rem;

    @media ${queries.md} {
        font-size: 1.5rem;
    }
`;

// Blendet Inhalte visuell aus, lässt sie aber für Screenreader und Suchmaschinen bestehen
export const visuallyHidden = css`
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
`;
