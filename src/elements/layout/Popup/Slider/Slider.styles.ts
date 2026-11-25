import { styled } from "styled-components";

import { PINCHING_ATTRIBUTE } from "styles/global";
import { queries, transition } from "styles/variables";

export const SliderContainer = styled.div`
    position: absolute;
    bottom: 1rem;
    left: 0;
    width: 100%;
    height: 3rem;
    z-index: 9;
    overflow-x: clip;
    transition: opacity ${transition.fast};
    opacity: 0;

    html:has([data-visible="true"]) & {
        transition: opacity ${transition.default};
        opacity: 1;
    }

    html[${PINCHING_ATTRIBUTE}] & {
        transition: opacity ${transition.fast};
        opacity: 0;
    }

    @media ${queries.landscapeLgMax} {
        top: 0;
        left: 1rem;
        bottom: unset;
        width: 3rem;
        height: 100%;
    }
`;

export const InnerSliderContainer = styled.ul<{
    $activeIndex: number;
}>`
    position: absolute;
    bottom: 0;
    left: calc(50% - 1.5rem);
    transform: ${({ $activeIndex }) =>
        `translateX(calc(-3.25rem * ${$activeIndex}))`};
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
        transform: ${({ $activeIndex }) =>
            `translateY(calc(-3.25rem * ${$activeIndex}))`};
    }
`;
