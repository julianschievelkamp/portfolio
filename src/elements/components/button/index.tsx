import { StyledButton } from "./styles";

export interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    ariaLabel?: string;
    className?: string;
}

const Button = ({ onClick, children, ariaLabel, className }: ButtonProps) => {
    return (
        <StyledButton
            onClick={onClick}
            aria-label={ariaLabel}
            className={className}
        >
            {children}
        </StyledButton>
    );
};

export default Button;
