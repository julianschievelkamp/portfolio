import { styled } from "styled-components";
import { queries, transition } from "styles/variables";
import Button from "elements/components/button";

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
    $selectedIndex: number;
}>`
    position: absolute;
    bottom: 0;
    left: calc(50% - 1.5rem);
    transform: ${({ $selectedIndex }) =>
        `translateX(calc(-3.25rem * ${$selectedIndex}))`};
    display: flex;
    transition: ${transition.fast};
    background: white;

    @media ${queries.landscapeLgMax} {
        flex-direction: column;
        bottom: unset;
        top: calc(50% - 1.5rem);
        left: 0;
        transform: ${({ $selectedIndex }) =>
            `translateY(calc(-3.25rem * ${$selectedIndex}))`};
    }
`;

export const SliderItem = styled(Button)<{ $imageOpacity: number }>`
    margin: 0 0.25rem 0 0;
    background: transparent;
    width: 3rem;
    height: 3rem;
    overflow: hidden;

    @media ${queries.landscapeLgMax} {
        margin: 0 0 0.25rem 0;
    }

    img {
        transition: none;
        opacity: ${({ $imageOpacity }) => $imageOpacity};
    }

    @media ${queries.hover} {
        &:hover img {
            opacity: 1;
        }
    }
`;
