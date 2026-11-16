import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useStore } from "hooks/useStore";
import { portfolioData, getAltText } from "data/portfolioFixtures";
import ActiveItem from "./ActiveItem";

vi.mock(
    "data/portfolioData",
    async () => await import("data/portfolioFixtures"),
);
vi.mock("hooks/useMediaQuery", () => ({ useMediaQuery: () => true }));

const [photo, video, otherPhoto] = portfolioData;

const getVideo = () => screen.queryByLabelText(video.title) as HTMLVideoElement;
const loadImage = (item: typeof video) =>
    fireEvent.load(screen.getByAltText(getAltText(item)));
const clickButton = (name: string) =>
    userEvent.click(screen.getByLabelText(name));
const getInnerWrapper = (container: HTMLElement) =>
    container.firstElementChild?.firstElementChild as HTMLElement;

describe("ActiveItem", () => {
    beforeEach(() => {
        useStore.setState({ activeIndex: 1, popupOpen: true });
        let isPaused = true;
        vi.spyOn(
            HTMLMediaElement.prototype,
            "paused",
            "get",
        ).mockImplementation(() => isPaused);
        vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => {
            isPaused = false;
            return Promise.resolve();
        });
        vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {
            isPaused = true;
        });
    });

    it("renders the image of the active item with its title as alt text", () => {
        render(<ActiveItem />);

        expect(screen.getByAltText(getAltText(video))).toHaveAttribute(
            "src",
            video.image,
        );
    });

    it("renders the video of an item with video", () => {
        render(<ActiveItem />);

        expect(getVideo()).toBeInTheDocument();
        expect(getVideo().querySelector("source")).toHaveAttribute(
            "src",
            video.video,
        );
    });

    it("renders no video for an item without video", () => {
        useStore.setState({ activeIndex: 0 });
        render(<ActiveItem />);

        expect(screen.getByAltText(getAltText(photo))).toBeInTheDocument();
        expect(screen.queryByLabelText(video.title)).not.toBeInTheDocument();
    });

    it("keeps the previous image until the new one is preloaded", async () => {
        useStore.setState({ activeIndex: 0 });
        render(<ActiveItem />);

        act(() => useStore.setState({ activeIndex: 1 }));

        expect(screen.getByAltText(getAltText(photo))).toHaveAttribute(
            "src",
            photo.image,
        );
        expect(getVideo()).not.toBeInTheDocument();

        const newImage = await screen.findByAltText(getAltText(video));

        expect(newImage).toHaveAttribute("src", video.image);
        expect(getVideo()).toBeInTheDocument();
    });

    it("renders nothing while no item is selected", () => {
        useStore.setState({ activeIndex: -1 });
        const { container } = render(<ActiveItem />);

        expect(container).toBeEmptyDOMElement();
    });

    it("is invisible until the selected image has loaded", async () => {
        const { container } = render(<ActiveItem />);
        const activeItem = getInnerWrapper(container);
        expect(activeItem).toHaveStyle({ opacity: "0" });
        expect(activeItem).not.toBeVisible();

        fireEvent.load(screen.getByAltText(getAltText(video)));

        await waitFor(() => expect(activeItem).toHaveStyle({ opacity: "1" }));
        expect(activeItem).toBeVisible();
    });

    it("fades in even if the image fails to load", async () => {
        const { container } = render(<ActiveItem />);
        const activeItem = getInnerWrapper(container);

        fireEvent.error(screen.getByAltText(getAltText(video)));

        await waitFor(() => expect(activeItem).toHaveStyle({ opacity: "1" }));
        expect(activeItem).toBeVisible();
    });

    it("fades in again every time the popup is opened", async () => {
        const { container } = render(<ActiveItem />);
        const activeItem = getInnerWrapper(container);
        fireEvent.load(screen.getByAltText(getAltText(video)));
        await waitFor(() => expect(activeItem).toHaveStyle({ opacity: "1" }));

        act(() => useStore.setState({ popupOpen: false }));
        expect(activeItem).toHaveStyle({ opacity: "0" });
        expect(activeItem).not.toBeVisible();

        // Das Bild ist bereits geladen, es gibt kein erneutes load-Event
        act(() => useStore.setState({ popupOpen: true }));
        expect(activeItem).toHaveStyle({ opacity: "0" });
        expect(activeItem).not.toBeVisible();
        await waitFor(() => expect(activeItem).toHaveStyle({ opacity: "1" }));
        expect(activeItem).toBeVisible();
    });

    it("stays visible while navigating between items", async () => {
        const { container } = render(<ActiveItem />);
        const activeItem = getInnerWrapper(container);
        fireEvent.load(screen.getByAltText(getAltText(video)));
        await waitFor(() => expect(activeItem).toHaveStyle({ opacity: "1" }));

        act(() => useStore.setState({ activeIndex: 2 }));

        expect(activeItem).toHaveStyle({ opacity: "1" });
        expect(screen.getByAltText(getAltText(video))).toBeInTheDocument();
    });

    it("resets the video when the item changes", async () => {
        const { container } = render(<ActiveItem />);
        loadImage(video);
        await waitFor(() =>
            expect(getInnerWrapper(container)).toHaveStyle({ opacity: "1" }),
        );
        expect(screen.getByLabelText(`Play ${video.title}`)).toBeVisible();

        await clickButton(`Play ${video.title}`);
        expect(screen.getByLabelText(`Play ${video.title}`)).not.toBeVisible();

        act(() => useStore.setState({ activeIndex: 2 }));
        await screen.findByAltText(getAltText(otherPhoto));
        act(() => useStore.setState({ activeIndex: 1 }));
        await screen.findByAltText(getAltText(video));

        expect(screen.getByLabelText(`Play ${video.title}`)).toBeVisible();
    });

    it("pauses the video when the popup is closed", async () => {
        render(<ActiveItem />);
        await clickButton(`Play ${video.title}`);

        act(() => useStore.setState({ popupOpen: false }));

        expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
        expect(getVideo().paused).toBe(true);
    });
});
