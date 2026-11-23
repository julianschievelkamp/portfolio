import { styled } from "styled-components";

import Button from "elements/components/Button/Button";
import { queries } from "styles/variables";

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

    img {
        opacity: ${({ $isActive }) => ($isActive ? 1 : 0.25)};
    }

    @media ${queries.hover} {
        &:hover img {
            opacity: 1;
        }
    }
`;
