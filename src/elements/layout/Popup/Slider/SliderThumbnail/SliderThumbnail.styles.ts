import { styled } from "styled-components";

import Button from "elements/components/Button/Button";
import { colors, queries } from "styles/variables";

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
    overflow: clip;

    &::after {
        content: "";
        background-color: ${({ $isActive }) =>
            $isActive ? "transparent" : colors.opacity25};
        pointer-events: none;
        position: absolute;
        inset: 0;
    }

    @media ${queries.hover} {
        &:hover::after {
            background-color: transparent;
        }
    }
`;
