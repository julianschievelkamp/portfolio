import { styled } from "styled-components";
import {
    transition,
    queries,
    mainTitleStyles,
    safeArea,
} from "styles/variables";
import Text from "elements/components/Text/Text";

export const StyledHeader = styled.header<{ $isVisible: boolean }>`
    position: fixed;
    width: 100vw;
    height: 7.5rem;
    top: 0;
    left: 0;
    padding: 1rem calc(1rem + ${safeArea.right}) 1rem
        calc(1rem + ${safeArea.left});
    z-index: 99;
    display: flex;
    justify-content: space-between;
    background-color: white;

    transform: ${({ $isVisible }) =>
        `translate3d(0, ${$isVisible ? 0 : "-100%"}, 0)`};
    will-change: transform, background-color;
    backface-visibility: hidden;
    visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
    /* Beim Öffnen ease-out, beim Schließen ease-in */
    transition: ${({ $isVisible }) => {
        const timing = $isVisible ? transition.default : transition.defaultIn;

        return `transform ${timing}, visibility ${timing}, background-color ${transition.default}`;
    }};

    /* Safari färbt die Statusleiste anhand des fixierten Headers ein. Während das
       ActiveItem gezoomt wird (data-pinching aus usePinchZoom), wird er daher schwarz. */
    html:has([data-pinching]) & {
        background-color: black;
    }

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
