import vikeReact from "vike-react/config";
import vikeReactStyledComponents from "vike-react-styled-components/config";

export default {
    prerender: true,
    extends: [vikeReact, vikeReactStyledComponents],
    // Standardwerte für die Startseite; Unterseiten überschreiben sie per +title.ts und +description.ts
    title: "Julian Schievelkamp – Fine Art Photographer & Visual Artist",
    description:
        "Fine art photography and digital artworks by Julian Schievelkamp, a visual artist from Cologne combining classic photography and CGI.",
    image: "https://www.julianschievelkamp.com/og-image.jpg",
    viewport: null,
};
