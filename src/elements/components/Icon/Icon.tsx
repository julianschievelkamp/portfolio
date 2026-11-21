import { icons } from "./icons";
import { StyledIcon } from "./Icon.styles";

interface IconProps {
    name: keyof typeof icons;
    color?: string;
    size?: string;
    padding?: string;
}

const Icon = ({ name, color, size = "1rem", padding }: IconProps) => {
    const Icon = icons[name];

    return (
        <StyledIcon $color={color} $size={size} $padding={padding}>
            <Icon aria-hidden="true" />
        </StyledIcon>
    );
};

export default Icon;
