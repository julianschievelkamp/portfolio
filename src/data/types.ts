export type Theme = {
    body: string;
    text: string;
    secondary: string;
    hover: string;
    border: string;
};

export type PortfolioItem = {
    title: string;
    image: string;
    video?: string;
    palette: string[];
};

export type Page = {
    name: string;
    content: React.ReactNode;
};
