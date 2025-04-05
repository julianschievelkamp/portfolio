import { create } from "zustand";

interface State {
    sidebarOpen: boolean;
    currentPageIndex: number;
    currentPortfolioIndex: number;
    popupOpen: boolean;
}

interface Actions {
    setSidebarOpen: (open: boolean) => void;
    setCurrentPageIndex: (index: number) => void;
    setCurrentPortfolioIndex: (index: number) => void;
    setPopupOpen: (open: boolean) => void;
}

export const useStore = create<State & Actions>((set) => ({
    sidebarOpen: false,
    currentPageIndex: 0,
    currentPortfolioIndex: 0,
    popupOpen: false,

    setSidebarOpen: (open) =>
        set(() => ({
            sidebarOpen: open,
        })),

    setCurrentPageIndex: (index) =>
        set(() => ({
            currentPageIndex: index,
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
