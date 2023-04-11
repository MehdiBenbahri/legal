import {
    Box,
    Button, IconButton,
    Tab,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs, Tooltip,
    Typography, useTheme
} from "@mui/material";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import Paper from '@mui/material/Paper';
import {getOperator} from "../../services/OperatorService.js";
import moment from "moment/moment.js";
import RegisterModal from "../../RegisterModal.jsx";

function Join({show}) {
    const theme = useTheme();
    const [selectedType, setSelectedType] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [operatorData, setOperatorData] = useState([]);
    const [disableReload, setDisableReload] = useState(false);

    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);

    useEffect(() => {
        setSelectedType(show ? selectedType : false);
        setShowInfo(false);
    }, [show])

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

    return (
        <Box className={`${show ? 'd-flex' : 'd-none'} justify-content-center align-content-center`}>
            <motion.div
                animate={show ? {opacity: 1} : {opacity: 0, display: "none"}}
                transition={show ? {duration: 0.5, delay: 0.5} : {duration: 0.2}}
                sx={{backgroundColor: "black"}}
                className={"d-flex flex-column justify-content-center align-items-center align-content-center"}
            >
                <img src={"/img/annonce.webp"} width={"400rem"} alt={"homme bureau fond soleil"}/>
                <motion.div
                    animate={!showInfo ? {opacity: 1} : {opacity: 0, display: "none"}}
                    transition={{duration: 0}}
                >
                    <Box className={"d-flex flex-column justify-content-center align-content-center px-3"}>
                        <Typography className={"text-center my-2"} fontSize={"0.88rem"} variant={"overline"}>
                            De quel type de compte avez-vous besoin ?
                        </Typography>
                        <Tabs value={selectedType}
                              variant={"fullWidth"}
                              TabIndicatorProps={{style: {height: "100%"}}}
                              onChange={(e, value) => {
                                  setSelectedType(value)
                              }}>
                            <Tab label={
                                <Typography
                                    className={`${selectedType === 'solo' ? 'text-dark' : 'text-primary'} fw-bold`}
                                    sx={{zIndex: 10}}>
                                    SOLO
                                </Typography>
                            } value={'solo'}/>
                            <Tab label={
                                <Typography
                                    className={`${selectedType === 'orga' ? 'text-dark' : 'text-primary'} fw-bold`}
                                    sx={{zIndex: 10}}>
                                    Organisation
                                </Typography>
                            } value={'orga'}/>
                        </Tabs>
                    </Box>
                    <motion.div
                        animate={selectedType === 'solo' ? {scaleX: 1, opacity: 1} : {
                            scaleX: -0.25,
                            opacity: 0,
                            display: "none"
                        }}
                        transition={{duration: 0.2}}
                        className={selectedType === 'solo' ? 'd-flex flex-wrap justify-content-between align-content-center my-3 px-3' : 'd-none'}>
                        <Button color={"primary"}
                                size={"large"}
                                fullWidth
                                variant={"outlined"}
                                className={"rounded-0 fw-bold"}>
                            Connexion
                            <i className="fa-solid fa-user ms-2"></i>
                        </Button>
                        <Button color={"primary"}
                                size={"large"}
                                onClick={() => setOpenRegisterModal(true)}
                                fullWidth
                                variant={"outlined"}
                                className={"rounded-0 fw-bold my-3"}>
                            Inscription
                            <i className="fa-solid fa-id-card ms-2"></i>
                        </Button>
                    </motion.div>
                    <RegisterModal handle={openRegisterModal} />
                    <motion.div
                        animate={selectedType === 'orga' ? {scaleX: 1, opacity: 1} : {
                            scaleX: 0,
                            opacity: 0,
                            display: "none"
                        }}
                        transition={{duration: 0.2}}
                        className={'d-flex flex-wrap justify-content-between align-content-center my-2 px-3'}>
                        <Button color={"primary"}
                                size={"large"}
                                fullWidth
                                href={'https://directus.mehdia-center.fr'}
                                variant={"outlined"}
                                className={"rounded-0 fw-bold my-2"}>
                            Connexion
                            <i className="fa-solid fa-address-card ms-2"></i>
                        </Button>
                        <Button color={"primary"}
                                size={"large"}
                                fullWidth
                                variant={"outlined"}
                                onClick={() => setShowInfo(true)}
                                className={"rounded-0 fw-bold my-2"}>
                            Demander un compte
                            <i className="fa-solid fa-phone ms-2"></i>
                        </Button>
                    </motion.div>
                </motion.div>
                <motion.div
                    animate={showInfo ?
                        {scaleX: 1, opacity: 1} :
                        {scaleX: 0, opacity: 0, display: "none"}}
                    transition={{duration: 0.25}}
                    className={"w-100"}
                >
                    <Typography className={"text-center text-uppercase font-monospace"}
                                variant={"h6"}
                                fontSize={"1.5rem"}
                    >
                        Contactez un des numéro suivant
                    </Typography>
                    <Box className={"px-3"}>
                        <TableContainer className={"text-uppercase"} sx={{backgroundColor: theme.palette.dark.opacity25}} component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={"text-light fw-bold"}>Com</TableCell>
                                        <TableCell className={"text-light fw-bold"}>Téléphone</TableCell>
                                        <TableCell className={"text-light fw-bold text-center"}>État</TableCell>
                                        <TableCell className={"text-light fw-bold d-flex justify-content-center align-content-center"}>
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
                                            <TableCell component="th" scope="row" >
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
                                                <Typography fontSize={"0.75rem"} className={"text-center"} color={theme.palette.light.opacity50}>
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
                </motion.div>
                <motion.div
                    animate={showInfo ?
                        {scaleX: 1, opacity: 1} :
                        {scaleX: 0, opacity: 0, display: "none"}
                    }
                    transition={{duration: 0.25}}
                    className={"px-0"}
                >
                    <Box className={"p-3"} sx={{backgroundColor: "black"}}>
                        <Typography className={"font-monospace my-3"}>
                            1. Vous devez posséder une organisation officielle et reconnue bénéficié de nos services.
                        </Typography>
                        <Typography className={"font-monospace my-3"}>
                            2. Seul le chef d'organisation peut demander l'ouverture d'un compte.
                        </Typography>
                        <Typography className={"font-monospace my-3"}>
                            3. Un compte représente une organisation, en cas de changement de chef ou de nom
                            d'organisation,
                            la licence devra être renouvlé.
                        </Typography>
                    </Box>
                </motion.div>
            </motion.div>
        </Box>
    )
}

export default Join;