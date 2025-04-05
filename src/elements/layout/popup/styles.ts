import { Theme } from "data/types";
import styled from "styled-components";

export const StyledPopup = styled.div<{ $isOpen: boolean; theme: Theme }>`
    position: fixed;
    top: 0;
    left: 0;
    background: ${({ theme }) => theme.body};
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
    width: 100%;
    height: 100%;
    padding: 1rem;
`;

export const OuterWrapper = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
`;

export const ImageContainer = styled.div`
    cursor: pointer;

    img,
    video {
        max-height: calc(100vh - 15rem);
        border: 8px solid black;
    }
`;

export const SliderContainer = styled.div`
    position: absolute;
    bottom: 1rem;
    display: flex;
    overflow: hidden;
`;
