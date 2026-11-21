import { languageData } from "data/languageData";
import Link from "elements/components/Link/Link";

import { StyledTitle } from "./Title.styles";

interface TitleProps {
    className?: string;
    onClick?: () => void;
}

const Title = ({ className, onClick }: TitleProps) => (
    <StyledTitle className={className}>
        <Link href="/" underline={false} onClick={onClick}>
            {languageData.title}
        </Link>
    </StyledTitle>
);

export default Title;
