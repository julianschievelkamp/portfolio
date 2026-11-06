import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Räumt das gerenderte DOM nach jedem Test auf
afterEach(() => {
    cleanup();
});
