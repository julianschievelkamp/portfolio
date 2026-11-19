import type { ComponentProps } from "react";
import { StyledButton } from "./Button.styles";

export interface ButtonProps extends ComponentProps<"button"> {
    onClick: () => void;
}

const Button = (props: ButtonProps) => {
    return <StyledButton {...props} />;
};

export default Button;
