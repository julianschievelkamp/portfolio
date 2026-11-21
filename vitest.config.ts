import { defineConfig } from "vitest/config";
import svgr from "vite-plugin-svgr";

// Separate configuration without the Vike plugin, since it interferes in tests
export default defineConfig({
    plugins: [svgr()],
    resolve: {
        tsconfigPaths: true,
    },
    test: {
        environment: "jsdom",
        setupFiles: ["./vitest.setup.ts"],
        include: ["src/**/*.test.{ts,tsx}"],
        restoreMocks: true,
        coverage: {
            provider: "v8",
            include: ["src/elements/components/**/*.{ts,tsx}"],
            exclude: ["src/**/*.test.{ts,tsx}"],
        },
    },
});
