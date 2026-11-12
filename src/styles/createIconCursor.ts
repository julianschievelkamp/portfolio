interface IconCursorOptions {
    size: number;
    color: string;
}

/**
 * Erzeugt aus einem rohen SVG-String einen CSS-Cursor-Wert.
 * Breite/Höhe werden auf `size` gesetzt (die viewBox bleibt erhalten, das Icon skaliert also mit),
 * alle Füll- und Konturfarben werden durch `color` ersetzt und der Hotspot liegt mittig.
 */
export const createIconCursor = (
    rawSvg: string,
    { size, color }: IconCursorOptions,
): string => {
    const svg = rawSvg
        // Nur das öffnende <svg>-Tag anpassen: Größe setzen und currentColor festlegen
        .replace(/<svg\b[^>]*>/, (svgTag) =>
            svgTag
                .replace(/\s(width|height|color)="[^"]*"/g, "")
                .replace(
                    /^<svg/,
                    `<svg width="${size}" height="${size}" color="${color}"`,
                ),
        )
        // Alle Farbangaben (außer "none") auf die gewünschte Farbe setzen
        .replace(/\b(fill|stroke)="(?!none")[^"]*"/g, `$1="${color}"`);

    const hotspot = size / 2;
    const dataUri = `data:image/svg+xml,${encodeURIComponent(svg)}`;

    // "pointer" als Fallback, falls der eigene Cursor nicht dargestellt werden kann
    return `url("${dataUri}") ${hotspot} ${hotspot}, pointer`;
};
