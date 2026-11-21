export type Page = {
    description: string;
    name: string;
    path: string;
    title: string;
};

export const pages = {
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
            "Visual artist and fine art photographer from Cologne (b. 1994). Winner of Prix de la Photographie Paris 2017 and Fine Art Photographer of the Year 2019.",
        path: "/about/",
    },
    impressum: {
        name: "Impressum",
        title: "Impressum – Julian Schievelkamp",
        description: "Legal notice and contact details of Julian Schievelkamp.",
        path: "/impressum/",
    },
} satisfies Record<string, Page>;

type Link = {
    name: string;
    path: string;
};

export const links = {
    instagram: {
        name: "Instagram",
        path: "https://www.instagram.com/julianschievelkamp/",
    },
    vogue: {
        name: "PhotoVogue",
        path: "https://www.vogue.com/photovogue/photographers/71498",
    },
} satisfies Record<string, Link>;
