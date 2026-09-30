import { StyledButton } from "./styles";

export interface ButtonProps {
    onClick: () => void;
    onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    ariaLabel?: string;
    tabIndex?: number;
    disabled?: boolean;
    className?: string;
}

const Button = ({
    onClick,
    onFocus,
    children,
    ariaLabel,
    tabIndex = 0,
    disabled,
    className,
}: ButtonProps) => {
    return (
        <StyledButton
            onClick={onClick}
            onFocus={onFocus}
            aria-label={ariaLabel}
            tabIndex={tabIndex}
            disabled={disabled}
            className={className}
        >
            {children}
        </StyledButton>
    );
};

export default Button;
