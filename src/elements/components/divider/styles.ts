import styled from "styled-components";
import { Theme, transition } from "styles/variables";

export const StyledDivider = styled.div<{ theme: Theme }>`
    position: relative;
    width: 100%;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        height: 1px;
        width: 100%;
        background: ${({ theme }) => theme.primary};
        transition: ${transition.fast};
    }
`;

export const TextWrapper = styled.div<{ theme: Theme }>`
    margin: 0 auto;
    width: fit-content;
    position: relative;
    z-index: 1;
    padding: 4rem 1rem;

    &::before {
        content: "";
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background-color: ${({ theme }) => theme.body};
        transition: ${transition.fast};
        z-index: -1;
    }
`;
