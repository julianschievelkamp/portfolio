import { memo } from "react";
import { SidebarToggle, StyledHeader, StyledMainTitle } from "./Header.styles";
import { useStore } from "hooks/useStore";
import { scrollToTop } from "utils/scrollToTop";
import Icon from "elements/components/Icon/Icon";

const Header = () => {
    const sidebarOpen = useStore((state) => state.sidebarOpen);
    const setSidebarOpen = useStore((state) => state.setSidebarOpen);

    return (
        <StyledHeader>
            <StyledMainTitle
                $sidebarOpen={sidebarOpen}
                onClick={() => setSidebarOpen(false)}
            />

            <SidebarToggle
                onClick={() => {
                    scrollToTop();
                    setSidebarOpen(!sidebarOpen);
                }}
                aria-expanded={sidebarOpen}
                aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                aria-controls="sidebar"
                id="sidebar-toggle"
            >
                <Icon name={sidebarOpen ? "close" : "hamburger"} size="2rem" />
            </SidebarToggle>
        </StyledHeader>
    );
};

export default memo(Header);
