import { styled } from "styled-components";
import { transition, queries, mainTitleStyles } from "styles/variables";
import Text from "elements/components/Text/Text";

export const StyledHeader = styled.header<{ $isVisible: boolean }>`
    background-color: white;
    width: 100vw;
    position: fixed;
    height: 7.5rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    top: 0;
    left: 0;
    transform: ${({ $isVisible }) => `translateY(${$isVisible ? 0 : "-100%"})`};
    visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
    /* Beim Öffnen ease-out, beim Schließen ease-in */
    transition: ${({ $isVisible }) => {
        const timing = $isVisible ? transition.default : transition.defaultIn;

        return `transform ${timing}, visibility ${timing}`;
    }};
    z-index: 99;

    @media ${queries.md} {
        display: none;
    }
`;

export const ToggleWrapper = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 0 0 2rem;
`;

export const MainTitle = styled(Text)`
    ${mainTitleStyles}
`;
