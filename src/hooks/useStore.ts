import { portfolioData } from "data/portfolioData";
import { create } from "zustand";

interface State {
    sidebarOpen: boolean;
    currentPortfolioIndex: number;
    popupOpen: boolean;
}

interface Actions {
    setSidebarOpen: (open: boolean) => void;
    setCurrentPortfolioIndex: (index: number) => void;
    setPopupOpen: (open: boolean) => void;
}

export const useStore = create<State & Actions>((set) => ({
    sidebarOpen: false,
    // -1 bedeutet, dass noch kein Item für das Popup gewählt wurde
    currentPortfolioIndex: -1,
    popupOpen: false,

    setSidebarOpen: (open) =>
        set(() => ({
            sidebarOpen: open,
        })),

    setCurrentPortfolioIndex: (index) =>
        set(() => {
            const maxIndex = portfolioData.length - 1;

            // Index am Anfang bzw. Ende der Liste umbrechen
            if (index > maxIndex) {
                return { currentPortfolioIndex: 0 };
            } else if (index < 0) {
                return { currentPortfolioIndex: maxIndex };
            }

            return { currentPortfolioIndex: index };
        }),

    setPopupOpen: (open) =>
        set(() => ({
            popupOpen: open,
        })),
}));
