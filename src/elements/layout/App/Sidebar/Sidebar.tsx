import { memo } from "react";
import Text from "elements/components/Text/Text";
import {
    Backdrop,
    ScrollContainer,
    StyledSidebar,
    Background,
    SidebarTitle,
} from "./Sidebar.styles";
import { languageData } from "data/languageData";
import { colors } from "styles/variables";
import Navigation from "elements/layout/App/Sidebar/Navigation/Navigation";
import { useStore } from "hooks/useStore";
import { useSidebarOverlay } from "hooks/useSidebarOverlay";
import type { Page } from "data/navigationData";
import { scrollToTop } from "utils/scrollToTop";
import { SCROLL_ALLOWED_ATTRIBUTE } from "styles/global";

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
                onClick={() => {
                    scrollToTop();
                    setSidebarOpen(false);
                }}
                $sidebarOpen={sidebarOpen}
            />

            <Background $sidebarOpen={sidebarOpen} />

            <StyledSidebar
                id="sidebar"
                aria-label="Sidebar"
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
