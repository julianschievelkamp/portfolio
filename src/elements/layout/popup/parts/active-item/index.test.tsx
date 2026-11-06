import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useStore } from "hooks/useStore";
import { portfolioData } from "data/portfolioFixtures";
import ActiveItem from ".";

vi.mock("data/portfolioData", async () => await import("data/portfolioFixtures"));
vi.mock("hooks/useMediaQuery", () => ({ useMediaQuery: () => true }));

const [photo, video, otherPhoto] = portfolioData;

const getVideo = () => screen.queryByLabelText(video.title) as HTMLVideoElement;
const getInfoHeading = () =>
    screen.getByRole("heading", { level: 2, hidden: true });
const clickButton = (name: string) =>
    userEvent.click(screen.getByRole("button", { name }));

describe("ActiveItem", () => {
    beforeEach(() => {
        useStore.setState({ currentPortfolioIndex: 1, popupOpen: true });
        // jsdom implementiert pause nicht
        vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(
            () => {},
        );
    });

    it("renders the image of the active item with its title as alt text", () => {
        render(<ActiveItem />);

        expect(screen.getByRole("img", { name: video.title })).toHaveAttribute(
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
        useStore.setState({ currentPortfolioIndex: 0 });
        render(<ActiveItem />);

        expect(screen.getByRole("img", { name: photo.title })).toBeInTheDocument();
        expect(screen.queryByLabelText(video.title)).not.toBeInTheDocument();
    });

    it("shows the video of a new item only after its image has loaded", () => {
        useStore.setState({ currentPortfolioIndex: 0 });
        render(<ActiveItem />);

        act(() => useStore.setState({ currentPortfolioIndex: 1 }));
        expect(getVideo()).not.toBeInTheDocument();

        fireEvent.load(screen.getByRole("img", { name: video.title }));

        expect(getVideo()).toBeInTheDocument();
    });

    it("hides and shows the video via the notch", async () => {
        render(<ActiveItem />);

        await clickButton("Toggle Video");
        expect(getVideo()).not.toBeInTheDocument();

        await clickButton("Toggle Video");
        expect(getVideo()).toBeInTheDocument();
    });

    it("mutes and unmutes the video via the notch", async () => {
        render(<ActiveItem />);
        expect(getVideo().muted).toBe(false);

        await clickButton("Toggle Volume");
        expect(getVideo().muted).toBe(true);

        await clickButton("Toggle Volume");
        expect(getVideo().muted).toBe(false);
    });

    it("toggles the info via the notch", async () => {
        render(<ActiveItem />);
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
        fireEvent.click(screen.getByRole("img", { name: video.title }));

        expect(getInfoHeading()).not.toBeVisible();
    });

    it("resets info, video and volume when the item changes", async () => {
        render(<ActiveItem />);
        await clickButton("Toggle Info");
        await clickButton("Toggle Volume");
        await clickButton("Toggle Video");

        act(() => useStore.setState({ currentPortfolioIndex: 2 }));
        fireEvent.load(screen.getByRole("img", { name: otherPhoto.title }));
        act(() => useStore.setState({ currentPortfolioIndex: 1 }));
        fireEvent.load(screen.getByRole("img", { name: video.title }));

        expect(getInfoHeading()).not.toBeVisible();
        expect(getVideo()).toBeInTheDocument();
        expect(getVideo().muted).toBe(false);
    });

    it("pauses the video when the popup is closed", () => {
        render(<ActiveItem />);
        const pause = vi.mocked(HTMLMediaElement.prototype.pause);
        pause.mockClear();

        act(() => useStore.setState({ popupOpen: false }));

        expect(pause).toHaveBeenCalled();
    });
});
