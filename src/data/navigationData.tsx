export type Page = {
    name: string;
    title: string;
    description: string;
    path: string;
};

export const pages: { [key: string]: Page } = {
    portfolio: {
        name: "Portfolio",
        title: "Julian Schievelkamp – Fine Art Photographer & Visual Artist",
        description:
            "Fine art photography and digital artworks by Julian Schievelkamp, a visual artist from Cologne combining classic photography and CGI.",
        path: "/",
    },
    about: {
        name: "About",
        title: "About – Julian Schievelkamp",
        description:
            "Julian Schievelkamp (b. 1994) is a visual artist and fine art photographer from Cologne. Winner of the Prix de la Photographie Paris 2017 and Fine Art Photographer of the Year 2019.",
        path: "/about/",
    },
    impressum: {
        name: "Impressum",
        title: "Impressum – Julian Schievelkamp",
        description:
            "Legal notice and contact details of Julian Schievelkamp.",
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
