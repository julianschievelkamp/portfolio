export const scrollToTop = () => {
    if (window.scrollY <= 0 && window.scrollX <= 0) {
        return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
};
