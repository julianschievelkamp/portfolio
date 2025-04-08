import { StyledMenu } from "./styles";
import { lang } from "data/lang";
import { useMenu } from "hooks/useMenu";
import { useMediaQuery } from "hooks/useMediaQuery";
import { queries } from "styles/variables";
import Div from "elements/components/div";
import { useStore } from "hooks/useStore";
import Icon from "elements/components/icon";
import Link from "elements/components/link";
import Headline from "elements/components/headline";

const Menu = () => {
    const { sidebarOpen, setSidebarOpen } = useStore();
    const { isVisible } = useMenu();

    const isMd = useMediaQuery(queries.md);

    return (
        <StyledMenu $isVisible={isVisible}>
            <Headline fontSize={isMd ? "1.5rem" : "1.25rem"}>
                <Link
                    href="#/"
                    onClick={() => setSidebarOpen(false)}
                    underline={false}
                >
                    {lang.title}
                </Link>
            </Headline>

            <Div height="100%" display="flex" alignItems="center">
                <Icon
                    size="2rem"
                    name={sidebarOpen ? "close" : "menu"}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                />
            </Div>
        </StyledMenu>
    );
};

export default Menu;
