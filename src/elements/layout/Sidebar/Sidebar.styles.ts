import { styled } from "styled-components";
import {
    mainTitleStyles,
    queries,
    scrollStyles,
    transition,
} from "styles/variables";
import Text from "elements/components/Text/Text";
import Div from "elements/components/Div/Div";

export const StyledSidebar = styled.aside<{
    $sidebarOpen: boolean;
}>`
    background-color: white;
    width: 15rem;
    max-width: calc(100vw - 4rem);
    height: 100%;
    position: fixed;
    padding: 1rem;
    top: 0;
    left: 0;
    transform: ${({ $sidebarOpen }) =>
        `translateX(${$sidebarOpen ? 0 : "-100%"})`};
    visibility: ${({ $sidebarOpen }) => ($sidebarOpen ? "visible" : "hidden")};
    transition: ${transition.default};
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
    height: 100%;
    top: 0;
    left: 0;
    backdrop-filter: blur(2px);
    transition: ${transition.default};
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
    visibility: ${({ $isActive }) => ($isActive ? "visible" : "hidden")};
    z-index: 9;

    @media ${queries.md} {
        display: none;
    }
`;

export const ScrollContainer = styled(Div)`
    ${scrollStyles}

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

export const SidebarFooter = styled.footer`
    margin-top: 0.5rem;
`;
