export const mapIndex = (newIndex: number, maxIndex: number) => {
    if (newIndex > maxIndex) {
        return 0;
    } else if (newIndex < 0) {
        return maxIndex;
    }

    return newIndex;
};
