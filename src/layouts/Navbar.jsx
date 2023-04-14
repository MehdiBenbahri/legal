import {
    Box,
    Button,
    Grow,
    IconButton,
    Modal,
    Table, TableBody,
    TableCell,
    TableContainer, TableHead, TableRow, Tooltip,
    Typography,
    useTheme
} from "@mui/material";
import "./Navbar.css"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import {motion} from "framer-motion"
import {useEffect, useState} from "react";
import {getOperator} from "../services/OperatorService.js";
import Paper from '@mui/material/Paper';
import moment from "moment";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

function Navbar() {
    const theme = useTheme();
    const [openAdvise, setOpenAdvise] = useState(false);
    const [operatorData, setOperatorData] = useState([]);
    const [disableReload, setDisableReload] = useState(false);


    useEffect(() => {
        if (operatorData.length === 0) {
            getOperator().then((res) => {
                if (res.status === 200) {
                    setOperatorData(res.data.data);
                } else {
                    console.log(res);
                }
            })
        }
    }, [operatorData])

    function reloadState() {
        setDisableReload(true);
        getOperator().then((res) => {
            if (res.status === 200) {
                setOperatorData(res.data.data);
            } else {
                console.log(res);
            }
            setTimeout(() => {
                setDisableReload(false);
            }, 1000)
        })
    }

    const variants = {
        "closed": {scaleX: 0, x: 5000, opacity: 0},
        "open": {scaleX: 1, x: 0, opacity: 1},
    }

    return (
        <Box className={"row align-content-center align-items-center w-100"} sx={{zIndex: 100}}>
            <Box className={"d-flex flex-wrap justify-content-between align-content-center align-items-center"}>
                <Box className={"d-flex justify-content-start align-content-center align-items-center"}>
                    <Grow in={true}>
                        <Box className={"d-flex justify-content-between align-items-center"}>
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
                            <IconButton
                                className={"m-2 rounded-pill text-muted d-flex justify-content-center align-content-center"}
                                size={"large"}
                                href={"/recruitment"}
                                sx={
                                    {
                                        backgroundColor: theme.palette.light.opacity75,
                                        backdropFilter: 'blur(5px)'
                                    }
                                }
                            >
                                <TravelExploreIcon />
                                <Typography className={"mx-2"}>
                                    Offre d'emploi
                                </Typography>
                            </IconButton>
                        </Box>
                    </Grow>
                    <Grow in={false}>
                        <IconButton
                            className={"m-2 rounded-pill text-muted d-flex justify-content-center align-content-center"}
                            size={"large"}
                            variant={"contained"}
                            disabled
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
                                Mentions légales
                            </Typography>
                        </IconButton>
                    </Grow>
                </Box>
                <Grow in={true}>
                    <Box
                        className={"d-flex justify-content-center align-content-center align-items-center position-fixed end-0 me-3"}>
                        <Button variant={"contained"}
                                size={"large"}
                                onClick={() => {
                                    setOpenAdvise(!openAdvise);
                                }}
                                className={"fw-bold rounded-pill py-2"}
                                sx={{color: theme.palette.dark.opacity75}}>
                            <Box className={"text-center"}>
                                <Typography fontSize={"0.75rem"} className={"d-none d-md-inline"}>
                                    Ajouter une annonce
                                </Typography>
                                <i className="fa-solid fa-star ms-2"></i>
                            </Box>

                        </Button>
                    </Box>
                </Grow>
            </Box>
            <Modal open={openAdvise}>
                <motion.div
                    initial={{opacity: 0}}
                    animate={openAdvise ? {opacity: 1} : {opacity: 0}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.25}}
                    className={"bg-black-blur w-100 h-100 d-flex flex-column justify-content-start align-items-center align-content-center"}>
                    <button className={"btn btn-light bg-light m-1 rounded-circle position-absolute"}
                            onClick={() => {
                                setOpenAdvise(false);
                            }}
                            style={{top: 0, right: 0, zIndex: 1000}}
                    >
                        <i className="fa-solid fa-xmark text-dark"></i>
                    </button>
                    <img src={"/img/rule.webp"} width={"400rem"} alt={"homme bureau fond soleil"}/>
                    <Box className={"px-3"}>
                        <TableContainer className={"text-uppercase"} sx={{backgroundColor: "#050505"}}
                                        component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={"text-light fw-bold"}>Opérateur</TableCell>
                                        <TableCell className={"text-light fw-bold"}>Téléphone</TableCell>
                                        <TableCell className={"text-light fw-bold text-center"}>État</TableCell>
                                        <TableCell
                                            className={"text-light fw-bold d-flex justify-content-center align-content-center"}>
                                            <IconButton size={"small"}
                                                        className={`p-3 ${disableReload ? 'text-muted' : 'text-light'}`}
                                                        onClick={() => !disableReload ? reloadState() : ''}
                                                        disabled={disableReload}
                                                        sx={{backgroundColor: theme.palette.light.opacity25}}>
                                                <motion.i
                                                    animate={disableReload ? {rotateZ: '-360deg'} : {rotateZ: "0deg"}}
                                                    transition={{duration: 0.25}}
                                                    className="fa-solid fa-arrow-rotate-left ">
                                                </motion.i>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {operatorData.map((row) => (
                                        <TableRow
                                            key={"table-row-operator-" + row.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell component="th" scope="row" className={"text-muted"}>
                                                {row.nickname}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                <Typography className={"text-muted"} fontSize={"0.75rem"}>
                                                    {row.phone}
                                                </Typography>
                                            </TableCell>
                                            <TableCell component="th" scope="row" className={"text-muted text-center"}>
                                                {
                                                    row.available === 'ok' ?
                                                        (
                                                            <Tooltip title={"Disponible"} placement={"right"}>
                                                                <i className="fa-solid fa-phone text-success"></i>
                                                            </Tooltip>
                                                        ) :
                                                        row.available !== 'wait' ?
                                                            (
                                                                <Tooltip title={"Non disponible"} placement={"right"}>
                                                                    <i className="fa-solid fa-phone-slash text-danger"></i>
                                                                </Tooltip>
                                                            )
                                                            :
                                                            (
                                                                <Tooltip title={"Occupé"} placement={"right"}>
                                                                    <i className="fa-solid fa-phone text-warning"></i>
                                                                </Tooltip>
                                                            )

                                                }
                                            </TableCell>
                                            <TableCell>
                                                <Typography fontSize={"0.75rem"} className={"text-center"}
                                                            color={theme.palette.light.opacity50}>
                                                    {
                                                        `Depuis \n ${moment().format('HH:mm')}`
                                                    }
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Typography variant={"overline"}
                                className={"text-primary fw-bold text-center my-3 col-sm-12 col-md-8 col-lg-4"}>
                        Pour pouvoir mettre une annonce sur le site en tant que particulier, contactez un de nos
                        opérateurs.
                    </Typography>
                    <Typography variant={"overline"}
                                className={"text-success fw-bold text-center my-3 col-sm-12 col-md-8 col-lg-4"}>
                        Les entreprises officielles peuvent bénéficier d'un accès administrateur pour gérer leur propre
                        annonce.
                    </Typography>
                </motion.div>
            </Modal>
        </Box>
    )
}

export default Navbar;