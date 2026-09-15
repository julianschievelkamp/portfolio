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
    currentPortfolioIndex: 0,
    popupOpen: false,

    setSidebarOpen: (open) =>
        set(() => ({
            sidebarOpen: open,
        })),

    setCurrentPortfolioIndex: (index) =>
        set(() => ({
            currentPortfolioIndex: index,
        })),

    setPopupOpen: (open) =>
        set(() => ({
            popupOpen: open,
        })),
}));
