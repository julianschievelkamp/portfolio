import type { ReactNode } from "react";
import { usePageContext } from "vike-react/usePageContext";
import App from "elements/layout/App/App";
import { pages } from "data/navigationData";

// Normalisiert den Pfad auf die Schreibweise mit abschließendem Slash
const normalizePath = (path: string) => (path.endsWith("/") ? path : `${path}/`);

// Das Layout bleibt beim clientseitigen Routing bestehen, sodass die
// Sidebar nicht neu gemountet wird und ihre Schließen-Animation läuft
export const Layout = ({ children }: { children: ReactNode }) => {
    const { urlPathname } = usePageContext();
    const current = normalizePath(urlPathname);
    const page =
        Object.values(pages).find(({ path }) => path === current) ??
        pages.portfolio;

    return <App page={page}>{children}</App>;
};
