import type { ReactNode } from "react";
import { usePageContext } from "vike-react/usePageContext";

import { pages } from "data/navigationData";
import App from "elements/layout/App/App";
import { ensureTrailingSlash } from "utils/ensureTrailingSlash";

// Layout persists across routing so the sidebar does not remount
export const Layout = ({ children }: { children: ReactNode }) => {
    const { urlPathname } = usePageContext();
    const current = ensureTrailingSlash(urlPathname);
    const page = Object.values(pages).find(({ path }) => path === current);

    // Unknown paths (e.g. error pages) get no app layout
    if (!page) {
        return <>{children}</>;
    }

    return <App page={page}>{children}</App>;
};
