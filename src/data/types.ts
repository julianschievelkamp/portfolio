export type Theme = {
    body: string;
    text: string;
    headline: string;
    icon: string;
    hover: string;
};

export type PortfolioItem = {
    title: string;
    subTitle: React.ReactNode;
    image: string;
    video?: string;
};

export type Page = {
    name: string;
    content: React.ReactNode;
};
