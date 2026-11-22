import { styled } from "styled-components";

import Link from "elements/components/Link/Link";
import { transition } from "styles/variables";

export const StyledSocial = styled.div`
    display: flex;
    align-items: center;
    margin-top: 2rem;
    padding-right: 1rem;
    width: fit-content;
`;

export const ImageLink = styled(Link)`
    width: 3.5rem;
    min-width: 3.5rem;
    height: 3.5rem;
    min-height: 3.5rem;
    border-radius: 100px;
    border: 2px solid transparent;
    padding: 2px;
    background:
        linear-gradient(white 0 0) padding-box,
        linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)
            border-box;
    margin-right: 0.5rem;

    img {
        transition: transform ${transition.default};
    }

    &:hover,
    &:focus-visible {
        img {
            transform: scale(1.1);
        }
    }
`;

export const ImageWrapper = styled.span`
    position: relative;
    display: block;
    overflow: clip;
    border-radius: 100px;
    width: 100%;
    height: 100%;
`;
