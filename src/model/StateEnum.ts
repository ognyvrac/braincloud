import {
    faCheck,
    faCloudShowersHeavy,
    faProjectDiagram,
    faThumbsUp,
    faTrophy
} from "@fortawesome/free-solid-svg-icons";

/** State enum used to decide the color of elements depending on their current state. */
export const enum ColorState {
    Inactive,
    InProgress,
    Done
}

/** State enum used to decide the icon of elements depending on their current state. */
export const enum IconState {
    Generate,
    Group,
    Vote,
    Winner,
    Done
}

/**
 * 
 * @param state the current state of the elements
 * @returns purple linear gradient if InProgress, green if Done, gray if else.
 */
export function decideColor(state: ColorState) {
    switch (state) {
        case ColorState.InProgress:
            return "#D35267";
        case ColorState.Done:
            return "rgb(33, 194, 115)";
        default:
            return "#BFC1C6";
    }
}

export function decideIcon(icon: IconState) {
    switch (icon) {
        case IconState.Generate:
            return faCloudShowersHeavy
        case IconState.Group:
            return faProjectDiagram
        case IconState.Vote:
            return faThumbsUp
        case IconState.Winner:
            return faTrophy
        default:
            return faCheck
    }
}
