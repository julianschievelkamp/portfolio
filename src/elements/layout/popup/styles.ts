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

    background: blue;
`;

export const ImageContainer = styled.div``;
