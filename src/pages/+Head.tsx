import { usePageContext } from "vike-react/usePageContext";

const siteUrl = "https://www.julianschievelkamp.com";
const siteName = "Julian Schievelkamp";

// Einheitliche URL mit abschließendem Slash, wie sie GitHub Pages ausliefert
const getCanonicalUrl = (urlPathname: string) => {
    const path = urlPathname.endsWith("/") ? urlPathname : `${urlPathname}/`;

    return `${siteUrl}${path}`;
};

export const Head = () => {
    const { urlPathname } = usePageContext();
    const canonicalUrl = getCanonicalUrl(urlPathname);

    return (
        <>
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <link rel="icon" type="image/png" href="/favicon.png" />
            <link rel="canonical" href={canonicalUrl} />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="628" />
            <meta
                property="og:image:alt"
                content="Artwork by Julian Schievelkamp"
            />
        </>
    );
};
