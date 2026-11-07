import { styled } from "styled-components";

export const StyledItemInfo = styled.div<{ $isVisible: boolean }>`
    position: absolute;
    bottom: 0.5rem;
    left: 0.5rem;
    width: calc(100% - 1rem);
    max-width: calc(100% - 1rem);
    max-height: calc(100% - 1rem);
    backdrop-filter: blur(8px);
    visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    overflow: hidden;
    z-index: 9;
`;

export const InnerWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    width: 100%;
    height: 100%;
`;

export const BadgesWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-left: 1.5rem;

    > div {
        display: flex;
        align-items: center;

        img {
            min-width: 2rem;
            max-width: 2rem;
        }
    }
`;
