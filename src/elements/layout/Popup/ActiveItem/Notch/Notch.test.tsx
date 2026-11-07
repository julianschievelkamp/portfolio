import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { colors } from "styles/variables";
import { portfolioData } from "data/portfolioFixtures";
import Notch, { NotchProps } from "./Notch";

vi.mock("hooks/useMediaQuery", () => ({ useMediaQuery: () => true }));
// Das Icon wird ersetzt, damit Name und Farbe prüfbar sind
vi.mock("elements/components/Icon/Icon", () => ({
    default: ({ name, color }: { name: string; color: string }) => (
        <span data-testid={`icon-${name}`} data-color={color} />
    ),
}));

const [photo, video] = portfolioData;

const renderNotch = (props: Partial<NotchProps> = {}) => {
    const handlers = {
        setIsVideoOn: vi.fn(),
        setIsVolumeOn: vi.fn(),
        setIsInfoOn: vi.fn(),
    };

    render(
        <Notch
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

describe("Notch", () => {
    it("renders the volume, video and info buttons", () => {
        renderNotch();

        ["Toggle Volume", "Toggle Video", "Toggle Info"].forEach((name) => {
            expect(screen.getByRole("button", { name })).toBeInTheDocument();
        });
    });

    it("disables volume and video for an item without video", () => {
        renderNotch({ loadedItem: photo });

        expect(screen.getByRole("button", { name: "Toggle Volume" })).toBeDisabled();
        expect(screen.getByRole("button", { name: "Toggle Video" })).toBeDisabled();
        expect(screen.getByRole("button", { name: "Toggle Info" })).toBeEnabled();
    });

    it("disables only volume while the video is switched off", () => {
        renderNotch({ isVideoOn: false });

        expect(screen.getByRole("button", { name: "Toggle Volume" })).toBeDisabled();
        expect(screen.getByRole("button", { name: "Toggle Video" })).toBeEnabled();
    });

    it("calls the setters with the inverted values", async () => {
        const handlers = renderNotch();

        await userEvent.click(screen.getByRole("button", { name: "Toggle Volume" }));
        await userEvent.click(screen.getByRole("button", { name: "Toggle Video" }));
        await userEvent.click(screen.getByRole("button", { name: "Toggle Info" }));

        expect(handlers.setIsVolumeOn).toHaveBeenCalledWith(false);
        expect(handlers.setIsVideoOn).toHaveBeenCalledWith(false);
        expect(handlers.setIsInfoOn).toHaveBeenCalledWith(true);
    });

    it("shows the on icons when video and volume are active", () => {
        renderNotch();

        expect(screen.getByTestId("icon-volumeOn")).toBeInTheDocument();
        expect(screen.getByTestId("icon-videoOn")).toBeInTheDocument();
        expect(screen.getByTestId("icon-info")).toBeInTheDocument();
    });

    it("shows the off icons without video, with video off or volume off", () => {
        const { unmount } = render(
            <Notch
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

        renderNotch({ isVideoOn: false });
        expect(screen.getByTestId("icon-volumeOff")).toBeInTheDocument();
        expect(screen.getByTestId("icon-videoOff")).toBeInTheDocument();
    });

    it("shows the volume off icon while the volume is off", () => {
        renderNotch({ isVolumeOn: false });

        expect(screen.getByTestId("icon-volumeOff")).toBeInTheDocument();
        expect(screen.getByTestId("icon-videoOn")).toBeInTheDocument();
    });

    it("colors the info icon with the primary color only when active", () => {
        const { unmount } = render(
            <Notch
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

        renderNotch();
        expect(screen.getByTestId("icon-info")).toHaveAttribute(
            "data-color",
            "white",
        );
    });
});
