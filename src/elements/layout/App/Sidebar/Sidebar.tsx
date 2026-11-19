import { memo } from "react";
import Text from "elements/components/Text/Text";
import {
    Backdrop,
    ScrollContainer,
    StyledSidebar,
    Background,
    StyledMainTitle,
} from "./Sidebar.styles";
import { languageData } from "data/languageData";
import { colors, Div, Footer } from "styles/variables";
import Navigation from "elements/layout/App/Sidebar/Navigation/Navigation";
import { useStore } from "hooks/useStore";
import { useSidebarOverlay } from "hooks/useSidebarOverlay";
import type { Page } from "data/navigationData";
import { scrollToTop } from "utils/scrollToTop";
import { SCROLL_ALLOWED_ATTRIBUTE } from "styles/global";

export interface SidebarProps {
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
                <StyledMainTitle />

                <ScrollContainer {...{ [SCROLL_ALLOWED_ATTRIBUTE]: "" }}>
                    <Div>
                        <Text color={colors.secondary}>
                            {languageData.sidebar.intro}
                        </Text>

                        <Navigation page={page} />
                    </Div>

                    <Footer>
                        <Text color={colors.secondary}>
                            {languageData.sidebar.footer}
                        </Text>
                    </Footer>
                </ScrollContainer>
            </StyledSidebar>
        </>
    );
};

export default memo(Sidebar);
