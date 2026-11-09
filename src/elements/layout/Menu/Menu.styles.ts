import { styled } from "styled-components";
import { transition, queries, mainTitleStyles } from "styles/variables";
import Text from "elements/components/Text/Text";

export const StyledMenu = styled.header<{ $isVisible: boolean }>`
    background-color: white;
    position: fixed;
    height: 7.5rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    /* Dauerhafte Compositing-Ebene, damit die Animation auf iOS nicht vom
       Main-Thread abhängt, der beim Ein- und Ausklappen der Adressleiste
       ausgelastet ist */
    will-change: transform;
    backface-visibility: hidden;
    transform: ${({ $isVisible }) =>
        `translate3d(0, ${$isVisible ? 0 : "-100%"}, 0)`};
    visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
    /* Beim Öffnen ease-out, beim Schließen ease-in */
    transition: ${({ $isVisible }) => {
        const timing = $isVisible ? transition.default : transition.defaultIn;

        return `transform ${timing}, visibility ${timing}`;
    }};

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
