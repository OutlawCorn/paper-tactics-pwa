import {ToggleSection} from "./toggle-section"

export default ({highlightFX, animateFX}) => {
    return (
        <>
            <ToggleSection
                state={highlightFX}
                values={[true, false]}
                labeler={value =>
                    value ? "Highlight FX icons in lobby" : "No FX highlighting"
                }
            />
            <ToggleSection
                state={animateFX}
                values={[true, false]}
                labeler={value =>
                    value ? "Animate FX icons in game" : "No FX animation"
                }
            />
        </>
    )
}
