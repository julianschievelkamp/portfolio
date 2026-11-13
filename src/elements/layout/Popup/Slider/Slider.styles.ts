import { styled } from "styled-components";
import { queries, safeArea, transition } from "styles/variables";

export const SliderContainer = styled.div`
    position: absolute;
    bottom: 1rem;
    left: 0;
    width: 100%;
    height: 3rem;
    z-index: 9;
    overflow-x: clip;

    will-change: opacity;
    transition: opacity ${transition.default};

    html:has([data-pinching]) & {
        opacity: 0;
    }

    @media ${queries.landscapeLgMax} {
        top: 0;
        left: calc(1rem + ${safeArea.left});
        bottom: unset;
        width: 3rem;
        height: 100%;
    }
`;

export const InnerSliderContainer = styled.ul<{
    $focusedIndex: number;
}>`
    position: absolute;
    bottom: 0;
    left: calc(50% - 1.5rem);
    transform: ${({ $focusedIndex }) =>
        `translateX(calc(-3.25rem * ${$focusedIndex}))`};
    will-change: transform;
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    transition: transform ${transition.default};

    @media ${queries.landscapeLgMax} {
        flex-direction: column;
        bottom: unset;
        top: calc(50% - 1.5rem);
        left: 0;
        transform: ${({ $focusedIndex }) =>
            `translateY(calc(-3.25rem * ${$focusedIndex}))`};
    }
`;
