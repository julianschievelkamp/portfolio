import { MainTitle, StyledMenu } from "./Menu.styles";
import { languageData } from "data/languageData";
import { useMenuVisibility } from "hooks/useMenuVisibility";
import Div from "elements/components/Div/Div";
import { useStore } from "hooks/useStore";
import Link from "elements/components/Link/Link";
import Button from "elements/components/Button/Button";
import Icon from "elements/components/Icon/Icon";

const Menu = () => {
    const { sidebarOpen, setSidebarOpen } = useStore();
    const { isVisible } = useMenuVisibility();

    return (
        <StyledMenu $isVisible={isVisible}>
            <MainTitle>
                <Link
                    href="/"
                    onClick={() => setSidebarOpen(false)}
                    underline={false}
                >
                    {languageData.title}
                </Link>
            </MainTitle>

            <Div
                height="100%"
                display="flex"
                alignItems="center"
                margin="0 0 0 2rem"
            >
                <Button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    ariaExpanded={sidebarOpen}
                    ariaLabel="Toggle Sidebar"
                    ariaControls="sidebar"
                    id="sidebar-toggle"
                >
                    <Icon name={sidebarOpen ? "close" : "menu"} size="2rem" />
                </Button>
            </Div>
        </StyledMenu>
    );
};

export default Menu;
