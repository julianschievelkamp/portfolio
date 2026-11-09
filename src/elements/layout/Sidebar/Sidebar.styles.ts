import { styled } from "styled-components";
import {
    mainTitleStyles,
    queries,
    scrollStyles,
    transition,
} from "styles/variables";
import Text from "elements/components/Text/Text";

export const StyledSidebar = styled.aside<{ $sidebarOpen: boolean }>`
    background-color: white;
    width: 15rem;
    max-width: calc(100vw - 4rem);
    /* Endet an der Oberkante der Adressleiste: Berührt ein fixed-Element den
       unteren Rand, füllt Safari die Fläche hinter der Leiste weiß */
    height: var(--100svh);
    position: fixed;
    padding: 1rem;
    top: 0;
    left: 0;
    transform: ${({ $sidebarOpen }) =>
        `translateX(${$sidebarOpen ? 0 : "-100%"})`};
    visibility: ${({ $sidebarOpen }) => ($sidebarOpen ? "visible" : "hidden")};
    /* Beim Öffnen ease-out, beim Schließen ease-in */
    transition: ${({ $sidebarOpen }) =>
        $sidebarOpen ? transition.default : transition.defaultIn};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    z-index: 9;

    @media ${queries.md} {
        width: 17rem;
        padding: 2rem;
        transform: translateX(0);
        visibility: visible;
    }
`;

export const CloseTrigger = styled.div<{ $isActive: boolean }>`
    position: fixed;
    width: 100%;
    /* Endet an der Oberkante der Adressleiste (siehe StyledSidebar) */
    height: var(--100svh);
    top: 0;
    left: 0;
    backdrop-filter: blur(2px);
    /* Beim Öffnen ease-out, beim Schließen ease-in */
    transition: ${({ $isActive }) =>
        $isActive ? transition.default : transition.defaultIn};
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
