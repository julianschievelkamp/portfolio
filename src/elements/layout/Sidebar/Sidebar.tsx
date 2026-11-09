import Text from "elements/components/Text/Text";
import {
    CloseTrigger,
    ScrollContainer,
    MainTitle,
    StyledSidebar,
} from "./Sidebar.styles";
import { languageData } from "data/languageData";
import {
    colors,
    Div,
    Footer,
    queries,
    scrollOffsets,
} from "styles/variables";
import Navigation from "elements/layout/Navigation/Navigation";
import { useStore } from "hooks/useStore";
import { useSidebarControls } from "hooks/useSidebarControls";
import { useScrollOffset } from "hooks/useScrollOffset";
import { Page } from "data/navigationData";

import Link from "elements/components/Link/Link";
import { useMediaQuery } from "hooks/useMediaQuery";
import { useEffect } from "react";

export interface SidebarProps {
    page: Page;
}

const Sidebar = ({ page }: SidebarProps) => {
    const sidebarOpen = useStore((state) => state.sidebarOpen);
    const setSidebarOpen = useStore((state) => state.setSidebarOpen);
    const isMd = useMediaQuery(queries.md);

    // Bei jedem Wechsel zwischen Mobile- und Desktop-Layout schließen
    useEffect(() => {
        setSidebarOpen(false);
    }, [isMd, setSidebarOpen]);

    useSidebarControls();
    useScrollOffset(sidebarOpen, scrollOffsets.sidebar);

    return (
        <>
            <CloseTrigger
                onClick={() => setSidebarOpen(false)}
                $isActive={sidebarOpen}
            />

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

                <ScrollContainer>
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
