import {GameUnitIcon} from "./game-unit-icon"
import TableCell from "@mui/material/TableCell"

export const GameMapCell = ({
    mine,
    opponent,
    unit,
    wall,
    reachable,
    trench,
    onClick,
    icons,
    turnCount,
}) => {
    let colorStyle

    if (mine && unit) {
        colorStyle = {color: "primary.main"}
    } else if (mine && wall) {
        colorStyle = {
            color: "primary.dark",
            bgcolor: "primary.main",
        }
    } else if (opponent && unit && reachable) {
        colorStyle = {
            color: "secondary.main",
            ":hover": {bgcolor: "primary.light"},
        }
    } else if (opponent & unit) {
        colorStyle = {
            color: "secondary.main",
            bgcolor: "grey.200",
        }
    } else if (opponent && wall) {
        colorStyle = {
            color: "secondary.dark",
            bgcolor: "secondary.main",
        }
    } else if (trench && reachable) {
        colorStyle = {
            color: "grey.400",
            ":hover": {
                color: "primary.main",
                bgcolor: "primary.light",
            },
        }
    } else if (trench) {
        colorStyle = {
            color: "grey.500",
            bgcolor: "grey.200",
        }
    } else if (reachable) {
        colorStyle = {
            color: "rgba(0, 0, 0, 0)",
            ":hover": {color: "primary.light"},
        }
    } else {
        colorStyle = {
            bgcolor: "grey.200",
            color: "rgba(0, 0, 0, 0)",
        }
    }

    const sx = {
        position: "relative",
        p: 0,
        "td + &": {
            borderLeft: 1,
            borderLeftColor: "grey.300",
        },
        "tr:last-child &": {
            borderBottom: 0,
        },
        ...colorStyle,
    }

    let icon = icons.me

    if ((mine && wall) || (opponent && unit)) {
        icon = icons.opponent
    }

    if (Array.isArray(icon)) {
        if (icon.length === 2) {
            if (wall) {
                icon = icon[1]
            } else {
                icon = icon[0]
            }
        } else {
            if (wall) {
                icon = icon[icon.length - 1]
            } else {
                icon = icon[turnCount % (icon.length - 1)]
            }
        }
    }

    const overlayIcon =
        trench && !wall ? (
            <GameUnitIcon sx={{position: "absolute", left: 0, top: 0}}>
                {icons.opponent}
            </GameUnitIcon>
        ) : null

    return (
        <TableCell onClick={onClick} sx={sx}>
            <GameUnitIcon>{icon}</GameUnitIcon>
            {overlayIcon}
        </TableCell>
    )
}
