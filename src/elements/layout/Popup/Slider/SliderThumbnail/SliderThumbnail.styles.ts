import { styled } from "styled-components";
import { queries } from "styles/variables";
import Button from "elements/components/Button/Button";

export const SliderListItem = styled.li`
    margin: 0 0.25rem 0 0;
    width: 3rem;
    height: 3rem;

    @media ${queries.landscapeLgMax} {
        margin: 0 0 0.25rem 0;
    }
`;

export const SliderItem = styled(Button)<{ $isActive: boolean }>`
    position: relative;
    background: transparent;
    width: 100%;
    height: 100%;
    overflow: hidden;

    /* Abdunklung als Overlay statt Bild-Opacity, damit iOS das Bild nicht neu rastert */
    &::after {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(255, 255, 255, 0.5);
        opacity: ${({ $isActive }) => ($isActive ? 0 : 1)};
        pointer-events: none;
    }

    &:focus-visible::after {
        opacity: 0;
    }

    @media ${queries.hover} {
        &:hover::after {
            opacity: 0;
        }
    }
`;
