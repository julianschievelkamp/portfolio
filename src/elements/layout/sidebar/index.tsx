import Text from "elements/components/text";
import { ScrollContainer, StyledIcon, StyledSidebar } from "./styles";
import { lang } from "data/lang";
import Div from "elements/components/div";
import { useMediaQuery } from "hooks/useMediaQuery";
import { queries } from "styles/variables";
import Navigation from "elements/layout/navigation";
import { useRef } from "react";
import { useClickOutside } from "hooks/useClickOutside";

export interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    theme: string;
    toggleTheme: () => void;
    currentPageIndex: number;
    setCurrentPageIndex: (index: number) => void;
}

const Sidebar = ({
    sidebarOpen,
    setSidebarOpen,
    theme,
    toggleTheme,
    currentPageIndex,
    setCurrentPageIndex,
}: SidebarProps) => {
    const isMd = useMediaQuery(queries.md);

    const ref = useRef(null);
    useClickOutside(ref, () => setSidebarOpen(false));

    return (
        <StyledSidebar $sidebarOpen={sidebarOpen} ref={ref}>
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
                    <StyledIcon
                        size="1.5rem"
                        name={theme === "light" ? "dark" : "light"}
                        onClick={() => toggleTheme()}
                    />

                    <Text fontSize="0.875rem" margin="1rem 0 0 0">
                        {lang.copyright}
                    </Text>
                </Div>
            </ScrollContainer>
        </StyledSidebar>
    );
};

export default Sidebar;
