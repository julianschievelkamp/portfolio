import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { portfolioData } from "data/portfolioFixtures";
import { useStore } from "hooks/useStore";

import ActiveItem from "./ActiveItem";

vi.mock(
    "data/portfolioData",
    async () => await import("data/portfolioFixtures"),
);
vi.mock("hooks/useMediaQuery", () => ({ useMediaQuery: () => true }));

const [photo, video] = portfolioData;

const getVideo = () => screen.queryByLabelText(video.title) as HTMLVideoElement;
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
            // Like in the browser, play() fires the "play" event
            act(() => {
                getVideo()?.dispatchEvent(new Event("play"));
            });
            return Promise.resolve();
        });
        vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(
            function (this: HTMLMediaElement) {
                isPaused = true;
                // Like in the browser, pause() fires the "pause" event
                act(() => {
                    this.dispatchEvent(new Event("pause"));
                });
            },
        );
    });

    it("renders the image of the active item with its title as alt text", () => {
        render(<ActiveItem />);

        expect(screen.getByAltText(video.alt)).toHaveAttribute(
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

        expect(screen.getByAltText(photo.alt)).toBeInTheDocument();
        expect(screen.queryByLabelText(video.title)).not.toBeInTheDocument();
    });

    it("keeps the previous image until the new one is preloaded", async () => {
        useStore.setState({ activeIndex: 0 });
        render(<ActiveItem />);

        act(() => useStore.setState({ activeIndex: 1 }));

        expect(screen.getByAltText(photo.alt)).toHaveAttribute(
            "src",
            photo.image,
        );
        expect(getVideo()).not.toBeInTheDocument();

        const newImage = await screen.findByAltText(video.alt);

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

        fireEvent.load(screen.getByAltText(video.alt));

        await waitFor(() => expect(activeItem).toHaveStyle({ opacity: "1" }));
        expect(activeItem).toBeVisible();
    });

    it("fades in even if the image fails to load", async () => {
        const { container } = render(<ActiveItem />);
        const activeItem = getInnerWrapper(container);

        fireEvent.error(screen.getByAltText(video.alt));

        await waitFor(() => expect(activeItem).toHaveStyle({ opacity: "1" }));
        expect(activeItem).toBeVisible();
    });

    it("fades in again every time the popup is opened", async () => {
        const { container } = render(<ActiveItem />);
        const activeItem = getInnerWrapper(container);
        fireEvent.load(screen.getByAltText(video.alt));
        await waitFor(() => expect(activeItem).toHaveStyle({ opacity: "1" }));

        act(() => useStore.setState({ popupOpen: false }));
        expect(activeItem).toHaveStyle({ opacity: "0" });
        expect(activeItem).not.toBeVisible();

        // The image is already loaded, so there is no further load event
        act(() => useStore.setState({ popupOpen: true }));
        expect(activeItem).toHaveStyle({ opacity: "0" });
        expect(activeItem).not.toBeVisible();
        await waitFor(() => expect(activeItem).toHaveStyle({ opacity: "1" }));
        expect(activeItem).toBeVisible();
    });

    it("stays visible while navigating between items", async () => {
        const { container } = render(<ActiveItem />);
        const activeItem = getInnerWrapper(container);
        fireEvent.load(screen.getByAltText(video.alt));
        await waitFor(() => expect(activeItem).toHaveStyle({ opacity: "1" }));

        act(() => useStore.setState({ activeIndex: 2 }));

        expect(activeItem).toHaveStyle({ opacity: "1" });
        expect(screen.getByAltText(video.alt)).toBeInTheDocument();
    });

    it("pauses the video when the popup is closed", async () => {
        render(<ActiveItem />);
        await clickButton(`Play ${video.title}`);

        act(() => useStore.setState({ popupOpen: false }));

        expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
        expect(getVideo().paused).toBe(true);
    });
});
