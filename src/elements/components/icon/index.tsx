import { icons } from "./icons";
import { StyledIcon } from "./styles";

export interface IconProps {
    name: keyof typeof icons;
    color?: string;
    size?: string;
    padding?: string;
    className?: string;
}

const Icon = ({
    name,
    color,
    className,
    size = "1rem",
    padding,
}: IconProps) => {
    const Icon = icons[name];

    return (
        <StyledIcon
            color={color}
            $size={size}
            $padding={padding}
            className={className}
        >
            <Icon />
        </StyledIcon>
    );
};

export default Icon;
