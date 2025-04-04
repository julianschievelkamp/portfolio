import { Theme } from "data/types";
import Icon from "elements/components/icon";
import styled from "styled-components";
import { queries, scrollStyles, transition } from "styles/variables";

export const StyledSidebar = styled.div<{
    $sidebarOpen: boolean;
    theme: Theme;
}>`
    background: ${({ theme }) => theme.body};
    width: 15rem;
    max-width: calc(100vw - 4rem);
    height: 100%;
    position: fixed;
    padding: 1rem;
    top: 0;
    left: 0;
    transform: ${({ $sidebarOpen }) =>
        `translateX(${$sidebarOpen ? 0 : "-100%"})`};
    transition: ${transition.fast};
    overflow: hidden;
    display: flex;
    flex-direction: column;

    @media ${queries.md} {
        width: 17rem;
        padding: 2rem;
        transform: translateX(0);
    }
`;

export const ScrollContainer = styled.div`
    ${scrollStyles}

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

export const StyledIcon = styled(Icon)<{ theme: Theme }>`
    &:hover {
        svg {
            fill: ${({ theme }) => theme.hover};
        }
    }
`;
