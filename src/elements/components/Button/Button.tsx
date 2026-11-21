import type { ComponentProps } from "react";
import { StyledButton } from "./Button.styles";

interface ButtonProps extends ComponentProps<"button"> {
    onClick: () => void;
}

const Button = (props: ButtonProps) => <StyledButton {...props} />;

export default Button;
