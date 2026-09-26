import { StyledButton } from "./styles";

export interface ButtonProps {
    onClick: () => void;
    onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    ariaLabel?: string;
    tabIndex?: number;
    className?: string;
}

const Button = ({
    onClick,
    onFocus,
    children,
    ariaLabel,
    tabIndex,
    className,
}: ButtonProps) => {
    return (
        <StyledButton
            onClick={onClick}
            onFocus={onFocus}
            aria-label={ariaLabel}
            tabIndex={tabIndex}
            className={className}
        >
            {children}
        </StyledButton>
    );
};

export default Button;
