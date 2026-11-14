import { styled } from "styled-components";
import { colors, transition } from "styles/variables";

export const StyledSocial = styled.div`
    display: flex;
    align-items: center;
    margin: 2rem 0 0 0;
    width: fit-content;

    &:hover {
        img {
            transform: scale(1.1);
        }

        a {
            color: ${colors.highlight};
            transition: color ${transition.fast};
        }
    }
`;

export const SocialText = styled.div`
    margin: 0 1rem 0 0.5rem;
`;

export const StyledProfile = styled.div`
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
`;

export const ProfileImage = styled.div`
    overflow: clip;
    border-radius: 100px;
    width: 100%;
    height: 100%;
`;
