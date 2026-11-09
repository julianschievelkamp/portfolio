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

// Berührt ein sichtbares fixed-Element den unteren Rand, füllt Safari (iOS)
// die Fläche hinter der Adressleiste mit der Seitenfarbe. Absolut positionierte
// Elemente lösen das nicht aus. Da die Seite bei geöffnetem Overlay gesperrt
// ist, liegt es über die Scrollposition (useScrollOffset) trotzdem genau im
// sichtbaren Bereich. Die Höhe entspricht dem sichtbaren Bereich, damit sich
// Inhalte weiterhin daran ausrichten.
export const viewportOverlayStyles = (offsetProperty: string) => css`
    position: absolute;
    top: var(${offsetProperty}, 0);
    left: 0;
    height: var(--100svh);
`;

// Verlängert den Hintergrund eines Overlays bis hinter die Adressleiste. Der
// Schatten ist eine Kopie direkt unter dem Overlay; er beeinflusst das Layout
// nicht und wird durch overflow nicht abgeschnitten.
export const overlayExtensionStyles = (color: string) => css`
    box-shadow: 0 var(--100svh) 0 0 ${color};
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
