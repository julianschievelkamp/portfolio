// Wraps the index around at the start or end of the list (-1 ends up on the last entry, count on the first)
export const wrapIndex = (index: number, count: number) =>
    ((index % count) + count) % count;
