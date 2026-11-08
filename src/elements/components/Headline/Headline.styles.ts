import { styled, css } from "styled-components";
import { queries, visuallyHidden } from "styles/variables";

export const StyledHeadline = styled.div<{ $visuallyHidden?: boolean }>`
    width: 100%;
    position: relative;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        height: 1px;
        width: 100%;
        background: black;
    }

    ${({ $visuallyHidden }) => $visuallyHidden && visuallyHidden}
`;

export const HeadlineWrapper = styled.div`
    margin: 4rem auto;
    width: fit-content;
    position: relative;
    z-index: 1;
    padding: 0 1rem;

    &::before {
        content: "";
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background-color: white;
        z-index: -1;
    }
`;

const headlineStyles = css`
    margin: 0;
    text-align: center;
    color: black;
    font-family: "PlayfairDisplay", sans-serif;
    font-weight: 900;
    line-height: 1.5;
`;

export const H1 = styled.h1`
    ${headlineStyles}
`;

export const H2 = styled.h2`
    ${headlineStyles}

    font-size: 1.25rem;

    @media ${queries.md} {
        font-size: 1.5rem;
    }
`;
