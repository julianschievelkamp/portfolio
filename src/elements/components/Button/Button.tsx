import { StyledButton } from "./Button.styles";

export interface ButtonProps {
    onClick: () => void;
    onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
    ariaLabel?: string;
    ariaExpanded?: boolean;
    ariaControls?: string;
    ariaCurrent?: boolean;
    className?: string;
    id?: string;
}

const Button = ({
    onClick,
    onFocus,
    children,
    ariaLabel,
    ariaExpanded,
    ariaControls,
    ariaCurrent,
    className,
    id,
}: ButtonProps) => {
    return (
        <StyledButton
            onClick={onClick}
            onFocus={onFocus}
            id={id}
            aria-label={ariaLabel}
            aria-expanded={ariaExpanded}
            aria-controls={ariaControls}
            aria-current={ariaCurrent}
            className={className}
        >
            {children}
        </StyledButton>
    );
};

export default Button;
