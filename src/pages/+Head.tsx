import { usePageContext } from "vike-react/usePageContext";
import { ensureTrailingSlash } from "utils/ensureTrailingSlash";
import { siteName, siteUrl } from "data/siteData";
import { languageData } from "data/languageData";
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
            <link rel="icon" type="image/png" href="/favicon.png" />
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png"
            ></link>
            <link rel="canonical" href={canonicalUrl} />
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1"
            />
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
            {structuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: serializeStructuredData(structuredData),
                    }}
                />
            )}
        </>
    );
};
