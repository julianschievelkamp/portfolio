import { portfolioData } from "data/portfolioData";
import { create } from "zustand";
import { wrapIndex } from "utils/wrapIndex";

interface State {
    sidebarOpen: boolean;
    activeIndex: number;
    popupOpen: boolean;
}

interface Actions {
    setSidebarOpen: (open: boolean) => void;
    setActiveIndex: (index: number) => void;
    setPopupOpen: (open: boolean) => void;
}

export const useStore = create<State & Actions>((set) => ({
    sidebarOpen: false,
    // -1 bedeutet, dass noch kein Item für das Popup gewählt wurde
    activeIndex: -1,
    popupOpen: false,

    setSidebarOpen: (open) => set({ sidebarOpen: open }),

    setActiveIndex: (index) =>
        set({ activeIndex: wrapIndex(index, portfolioData.length) }),

    setPopupOpen: (open) => set({ popupOpen: open }),
}));
