export type Theme = {
    body: string;
    text: string;
    icon: string;
    hover: string;
};

export type PortfolioItem = {
    title: string;
    image: string;
    video?: string;
};

export type Page = {
    name: string;
    content: React.ReactNode;
};
