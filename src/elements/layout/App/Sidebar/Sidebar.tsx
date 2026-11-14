import Text from "elements/components/Text/Text";
import {
    Backdrop,
    ScrollContainer,
    MainTitle,
    StyledSidebar,
    Background,
} from "./Sidebar.styles";
import { languageData } from "data/languageData";
import { colors, Div, Footer } from "styles/variables";
import Navigation from "elements/layout/App/Sidebar/Navigation/Navigation";
import { useStore } from "hooks/useStore";
import { useSidebarOverlay } from "hooks/useSidebarOverlay";
import { SCROLL_ALLOWED_ATTRIBUTE } from "hooks/useScrollLock";
import { Page } from "data/navigationData";
import Link from "elements/components/Link/Link";
import { scrollToTop } from "utils/scrollToTop";

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
                onClick={async () => {
                    await scrollToTop();
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
                <MainTitle>
                    <Link
                        href="/"
                        onClick={() => setSidebarOpen(false)}
                        underline={false}
                    >
                        {languageData.title}
                    </Link>
                </MainTitle>

                <ScrollContainer {...{ [SCROLL_ALLOWED_ATTRIBUTE]: "" }}>
                    <Div>
                        <Text fontSize="0.875rem" color={colors.secondary}>
                            {languageData.intro}
                        </Text>

                        <Navigation page={page} />
                    </Div>

                    <Footer>
                        <Text fontSize="0.875rem" color={colors.secondary}>
                            {languageData.copyright}
                        </Text>
                    </Footer>
                </ScrollContainer>
            </StyledSidebar>
        </>
    );
};

export default Sidebar;
