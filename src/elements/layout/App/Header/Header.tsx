import { MainTitle, SidebarToggle, StyledHeader } from "./Header.styles";
import { languageData } from "data/languageData";
import { useStore } from "hooks/useStore";
import { scrollToTop } from "utils/scrollToTop";
import Link from "elements/components/Link/Link";
import Icon from "elements/components/Icon/Icon";

const Header = () => {
    const sidebarOpen = useStore((state) => state.sidebarOpen);
    const setSidebarOpen = useStore((state) => state.setSidebarOpen);

    return (
        <StyledHeader>
            <MainTitle $sidebarOpen={sidebarOpen}>
                <Link
                    href="/"
                    onClick={() => setSidebarOpen(false)}
                    underline={false}
                >
                    {languageData.title}
                </Link>
            </MainTitle>

            <SidebarToggle
                onClick={async () => {
                    await scrollToTop();
                    setSidebarOpen(!sidebarOpen);
                }}
                ariaExpanded={sidebarOpen}
                ariaLabel={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
                ariaControls="sidebar"
                id="sidebar-toggle"
            >
                <Icon name={sidebarOpen ? "close" : "hamburger"} size="2rem" />
            </SidebarToggle>
        </StyledHeader>
    );
};

export default Header;
