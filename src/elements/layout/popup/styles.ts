import { queries } from "styles/variables";
import { styled } from "styled-components";
import { transition } from "styles/variables";

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
    z-index: 1;

    &&::before {
        content: "";
        position: absolute;
        background: white;
        width: calc(100% + 4rem);
        height: calc(100% + 2rem);
    }

    @media ${queries.landscapeLgMax} {
        margin-bottom: 0rem;

        &::before {
            display: none;
        }
    }
`;

export const ItemContainer = styled.div`
    z-index: 1;
    position: relative;

    img,
    video {
        -o-object-fit: cover;
        object-fit: cover;
        overflow: hidden;
        min-height: 10rem;

        max-height: calc(var(--100vh) - 15rem);
        border: 8px solid black;

        @media ${queries.landscapeLgMax} {
            max-height: calc(var(--100vh) - 2rem);
            max-width: calc(100vw - 10rem);
            display: flex;
        }
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

    > button {
        position: relative;
        width: 100%;
        height: 100%;

        > div {
            position: absolute;
            left: 2rem;
            top: 50%;
            transform: translateY(-50%);
        }
    }
`;

export const ArrowRight = styled.div`
    position: absolute;
    height: calc(100% - 4px);
    width: 50%;
    right: 0;

    > button {
        position: relative;
        width: 100%;
        height: 100%;

        > div {
            position: absolute;
            right: 2rem;
            top: 50%;
            transform: translateY(-50%);
        }
    }
`;

export const PaletteItem = styled.div<{ $background: string }>`
    background: ${({ $background }) => $background};
    width: 0.75rem;
    height: 0.75rem;
    min-width: 0.75rem;
    min-height: 0.75rem;
    margin-right: 0.25rem;
    margin-bottom: 1px;
`;

export const SliderContainer = styled.div`
    position: absolute;
    bottom: 1rem;
    left: 0;
    width: 100%;

    @media ${queries.landscapeLgMax} {
        top: 0;
        left: 1rem;
        bottom: unset;
        width: unset;
        height: 100%;
        z-index: 1;
    }
`;

export const InnerSliderContainer = styled.div<{
    $currentPortfolioIndex: number;
    $opacity: number;
}>`
    position: absolute;
    bottom: 0;
    left: calc(50% - 1.5rem);
    transform: ${({ $currentPortfolioIndex }) =>
        `translateX(calc(-3.25rem * ${$currentPortfolioIndex}))`};
    display: flex;
    overflow: hidden;
    transition: ${transition.fast};
    transition-delay: 300ms;
    opacity: ${({ $opacity }) => $opacity};
    background: white;

    @media ${queries.landscapeLgMax} {
        flex-direction: column;
        bottom: unset;
        top: calc(50% - 1.5rem);
        left: 0;
        transform: ${({ $currentPortfolioIndex }) =>
            `translateY(calc(-3.25rem * ${$currentPortfolioIndex}))`};
    }
`;

export const SliderItem = styled.button<{ $opacity: number }>`
    margin: 0 0.25rem 0 0;
    padding: 0;
    outline: none;
    border: none;
    background: transparent;
    width: 3rem;
    height: 3rem;
    overflow: hidden;
    opacity: ${({ $opacity }) => $opacity};
    cursor: pointer;

    @media ${queries.landscapeLgMax} {
        margin: 0 0 0.25rem 0;
    }
`;
