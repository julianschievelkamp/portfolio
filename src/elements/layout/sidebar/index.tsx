import Text from "elements/components/text";
import { ScrollContainer, StyledSidebar, StyledText } from "./styles";
import { lang } from "data/lang";
import Div from "elements/components/div";
import { useMediaQuery } from "hooks/useMediaQuery";
import { queries } from "styles/variables";
import Navigation from "elements/layout/navigation";
import { useRef } from "react";
import { useClickOutside } from "hooks/useClickOutside";
import { useStore } from "hooks/useStore";
import Icon from "elements/components/icon";

export interface SidebarProps {
    theme: string;
    toggleTheme: () => void;
}

const Sidebar = ({ theme, toggleTheme }: SidebarProps) => {
    const { sidebarOpen, setSidebarOpen } = useStore();

    const isMd = useMediaQuery(queries.md);

    const ref = useRef(null);
    useClickOutside(ref, () => setSidebarOpen(false));

    return (
        <StyledSidebar $sidebarOpen={sidebarOpen} ref={ref}>
            <StyledText type="headline" fontSize={isMd ? "1.5rem" : "1.25rem"}>
                {lang.title}
            </StyledText>

            <Text fontSize="0.875rem" margin="1rem 0 3rem 0">
                {lang.intro}
            </Text>

            <ScrollContainer>
                <Navigation />

                <Div>
                    <Div display="flex" alignItems="center">
                        <Icon
                            padding="0.5rem"
                            name="instagram"
                            onClick={() =>
                                window.open(
                                    "https://www.instagram.com/julianschievelkamp",
                                    "_blank"
                                )
                            }
                        />
                        <Icon
                            padding="0.5rem"
                            name={theme === "light" ? "dark" : "light"}
                            onClick={() => toggleTheme()}
                        />
                    </Div>

                    <Text fontSize="0.875rem" margin="0.5rem 0 0 0">
                        {lang.copyright}
                    </Text>
                </Div>
            </ScrollContainer>
        </StyledSidebar>
    );
};

export default Sidebar;
