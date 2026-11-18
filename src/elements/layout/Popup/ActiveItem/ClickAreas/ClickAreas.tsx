import { Previous, Next } from "./ClickAreas.styles";
import { useStore } from "hooks/useStore";

const ClickAreas = () => {
    const activeIndex = useStore((state) => state.activeIndex);
    const setActiveIndex = useStore((state) => state.setActiveIndex);

    return (
        <>
            <Previous
                onClick={() => setActiveIndex(activeIndex - 1)}
                aria-hidden="true"
            />
            <Next
                onClick={() => setActiveIndex(activeIndex + 1)}
                aria-hidden="true"
            />
        </>
    );
};

export default ClickAreas;
