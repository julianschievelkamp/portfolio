import { StyledButton } from "./styles";

import Icon from "elements/components/icon";

import { icons } from "../icon/icons";

export interface ButtonProps {
    onClick: () => void;
    iconName: keyof typeof icons;
    iconSize?: string;
    padding?: string;
    className?: string;
}

const Button = ({
    onClick,
    iconName,
    iconSize,
    padding,
    className,
}: ButtonProps) => {
    return (
        <StyledButton onClick={onClick} className={className}>
            <Icon name={iconName} size={iconSize} padding={padding} />
        </StyledButton>
    );
};

export default Button;
