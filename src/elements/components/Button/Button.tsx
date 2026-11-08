import { StyledButton } from "./Button.styles";

export interface ButtonProps {
    onClick: () => void;
    onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
    ariaLabel?: string;
    ariaExpanded?: boolean;
    ariaControls?: string;
    id?: string;
    tabIndex?: number;
    disabled?: boolean;
    className?: string;
}

const Button = ({
    onClick,
    onFocus,
    children,
    ariaLabel,
    ariaExpanded,
    ariaControls,
    id,
    tabIndex = 0,
    disabled,
    className,
}: ButtonProps) => {
    return (
        <StyledButton
            onClick={onClick}
            onFocus={onFocus}
            id={id}
            aria-label={ariaLabel}
            aria-expanded={ariaExpanded}
            aria-controls={ariaControls}
            tabIndex={tabIndex}
            disabled={disabled}
            className={className}
        >
            {children}
        </StyledButton>
    );
};

export default Button;
