import type { ReactNode } from "react";
import { usePageContext } from "vike-react/usePageContext";
import App from "elements/layout/App/App";
import { pages } from "data/navigationData";

const normalizePath = (path: string) => (path.endsWith("/") ? path : `${path}/`);

// Layout bleibt beim Routing bestehen, damit die Sidebar nicht neu mountet
export const Layout = ({ children }: { children: ReactNode }) => {
    const { urlPathname } = usePageContext();
    const current = normalizePath(urlPathname);
    const page = Object.values(pages).find(({ path }) => path === current);

    // Unbekannte Pfade (z. B. Fehlerseiten) erhalten kein App-Layout
    if (!page) {
        return <>{children}</>;
    }

    return <App page={page}>{children}</App>;
};
