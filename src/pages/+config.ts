import vikeReact from "vike-react/config";
import vikeReactStyledComponents from "vike-react-styled-components/config";
import { ogImageUrl } from "../data/siteData";

export default {
    prerender: true,
    extends: [vikeReact, vikeReactStyledComponents],
    image: ogImageUrl,
    viewport: null,
};
