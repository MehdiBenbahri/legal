import {Box, Grow, IconButton, Typography, useTheme} from "@mui/material";
import "./Navbar.css"
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {useState} from "react";
import ToggleSearchBox from "../ui/ToggleSearchBox.jsx";
import {motion} from "framer-motion";
import Join from "../pages/join/Join.jsx";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuBookIcon from '@mui/icons-material/MenuBook';

function Navbar() {
    const theme = useTheme();
    const [openAuth, setOpenAuth] = useState(false);

    const variants = {
        "closed": {scaleX: 0, x: 5000, opacity: 0},
        "open": {scaleX: 1, x: 0, opacity: 1},
    }

    return (
        <Box className={"row align-content-center align-items-center w-100 my-2"} sx={{zIndex: 100}}>
            <motion.div
                animate={openAuth ? "open" : "closed"}
                variants={variants}
                transition={{duration: .5}}
                className={"position-absolute top-0 right-0 p-0"}
                style={{backgroundColor: "black", width: "100vw", height: "100vh", zIndex: -1, overflowX: "hidden"}}>
                <Join show={openAuth}/>
            </motion.div>
            <Box className={"d-flex justify-content-between align-content-center align-items-center"}>
                <Box className={"d-flex justify-content-start align-content-center align-items-center"}>
                    <Grow in={true}>
                        <IconButton
                            className={"m-2 rounded-pill text-muted d-flex justify-content-center align-content-center"}
                            size={"large"}
                            href={"/"}
                            sx={
                                {
                                    backgroundColor: theme.palette.dark.opacity50,
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
                                    backgroundColor: theme.palette.dark.opacity50,
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
                        <IconButton
                            className={"p-3"}
                            onClick={() => setOpenAuth(!openAuth)}
                            sx={
                                {
                                    backgroundColor: !openAuth ? theme.palette.dark.opacity50 : theme.palette.primary.main,
                                    color: openAuth ? theme.palette.dark.main : theme.palette.primary.main,
                                    backdropFilter: 'blur(5px)'
                                }
                            }
                        >
                            {openAuth ? (
                                <LogoutRoundedIcon/>
                            ) : (
                                <LoginRoundedIcon/>
                            )}
                        </IconButton>
                    </Box>
                </Grow>
            </Box>
        </Box>
    )
}

export default Navbar;