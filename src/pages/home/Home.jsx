import {Box, Button, Tab, Tabs, TextField, Typography, useTheme} from "@mui/material";
import "./Home.css"
import {motion} from "framer-motion"
import {useEffect, useState} from "react";
import {getAnnounce} from "../../services/Announce.js";
import AnnounceCard from "../../ui/announce/AnnounceCard.jsx";
import AnnounceDetails from "../../ui/announce/AnnounceDetails.jsx";

function Home() {
    const theme = useTheme();
    const [announces, setAnnounces] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [selectedCat, setSelectedCat] = useState(import.meta.env.VITE_DEFAULT_TYPE_ANNOUNCE);
    const [disableChange, setDisableChange] = useState(false);
    const [sidePanel, setSidePanel] = useState(false);
    const [sidePanelData, setSidePanelData] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setDisableChange(true);
            getAnnounce(selectedCat).then((res) => {
                if (res.status === 200) {
                    setAnnounces(res.data.data);
                } else {
                    console.log(res)
                }
                setLoaded(true);
            })
            setTimeout(() => {
                setDisableChange(false);
            }, 500)
        }
    }, [announces, loaded])

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.25}}
            className={"row justify-content-between rounded m-3  "}
        >
            <motion.div
                animate={{width: sidePanel ? "50%" : "100%"}}
                transition={{duration: 0.15}}
                className={`${sidePanel ? 'col-sm-12 col-md-6 col-lg-6 d-none d-md-block' : 'col-12'} bg-light-blur rounded p-3`}>
                <Box className={"d-flex flex-wrap justify-content-between align-content-center"}>
                    <Tabs variant={"scrollable"}
                          value={selectedCat}
                          onChange={(e, val) => {
                              setSelectedCat(val);
                              setLoaded(false);
                              setSidePanel(false);
                          }}
                          scrollButtons={"auto"}
                          allowScrollButtonsMobile={true}>
                        <Tab disabled={disableChange} value={"vehicle"} label={
                            <Typography>
                                Vehicule
                                <i className="fa-solid fa-car mx-2"></i>
                            </Typography>
                        }/>
                        <Tab disabled={disableChange} value={"propertie"} label={
                            <Typography>
                                Immobilier
                                <i className="fa-solid fa-building mx-2"></i>
                            </Typography>
                        }/>
                        <Tab disabled={disableChange} value={"other"} label={
                            <Typography>
                                Autre
                                <i className="fa-solid fa-question mx-2"></i>
                            </Typography>
                        }/>
                    </Tabs>
                    <Box className={"d-flex justify-content-between align-content-center align-items-center my-2"}>
                        <TextField variant={"outlined"}
                                   className={"shadow-sm"}
                                   value={searchValue}
                                   onChange={(e) => setSearchValue(e.target.value)}
                                   disabled={disableChange}
                                   placeholder={"Kamacho, appartement, maison..."}
                                   size={"small"}/>
                        <Button variant={"contained"}
                                disabled={disableChange}
                                onClick={() => {
                                    setAnnounces(announces.filter(el => el.title.includes(searchValue)));
                                    setIsSearching(true);
                                }}
                                className={"ms-2"}
                        >
                            Recherche
                        </Button>
                        {
                            isSearching ?
                                (
                                    <Button variant={"contained"}
                                            color={"danger"}
                                            onClick={() => {
                                                setSearchValue('');
                                                setLoaded(false);
                                                setIsSearching(false);
                                            }}
                                            disabled={disableChange}
                                            className={"ms-2 text-light"}
                                    >
                                        Reset
                                    </Button>
                                ) :
                                ('')
                        }

                    </Box>
                </Box>
                <Box
                    className={"d-flex flex-wrap justify-content-evenly align-content-center align-items-center"}
                >
                    {
                        announces.map((el, index) => {
                            return (
                                <motion.div
                                    initial={{scale: 1}}
                                    animate={sidePanel && (el.id === sidePanelData.id) ? {scale: 0.95} : {scale: 1}}
                                    exit={{scale: 1}}
                                    transition={{duration: 0.25}}
                                    key={"announce-card-" + el.id}
                                    className={"m-4 position-relative"}>
                                    {
                                        sidePanel && (el.id === sidePanelData.id) ?
                                            (
                                                <motion.button
                                                    initial={{opacity: 0}}
                                                    animate={{opacity: 1}}
                                                    exit={{opacity: 0}}
                                                    transition={{duration: 0.25}}
                                                    style={{
                                                        backgroundColor: theme.palette.light.main,
                                                        backdropFilter: "blur(5px)"
                                                    }}
                                                    disabled
                                                    className={"btn text-muted position-absolute border-0 top-0 m-1 rounded-circle"}>
                                                    <i className="fa-solid fa-check"></i>
                                                </motion.button>
                                            ) : ('')
                                    }
                                    <AnnounceCard data={el} index={index} handleClick={(data) => {
                                        if (!sidePanel) {
                                            setSidePanel(!sidePanel);
                                            setSidePanelData(data);
                                        } else {
                                            setSidePanelData(data);
                                        }
                                    }}/>
                                </motion.div>
                            )
                        })
                    }
                </Box>
            </motion.div>
            <motion.div
                animate={{width: "", display: sidePanel ? "block" : "none", opacity: sidePanel ? 1 : 0}}
                transition={{duration: 0.15}}
                exit={{opacity: 0}}
                className={`${sidePanel ? 'side-panel position-fixed' : 'w-100'} bg-light-blur rounded py-3`}
            >
                {
                    sidePanelData.id ? <AnnounceDetails data={sidePanelData} handle={() => setSidePanel(false)}/> : ('')
                }
            </motion.div>
        </motion.div>
    )
}

export default Home;