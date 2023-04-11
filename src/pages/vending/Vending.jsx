import {Box, List, ListItem, ListItemIcon, Typography, useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import {getVendingById} from "../../services/VendingService.js";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import moment from "moment";
import VendingDescription from "../../ui/vending/VendingDescription.jsx";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Skeleton from "@mui/material/Skeleton";
import {motion} from "framer-motion"
function Vending() {
    const imgOption = {quality: 100, width: "600", height: "600", withoutEnlargement: true, format: "webp"};
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    const id = params.id;
    const [dataVending, setDataVending] = useState({});

    useEffect(() => {
        getVendingById(id).then((res) => {
            if (res.status === 200) {
                setDataVending(res.data.data[0]);
            } else {
                console.log(res)
            }
        })
    }, [id])
    const theme = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0}}
            transition={{ duration: 0.5 }}
        >
            <Box className={"row justify-content-evenly"}>
                <Box className={"col-sm-12 col-md-10 col-lg-8"}>
                    <Box className={"d-flex flex-column justify-content-between align-content-center"}>
                        <Typography variant={"overline"} className={"px-2 py-0"} fontSize={"1.5rem"}>
                            {
                                dataVending.title
                            }
                        </Typography>
                        <Typography variant={"overline"} className={"px-2"}>
                            {
                                dataVending.description
                            }
                        </Typography>
                    </Box>
                    <Box className={"row justify-content-evenly gx-0"}>
                        <Box
                            className={"col-sm-12 col-md-12 col-lg-6 row p-0"}
                        >
                            {
                                dataVending.image_id ?
                                    (
                                        <img className={"object-fit-cover user-select-none rounded-3"}
                                             style={{minWidth: '80%'}}
                                             alt={dataVending ? dataVending.title : ''}
                                             draggable={false}
                                             src={import.meta.env.VITE_API_BASE + '/assets/' + dataVending.image_id + "?" + (new URLSearchParams(imgOption))}/>
                                    ) :
                                    (
                                        <Skeleton sx={{width: "80%", height: "50rem"}}/>
                                    )
                            }
                            <Box
                                className={"row justify-content-start align-content-center gx-0 px-2"}
                            >
                                <List
                                    className={"text-muted w-100"}
                                    aria-label="contacts"
                                >
                                    <ListItem disablePadding
                                              className={"d-flex justify-content-between align-content-center w-100"}>
                                        <Typography variant={"overline"}>
                                            Envoyé le {moment(dataVending.date_created).format('DD/MM/YYYY HH:mm')}
                                        </Typography>
                                        <Box className={"badge text-dark text-uppercase"}
                                             sx={{backgroundColor: theme.palette.success.main}}>
                                            {dataVending.status}
                                        </Box>
                                    </ListItem>
                                    {
                                        dataVending.minimum_person ?
                                            (
                                                <ListItem className={"ps-0"}>
                                                    <ListItemIcon>
                                                        <AccessibilityNewIcon className={"text-muted"}/>
                                                    </ListItemIcon>
                                                    <Typography>
                                                        {dataVending.minimum_person ? `${dataVending.minimum_person} personne(s) minimum` : 'nombre min. de personne non spécifié'}
                                                    </Typography>
                                                </ListItem>
                                            ) :
                                            ('')
                                    }
                                    {
                                        dataVending.nb_person ?
                                            (
                                                <ListItem className={"ps-0"}>
                                                    <ListItemIcon>
                                                        <AccessibilityNewIcon className={"text-muted"}/>
                                                    </ListItemIcon>
                                                    <Typography>
                                                        {dataVending.nb_person ? `${dataVending.nb_person} personne(s)` : 'nombre de personne non spécifié'}
                                                    </Typography>
                                                </ListItem>
                                            ) :
                                            ('')
                                    }
                                    {
                                        dataVending.maximum_person ?
                                            (
                                                <ListItem className={"ps-0"}>
                                                    <ListItemIcon>
                                                        <AccessibilityNewIcon className={"text-muted"}/>
                                                    </ListItemIcon>
                                                    <Typography>
                                                        {dataVending.maximum_person ? `${dataVending.maximum_person} personne(s) maximum` : 'nombre max. de personne non spécifié'}
                                                    </Typography>
                                                </ListItem>
                                            ) :
                                            ('')
                                    }
                                    <ListItem className={"ps-0"}>
                                        <ListItemIcon>
                                            <AccessTimeFilledIcon className={"text-muted"}/>
                                        </ListItemIcon>
                                        <Typography>
                                            Temps estimé : {dataVending.duration}
                                        </Typography>
                                    </ListItem>
                                    {
                                        dataVending.limite ?
                                            (
                                                <ListItem className={"ps-0"}>
                                                    <ListItemIcon>
                                                        <EventNoteIcon color={"error"}/>
                                                    </ListItemIcon>
                                                    <Typography color={"error"} className={"fw-bolder"}>
                                                        Temps limite : {dataVending.limite}
                                                    </Typography>
                                                </ListItem>
                                            ) :
                                            ('')
                                    }
                                    <ListItem className={"ps-0"}>
                                        <ListItemIcon>
                                            <AttachMoneyIcon className={"text-muted"}/>
                                        </ListItemIcon>
                                        <Typography>
                                            {new Intl.NumberFormat('en-US').format(dataVending.price)} USD
                                        </Typography>
                                    </ListItem>
                                </List>
                            </Box>
                        </Box>
                        <Box className={"col-sm-12 col-md-12 col-lg-6 px-2"}>
                            <VendingDescription dataVending={dataVending}/>
                            <Box className={"d-flex flex-wrap justify-content-start align-content-center mt-2"}>
                                {
                                    dataVending.categories ?
                                        dataVending.categories.map(
                                            el => {
                                                let data = el.categories_id;
                                                return (
                                                    <Box key={"badge-categories-" + data.id}
                                                         sx={
                                                             {
                                                                 backdropFilter: "blur(5px)",
                                                                 boxShadow: '0px 0px 7px 0.25px ' + theme.palette[data.class].main
                                                             }
                                                         }
                                                         className={`m-2 d-flex justify-content-between align-content-center rounded-pill badge border border-2 user-select-none border-${data.class} text-${data.class}`}>
                                                        <Typography className={"mx-1"}>
                                                            {data.name}
                                                        </Typography>
                                                        <span className={`material-icons mx-1`}>{data.icon}</span>
                                                    </Box>
                                                )
                                            }
                                        ) : ('')

                                }
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </motion.div>
    )
}

export default Vending;