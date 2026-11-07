import Text from "elements/components/text";
import {
    CloseTrigger,
    MobileSpacer,
    ScrollContainer,
    StyledTitle,
    StyledSidebar,
} from "./styles";
import { languageData } from "data/languageData";
import { colors } from "styles/variables";
import Navigation from "elements/layout/navigation";
import { useStore } from "hooks/useStore";
import { Page } from "data/navigationData";
import Div from "elements/components/div";

export interface SidebarProps {
    page: Page;
}

const Sidebar = ({ page }: SidebarProps) => {
    const { sidebarOpen, setSidebarOpen } = useStore();

    return (
        <>
            <CloseTrigger
                onClick={() => setSidebarOpen(false)}
                $isActive={sidebarOpen}
            />

            <StyledSidebar $sidebarOpen={sidebarOpen}>
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

                    <Text
                        fontSize="0.875rem"
                        margin="0.5rem 0 0 0"
                        color={colors.secondary}
                    >
                        {languageData.copyright}
                    </Text>
                </ScrollContainer>
            </StyledSidebar>
        </>
    );
};

export default Sidebar;
