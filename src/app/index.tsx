import GlobalStyle from "styles/global";
import { PageContainer, StyledApp } from "./styles";
import { ThemeProvider } from "styled-components";
import { useTheme } from "hooks/useTheme";
import { darkTheme, lightTheme } from "styles/variables";
import Sidebar from "elements/layout/sidebar";
import Menu from "elements/layout/menu";
import { Page } from "data/pageData";

export interface AppProps {
    page: Page;
}

const App = ({ page }: AppProps) => {
    const { theme, set: setTheme } = useTheme();

    //if (isLoading) return <></>;

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <StyledApp>
                <GlobalStyle />

                <PageContainer id="page-container">
                    {page.element}
                </PageContainer>

                <Sidebar theme={theme} setTheme={setTheme} page={page} />

                <Menu />
            </StyledApp>
        </ThemeProvider>
    );
};

export default App;
