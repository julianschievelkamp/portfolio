import { styled } from "styled-components";

export const StyledItemInfo = styled.figcaption<{ $isVisible: boolean }>`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    backdrop-filter: blur(8px);
    /* Nur per opacity ausblenden, damit Screenreader die Caption auch bei geschlossenem Info-Panel vorlesen */
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    pointer-events: none;
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
