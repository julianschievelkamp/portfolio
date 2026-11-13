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
    width: 100%;
    height: 100%;
    overflow: hidden;

    &::after {
        content: "";
        position: absolute;
        inset: 0;
        background-color: white;
        opacity: ${({ $isActive }) => ($isActive ? 0 : 0.5)};
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
