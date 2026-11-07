import { StyledTitle, StyledMenu } from "./Menu.styles";
import { languageData } from "data/languageData";
import { useMenu } from "hooks/useMenu";
import Div from "elements/components/Div/Div";
import { useStore } from "hooks/useStore";
import Link from "elements/components/Link/Link";
import Button from "elements/components/Button/Button";
import Icon from "elements/components/Icon/Icon";

const Menu = () => {
    const { sidebarOpen, setSidebarOpen } = useStore();
    const { isVisible } = useMenu();

    return (
        <StyledMenu $isVisible={isVisible}>
            <StyledTitle>
                <Link
                    href="/"
                    onClick={() => setSidebarOpen(false)}
                    underline={false}
                >
                    {languageData.title}
                </Link>
            </StyledTitle>

            <Div
                height="100%"
                display="flex"
                alignItems="center"
                margin="0 0 0 2rem"
            >
                <Button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    ariaLabel="Toggle Sidebar"
                >
                    <Icon name={sidebarOpen ? "close" : "menu"} size="2rem" />
                </Button>
            </Div>
        </StyledMenu>
    );
};

export default Menu;
