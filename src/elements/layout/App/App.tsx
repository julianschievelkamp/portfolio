import type { ReactNode } from "react";

import type { Page } from "data/navigationData";
import Headline from "elements/components/Headline/Headline";
import Header from "elements/layout/App/Header/Header";
import Sidebar from "elements/layout/App/Sidebar/Sidebar";
import { useDocumentAttribute } from "hooks/useDocumentAttribute";
import { useMediaQuery } from "hooks/useMediaQuery";
import { useResizeTransition } from "hooks/useResizeTransition";
import { useScrollLock } from "hooks/useScrollLock";
import { useStore } from "hooks/useStore";
import { useVisualViewport } from "hooks/useVisualViewport";
import GlobalStyle, {
    PAGE_LOCKED_ATTRIBUTE,
    ZOOMED_ATTRIBUTE,
} from "styles/global";
import { queries } from "styles/variables";

import { Main } from "./App.styles";

interface AppProps {
    children: ReactNode;
    page: Page;
}

const App = ({ children, page }: AppProps) => {
    const isMd = useMediaQuery(queries.md);
    const sidebarOpen = useStore((state) => state.sidebarOpen);
    const popupOpen = useStore((state) => state.popupOpen);

    const isZoomed = useVisualViewport();
    const isPageLocked = popupOpen || (!isMd && sidebarOpen);

    useScrollLock(isPageLocked && !isZoomed);

    useDocumentAttribute("html", ZOOMED_ATTRIBUTE, isZoomed);
    useDocumentAttribute("html", PAGE_LOCKED_ATTRIBUTE, isPageLocked);

    useResizeTransition();

    return (
        <>
            <GlobalStyle />

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
