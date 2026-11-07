import { styled } from "styled-components";
import { queries, transition } from "styles/variables";

export const StyledActiveItem = styled.div<{ $isLoaded: boolean }>`
    position: relative;
    z-index: 1;
    max-width: 100%;
    opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
    transition: opacity ${transition.fast};
`;

export const ItemContainer = styled.div`
    position: relative;
    display: flex;
    border: 0.5rem solid black;

    > img,
    > video {
        object-fit: cover;
        min-height: 10rem;
        max-height: calc(var(--100vh) - 14rem);

        @media ${queries.landscapeLgMax} {
            max-height: calc(var(--100vh) - 3rem);
            max-width: calc(100vw - 11rem);
        }
    }

    > video {
        position: absolute;
        top: 0;
        left: 0;
    }
`;
