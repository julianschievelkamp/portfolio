// Maximale Wartezeit, falls das Scroll-Ende nie erkannt wird
const SCROLL_TIMEOUT_MS = 1500;

// Scrollt weich nach oben und löst auf, sobald die Position 0 erreicht ist
export const scrollToTop = (): Promise<void> =>
    new Promise((resolve) => {
        if (window.scrollY <= 0) {
            resolve();
            return;
        }

        const finish = () => {
            window.removeEventListener("scroll", handleScroll);
            window.clearTimeout(timeout);
            resolve();
        };

        const handleScroll = () => {
            if (window.scrollY <= 0) {
                finish();
            }
        };

        const timeout = window.setTimeout(finish, SCROLL_TIMEOUT_MS);

        window.addEventListener("scroll", handleScroll);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
