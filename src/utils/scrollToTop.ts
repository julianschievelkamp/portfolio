// Maximale Wartezeit, falls das Scroll-Ende nie erkannt wird
const SCROLL_TIMEOUT_MS = 1500;

// Laufender Scroll-Vorgang; verhindert paralleles Ausführen
let pendingScroll: Promise<void> | null = null;

// Scrollt weich nach oben und löst auf, sobald die Position 0 erreicht ist.
// Wird während eines laufenden Scrolls erneut aufgerufen, wird das bestehende Promise zurückgegeben.
export const scrollToTop = (): Promise<void> => {
    if (pendingScroll) {
        return pendingScroll;
    }

    pendingScroll = new Promise<void>((resolve) => {
        if (window.scrollY <= 0 && window.scrollX <= 0) {
            resolve();
            return;
        }

        const finish = () => {
            window.removeEventListener("scroll", handleScroll);
            window.clearTimeout(timeout);
            resolve();
        };

        const handleScroll = () => {
            if (window.scrollY <= 0 && window.scrollX <= 0) {
                finish();
            }
        };

        const timeout = window.setTimeout(finish, SCROLL_TIMEOUT_MS);

        window.addEventListener("scroll", handleScroll);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }).finally(() => {
        pendingScroll = null;
    });

    return pendingScroll;
};
