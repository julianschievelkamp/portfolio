import { useStore } from "hooks/useStore";

import { Next, Previous } from "./ClickAreas.styles";

const ClickAreas = () => {
    const activeIndex = useStore((state) => state.activeIndex);
    const setActiveIndex = useStore((state) => state.setActiveIndex);

    return (
        <>
            <Previous
                aria-hidden="true"
                onClick={() => setActiveIndex(activeIndex - 1)}
            />
            <Next
                aria-hidden="true"
                onClick={() => setActiveIndex(activeIndex + 1)}
            />
        </>
    );
};

export default ClickAreas;
