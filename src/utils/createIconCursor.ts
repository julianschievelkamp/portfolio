interface IconCursorOptions {
    color: string;
    size: number;
}

/**
 * Creates a CSS cursor value from a raw SVG string.
 * Width/height are set to `size` (the viewBox is kept, so the icon scales with it),
 * all fill and stroke colors are replaced by `color` and the hotspot is centered.
 */
export const createIconCursor = (
    rawSvg: string,
    { color, size }: IconCursorOptions,
): string => {
    const svg = rawSvg
        .replace(/<svg\b[^>]*>/, (svgTag) =>
            svgTag
                .replace(/\s(width|height|color)="[^"]*"/g, "")
                .replace(
                    /^<svg/,
                    `<svg width="${size}" height="${size}" color="${color}"`,
                ),
        )
        .replace(/\b(fill|stroke)="(?!none")[^"]*"/g, `$1="${color}"`);

    const hotspot = size / 2;
    const dataUri = `data:image/svg+xml,${encodeURIComponent(svg)}`;

    // "pointer" as a fallback in case the custom cursor cannot be displayed
    return `url("${dataUri}") ${hotspot} ${hotspot}, pointer`;
};
