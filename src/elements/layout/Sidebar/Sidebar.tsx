import Text from "elements/components/Text/Text";
import {
    CloseTrigger,
    ScrollContainer,
    MainTitle,
    StyledSidebar,
} from "./Sidebar.styles";
import { languageData } from "data/languageData";
import { colors, Div, Footer } from "styles/variables";
import Navigation from "elements/layout/Navigation/Navigation";
import { useStore } from "hooks/useStore";
import { useSidebarControls } from "hooks/useSidebarControls";
import { Page } from "data/navigationData";

import Link from "elements/components/Link/Link";

export interface SidebarProps {
    page: Page;
}

const Sidebar = ({ page }: SidebarProps) => {
    const sidebarOpen = useStore((state) => state.sidebarOpen);
    const setSidebarOpen = useStore((state) => state.setSidebarOpen);

    useSidebarControls();

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
