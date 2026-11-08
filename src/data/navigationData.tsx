import { title as titleImpressum } from "pages/impressum/+title";
import { title as titleAbout } from "pages/about/+title";
import { title as titleIndex } from "pages/index/+title";

export type Page = {
    name: string;
    heading: string;
    path: string;
};

export const pages: { [key: string]: Page } = {
    portfolio: {
        name: "Portfolio",
        heading: titleIndex(),
        path: "/",
    },
    about: {
        name: "About",
        heading: titleAbout(),
        path: "/about/",
    },
    impressum: {
        name: "Impressum",
        heading: titleImpressum(),
        path: "/impressum/",
    },
};

type Link = {
    name: string;
    path: string;
};

export const links: { [key: string]: Link } = {
    instagram: {
        name: "Instagram",
        path: "https://www.instagram.com/julianschievelkamp/",
    },
    vogue: {
        name: "PhotoVogue",
        path: "https://www.vogue.com/photovogue/photographers/71498",
    },
};
