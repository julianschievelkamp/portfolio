import { useEffect } from "react";

type DocumentTarget = "html" | "body";

// Setzt ein leeres Attribut an <html> bzw. <body>, solange active gilt.
// Ersetzt dynamische Props am globalen Style, damit dieser nicht neu eingefügt wird.
export const useDocumentAttribute = (
    target: DocumentTarget,
    attribute: string,
    active: boolean,
) => {
    useEffect(() => {
        if (!active) return;

        const element =
            target === "html" ? document.documentElement : document.body;

        element.setAttribute(attribute, "");

        return () => element.removeAttribute(attribute);
    }, [target, attribute, active]);
};
