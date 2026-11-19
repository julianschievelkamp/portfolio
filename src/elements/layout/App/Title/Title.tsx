import Link from "elements/components/Link/Link";
import { languageData } from "data/languageData";
import { StyledTitle } from "./Title.styles";

export interface TitleProps {
    onClick?: () => void;
    className?: string;
}

const Title = ({ onClick, className }: TitleProps) => {
    return (
        <StyledTitle className={className}>
            <Link href="/" onClick={onClick} underline={false}>
                {languageData.title}
            </Link>
        </StyledTitle>
    );
};

export default Title;
