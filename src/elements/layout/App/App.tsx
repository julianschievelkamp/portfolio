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
    const popupOpen = useStore((state) => state.popupOpen);

    // Die Sidebar überlagert den Inhalt nur mobil, das Popup immer
    const sidebarOverlay = !isMd && sidebarOpen;

    useResizeTransition();

    return (
        <>
            <GlobalStyle $scrollLocked={sidebarOverlay || popupOpen} />

            <Menu />

            <Sidebar page={page} />

            <Main inert={sidebarOverlay}>
                <Headline visuallyHidden>{page.title}</Headline>

                {children}
            </Main>
        </>
    );
};

export default App;
