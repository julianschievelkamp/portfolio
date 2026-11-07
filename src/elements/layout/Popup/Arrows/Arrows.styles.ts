import { styled } from "styled-components";
import Button from "elements/components/Button/Button";
import { focusStyles } from "styles/variables";

export const Arrow = styled(Button)<{ $isRight?: boolean }>`
    position: absolute;
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

    /* Statt der gesamten Klickfläche wird nur das Icon eckig hervorgehoben */
    &:focus-visible {
        outline: none;

        > div {
            ${focusStyles};
        }
    }
`;
