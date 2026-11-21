import { memo } from "react";

import Icon from "elements/components/Icon/Icon";
import { useStore } from "hooks/useStore";
import { scrollToTop } from "utils/scrollToTop";

import { HeaderTitle, SidebarToggle, StyledHeader } from "./Header.styles";

const Header = () => {
    const sidebarOpen = useStore((state) => state.sidebarOpen);
    const setSidebarOpen = useStore((state) => state.setSidebarOpen);

    return (
        <StyledHeader>
            <HeaderTitle
                $sidebarOpen={sidebarOpen}
                onClick={() => setSidebarOpen(false)}
            />

            <SidebarToggle
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
                aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                id="sidebar-toggle"
                onClick={() => {
                    scrollToTop();
                    setSidebarOpen(!sidebarOpen);
                }}
            >
                <Icon name={sidebarOpen ? "close" : "hamburger"} size="2rem" />
            </SidebarToggle>
        </StyledHeader>
    );
};

export default memo(Header);
