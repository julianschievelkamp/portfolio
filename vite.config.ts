import { defineConfig } from "vite";
import babel from "@rolldown/plugin-babel";
import svgr from "vite-plugin-svgr";
import vike from "vike/plugin";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        svgr(),
        vike(),
        // Deterministic class names for Styled Components (SSR/hydration)
        babel({
            include: /\.tsx?$/,
            exclude: /node_modules/,
            parserOpts: { plugins: ["typescript", "jsx"] },
            plugins: [
                [
                    "babel-plugin-styled-components",
                    { ssr: true, displayName: true, fileName: false },
                ],
            ],
        }),
    ],
    resolve: {
        tsconfigPaths: true,
    },
    base: "/",
});
