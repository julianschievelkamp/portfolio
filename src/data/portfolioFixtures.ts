import type { PortfolioItem } from "data/portfolioData";

export const portfolioData: PortfolioItem[] = [
    {
        title: "First Photo",
        year: "2020",
        type: "analog photograph",
        image: "first.jpg",
        imageSet: "first-300.jpg 300w, first-600.jpg 600w",
        aspectRatio: "3/2",
    },
    {
        title: "Second Artwork",
        year: "2021",
        type: "digital artwork",
        image: "second.jpg",
        imageSet: "second-300.jpg 300w",
        aspectRatio: "1/1",
        video: "second.mp4",
    },
    {
        title: "Third Photo",
        year: "2022",
        type: "digital photograph",
        image: "third.jpg",
        imageSet: "third-300.jpg 300w",
        aspectRatio: "2/3",
    },
];
