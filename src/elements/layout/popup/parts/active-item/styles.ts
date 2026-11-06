import { styled } from "styled-components";
import { queries } from "styles/variables";

export const ItemContainer = styled.div`
    position: relative;

    > img,
    > video {
        display: flex;
        border: 0.5rem solid black;

        -o-object-fit: cover;
        object-fit: cover;
        overflow: hidden;
        min-height: 10rem;
        max-height: calc(var(--100vh) - 14rem);

        @media ${queries.landscapeLgMax} {
            max-height: calc(var(--100vh) - 2rem);
            max-width: calc(100vw - 10rem);
        }
    }

    > video {
        position: absolute;
        top: 0;
        left: 0;
    }
`;
