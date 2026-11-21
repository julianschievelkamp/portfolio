// Appends a trailing slash so paths can be compared and output consistently
export const ensureTrailingSlash = (path: string) =>
    path.endsWith("/") ? path : `${path}/`;
