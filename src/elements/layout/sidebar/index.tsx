import Text from "elements/components/text";
import { ScrollContainer, StyledSidebar } from "./styles";
import { lang } from "data/lang";
import Div from "elements/components/div";
import { useMediaQuery } from "hooks/useMediaQuery";
import { queries } from "styles/variables";
import Navigation from "elements/layout/navigation";

export interface SidebarProps {
    isOpen: boolean;
    toggleTheme: () => void;
    currentPageIndex: number;
    setCurrentPageIndex: (index: number) => void;
}

const Sidebar = ({
    isOpen,
    toggleTheme,
    currentPageIndex,
    setCurrentPageIndex,
}: SidebarProps) => {
    const isMd = useMediaQuery(queries.md);

    return (
        <StyledSidebar $isOpen={isOpen}>
            <Text type="headline" fontSize={isMd ? "1.5rem" : "1.25rem"}>
                {lang.title}
            </Text>

            <Text fontSize="0.875rem" margin="1rem 0 3rem 0">
                {lang.intro}
            </Text>

            <ScrollContainer>
                <Navigation
                    currentPageIndex={currentPageIndex}
                    setCurrentPageIndex={setCurrentPageIndex}
                />

                <Div>
                    <button onClick={() => toggleTheme()}>Toggle Theme</button>

                    <Text fontSize="0.875rem" margin="1rem 0 0 0">
                        {lang.copyright}
                    </Text>
                </Div>
            </ScrollContainer>
        </StyledSidebar>
    );
};

export default Sidebar;
