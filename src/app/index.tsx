import GlobalStyle from "styles/global";
import { PageContainer, StyledApp } from "./styles";
import { ThemeProvider } from "styled-components";
import { useTheme } from "hooks/useTheme";
import { darkTheme, lightTheme, queries } from "styles/variables";
import Sidebar from "elements/layout/sidebar";
import { useMediaQuery } from "hooks/useMediaQuery";
import Menu from "elements/layout/menu";
import Popup from "elements/layout/popup";
import { HashRouter, Routes, Route } from "react-router";
import { pageData } from "data/pageData";

const App = () => {
    const { theme, toggleTheme, isLoading } = useTheme();
    const isMd = useMediaQuery(queries.md);

    if (isLoading) return <></>;

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <StyledApp>
                <GlobalStyle />

                <HashRouter>
                    <PageContainer id="page-container">
                        <Routes>
                            {pageData.map((page) => {
                                return (
                                    <Route
                                        path={page.path}
                                        element={page.element}
                                    />
                                );
                            })}
                        </Routes>
                    </PageContainer>

                    <Sidebar theme={theme} toggleTheme={toggleTheme} />
                </HashRouter>

                {!isMd && <Menu />}

                <Popup />
            </StyledApp>
        </ThemeProvider>
    );
};

export default App;
