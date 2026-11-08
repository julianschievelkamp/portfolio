import Text from "elements/components/Text/Text";
import {
    CloseTrigger,
    ScrollContainer,
    SidebarFooter,
    MainTitle,
    StyledSidebar,
} from "./Sidebar.styles";
import { languageData } from "data/languageData";
import { colors } from "styles/variables";
import Navigation from "elements/layout/Navigation/Navigation";
import { useStore } from "hooks/useStore";
import { useSidebarControls } from "hooks/useSidebarControls";
import { Page } from "data/navigationData";

import Div from "elements/components/Div/Div";
import Link from "elements/components/Link/Link";

export interface SidebarProps {
    page: Page;
}

const Sidebar = ({ page }: SidebarProps) => {
    const { sidebarOpen, setSidebarOpen } = useStore();

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

                <ScrollContainer margin="1.5rem 0 0 0">
                    <Div>
                        <Text
                            fontSize="0.875rem"
                            margin="0 0 3rem 0"
                            color={colors.secondary}
                        >
                            {languageData.intro}
                        </Text>

                        <Navigation page={page} />
                    </Div>

                    <SidebarFooter>
                        <Text fontSize="0.875rem" color={colors.secondary}>
                            {languageData.copyright}
                        </Text>
                    </SidebarFooter>
                </ScrollContainer>
            </StyledSidebar>
        </>
    );
};

export default Sidebar;
