import { useEffect } from "react";

type DocumentTarget = "html" | "body";

// Sets an empty attribute on <html> or <body> while active holds.
// Replaces dynamic props on the global style so it is not re-inserted.
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
