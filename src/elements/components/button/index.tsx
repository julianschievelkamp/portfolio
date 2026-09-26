import { StyledButton } from "./styles";

export interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    ariaLabel?: string;
    tabIndex?: number;
    className?: string;
}

const Button = ({
    onClick,
    children,
    ariaLabel,
    tabIndex,
    className,
}: ButtonProps) => {
    return (
        <StyledButton
            onClick={onClick}
            aria-label={ariaLabel}
            tabIndex={tabIndex}
            className={className}
        >
            {children}
        </StyledButton>
    );
};

export default Button;
