import { Theme } from "data/types";
import Icon from "elements/components/icon";
import styled from "styled-components";
import { transition } from "styles/variables";

export const StyledMenu = styled.div<{ $isVisible: boolean; theme: Theme }>`
    background: ${({ theme }) => theme.body};
    width: 100vw;
    position: fixed;
    height: 7.5rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    top: 0;
    left: 0;
    transform: ${({ $isVisible }) => `translateY(${$isVisible ? 0 : "-100%"})`};
    transition: ${transition.fast};
`;

export const StyledIcon = styled(Icon)<{ theme: Theme }>`
    &:hover {
        svg {
            fill: ${({ theme }) => theme.hover};
        }
    }
`;
