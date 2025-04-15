import { StyledButton } from "./styles";

import Icon from "elements/components/icon";

import { icons } from "../icon/icons";

export interface ButtonProps {
    onClick: () => void;
    iconName: keyof typeof icons;
    iconSize?: string;
    padding?: string;
    ariaLabel?: string;
    className?: string;
}

const Button = ({
    onClick,
    iconName,
    iconSize,
    padding,
    ariaLabel,
    className,
}: ButtonProps) => {
    return (
        <StyledButton
            onClick={onClick}
            aria-label={ariaLabel}
            className={className}
        >
            <Icon name={iconName} size={iconSize} padding={padding} />
        </StyledButton>
    );
};

export default Button;
