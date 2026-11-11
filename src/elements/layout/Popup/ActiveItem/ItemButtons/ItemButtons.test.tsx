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

// Das Icon wird innerhalb des Buttons gesucht, damit es eindeutig dem Button zugeordnet ist
const getIcon = (buttonName: string, iconName: string) =>
    within(screen.getByRole("button", { name: buttonName })).getByTestId(
        `icon-${iconName}`,
    );

const renderItemButtons = (props: Partial<ItemButtonsProps> = {}) => {
    const handlers = {
        setIsVideoOn: vi.fn(),
        setIsVolumeOn: vi.fn(),
        setIsInfoOn: vi.fn(),
    };

    render(
        <ItemButtons
            loadedItem={video}
            isVideoOn
            isVolumeOn
            isInfoOn={false}
            {...handlers}
            {...props}
        />,
    );

    return handlers;
};

describe("ItemButtons", () => {
    it("renders the video, volume, info and close buttons", () => {
        renderItemButtons();

        ["Toggle Video", "Toggle Volume", "Toggle Info", "Close Popup"].forEach((name) => {
            expect(screen.getByRole("button", { name })).toBeInTheDocument();
        });
    });

    it("disables volume and video for an item without video", () => {
        renderItemButtons({ loadedItem: photo });

        expect(screen.getByRole("button", { name: "Toggle Volume" })).toBeDisabled();
        expect(screen.getByRole("button", { name: "Toggle Video" })).toBeDisabled();
        expect(screen.getByRole("button", { name: "Toggle Info" })).toBeEnabled();
    });

    it("keeps volume and video enabled for an item with video while the video is off", () => {
        renderItemButtons({ isVideoOn: false });

        expect(screen.getByRole("button", { name: "Toggle Volume" })).toBeEnabled();
        expect(screen.getByRole("button", { name: "Toggle Video" })).toBeEnabled();
    });

    it("calls the setters with the inverted values", async () => {
        const handlers = renderItemButtons();

        await userEvent.click(screen.getByRole("button", { name: "Toggle Volume" }));
        await userEvent.click(screen.getByRole("button", { name: "Toggle Video" }));
        await userEvent.click(screen.getByRole("button", { name: "Toggle Info" }));

        expect(handlers.setIsVolumeOn).toHaveBeenCalledWith(false);
        expect(handlers.setIsVideoOn).toHaveBeenCalledWith(false);
        expect(handlers.setIsInfoOn).toHaveBeenCalledWith(true);
    });

    it("shows the pause icon while the video is on and the play icon while it is off", () => {
        const { unmount } = render(
            <ItemButtons
                loadedItem={video}
                isVideoOn
                isVolumeOn
                isInfoOn={false}
                setIsVideoOn={vi.fn()}
                setIsVolumeOn={vi.fn()}
                setIsInfoOn={vi.fn()}
            />,
        );
        expect(getIcon("Toggle Video", "pause")).toBeInTheDocument();
        unmount();

        renderItemButtons({ isVideoOn: false });
        expect(getIcon("Toggle Video", "play")).toBeInTheDocument();
    });

    it("shows the play icon for an item without video", () => {
        renderItemButtons({ loadedItem: photo });

        expect(getIcon("Toggle Video", "play")).toBeInTheDocument();
    });

    it("shows the volume icon according to the volume state, independent of the video", () => {
        const { unmount } = render(
            <ItemButtons
                loadedItem={video}
                isVideoOn={false}
                isVolumeOn
                isInfoOn={false}
                setIsVideoOn={vi.fn()}
                setIsVolumeOn={vi.fn()}
                setIsInfoOn={vi.fn()}
            />,
        );
        expect(getIcon("Toggle Volume", "volumeOn")).toBeInTheDocument();
        unmount();

        renderItemButtons({ isVolumeOn: false });
        expect(getIcon("Toggle Volume", "volumeOff")).toBeInTheDocument();
    });

    it("colors the video and volume icons with the primary color only for items with video", () => {
        const { unmount } = render(
            <ItemButtons
                loadedItem={video}
                isVideoOn={false}
                isVolumeOn
                isInfoOn={false}
                setIsVideoOn={vi.fn()}
                setIsVolumeOn={vi.fn()}
                setIsInfoOn={vi.fn()}
            />,
        );
        expect(getIcon("Toggle Video", "play")).toHaveAttribute(
            "data-color",
            colors.primary,
        );
        expect(getIcon("Toggle Volume", "volumeOn")).toHaveAttribute(
            "data-color",
            colors.primary,
        );
        unmount();

        renderItemButtons({ loadedItem: photo });
        expect(getIcon("Toggle Video", "play")).toHaveAttribute(
            "data-color",
            "white",
        );
        expect(getIcon("Toggle Volume", "volumeOn")).toHaveAttribute(
            "data-color",
            "white",
        );
    });

    it("colors the info icon with the primary color only when active", () => {
        const { unmount } = render(
            <ItemButtons
                loadedItem={video}
                isVideoOn
                isVolumeOn
                isInfoOn
                setIsVideoOn={vi.fn()}
                setIsVolumeOn={vi.fn()}
                setIsInfoOn={vi.fn()}
            />,
        );
        expect(screen.getByTestId("icon-infoFilled")).toHaveAttribute(
            "data-color",
            colors.primary,
        );
        unmount();

        renderItemButtons();
        expect(screen.getByTestId("icon-info")).toHaveAttribute(
            "data-color",
            "white",
        );
    });

    it("closes the popup via the close button", async () => {
        useStore.setState({ popupOpen: true });
        renderItemButtons();

        await userEvent.click(screen.getByRole("button", { name: "Close Popup" }));

        expect(useStore.getState().popupOpen).toBe(false);
    });
});
