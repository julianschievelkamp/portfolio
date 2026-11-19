// Bricht den Index am Anfang bzw. Ende der Liste um (-1 landet auf dem letzten, count auf dem ersten Eintrag)
export const wrapIndex = (index: number, count: number) =>
    ((index % count) + count) % count;
