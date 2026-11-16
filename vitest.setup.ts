import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Räumt das gerenderte DOM nach jedem Test auf
afterEach(() => {
    cleanup();
});

// jsdom implementiert showModal() und close() von <dialog> nicht
HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute("open", "");
};

HTMLDialogElement.prototype.close = function close() {
    if (!this.open) return;

    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
};

// jsdom implementiert decode() von <img> nicht
HTMLImageElement.prototype.decode = function decode() {
    return Promise.resolve();
};
