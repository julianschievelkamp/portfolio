import { styled } from "styled-components";
import { queries } from "styles/variables";

export const StyledItemButtons = styled.div`
    position: absolute;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: black;

    right: 0;
    bottom: 1px;
    padding: 0 0 0 2rem;
    transform: translateY(100%);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 2rem 100%);

    @media ${queries.landscapeLgMax} {
        flex-direction: column;
        right: 1px;
        bottom: 0;
        padding: 2rem 0 0 0;
        transform: translateX(100%);
        clip-path: polygon(0 0, 100% 2rem, 100% 100%, 0 100%);
    }

    button {
        will-change: opacity;

        html:has([data-pinching]) & {
            opacity: 0;
        }
    }
`;
