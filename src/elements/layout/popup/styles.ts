import { queries } from "styles/variables";
import { styled } from "styled-components";
import { transition } from "styles/variables";
import Button from "elements/components/button";

export const StyledPopup = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    pointer-events: ${({ $isOpen }) => ($isOpen ? "all" : "none")};
    transition: ${transition.fast};
    width: 100%;
    height: 100%;
    padding: 1rem;
    user-select: none;
    z-index: 99;

    @media ${queries.md} {
        @media ${queries.portrait} {
            padding: 1rem 8rem;
        }
    }
`;

export const CloseButton = styled(Button)`
    position: absolute;
    outline: none;
    top: 1rem;
    right: 1rem;
    z-index: 9;
    background: white;
    width: 2rem;
    height: 2rem;
`;

export const OuterWrapper = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5rem;
    width: 100%;
    position: relative;
    z-index: 1;

    @media ${queries.landscapeLgMax} {
        margin-bottom: 0rem;
        width: auto;
    }
`;
