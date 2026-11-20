import { links, pages } from "data/navigationData";
import { siteName, siteUrl } from "data/siteData";
import { ensureTrailingSlash } from "utils/ensureTrailingSlash";

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

// Relative Asset-Pfade werden absolut gemacht, Data-URIs und fremde URLs bleiben unberührt
const toAbsoluteUrl = (url: string) =>
    url.startsWith("/") ? `${siteUrl}${url}` : url;

const getPerson = (imageUrl?: string) => ({
    "@type": "Person",
    "@id": personId,
    name: siteName,
    url: `${siteUrl}/`,
    jobTitle: "Fine Art Photographer & Visual Artist",
    description: pages.about.description,
    sameAs: Object.values(links).map(({ path }) => path),
    address: {
        "@type": "PostalAddress",
        addressLocality: "Cologne",
        addressCountry: "DE",
    },
    ...(imageUrl && { image: toAbsoluteUrl(imageUrl) }),
});

const getWebSite = () => ({
    "@type": "WebSite",
    "@id": websiteId,
    url: `${siteUrl}/`,
    name: siteName,
    description: pages.portfolio.description,
    inLanguage: "en",
    publisher: { "@id": personId },
});

// Liefert die JSON-LD-Daten für den Pfad oder null, wenn die Seite keine benötigt (z. B. Impressum)
export const getStructuredData = (pathname: string, portraitUrl?: string) => {
    const path = ensureTrailingSlash(pathname);

    if (path === pages.portfolio.path) {
        return {
            "@context": "https://schema.org",
            "@graph": [getWebSite(), getPerson()],
        };
    }

    if (path === pages.about.path) {
        return { "@context": "https://schema.org", ...getPerson(portraitUrl) };
    }

    return null;
};

// "<" wird maskiert, damit der Inhalt das umgebende script-Element nicht vorzeitig schließen kann
export const serializeStructuredData = (
    data: NonNullable<ReturnType<typeof getStructuredData>>,
) => JSON.stringify(data).replace(/</g, "\\u003c");
