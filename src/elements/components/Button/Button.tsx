import type { ComponentProps } from "react";

import { StyledButton } from "./Button.styles";

interface ButtonProps extends ComponentProps<"button"> {
    onClick: () => void;
}

const Button = ({ tabIndex = 0, ...props }: ButtonProps) => (
    <StyledButton {...props} tabIndex={tabIndex} />
);

export default Button;
