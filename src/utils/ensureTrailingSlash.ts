// Hängt einen abschließenden Slash an, damit Pfade einheitlich verglichen und ausgegeben werden
export const ensureTrailingSlash = (path: string) =>
    path.endsWith("/") ? path : `${path}/`;
