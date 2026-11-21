interface IconCursorOptions {
    color: string;
    size: number;
}

/**
 * Erzeugt aus einem rohen SVG-String einen CSS-Cursor-Wert.
 * Breite/Höhe werden auf `size` gesetzt (die viewBox bleibt erhalten, das Icon skaliert also mit),
 * alle Füll- und Konturfarben werden durch `color` ersetzt und der Hotspot liegt mittig.
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

    // "pointer" als Fallback, falls der eigene Cursor nicht dargestellt werden kann
    return `url("${dataUri}") ${hotspot} ${hotspot}, pointer`;
};
