import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { colors } from "styles/variables";
import { useStore } from "hooks/useStore";
import { portfolioData } from "data/portfolioFixtures";
import ItemButtons, { ItemButtonsProps } from "./ItemButtons";

vi.mock("hooks/useMediaQuery", () => ({ useMediaQuery: () => true }));
// Das Icon wird ersetzt, damit Name und Farbe prüfbar sind
vi.mock("elements/components/Icon/Icon", () => ({
    default: ({ name, color }: { name: string; color: string }) => (
        <span data-testid={`icon-${name}`} data-color={color} />
    ),
}));

const [photo, video] = portfolioData;

const getButton = (name: string) => screen.getByRole("button", { name });

// Das Icon wird innerhalb des Buttons gesucht, damit es eindeutig dem Button zugeordnet ist
const getIcon = (buttonName: string, iconName: string) =>
    within(getButton(buttonName)).getByTestId(`icon-${iconName}`);

const renderItemButtons = (props: Partial<ItemButtonsProps> = {}) => {
    const handlers = {
        setIsVideoOn: vi.fn(),
        setIsVolumeOn: vi.fn(),
        setIsInfoOn: vi.fn(),
    };

    const result = render(
        <ItemButtons
            loadedItem={video}
            isVideoOn
            isVolumeOn
            isInfoOn={false}
            {...handlers}
            {...props}
        />,
    );

    return { ...handlers, ...result };
};

describe("ItemButtons", () => {
    it("renders the video, volume, info and close buttons", () => {
        renderItemButtons();

        ["Pause Video", "Mute Video", "Show Info", "Close Popup"].forEach(
            (name) => {
                expect(getButton(name)).toBeInTheDocument();
            },
        );
    });

    it("labels the buttons according to their state", () => {
        const { unmount } = renderItemButtons({
            isVideoOn: true,
            isVolumeOn: true,
            isInfoOn: false,
        });
        expect(getButton("Pause Video")).toBeInTheDocument();
        expect(getButton("Mute Video")).toBeInTheDocument();
        expect(getButton("Show Info")).toBeInTheDocument();
        unmount();

        renderItemButtons({
            isVideoOn: false,
            isVolumeOn: false,
            isInfoOn: true,
        });
        expect(getButton("Play Video")).toBeInTheDocument();
        expect(getButton("Unmute Video")).toBeInTheDocument();
        expect(getButton("Hide Info")).toBeInTheDocument();
    });

    it("disables volume and video for an item without video", () => {
        renderItemButtons({ loadedItem: photo, isVideoOn: false });

        expect(getButton("Mute Video")).toBeDisabled();
        expect(getButton("Play Video")).toBeDisabled();
        expect(getButton("Show Info")).toBeEnabled();
    });

    it("keeps volume and video enabled for an item with video while the video is off", () => {
        renderItemButtons({ isVideoOn: false });

        expect(getButton("Mute Video")).toBeEnabled();
        expect(getButton("Play Video")).toBeEnabled();
    });

    it("calls the setters with the inverted values", async () => {
        const handlers = renderItemButtons();

        await userEvent.click(getButton("Mute Video"));
        await userEvent.click(getButton("Pause Video"));
        await userEvent.click(getButton("Show Info"));

        expect(handlers.setIsVolumeOn).toHaveBeenCalledWith(false);
        expect(handlers.setIsVideoOn).toHaveBeenCalledWith(false);
        expect(handlers.setIsInfoOn).toHaveBeenCalledWith(true);
    });

    it("shows the pause icon while the video is on and the play icon while it is off", () => {
        const { unmount } = renderItemButtons({ isVideoOn: true });
        expect(getIcon("Pause Video", "pause")).toBeInTheDocument();
        unmount();

        renderItemButtons({ isVideoOn: false });
        expect(getIcon("Play Video", "play")).toBeInTheDocument();
    });

    it("shows the volume icon according to the volume state, independent of the video", () => {
        const { unmount } = renderItemButtons({
            isVideoOn: false,
            isVolumeOn: true,
        });
        expect(getIcon("Mute Video", "volumeOn")).toBeInTheDocument();
        unmount();

        renderItemButtons({ isVolumeOn: false });
        expect(getIcon("Unmute Video", "volumeOff")).toBeInTheDocument();
    });

    it("colors the video and volume icons with the primary color only for items with video", () => {
        const { unmount } = renderItemButtons({ isVideoOn: false });
        expect(getIcon("Play Video", "play")).toHaveAttribute(
            "data-color",
            colors.primary,
        );
        expect(getIcon("Mute Video", "volumeOn")).toHaveAttribute(
            "data-color",
            colors.primary,
        );
        unmount();

        renderItemButtons({ loadedItem: photo, isVideoOn: false });
        expect(getIcon("Play Video", "play")).toHaveAttribute(
            "data-color",
            "white",
        );
        expect(getIcon("Mute Video", "volumeOn")).toHaveAttribute(
            "data-color",
            "white",
        );
    });

    it("colors the info icon with the primary color only when active", () => {
        const { unmount } = renderItemButtons({ isInfoOn: true });
        expect(getIcon("Hide Info", "infoFilled")).toHaveAttribute(
            "data-color",
            colors.primary,
        );
        unmount();

        renderItemButtons();
        expect(getIcon("Show Info", "info")).toHaveAttribute(
            "data-color",
            "white",
        );
    });

    it("closes the popup via the close button", async () => {
        useStore.setState({ popupOpen: true });
        renderItemButtons();

        await userEvent.click(getButton("Close Popup"));

        expect(useStore.getState().popupOpen).toBe(false);
    });
});
