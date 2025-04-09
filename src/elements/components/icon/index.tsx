import { Theme } from "styles/variables";
import { icons } from "./icons";

import { StyledIcon } from "./styles";

export interface IconProps {
    name: keyof typeof icons;
    color?: keyof Theme | string;
    size?: string;
    margin?: string;
    padding?: string;
    className?: string;
}

const Icon = ({
    name,
    color,
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
            className={className}
        >
            <Icon />
        </StyledIcon>
    );
};

export default Icon;
