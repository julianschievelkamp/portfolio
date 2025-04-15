import GlobalStyle from "styles/global";
import { PageContainer, StyledApp } from "./styles";
import { ThemeProvider } from "styled-components";
import { useTheme } from "hooks/useTheme";
import { darkTheme, lightTheme, queries } from "styles/variables";
import Sidebar from "elements/layout/sidebar";
import { useMediaQuery } from "hooks/useMediaQuery";
import Menu from "elements/layout/menu";
import { Page } from "data/pageData";

export interface AppProps {
    page: Page;
}

const App = ({ page }: AppProps) => {
    const { theme, set: setTheme } = useTheme();
    const isMd = useMediaQuery(queries.md);

    //if (isLoading) return <></>;

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <StyledApp>
                <GlobalStyle />

                <PageContainer id="page-container">
                    {page.element}
                </PageContainer>

                <Sidebar theme={theme} setTheme={setTheme} page={page} />

                {!isMd && <Menu />}
            </StyledApp>
        </ThemeProvider>
    );
};

export default App;
