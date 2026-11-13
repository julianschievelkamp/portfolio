import GlobalStyle from "styles/global";
import { Main } from "./App.styles";
import Sidebar from "elements/layout/App/Sidebar/Sidebar";
import Header from "elements/layout/App/Header/Header";
import { Page } from "data/navigationData";
import { type ReactNode } from "react";
import Headline from "elements/components/Headline/Headline";
import { useResizeTransition } from "hooks/useResizeTransition";
import { usePinchZoomLock } from "hooks/usePinchZoomLock";
import { useStore } from "hooks/useStore";
import { useMediaQuery } from "hooks/useMediaQuery";
import { queries } from "styles/variables";
import { useScrollLock } from "hooks/useScrollLock";

export interface AppProps {
    page: Page;
    children: ReactNode;
}

const App = ({ page, children }: AppProps) => {
    const isMd = useMediaQuery(queries.md);
    const sidebarOpen = useStore((state) => state.sidebarOpen);
    const popupOpen = useStore((state) => state.popupOpen);

    // Scrollen sperren, solange die Sidebar oder das Popup als mobiles Overlay geöffnet ist
    const isPageLocked = popupOpen || (!isMd && sidebarOpen);

    useScrollLock(isPageLocked);
    usePinchZoomLock();

    useResizeTransition();

    return (
        <>
            <GlobalStyle $isPageLocked={isPageLocked} />

            <Header />

            <Sidebar page={page} />

            <Main inert={isPageLocked}>
                <Headline visuallyHidden>{page.title}</Headline>

                {children}
            </Main>
        </>
    );
};

export default App;
