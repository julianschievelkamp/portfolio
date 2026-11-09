import GlobalStyle from "styles/global";
import { PageContainer, StyledApp } from "./App.styles";
import Sidebar from "elements/layout/Sidebar/Sidebar";
import Menu from "elements/layout/Menu/Menu";
import { Page } from "data/navigationData";
import { useEffect, type ReactNode } from "react";
import Headline from "elements/components/Headline/Headline";
import { useResizeTransition } from "hooks/useResizeTransition";
import { useStore } from "hooks/useStore";
import { useMediaQuery } from "hooks/useMediaQuery";
import { queries } from "styles/variables";

export interface AppProps {
    page: Page;
    children: ReactNode;
}

const App = ({ page, children }: AppProps) => {
    const isMd = useMediaQuery(queries.md);
    const sidebarOpen = useStore((state) => state.sidebarOpen);

    useResizeTransition();

    // Scrollposition des Seitencontainers beim Seitenwechsel zurücksetzen
    useEffect(() => {
        const container = document.getElementById("page-container");

        if (container) {
            container.scrollTop = 0;
        }
    }, [page.path]);

    return (
        <StyledApp>
            <GlobalStyle />

            <Menu />

            <Sidebar page={page} />

            <PageContainer id="page-container" inert={!isMd && sidebarOpen}>
                <Headline visuallyHidden>{page.title}</Headline>

                {children}
            </PageContainer>
        </StyledApp>
    );
};

export default App;
