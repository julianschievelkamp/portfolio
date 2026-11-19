import { css, styled } from "styled-components";
import { queries, transition } from "styles/variables";
import MainTitle from "../MainTitle/MainTitle";

export const sidebarStyles = css<{
    $sidebarOpen: boolean;
}>`
    top: 0;
    left: 0;
    width: 15rem;
    padding: 1rem;
    z-index: 9;
    display: flex;
    flex-direction: column;

    transform: ${({ $sidebarOpen }) =>
        `translateX(${$sidebarOpen ? 0 : "-100%"})`};
    visibility: ${({ $sidebarOpen }) => ($sidebarOpen ? "visible" : "hidden")};
    /* Beim Öffnen ease-out, beim Schließen ease-in */
    transition: ${({ $sidebarOpen }) => {
        const timing = $sidebarOpen ? transition.default : transition.defaultIn;

        return `transform ${timing}, visibility ${timing}`;
    }};

    @media ${queries.md} {
        width: 17rem;
        padding: 2rem;
        transform: translateX(0);
        visibility: visible;
    }
`;

export const StyledSidebar = styled.aside<{
    $sidebarOpen: boolean;
}>`
    ${sidebarStyles}

    background-color: transparent;
    position: fixed;
    height: 100dvh;
`;

export const Background = styled.div<{ $sidebarOpen: boolean }>`
    ${sidebarStyles}

    background-color: white;
    position: absolute;
    height: 100%;
`;

export const Backdrop = styled.div<{ $sidebarOpen: boolean }>`
    position: absolute;
    inset: 0;
    z-index: 9;
    backdrop-filter: blur(2px);

    opacity: ${({ $sidebarOpen }) => ($sidebarOpen ? 1 : 0)};
    visibility: ${({ $sidebarOpen }) => ($sidebarOpen ? "visible" : "hidden")};
    transition: ${({ $sidebarOpen }) => {
        const timing = $sidebarOpen ? transition.default : transition.defaultIn;

        return `opacity ${timing}, visibility ${timing}`;
    }};

    @media ${queries.md} {
        display: none;
    }
`;

export const ScrollContainer = styled.div`
    overflow-y: scroll;
    overscroll-behavior-y: contain;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 1.5rem 0 0 0;
    flex: 1;
    min-height: 0;
`;

export const StyledMainTitle = styled(MainTitle)`
    visibility: hidden;

    @media ${queries.md} {
        visibility: visible;
    }
`;
