import { styled } from "styled-components";
import { queries, mainTitleStyles, safeArea } from "styles/variables";
import Text from "elements/components/Text/Text";

export const StyledHeader = styled.header`
    position: absolute;
    z-index: 99;
    width: 100%;
    height: 7.5rem;
    padding: 1rem calc(1rem + ${safeArea.right}) 1rem
        calc(1rem + ${safeArea.left});

    display: flex;
    justify-content: space-between;

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
