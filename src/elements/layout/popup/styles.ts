import { Theme } from "data/types";
import styled from "styled-components";
import { transition } from "styles/variables";

export const StyledPopup = styled.div<{ $isOpen: boolean; theme: Theme }>`
    position: fixed;
    top: 0;
    left: 0;
    background: ${({ theme }) => theme.body};
    visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    pointer-events: ${({ $isOpen }) => ($isOpen ? "all" : "none")};
    transition: ${transition.fast};
    width: 100%;
    height: 100%;
    padding: 1rem;
    user-select: none;
`;

export const OuterWrapper = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const CloseTrigger = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`;

export const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 6rem;
    width: 100%;
    position: relative;
`;

export const ItemContainer = styled.div`
    z-index: 1;
    position: relative;

    img,
    video {
        max-height: calc(var(--100vh) - 15rem);
        border: 8px solid black;
    }

    video {
        cursor: pointer;
    }
`;

export const ArrowLeft = styled.div`
    position: absolute;
    height: calc(100% - 4px);
    width: 50%;
    left: 0;

    > div {
        width: 100%;
        height: 100%;

        svg {
            position: absolute;
            left: 2rem;
        }
    }
`;

export const ArrowRight = styled.div`
    position: absolute;
    height: calc(100% - 4px);
    width: 50%;
    right: 0;

    > div {
        width: 100%;
        height: 100%;

        svg {
            position: absolute;
            right: 2rem;
        }
    }
`;

export const PaletteItem = styled.div<{ $background: string }>`
    background: ${({ $background }) => $background};
    width: 0.75rem;
    height: 0.75rem;
    margin-right: 0.25rem;
`;

export const SliderContainer = styled.div`
    position: absolute;
    bottom: 1rem;
    display: flex;
    overflow: hidden;
`;
