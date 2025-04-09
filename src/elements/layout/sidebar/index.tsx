import Text from "elements/components/text";
import {
    CloseTrigger,
    ScrollContainer,
    StyledHeadline,
    StyledSidebar,
} from "./styles";
import { lang } from "data/lang";
import Div from "elements/components/div";
import { useMediaQuery } from "hooks/useMediaQuery";
import { queries } from "styles/variables";
import Navigation from "elements/layout/navigation";
import { useStore } from "hooks/useStore";
import Button from "elements/components/button";

export interface SidebarProps {
    theme: string;
    toggleTheme: () => void;
}

const Sidebar = ({ theme, toggleTheme }: SidebarProps) => {
    const { sidebarOpen, setSidebarOpen } = useStore();
    const isMd = useMediaQuery(queries.md);

    return (
        <>
            {!isMd && sidebarOpen && (
                <CloseTrigger onClick={() => setSidebarOpen(false)} />
            )}
            <StyledSidebar $sidebarOpen={sidebarOpen}>
                <StyledHeadline fontSize={isMd ? "1.5rem" : "1.25rem"}>
                    {lang.title}
                </StyledHeadline>

                <Text fontSize="0.875rem" margin="1.5rem 0 3rem 0">
                    {lang.intro}
                </Text>

                <ScrollContainer>
                    <Navigation />

                    <Div>
                        <Div display="flex" alignItems="center">
                            <Button
                                padding="0.5rem"
                                iconName="instagram"
                                onClick={() =>
                                    window.open(
                                        "https://www.instagram.com/julianschievelkamp",
                                        "_blank"
                                    )
                                }
                            />
                            <Button
                                padding="0.5rem"
                                iconName={theme === "light" ? "dark" : "light"}
                                onClick={() => toggleTheme()}
                            />
                        </Div>

                        <Text fontSize="0.875rem" margin="0.5rem 0 0 0">
                            {lang.copyright}
                        </Text>
                    </Div>
                </ScrollContainer>
            </StyledSidebar>
        </>
    );
};

export default Sidebar;
