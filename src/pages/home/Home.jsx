import {Box, Tab, Tabs, Typography, useTheme} from "@mui/material";
import "./Home.css"
import {motion} from "framer-motion"
import {useEffect, useState} from "react";
import {getAnnounce} from "../../services/Announce.js";
import AnnounceCard from "../../ui/announce/AnnounceCard.jsx";
import AnnounceDetails from "../../ui/announce/AnnounceDetails.jsx";

function Home() {

    const [announces, setAnnounces] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [selectedCat, setSelectedCat] = useState(import.meta.env.VITE_DEFAULT_TYPE_ANNOUNCE);
    const [disableChange, setDisableChange] = useState(false);
    const [sidePanel, setSidePanel] = useState(false);
    const [sidePanelData, setSidePanelData] = useState({});

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
                className={`${sidePanel ? 'col-sm-12 col-md-6 col-lg-6' : 'col-12'} bg-light-blur rounded p-3`}>
                <Tabs variant={"scrollable"}
                      value={selectedCat}
                      onChange={(e, val) => {
                          setSelectedCat(val);
                          setLoaded(false);
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
                <Box
                    className={"d-flex flex-wrap justify-content-evenly align-content-center align-items-center"}
                >
                    {
                        announces.map((el, index) => {
                            return (
                                <Box key={"announce-card-" + el.id} className={"m-4"}>
                                    <AnnounceCard data={el} index={index} handleClick={(data) => {
                                        if (!sidePanel){
                                            setSidePanel(!sidePanel);
                                            setSidePanelData(data);
                                        }
                                        else{
                                            setSidePanelData(data);
                                        }
                                    }}/>
                                </Box>
                            )
                        })
                    }
                </Box>
            </motion.div>
            <motion.div
                animate={{width: sidePanel ? "48%" : "0%", display: sidePanel ? "block" : "none",opacity: sidePanel ? 1 : 0}}
                transition={{duration: 0.5}}
                exit={{opacity: 0}}
                className={`${sidePanel ? 'col-sm-12 col-md-6 col-lg-6' : 'col-12'} bg-light-blur rounded py-3`}
            >
                {
                    sidePanelData.id ? <AnnounceDetails data={sidePanelData} /> : ('')
                }
            </motion.div>
        </motion.div>
    )
}

export default Home;