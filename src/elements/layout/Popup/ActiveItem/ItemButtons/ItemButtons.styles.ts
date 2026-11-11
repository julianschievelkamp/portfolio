import { styled } from "styled-components";
import { queries } from "styles/variables";

export const StyledItemButtons = styled.div`
    overflow: hidden;
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    right: 0;
    bottom: 0.5rem;
    transform: translateY(100%);

    @media ${queries.landscapeLgMax} {
        display: none;
    }
`;

export const Notch = styled.div`
    position: relative;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: black;

    &::before {
        content: "";
        position: absolute;
        background: black;
        transform: rotate(45deg);
        z-index: -1;
        left: -2rem;
        top: -2rem;
        width: 4rem;
        height: 4rem;
    }
`;
