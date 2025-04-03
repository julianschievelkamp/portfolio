import GlobalStyle from "styles/global";
import { PageContainer, StyledApp } from "./styles";
import { ThemeProvider } from "styled-components";
import { useTheme } from "hooks/useTheme";
import { darkTheme, lightTheme, queries } from "styles/variables";
import Sidebar from "elements/layout/sidebar";
import Dashboard from "elements/layout/dashboard";
import { useMediaQuery } from "hooks/useMediaQuery";
import Menu from "elements/layout/menu";
import { useState } from "react";

const App = () => {
    const { theme, toggleTheme, isLoading } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const isMd = useMediaQuery(queries.md);

    if (isLoading) return <></>;

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <StyledApp>
                <GlobalStyle />

                {!isMd && (
                    <Menu
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />
                )}

                <Sidebar isOpen={sidebarOpen} toggleTheme={toggleTheme} />

                <PageContainer>
                    <Dashboard />
                </PageContainer>
            </StyledApp>
        </ThemeProvider>
    );
};

export default App;
