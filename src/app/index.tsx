import GlobalStyle from "styles/global";
import { PageContainer, StyledApp } from "./styles";
import { ThemeProvider } from "styled-components";
import { useTheme } from "hooks/useTheme";
import { darkTheme, lightTheme, queries } from "styles/variables";
import Sidebar from "elements/layout/sidebar";
import { useMediaQuery } from "hooks/useMediaQuery";
import Menu from "elements/layout/menu";
import { useState } from "react";
import { pageData } from "data/pageData";

const App = () => {
    const { theme, toggleTheme, isLoading } = useTheme();
    const isMd = useMediaQuery(queries.md);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    if (isLoading) return <></>;

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <StyledApp>
                <GlobalStyle />

                <PageContainer id="page-container">
                    {pageData[currentPageIndex].content}
                </PageContainer>

                {!isMd && (
                    <Menu
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />
                )}

                <Sidebar
                    sidebarOpen={sidebarOpen}
                    theme={theme}
                    toggleTheme={toggleTheme}
                    currentPageIndex={currentPageIndex}
                    setCurrentPageIndex={setCurrentPageIndex}
                />
            </StyledApp>
        </ThemeProvider>
    );
};

export default App;
