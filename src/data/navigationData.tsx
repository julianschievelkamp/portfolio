import Julian from "elements/pages/Julian/Julian";
import Impressum from "elements/pages/Impressum/Impressum";
import Portfolio from "elements/pages/Portfolio/Portfolio";

export type Page = {
    name: string;
    heading: string;
    path: string;
    element: React.ReactNode;
};

export const pages: { [key: string]: Page } = {
    portfolio: {
        name: "Portfolio",
        heading: "JULIAN SCHEVELKAMP – FINE ART PHOTOGRAPHER & VISUAL ARTIST",
        path: "/",
        element: <Portfolio />,
    },
    julian: {
        name: "Julian",
        heading: "ABOUT – JULIAN SCHEVELKAMP",
        path: "/julian/",
        element: <Julian />,
    },
    impressum: {
        name: "Impressum",
        heading: "IMPRESSUM – JULIAN SCHEVELKAMP",
        path: "/impressum/",
        element: <Impressum />,
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
