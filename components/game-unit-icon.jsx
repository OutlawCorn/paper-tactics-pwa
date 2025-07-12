import {Opacity} from "@mui/icons-material"
import Box from "@mui/material/Box"

export const GameUnitIcon = ({children, sx}) => {
    const childrenSx = {
        "& svg": {
            width: "100%",
            height: "100%",
        },
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{...childrenSx, ...sx}}
        >
            {children}
        </Box>
    )
}
