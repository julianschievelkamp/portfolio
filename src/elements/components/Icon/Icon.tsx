import { StyledIcon } from "./Icon.styles";
import { icons } from "./icons";

interface IconProps {
    color?: string;
    name: keyof typeof icons;
    padding?: string;
    size?: string;
}

const Icon = ({ color, name, padding, size = "1rem" }: IconProps) => {
    const SvgIcon = icons[name];

    return (
        <StyledIcon $color={color} $padding={padding} $size={size}>
            <SvgIcon aria-hidden="true" />
        </StyledIcon>
    );
};

export default Icon;
