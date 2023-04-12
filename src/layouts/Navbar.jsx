import {Box, Button, Grow, IconButton, Typography, useTheme} from "@mui/material";
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
        <Box className={"row align-content-center align-items-center w-100 my-2 position-fixed"} sx={{zIndex: 100}}>
            <Box className={"d-flex flex-wrap justify-content-between align-content-center align-items-center"}>
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
                    <Box className={"d-flex justify-content-center align-content-center align-items-center"}>
                        <Button variant={"contained"}
                                size={"large"}
                                className={"fw-bold rounded-pill"}
                                sx={{color: theme.palette.dark.opacity75}}>
                            Ajouter une annonce <i className="fa-solid fa-star ms-2"></i>
                        </Button>
                    </Box>
                </Grow>
            </Box>
        </Box>
    )
}

export default Navbar;