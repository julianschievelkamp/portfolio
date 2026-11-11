import { styled } from "styled-components";
import { queries } from "styles/variables";

export const StyledItemButtons = styled.div`
    overflow: hidden;
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    right: 0;
    bottom: 0;
    transform: translateY(100%);

    @media ${queries.landscapeLgMax} {
        height: 100%;
        flex-direction: column;
        transform: translateX(100%);
        bottom: 0;
        right: 0;
    }
`;

export const Notch = styled.div`
    position: relative;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: black;
    padding: 0 0 0 2rem;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 2rem 100%);

    @media ${queries.landscapeLgMax} {
        height: auto;
        width: fit-content;
        flex-direction: column;
        padding: 2rem 0 0 0;
        clip-path: polygon(0 0, 100% 2rem, 100% 100%, 0 100%);
    }

    button {
        will-change: opacity;

        html:has([data-pinching]) & {
            opacity: 0;
        }
    }
`;
