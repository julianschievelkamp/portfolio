import GlobalStyle from "styles/global";
import { PageContainer, StyledApp } from "./styles";
import Sidebar from "elements/layout/sidebar";
import Menu from "elements/layout/menu";
import { Page } from "data/navigation";
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

            <PageContainer id="page-container">{page.element}</PageContainer>

            <Sidebar page={page} />

            <Menu />
        </StyledApp>
    );
};

export default App;
