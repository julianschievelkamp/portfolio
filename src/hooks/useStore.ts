import { create } from "zustand";

import { portfolioData } from "data/portfolioData";
import { wrapIndex } from "utils/wrapIndex";

interface State {
    activeIndex: number;
    popupOpen: boolean;
    sidebarOpen: boolean;
}

interface Actions {
    setActiveIndex: (index: number) => void;
    setPopupOpen: (open: boolean) => void;
    setSidebarOpen: (open: boolean) => void;
}

export const useStore = create<State & Actions>((set) => ({
    // -1 bedeutet, dass noch kein Item für das Popup gewählt wurde
    activeIndex: -1,
    popupOpen: false,
    sidebarOpen: false,

    setActiveIndex: (index) =>
        set({ activeIndex: wrapIndex(index, portfolioData.length) }),

    setPopupOpen: (open) => set({ popupOpen: open }),

    setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
