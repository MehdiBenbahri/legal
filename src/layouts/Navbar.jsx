import {Box, Grow, IconButton, Typography, useTheme} from "@mui/material";
import "./Navbar.css"
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {useState} from "react";
import ToggleSearchBox from "../ui/ToggleSearchBox.jsx";
import {motion} from "framer-motion";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Skeleton from "@mui/material/Skeleton";

function Navbar() {
    const theme = useTheme();

    const variants = {
        "closed": {scaleX: 0, x: 5000, opacity: 0},
        "open": {scaleX: 1, x: 0, opacity: 1},
    }

    return (
        <Box className={"row align-content-center align-items-center w-100 my-2"} sx={{zIndex: 100}}>
            <Box className={"d-flex justify-content-between align-content-center align-items-center"}>
                <Box className={"d-flex justify-content-start align-content-center align-items-center"}>
                    <Grow in={true}>
                        <IconButton
                            className={"m-2 rounded-pill text-muted d-flex justify-content-center align-content-center"}
                            size={"large"}
                            href={"/"}
                            sx={
                                {
                                    backgroundColor: theme.palette.light.opacity75,
                                    backdropFilter: 'blur(5px)'
                                }
                            }
                        >
                            <HomeRoundedIcon/>
                            <Typography className={"mx-2"}>
                                Accueil
                            </Typography>
                        </IconButton>
                    </Grow>
                    <Grow in={true}>
                        <IconButton
                            className={"m-2 rounded-pill text-muted d-flex justify-content-center align-content-center"}
                            size={"large"}
                            href={"/"}
                            sx={
                                {
                                    backgroundColor: theme.palette.light.opacity75,
                                    backdropFilter: 'blur(5px)'
                                }
                            }
                        >
                            <MenuBookIcon/>
                            <Typography className={"mx-2"}>
                                Règles
                            </Typography>
                        </IconButton>
                    </Grow>
                </Box>
                <Grow in={true}>
                    <Box className={"d-flex justify-content-center align-content-center w-50"}>
                        <ToggleSearchBox
                            className={"rounded-pill w-100 d-flex justify-content-between align-items-center align-content-center"}/>
                    </Box>
                </Grow>
                <Grow in={true}>
                    <Box className={"d-flex justify-content-center align-content-center align-items-center"}>
                        <Skeleton variant={"circular"} width={60} height={60}></Skeleton>
                    </Box>
                </Grow>
            </Box>
        </Box>
    )
}

export default Navbar;