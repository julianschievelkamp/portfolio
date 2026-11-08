import { styled } from "styled-components";
import { queries, transition } from "styles/variables";
import Button from "elements/components/Button/Button";

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

export const InnerSliderContainer = styled.ul<{
    $focusedIndex: number;
}>`
    position: absolute;
    bottom: 0;
    left: calc(50% - 1.5rem);
    transform: ${({ $focusedIndex }) =>
        `translateX(calc(-3.25rem * ${$focusedIndex}))`};
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    transition: ${transition.default};
    background: white;

    @media ${queries.landscapeLgMax} {
        flex-direction: column;
        bottom: unset;
        top: calc(50% - 1.5rem);
        left: 0;
        transform: ${({ $focusedIndex }) =>
            `translateY(calc(-3.25rem * ${$focusedIndex}))`};
    }
`;

export const SliderListItem = styled.li`
    margin: 0 0.25rem 0 0;
    width: 3rem;
    height: 3rem;

    @media ${queries.landscapeLgMax} {
        margin: 0 0 0.25rem 0;
    }
`;

export const SliderItem = styled(Button)<{ $imageOpacity: number }>`
    background: transparent;
    width: 100%;
    height: 100%;
    overflow: hidden;

    img {
        transition: none;
        opacity: ${({ $imageOpacity }) => $imageOpacity};
    }

    &:focus-visible img {
        opacity: 1;
    }

    @media ${queries.hover} {
        &:hover img {
            opacity: 1;
        }
    }
`;
