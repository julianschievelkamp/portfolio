import type { PortfolioItem } from "data/portfolioData";

export const portfolioData: PortfolioItem[] = [
    {
        alt: "Black and white street scene with a cyclist crossing a bridge.",
        aspectRatio: "3/2",
        image: "first.jpg",
        imageSet: "first-300.jpg 300w, first-600.jpg 600w",
        title: "First Photo",
        type: "analog photograph",
        year: "2020",
    },
    {
        alt: "Abstract digital artwork of colorful swirling shapes.",
        aspectRatio: "1/1",
        image: "second.jpg",
        imageSet: "second-300.jpg 300w",
        title: "Second Artwork",
        type: "digital artwork",
        video: "second.mp4",
        year: "2021",
    },
    {
        alt: "Portrait of a person in profile against a plain wall.",
        aspectRatio: "2/3",
        image: "third.jpg",
        imageSet: "third-300.jpg 300w",
        title: "Third Photo",
        type: "digital photograph",
        year: "2022",
    },
];
