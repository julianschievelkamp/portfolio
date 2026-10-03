import { queries } from "styles/variables";
import { styled } from "styled-components";
import { transition } from "styles/variables";
import Button from "elements/components/button";

export const StyledPopup = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    pointer-events: ${({ $isOpen }) => ($isOpen ? "all" : "none")};
    transition: ${transition.fast};
    width: 100%;
    height: 100%;
    padding: 1rem;
    user-select: none;
    z-index: 99;

    @media ${queries.md} {
        @media ${queries.portrait} {
            padding: 1rem 8rem;
        }
    }
`;

export const CloseButton = styled(Button)`
    position: absolute;
    outline: none;
    top: 1rem;
    right: 1rem;
    z-index: 9;
    background: white;
    width: 2rem;
    height: 2rem;
`;

export const OuterWrapper = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5rem;
    width: 100%;
    position: relative;
    z-index: 1;

    @media ${queries.landscapeLgMax} {
        margin-bottom: 0rem;
        width: auto;
    }
`;

export const ItemContainer = styled.div`
    position: relative;

    > img,
    > video {
        display: flex;
        border: 0.5rem solid black;

        -o-object-fit: cover;
        object-fit: cover;
        overflow: hidden;
        min-height: 10rem;
        max-height: calc(var(--100vh) - 14rem);

        @media ${queries.landscapeLgMax} {
            max-height: calc(var(--100vh) - 2rem);
            max-width: calc(100vw - 10rem);
        }
    }

    > video {
        position: absolute;
        top: 0;
        left: 0;
    }
`;

export const Arrow = styled(Button)<{ $isRight?: boolean }>`
    position: absolute;
    outline: none;
    height: 100%;
    width: 50%;
    left: ${({ $isRight }) => ($isRight ? "unset" : "0")};
    right: ${({ $isRight }) => ($isRight ? "0" : "unset")};

    > div {
        position: absolute;
        left: ${({ $isRight }) => ($isRight ? "unset" : "2rem")};
        right: ${({ $isRight }) => ($isRight ? "2rem" : "unset")};
        top: 50%;
        transform: translateY(-50%);
    }
`;

export const StyledItemInfo = styled.div<{ $isVisible: boolean }>`
    position: absolute;
    bottom: 0.5rem;
    left: 0.5rem;
    width: calc(100% - 1rem);
    max-width: calc(100% - 1rem);
    max-height: calc(100% - 1rem);
    backdrop-filter: blur(8px);
    padding: 1rem;
    visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    z-index: 9;
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

export const NotchWrapper = styled.div`
    overflow: hidden;
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    right: 0;
    bottom: 0.5rem;
    transform: translateY(100%);

    @media ${queries.landscapeLgMax} {
        display: none;
    }
`;

export const StyledNotch = styled.div`
    position: relative;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: black;
    padding-right: 0.25rem;
    height: 1.75rem;
    max-width: 100%;

    &::before {
        content: "";
        position: absolute;
        background: black;
        transform: rotate(45deg);
        z-index: -1;
        left: -0.5rem;
        top: -1.5rem;
        width: 4rem;
        height: 4rem;
    }
`;

export const SliderContainer = styled.div`
    position: absolute;
    bottom: 1rem;
    left: 0;
    width: 100%;

    @media ${queries.landscapeLgMax} {
        top: 0;
        left: 1rem;
        bottom: unset;
        width: unset;
        height: 100%;
        z-index: 1;
    }
`;

export const InnerSliderContainer = styled.div<{
    $selectedIndex: number;
}>`
    position: absolute;
    bottom: 0;
    left: calc(50% - 1.5rem);
    transform: ${({ $selectedIndex }) =>
        `translateX(calc(-3.25rem * ${$selectedIndex}))`};
    display: flex;
    transition: ${transition.fast};
    background: white;

    @media ${queries.landscapeLgMax} {
        flex-direction: column;
        bottom: unset;
        top: calc(50% - 1.5rem);
        left: 0;
        transform: ${({ $selectedIndex }) =>
            `translateY(calc(-3.25rem * ${$selectedIndex}))`};
    }
`;

export const SliderItem = styled(Button)<{ $imageOpacity: number }>`
    margin: 0 0.25rem 0 0;
    background: transparent;
    width: 3rem;
    height: 3rem;
    overflow: hidden;

    @media ${queries.landscapeLgMax} {
        margin: 0 0 0.25rem 0;
    }

    img {
        transition: none;
        opacity: ${({ $imageOpacity }) => $imageOpacity};
    }

    @media ${queries.hover} {
        &:hover img {
            opacity: 1;
        }
    }
`;
