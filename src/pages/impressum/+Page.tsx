import App from "app";
import { pageData } from "data/pageData";
import { useConfig } from "vike-react/useConfig";

export const Page = () => {
    const config = useConfig();

    config({
        title: "Impressum - Julian Schievelkamp",
        Head: (
            <>
                <meta
                    name="description"
                    content="Visual artist based in Cologne. Using both photographical and digital techniques, his work emphasizes on the synergies of photography and CGI."
                />
                <meta
                    name="image"
                    property="og:image"
                    content="https://www.julianschievelkamp.com/og-image.jpg"
                />
                <meta
                    name="viewport"
                    content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
            </>
        ),
    });

    return <App page={pageData.impressum} />;
};
