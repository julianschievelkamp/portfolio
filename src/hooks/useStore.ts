import { create } from "zustand";

interface State {
    theme: string;
    sidebarOpen: boolean;
    currentPortfolioIndex: number;
    popupOpen: boolean;
}

interface Actions {
    setTheme: (theme: string) => void;
    setSidebarOpen: (open: boolean) => void;
    setCurrentPortfolioIndex: (index: number) => void;
    setPopupOpen: (open: boolean) => void;
}

export const useStore = create<State & Actions>((set) => ({
    theme: "light",
    sidebarOpen: false,
    currentPortfolioIndex: 0,
    popupOpen: false,

    setTheme: (theme) =>
        set(() => ({
            theme: theme,
        })),

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
