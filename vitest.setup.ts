import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Cleans up the rendered DOM after each test
afterEach(() => {
    cleanup();
});

// jsdom does not implement showModal() and close() of <dialog>
HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute("open", "");
};

HTMLDialogElement.prototype.close = function close() {
    if (!this.open) return;

    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
};

// jsdom does not implement decode() of <img>
HTMLImageElement.prototype.decode = function decode() {
    return Promise.resolve();
};
