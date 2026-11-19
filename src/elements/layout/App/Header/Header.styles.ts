import { styled } from "styled-components";
import { queries } from "styles/variables";
import Button from "elements/components/Button/Button";
import MainTitle from "elements/layout/App/MainTitle/MainTitle";

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

export const StyledMainTitle = styled(MainTitle)<{ $sidebarOpen: boolean }>`
    position: ${({ $sidebarOpen }) => ($sidebarOpen ? "fixed" : "relative")};
`;
