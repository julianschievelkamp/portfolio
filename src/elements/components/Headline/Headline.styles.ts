import { styled, css } from "styled-components";
import { queries, visuallyHidden } from "styles/variables";

const headlineStyles = css<{ $visuallyHidden?: boolean }>`
    margin: 4rem auto;
    text-align: center;
    color: black;
    font-family: "PlayfairDisplay", sans-serif;
    font-weight: 900;
    line-height: 1.5;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 1rem;

    &::before,
    &::after {
        content: "";
        flex: 1;
        height: 1px;
        background: black;
    }

    ${({ $visuallyHidden }) => $visuallyHidden && visuallyHidden}
`;

export const H1 = styled.h1<{ $visuallyHidden?: boolean }>`
    ${headlineStyles}
`;

export const H2 = styled.h2<{ $visuallyHidden?: boolean }>`
    ${headlineStyles}

    font-size: 1.25rem;

    @media ${queries.md} {
        font-size: 1.5rem;
    }
`;
