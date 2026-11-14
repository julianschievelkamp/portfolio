import { css, styled } from "styled-components";
import {
    mainTitleStyles,
    queries,
    safeArea,
    transition,
} from "styles/variables";
import Text from "elements/components/Text/Text";

export const sidebarStyles = css<{
    $sidebarOpen: boolean;
}>`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    height: 100dvh;
    width: calc(15rem + ${safeArea.left});
    padding: 1rem 1rem 1rem calc(1rem + ${safeArea.left});

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
        width: calc(17rem + ${safeArea.left});
        padding: 2rem 2rem 2rem calc(2rem + ${safeArea.left});
        transform: translateX(0);
        visibility: visible;
    }
`;

export const StyledSidebar = styled.aside<{
    $sidebarOpen: boolean;
}>`
    ${sidebarStyles}
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
    /* Beim Öffnen ease-out, beim Schließen ease-in */
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
    margin: 1.5rem 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    min-height: 0;
`;

// Der Titel ist nur auf Desktop sichtbar; auf Mobile liegt er im Menü
export const MainTitle = styled(Text)`
    ${mainTitleStyles}
    visibility: hidden;

    @media ${queries.md} {
        visibility: visible;
    }
`;
