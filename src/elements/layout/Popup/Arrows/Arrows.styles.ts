import { styled } from "styled-components";
import Button from "elements/components/Button/Button";

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
