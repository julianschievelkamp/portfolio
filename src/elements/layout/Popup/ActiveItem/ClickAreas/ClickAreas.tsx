import { useStore } from "hooks/useStore";
import { Previous, Next } from "./ClickAreas.styles";
import { queries } from "styles/variables";
import { useMediaQuery } from "hooks/useMediaQuery";

const ClickAreas = () => {
    const activeIndex = useStore((state) => state.activeIndex);
    const setActiveIndex = useStore((state) => state.setActiveIndex);

    const isLandscapeLgMax = useMediaQuery(queries.landscapeLgMax);

    if (isLandscapeLgMax) return null;

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
