import GlobalStyle, {
    PAGE_LOCKED_ATTRIBUTE,
    ZOOMED_ATTRIBUTE,
} from "styles/global";
import { useDocumentAttribute } from "hooks/useDocumentAttribute";
import { Main } from "./App.styles";
import Sidebar from "elements/layout/App/Sidebar/Sidebar";
import Header from "elements/layout/App/Header/Header";
import type { Page } from "data/navigationData";
import type { ReactNode } from "react";
import Headline from "elements/components/Headline/Headline";
import { useResizeTransition } from "hooks/useResizeTransition";
import { useStore } from "hooks/useStore";
import { useMediaQuery } from "hooks/useMediaQuery";
import { queries } from "styles/variables";
import { useScrollLock } from "hooks/useScrollLock";
import { useVisualViewport } from "hooks/useVisualViewport";

export interface AppProps {
    page: Page;
    children: ReactNode;
}

const App = ({ page, children }: AppProps) => {
    const isMd = useMediaQuery(queries.md);
    const sidebarOpen = useStore((state) => state.sidebarOpen);
    const popupOpen = useStore((state) => state.popupOpen);

    const isZoomed = useVisualViewport();
    const isPageLocked = popupOpen || (!isMd && sidebarOpen);

    useScrollLock(isPageLocked && !isZoomed);

    useDocumentAttribute("html", ZOOMED_ATTRIBUTE, isZoomed);
    useDocumentAttribute("body", PAGE_LOCKED_ATTRIBUTE, isPageLocked);

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
