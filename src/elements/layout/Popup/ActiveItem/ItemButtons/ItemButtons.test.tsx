import { render, screen } from "@testing-library/react";
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

    it("disables only volume while the video is switched off", () => {
        renderItemButtons({ isVideoOn: false });

        expect(screen.getByRole("button", { name: "Toggle Volume" })).toBeDisabled();
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

    it("shows the on icons when video and volume are active", () => {
        renderItemButtons();

        expect(screen.getByTestId("icon-volumeOn")).toBeInTheDocument();
        expect(screen.getByTestId("icon-videoOn")).toBeInTheDocument();
        expect(screen.getByTestId("icon-info")).toBeInTheDocument();
    });

    it("shows the off icons without video, with video off or volume off", () => {
        const { unmount } = render(
            <ItemButtons
                loadedItem={photo}
                isVideoOn
                isVolumeOn
                isInfoOn
                setIsVideoOn={vi.fn()}
                setIsVolumeOn={vi.fn()}
                setIsInfoOn={vi.fn()}
            />,
        );
        expect(screen.getByTestId("icon-volumeOff")).toBeInTheDocument();
        expect(screen.getByTestId("icon-videoOff")).toBeInTheDocument();
        expect(screen.getByTestId("icon-infoFilled")).toBeInTheDocument();
        unmount();

        renderItemButtons({ isVideoOn: false });
        expect(screen.getByTestId("icon-volumeOff")).toBeInTheDocument();
        expect(screen.getByTestId("icon-videoOff")).toBeInTheDocument();
    });

    it("shows the volume off icon while the volume is off", () => {
        renderItemButtons({ isVolumeOn: false });

        expect(screen.getByTestId("icon-volumeOff")).toBeInTheDocument();
        expect(screen.getByTestId("icon-videoOn")).toBeInTheDocument();
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
