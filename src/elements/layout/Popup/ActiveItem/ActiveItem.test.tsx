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
const getInfoHeading = () =>
    screen.getByText(`${video.title}, ${video.year}`);
const loadImage = (item: typeof video) =>
    fireEvent.load(screen.getByAltText(getAltText(item)));
const clickButton = (name: string) =>
    userEvent.click(screen.getByLabelText(name));

describe("ActiveItem", () => {
    beforeEach(() => {
        useStore.setState({ activeIndex: 1, popupOpen: true });
        // jsdom implementiert pause nicht
        vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(
            () => {},
        );
    });

    it("renders the image of the active item with its title as alt text", () => {
        render(<ActiveItem />);

        expect(screen.getByAltText(getAltText(video))).toHaveAttribute(
            "src",
            video.image,
        );
    });

    it("renders the video of an item with video once its image has loaded", () => {
        render(<ActiveItem />);
        expect(getVideo()).not.toBeInTheDocument();

        loadImage(video);

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

        // Direkt nach dem Wechsel sind Bild und Video noch die des alten Items
        expect(screen.getByAltText(getAltText(photo))).toHaveAttribute(
            "src",
            photo.image,
        );
        expect(getVideo()).not.toBeInTheDocument();

        const newImage = await screen.findByAltText(getAltText(video));

        expect(newImage).toHaveAttribute("src", video.image);
        expect(getVideo()).not.toBeInTheDocument();

        loadImage(video);

        expect(getVideo()).toBeInTheDocument();
    });

    it("hides and shows the video via the notch", async () => {
        render(<ActiveItem />);
        loadImage(video);

        await clickButton("Toggle Video");
        expect(getVideo()).not.toBeInTheDocument();

        await clickButton("Toggle Video");
        expect(getVideo()).toBeInTheDocument();
    });

    it("mutes and unmutes the video via the notch", async () => {
        render(<ActiveItem />);
        loadImage(video);
        expect(getVideo().muted).toBe(false);

        await clickButton("Toggle Volume");
        expect(getVideo().muted).toBe(true);

        await clickButton("Toggle Volume");
        expect(getVideo().muted).toBe(false);
    });

    it("renders nothing while no item is selected", () => {
        useStore.setState({ activeIndex: -1 });
        const { container } = render(<ActiveItem />);

        expect(container).toBeEmptyDOMElement();
    });

    it("is invisible until the selected image has loaded", async () => {
        const { container } = render(<ActiveItem />);
        const activeItem = container.firstElementChild as HTMLElement;
        expect(activeItem).toHaveStyle({ opacity: "0" });
        expect(activeItem).not.toBeVisible();

        fireEvent.load(screen.getByAltText(getAltText(video)));

        await waitFor(() => expect(activeItem).toHaveStyle({ opacity: "1" }));
        expect(activeItem).toBeVisible();
    });

    it("fades in even if the image fails to load", async () => {
        const { container } = render(<ActiveItem />);
        const activeItem = container.firstElementChild as HTMLElement;

        fireEvent.error(screen.getByAltText(getAltText(video)));

        await waitFor(() => expect(activeItem).toHaveStyle({ opacity: "1" }));
        expect(activeItem).toBeVisible();
    });

    it("fades in again every time the popup is opened", async () => {
        const { container } = render(<ActiveItem />);
        const activeItem = container.firstElementChild as HTMLElement;
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
        const activeItem = container.firstElementChild as HTMLElement;
        fireEvent.load(screen.getByAltText(getAltText(video)));
        await waitFor(() => expect(activeItem).toHaveStyle({ opacity: "1" }));

        act(() => useStore.setState({ activeIndex: 2 }));

        expect(activeItem).toHaveStyle({ opacity: "1" });
        expect(screen.getByAltText(getAltText(video))).toBeInTheDocument();
    });

    it("toggles the info via the notch", async () => {
        const { container } = render(<ActiveItem />);
        fireEvent.load(screen.getByAltText(getAltText(video)));
        await waitFor(() =>
            expect(container.firstElementChild).toHaveStyle({ opacity: "1" }),
        );
        expect(getInfoHeading()).not.toBeVisible();

        await clickButton("Toggle Info");
        expect(getInfoHeading()).toBeVisible();

        await clickButton("Toggle Info");
        expect(getInfoHeading()).not.toBeVisible();
    });

    it("hides the info when the image area is clicked", async () => {
        render(<ActiveItem />);
        await clickButton("Toggle Info");

        // Das Bild hat pointer-events: none, der Klick geht an den Container
        fireEvent.click(screen.getByAltText(getAltText(video)));

        expect(getInfoHeading()).not.toBeVisible();
    });

    it("resets info, video and volume when the item changes", async () => {
        render(<ActiveItem />);
        loadImage(video);
        await clickButton("Toggle Info");
        await clickButton("Toggle Volume");
        await clickButton("Toggle Video");

        act(() => useStore.setState({ activeIndex: 2 }));
        await screen.findByAltText(getAltText(otherPhoto));
        act(() => useStore.setState({ activeIndex: 1 }));
        await screen.findByAltText(getAltText(video));
        loadImage(video);

        expect(getInfoHeading()).not.toBeVisible();
        expect(getVideo()).toBeInTheDocument();
        expect(getVideo().muted).toBe(false);
    });

    it("pauses the video when the popup is closed", () => {
        render(<ActiveItem />);
        loadImage(video);
        const pause = vi.mocked(HTMLMediaElement.prototype.pause);
        pause.mockClear();

        act(() => useStore.setState({ popupOpen: false }));

        expect(pause).toHaveBeenCalled();
    });
});
