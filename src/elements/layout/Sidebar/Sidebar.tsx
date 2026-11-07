import Text from "elements/components/Text/Text";
import {
    CloseTrigger,
    MobileSpacer,
    ScrollContainer,
    SidebarFooter,
    StyledTitle,
    StyledSidebar,
} from "./Sidebar.styles";
import { languageData } from "data/languageData";
import { colors } from "styles/variables";
import Navigation from "elements/layout/Navigation/Navigation";
import { useStore } from "hooks/useStore";
import { useSidebarEscape } from "hooks/useSidebarEscape";
import { Page } from "data/navigationData";
import { SIDEBAR_ID } from "elements/layout/Sidebar/sidebarIds";
import Div from "elements/components/Div/Div";

export interface SidebarProps {
    page: Page;
}

const Sidebar = ({ page }: SidebarProps) => {
    const { sidebarOpen, setSidebarOpen } = useStore();

    useSidebarEscape();

    return (
        <>
            <CloseTrigger
                onClick={() => setSidebarOpen(false)}
                $isActive={sidebarOpen}
            />

            <StyledSidebar id={SIDEBAR_ID} $sidebarOpen={sidebarOpen}>
                <StyledTitle>{languageData.title}</StyledTitle>

                <MobileSpacer />

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
