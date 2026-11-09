import { styled } from "styled-components";
import {
    mainTitleStyles,
    queries,
    scrollOffsets,
    scrollStyles,
    transition,
    TRANSITION_DEFAULT,
    viewportOverlayStyles,
} from "styles/variables";
import Text from "elements/components/Text/Text";

export const StyledSidebar = styled.aside<{ $sidebarOpen: boolean }>`
    ${viewportOverlayStyles(scrollOffsets.sidebar)}

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
        box-shadow: none;
        width: 17rem;
        padding: 2rem;
        transform: translateX(0);
        visibility: visible;
    }
`;

export const CloseTrigger = styled.div<{ $isActive: boolean }>`
    ${viewportOverlayStyles(scrollOffsets.sidebar)}

    /* Der Blur lässt sich nicht per Schatten verlängern, daher reicht das
       Overlay selbst bis hinter die Adressleiste (eine Bildschirmhöhe extra,
       wie der Schatten der Sidebar). Nur während es aktiv ist bzw. ausblendet,
       da es sonst kurze Seiten künstlich verlängern würde */
    height: ${({ $isActive }) =>
        $isActive ? "calc(var(--100svh) * 2)" : "var(--100svh)"};
    width: 100%;
    backdrop-filter: blur(2px);
    /* Beim Öffnen ease-out, beim Schließen ease-in. Nur opacity und
       visibility animieren, damit der Wechsel von top nicht mitläuft. Die
       Höhe springt beim Schließen erst nach dem Ausblenden zurück */
    transition: ${({ $isActive }) =>
        $isActive
            ? `opacity ${transition.default}, visibility ${transition.default}`
            : `opacity ${transition.defaultIn}, visibility ${transition.defaultIn}, height 0s ${TRANSITION_DEFAULT}ms`};
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

// Der Titel ist nur auf Desktop sichtbar; auf Mobile liegt er im Menü
export const MainTitle = styled(Text)`
    ${mainTitleStyles}
    visibility: hidden;

    @media ${queries.md} {
        visibility: visible;
    }
`;
