import {GameMapCell} from "./game-map-cell"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableRow from "@mui/material/TableRow"

export const GameMap = ({
    game,
    gamePreferences,
    onTurnMade,
    icons,
    animateFX,
}) => {
    const cellProps = Array(gamePreferences.size)
        .fill()
        .map(() => {
            return Array(gamePreferences.size)
                .fill()
                .map(() => ({}))
        })

    const setPropsForEach = (array, props, propsFactory) => {
        array.forEach(([x, y]) => {
            Object.assign(cellProps[y - 1][x - 1], props)
            if (propsFactory) {
                Object.assign(cellProps[y - 1][x - 1], propsFactory(x, y))
            }
        })
    }

    setPropsForEach(game.opponent.units, {unit: true, opponent: true})
    setPropsForEach(game.opponent.walls, {wall: true, opponent: true})
    setPropsForEach(game.me.units, {unit: true, mine: true})
    setPropsForEach(game.me.walls, {wall: true, mine: true})
    setPropsForEach(game.trenches, {trench: true})

    if (game.myTurn) {
        setPropsForEach(game.me.reachable, {reachable: true}, (x, y) => ({
            onClick: () => onTurnMade(x, y),
        }))
    } else {
        setPropsForEach(game.me.reachable, {reachable: true})
    }

    const renderedRows = cellProps.map((row, y) => {
        const renderedRow = row.map((props, x) => {
            return (
                <GameMapCell
                    animateFX={animateFX}
                    turnCount={
                        game.me.units.length +
                        game.me.walls.length +
                        game.opponent.walls.length -
                        1
                    }
                    {...props}
                    icons={icons}
                    key={x}
                />
            )
        })

        return <TableRow key={y}>{renderedRow}</TableRow>
    })

    return (
        <Table>
            <TableBody>{renderedRows}</TableBody>
        </Table>
    )
}
