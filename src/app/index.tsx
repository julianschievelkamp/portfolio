import GlobalStyle from "styles/global";
import { PageContainer, StyledApp } from "./styles";
import { ThemeProvider } from "styled-components";
import { useTheme } from "hooks/useTheme";
import { darkTheme, lightTheme, queries } from "styles/variables";
import Sidebar from "elements/layout/sidebar";
import { useMediaQuery } from "hooks/useMediaQuery";
import Menu from "elements/layout/menu";
import { pageData } from "data/pageData";
import Popup from "elements/layout/popup";
import { useStore } from "hooks/useStore";

const App = () => {
    const { theme, toggleTheme, isLoading } = useTheme();
    const isMd = useMediaQuery(queries.md);

    const { currentPageIndex } = useStore();

    if (isLoading) return <></>;

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <StyledApp>
                <GlobalStyle />

                <PageContainer id="page-container">
                    {pageData[currentPageIndex].content}
                </PageContainer>

                <Sidebar theme={theme} toggleTheme={toggleTheme} />

                {!isMd && <Menu />}

                <Popup />
            </StyledApp>
        </ThemeProvider>
    );
};

export default App;
