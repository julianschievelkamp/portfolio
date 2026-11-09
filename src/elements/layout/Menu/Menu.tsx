import { MainTitle, StyledMenu, ToggleWrapper } from "./Menu.styles";
import { languageData } from "data/languageData";
import { useMenuVisibility } from "hooks/useMenuVisibility";
import { useStore } from "hooks/useStore";
import Link from "elements/components/Link/Link";
import Button from "elements/components/Button/Button";
import Icon from "elements/components/Icon/Icon";

const Menu = () => {
    const sidebarOpen = useStore((state) => state.sidebarOpen);
    const setSidebarOpen = useStore((state) => state.setSidebarOpen);
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

            <ToggleWrapper>
                <Button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    ariaExpanded={sidebarOpen}
                    ariaLabel="Toggle Sidebar"
                    ariaControls="sidebar"
                    id="sidebar-toggle"
                >
                    <Icon name={sidebarOpen ? "close" : "menu"} size="2rem" />
                </Button>
            </ToggleWrapper>
        </StyledMenu>
    );
};

export default Menu;
