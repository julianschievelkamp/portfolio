import { Theme } from "styles/variables";
import { styled } from "styled-components";
import { queries, scrollStyles, transition } from "styles/variables";
import Headline from "elements/components/headline";

export const StyledSidebar = styled.div<{
    $sidebarOpen: boolean;
    theme: Theme;
}>`
    background-color: ${({ theme }) => theme.body};
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
    z-index: 9;

    @media ${queries.md} {
        width: 17rem;
        padding: 2rem;
        transform: translateX(0);
    }
`;

export const CloseTrigger = styled.div<{ $isActive: boolean }>`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    backdrop-filter: blur(2px);
    transition: ${transition.fast};
    pointer-events: ${({ $isActive }) => ($isActive ? "all" : "none")};
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
    visibility: ${({ $isActive }) => ($isActive ? "visible" : "hidden")};
`;

export const ScrollContainer = styled.div`
    ${scrollStyles}

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

export const StyledHeadline = styled(Headline)<{
    theme: Theme;
}>`
    font-size: 1.25rem;
    color: ${({ theme }) => theme.body};

    @media ${queries.md} {
        font-size: 1.5rem;
        color: ${({ theme }) => theme.primary};
    }
`;
