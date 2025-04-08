import { Theme } from "styles/variables";
import { icons } from "./icons";

import { StyledIcon } from "./styles";

export interface IconProps {
    name: keyof typeof icons;
    color?: keyof Theme | string;
    size?: string;
    margin?: string;
    padding?: string;
    onClick?: () => void;
    className?: string;
}

const Icon = ({
    name,
    color,
    onClick,
    className,
    size = "1rem",
    margin,
    padding,
}: IconProps) => {
    const Icon = icons[name];

    return (
        <StyledIcon
            color={color}
            $size={size}
            $margin={margin}
            $padding={padding}
            onClick={onClick}
            className={className}
        >
            <Icon />
        </StyledIcon>
    );
};

export default Icon;
