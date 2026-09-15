import GlobalStyle from "styles/global";
import { PageContainer, StyledApp } from "./styles";
import Sidebar from "elements/layout/sidebar";
import Menu from "elements/layout/menu";
import { Page } from "data/navigation";

export interface AppProps {
    page: Page;
}

const App = ({ page }: AppProps) => {
    return (
        <StyledApp>
            <GlobalStyle />

            <PageContainer id="page-container">{page.element}</PageContainer>

            <Sidebar page={page} />

            <Menu />
        </StyledApp>
    );
};

export default App;
