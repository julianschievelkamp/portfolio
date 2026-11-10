import { styled } from "styled-components";
import { mainTitleStyles, queries, transition } from "styles/variables";
import Text from "elements/components/Text/Text";

export const StyledSidebar = styled.aside<{
    $sidebarOpen: boolean;
}>`
    position: absolute;
    height: var(--100svh);
    box-shadow: 0 var(--100svh) 0 0 white;

    transform: ${({ $sidebarOpen }) =>
        `translateX(${$sidebarOpen ? 0 : "-100%"})`};
    visibility: ${({ $sidebarOpen }) => ($sidebarOpen ? "visible" : "hidden")};
    /* Beim Öffnen ease-out, beim Schließen ease-in */
    transition: ${({ $sidebarOpen }) => {
        const timing = $sidebarOpen ? transition.default : transition.defaultIn;

        return `transform ${timing}, visibility ${timing}`;
    }};

    width: 15rem;
    max-width: calc(100vw - 4rem);
    padding: 1rem;
    left: 0;
    z-index: 9;
    display: flex;
    flex-direction: column;
    background-color: white;
    overflow: hidden;

    @media ${queries.md} {
        position: fixed;
        width: 17rem;
        padding: 2rem;
        transform: translateX(0);
        visibility: visible;
    }
`;

export const Backdrop = styled.div<{ $isActive: boolean }>`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 9;
    backdrop-filter: blur(2px);

    opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
    visibility: ${({ $isActive }) => ($isActive ? "visible" : "hidden")};
    /* Beim Öffnen ease-out, beim Schließen ease-in */
    transition: ${({ $isActive }) => {
        const timing = $isActive ? transition.default : transition.defaultIn;

        return `opacity ${timing}, visibility ${timing}`;
    }};

    @media ${queries.md} {
        display: none;
    }
`;

export const ScrollContainer = styled.div`
    overflow-y: scroll;
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
