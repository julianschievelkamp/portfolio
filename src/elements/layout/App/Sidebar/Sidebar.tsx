import { memo } from "react";

import { languageData } from "data/languageData";
import type { Page } from "data/navigationData";
import Text from "elements/components/Text/Text";
import Navigation from "elements/layout/App/Sidebar/Navigation/Navigation";
import { useSidebarOverlay } from "hooks/useSidebarOverlay";
import { useStore } from "hooks/useStore";
import { SCROLL_ALLOWED_ATTRIBUTE } from "styles/global";
import { colors } from "styles/variables";
import { scrollToTop } from "utils/scrollToTop";

import {
    Backdrop,
    Background,
    ScrollContainer,
    SidebarTitle,
    StyledSidebar,
} from "./Sidebar.styles";

interface SidebarProps {
    page: Page;
}

const Sidebar = ({ page }: SidebarProps) => {
    const sidebarOpen = useStore((state) => state.sidebarOpen);
    const setSidebarOpen = useStore((state) => state.setSidebarOpen);

    useSidebarOverlay();

    return (
        <>
            <Backdrop
                $sidebarOpen={sidebarOpen}
                onClick={() => {
                    scrollToTop();
                    setSidebarOpen(false);
                }}
            />

            <Background $sidebarOpen={sidebarOpen} />

            <StyledSidebar
                aria-label="Sidebar"
                id="sidebar"
                $sidebarOpen={sidebarOpen}
            >
                <SidebarTitle />

                <ScrollContainer {...{ [SCROLL_ALLOWED_ATTRIBUTE]: "" }}>
                    <div>
                        <Text color={colors.secondary}>
                            {languageData.sidebar.intro}
                        </Text>

                        <Navigation page={page} />
                    </div>

                    <footer>
                        <Text color={colors.secondary}>
                            {languageData.sidebar.footer}
                        </Text>
                    </footer>
                </ScrollContainer>
            </StyledSidebar>
        </>
    );
};

export default memo(Sidebar);
