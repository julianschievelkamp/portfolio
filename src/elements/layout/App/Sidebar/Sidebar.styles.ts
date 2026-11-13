import { styled } from "styled-components";
import {
    absoluteOverlayStyles,
    mainTitleStyles,
    queries,
    safeArea,
    transition,
} from "styles/variables";
import Text from "elements/components/Text/Text";

export const StyledSidebar = styled.aside<{
    $sidebarOpen: boolean;
}>`
    ${absoluteOverlayStyles}

    will-change: transform;
    transform: ${({ $sidebarOpen }) =>
        `translateX(${$sidebarOpen ? 0 : "-100%"})`};
    visibility: ${({ $sidebarOpen }) => ($sidebarOpen ? "visible" : "hidden")};
    /* Beim Öffnen ease-out, beim Schließen ease-in */
    transition: ${({ $sidebarOpen }) => {
        const timing = $sidebarOpen ? transition.default : transition.defaultIn;

        return `transform ${timing}, visibility ${timing}`;
    }};

    width: calc(15rem + ${safeArea.left});
    padding: 1rem 1rem 1rem calc(1rem + ${safeArea.left});
    z-index: 9;
    display: flex;
    flex-direction: column;

    @media ${queries.md} {
        width: calc(17rem + ${safeArea.left});
        padding: 2rem 2rem 2rem calc(2rem + ${safeArea.left});
        transform: translateX(0);
        visibility: visible;
    }
`;

export const Backdrop = styled.div<{ $isActive: boolean }>`
    touch-action: none;
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
    touch-action: pan-y;
    overflow-y: scroll;
    overscroll-behavior-y: contain;
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
