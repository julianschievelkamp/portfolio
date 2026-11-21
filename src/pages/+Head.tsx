import { usePageContext } from "vike-react/usePageContext";

import { languageData } from "data/languageData";
import { siteName, siteUrl } from "data/siteData";
import { ensureTrailingSlash } from "utils/ensureTrailingSlash";
import {
    getStructuredData,
    serializeStructuredData,
} from "utils/structuredData";

export const Head = () => {
    const { urlPathname } = usePageContext();
    const canonicalUrl = `${siteUrl}${ensureTrailingSlash(urlPathname)}`;
    const structuredData = getStructuredData(
        urlPathname,
        languageData.about.artist.image.src,
    );

    return (
        <>
            <link href="/favicon.png" rel="icon" type="image/png" />
            <link
                href="/apple-touch-icon.png"
                rel="apple-touch-icon"
                sizes="180x180"
            ></link>
            <link href={canonicalUrl} rel="canonical" />
            <meta
                content="width=device-width,initial-scale=1"
                name="viewport"
            />
            <meta content="website" property="og:type" />
            <meta content={canonicalUrl} property="og:url" />
            <meta content={siteName} property="og:site_name" />
            <meta content="en_US" property="og:locale" />
            <meta content="1200" property="og:image:width" />
            <meta content="628" property="og:image:height" />
            <meta
                content="Artwork by Julian Schievelkamp"
                property="og:image:alt"
            />
            {structuredData && (
                <script
                    dangerouslySetInnerHTML={{
                        __html: serializeStructuredData(structuredData),
                    }}
                    type="application/ld+json"
                />
            )}
        </>
    );
};
