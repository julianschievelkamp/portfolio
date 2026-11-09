import { styled } from "styled-components";
import {
    mainTitleStyles,
    overlayBottomInset,
    queries,
    scrollOffsets,
    scrollStyles,
    transition,
    viewportOverlayStyles,
} from "styles/variables";
import Text from "elements/components/Text/Text";

// Mobil absolut positioniert, siehe viewportOverlayStyles
const mobileOverlayStyles = viewportOverlayStyles(scrollOffsets.sidebar);

export const StyledSidebar = styled.aside<{ $sidebarOpen: boolean }>`
    ${mobileOverlayStyles}

    background-color: white;
    width: 15rem;
    max-width: calc(100vw - 4rem);
    padding: 1rem;
    transform: ${({ $sidebarOpen }) =>
        `translateX(${$sidebarOpen ? 0 : "-100%"})`};
    visibility: ${({ $sidebarOpen }) => ($sidebarOpen ? "visible" : "hidden")};
    /* Beim Öffnen ease-out, beim Schließen ease-in. Nur transform und
       visibility animieren, damit der Wechsel von top nicht mitläuft */
    transition: ${({ $sidebarOpen }) => {
        const timing = $sidebarOpen ? transition.default : transition.defaultIn;

        return `transform ${timing}, visibility ${timing}`;
    }};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    z-index: 9;

    @media ${queries.md} {
        /* Auf Desktop gibt es keine dynamische Adressleiste */
        position: fixed;
        top: 0;
        height: 100%;
        width: 17rem;
        padding: 2rem;
        transform: translateX(0);
        visibility: visible;
    }
`;

export const CloseTrigger = styled.div<{ $isActive: boolean }>`
    ${mobileOverlayStyles}

    width: 100%;
    backdrop-filter: blur(2px);
    /* Beim Öffnen ease-out, beim Schließen ease-in. Nur opacity und
       visibility animieren, damit der Wechsel von top nicht mitläuft */
    transition: ${({ $isActive }) => {
        const timing = $isActive ? transition.default : transition.defaultIn;

        return `opacity ${timing}, visibility ${timing}`;
    }};
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
    visibility: ${({ $isActive }) => ($isActive ? "visible" : "hidden")};
    z-index: 9;

    @media ${queries.md} {
        display: none;
    }
`;

export const ScrollContainer = styled.div`
    ${scrollStyles}

    margin: 1.5rem 0 0 0;
    /* Abstand in Höhe der Adressleiste, damit der Inhalt nicht dahinter verschwindet */
    /* inklusive Zugabe, damit der Footer an seiner Position bleibt */
    padding-bottom: ${overlayBottomInset};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    @media ${queries.md} {
        /* Auf Desktop ist die Sidebar fixed und ohne Zugabe */
        padding-bottom: 0;
    }
`;

// Der Titel ist nur auf Desktop sichtbar; auf Mobile liegt er im Menü
export const MainTitle = styled(Text)`
    ${mainTitleStyles}
    visibility: hidden;

    @media ${queries.md} {
        visibility: visible;
    }
`;
