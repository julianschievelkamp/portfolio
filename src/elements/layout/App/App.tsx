import GlobalStyle from "styles/global";
import { Main } from "./App.styles";
import Sidebar from "elements/layout/Sidebar/Sidebar";
import Menu from "elements/layout/Menu/Menu";
import { Page } from "data/navigationData";
import { type ReactNode } from "react";
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

    return (
        <>
            <GlobalStyle />

            <Menu />

            <Sidebar page={page} />

            <Main inert={!isMd && sidebarOpen}>
                <Headline visuallyHidden>{page.title}</Headline>

                {children}
            </Main>
        </>
    );
};

export default App;
