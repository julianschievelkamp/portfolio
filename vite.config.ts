import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import vike from "vike/plugin";

// https://vite.dev/config/
export default defineConfig({
    plugins: [svgr(), vike()],
    resolve: {
        tsconfigPaths: true,
    },
    base: "/",
});
