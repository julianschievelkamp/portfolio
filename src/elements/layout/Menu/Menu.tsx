import { StyledTitle, StyledMenu } from "./Menu.styles";
import { languageData } from "data/languageData";
import { useMenu } from "hooks/useMenu";
import Div from "elements/components/Div/Div";
import { useStore } from "hooks/useStore";
import Link from "elements/components/Link/Link";
import Button from "elements/components/Button/Button";
import Icon from "elements/components/Icon/Icon";
import { SIDEBAR_ID, SIDEBAR_TOGGLE_ID } from "elements/layout/Sidebar/sidebarIds";

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
                    id={SIDEBAR_TOGGLE_ID}
                    ariaLabel="Toggle Sidebar"
                    ariaExpanded={sidebarOpen}
                    ariaControls={SIDEBAR_ID}
                >
                    <Icon name={sidebarOpen ? "close" : "menu"} size="2rem" />
                </Button>
            </Div>
        </StyledMenu>
    );
};

export default Menu;
