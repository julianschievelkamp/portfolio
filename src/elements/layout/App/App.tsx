import GlobalStyle from "styles/global";
import { PageContainer, PageHeading, StyledApp } from "./App.styles";
import Sidebar from "elements/layout/Sidebar/Sidebar";
import Menu from "elements/layout/Menu/Menu";
import { Page } from "data/navigationData";
import { useEffect } from "react";

export interface AppProps {
    page: Page;
}

const App = ({ page }: AppProps) => {
    useEffect(() => {
        let resizeTimer: ReturnType<typeof setTimeout>;

        const handleResize = () => {
            if (!document.body.classList.contains("no-transition")) {
                document.body.classList.add("no-transition");
            }

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {
                document.body.classList.remove("no-transition");
            }, 400);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <StyledApp>
            <GlobalStyle />

            <Menu />

            <Sidebar page={page} />

            <PageContainer id="page-container">
                <PageHeading>{page.heading}</PageHeading>

                {page.element}
            </PageContainer>
        </StyledApp>
    );
};

export default App;
