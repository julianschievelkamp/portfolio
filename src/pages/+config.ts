import vikeReact from "vike-react/config";
import vikeReactStyledComponents from "vike-react-styled-components/config";
import { title } from "./index/+title";
import { description } from "./index/+description";

export default {
    prerender: true,
    extends: [vikeReact, vikeReactStyledComponents],
    title: title(),
    description: description(),
    image: "https://www.julianschievelkamp.com/og-image.jpg",
    viewport: null,
};
