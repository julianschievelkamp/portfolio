import { useStore } from "hooks/useStore";
import { Previous, Next, Close } from "./ClickAreas.styles";
import { queries } from "styles/variables";
import { useMediaQuery } from "hooks/useMediaQuery";

const ClickAreas = () => {
    const setPopupOpen = useStore((state) => state.setPopupOpen);
    const activeIndex = useStore((state) => state.activeIndex);
    const setActiveIndex = useStore((state) => state.setActiveIndex);

    const isLandscapeLgMax = useMediaQuery(queries.landscapeLgMax);

    if (isLandscapeLgMax) return null;

    return (
        <>
            <Close aria-hidden="true" onClick={() => setPopupOpen(false)} />
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
