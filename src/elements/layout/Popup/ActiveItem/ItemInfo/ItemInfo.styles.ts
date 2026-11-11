import Text from "elements/components/Text/Text";
import { styled } from "styled-components";

export const StyledItemInfo = styled.figcaption<{ $isVisible: boolean }>`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    backdrop-filter: blur(8px);
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
    overflow: hidden;
    z-index: 9;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
`;

export const ImageTitle = styled(Text)`
    span {
        font-family: "PlayfairDisplay", sans-serif;
        font-weight: 900;
    }
`;

export const BadgesWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-left: 1.5rem;

    img {
        min-width: 2rem;
        max-width: 2rem;
    }
`;
