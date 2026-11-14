import { MainTitle, StyledHeader, ToggleWrapper } from "./Header.styles";
import { languageData } from "data/languageData";
import { useStore } from "hooks/useStore";
import Link from "elements/components/Link/Link";
import Button from "elements/components/Button/Button";
import Icon from "elements/components/Icon/Icon";

const Header = () => {
    const sidebarOpen = useStore((state) => state.sidebarOpen);
    const setSidebarOpen = useStore((state) => state.setSidebarOpen);

    return (
        <StyledHeader>
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
                    ariaLabel={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
                    ariaControls="sidebar"
                    id="sidebar-toggle"
                >
                    <Icon
                        name={sidebarOpen ? "close" : "hamburger"}
                        size="2rem"
                    />
                </Button>
            </ToggleWrapper>
        </StyledHeader>
    );
};

export default Header;
