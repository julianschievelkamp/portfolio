import { styled } from "styled-components";
import { queries, mainTitleStyles } from "styles/variables";
import Text from "elements/components/Text/Text";
import Button from "elements/components/Button/Button";

export const StyledHeader = styled.header`
    position: absolute;
    z-index: 99;
    width: 100%;
    height: 7.5rem;
    padding: 1rem;

    display: flex;
    justify-content: space-between;

    @media ${queries.md} {
        display: none;
    }
`;

export const SidebarToggle = styled(Button)`
    position: absolute;
    right: 1rem;
    margin: 0 0 0 2rem;
    top: 50%;
    transform: translateY(-50%);
`;

export const MainTitle = styled(Text)<{ $sidebarOpen: boolean }>`
    ${mainTitleStyles}

    position: ${({ $sidebarOpen }) => ($sidebarOpen ? "fixed" : "relative")};
`;
