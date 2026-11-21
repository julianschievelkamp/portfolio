import { styled } from "styled-components";

import Button from "elements/components/Button/Button";
import Title from "elements/layout/App/Title/Title";
import { queries } from "styles/variables";

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
    background-color: white;
    right: 1rem;
    margin: 2px 0 0 2rem;
    top: 50%;
    transform: translateY(-50%);
`;

export const HeaderTitle = styled(Title)<{ $sidebarOpen: boolean }>`
    position: ${({ $sidebarOpen }) => ($sidebarOpen ? "fixed" : "relative")};
`;
