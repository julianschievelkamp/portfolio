import Link from "elements/components/Link/Link";
import { languageData } from "data/languageData";
import { StyledMainTitle } from "./MainTitle.styles";

export interface MainTitleProps {
    onClick?: () => void;
    className?: string;
}

const MainTitle = ({ onClick, className }: MainTitleProps) => {
    return (
        <StyledMainTitle className={className}>
            <Link href="/" onClick={onClick} underline={false}>
                {languageData.title}
            </Link>
        </StyledMainTitle>
    );
};

export default MainTitle;
