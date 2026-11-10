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
    background: transparent;
    width: 100%;
    height: 100%;
    overflow: hidden;

    img {
        transition: none;
        opacity: ${({ $isActive }) => ($isActive ? 1 : 0.5)};
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
