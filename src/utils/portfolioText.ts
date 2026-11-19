import type { PortfolioItem } from "data/portfolioData";

export const getAltText = (item: PortfolioItem) =>
    `${item.title} by Julian Schievelkamp`;

export const getCaption = (item: PortfolioItem) =>
    `${item.title}, ${item.year} – ${item.type}`;
