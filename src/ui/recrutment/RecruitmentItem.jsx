import {Box, IconButton, Typography, useTheme} from "@mui/material";
import {motion} from "framer-motion";
import SearchIcon from '@mui/icons-material/Search';
import RecruitmentModal from "./RecruitmentModal.jsx";
import {useState} from "react";

function RecruitmentItem({data}) {
    const theme = useTheme();
    const [openModal, setOpenModal] = useState(false);
    const imageOption = {quality: 50, width: "500", height: "500", withoutEnlargement: true, format: "webp"};

    return (
        <Box
            className={"bg-light-blur w-100 p-2 rounded-3 d-flex flex-wrap justify-content-between align-content-center align-items-center my-2 shadow-sm"}>
            <Box>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.25}}
                    style={{
                        background: `url(${import.meta.env.VITE_API_BASE + '/assets/' + data.image + "?" + (new URLSearchParams(imageOption))})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        height: "12rem",
                    }}/>
                <Box className={"ps-2 d-flex flex-column justify-content-between align-content-center"}>
                    <Box className={"d-flex justify-content-between align-items-center align-content-center"}>
                        <Box className={"d-flex justify-content-between align-items-start"}>
                            <Typography className={"text-uppercase fw-bolder"} fontSize={"2rem"}>
                                {
                                    data.title
                                }
                            </Typography>
                            <Typography className={"text-uppercase text-muted ms-2"} fontSize={"0.75rem"}>
                                #{
                                data.id
                            }
                            </Typography>
                        </Box>

                        <Box
                            className={"d-flex justify-content-between align-content-center align-items-center rounded-pill my-3"}
                            sx={{backgroundColor: theme.palette.primary.opacity25}}
                        >
                            <IconButton aria-label="details"
                                        onClick={() => setOpenModal(true)}
                                        variant={"contained"}
                                        className={"fw-bolder d-flex justify-content-between align-items-center"}
                                        color="info">
                                <Typography className={"fw-bold d-none d-xl-block"}>
                                    Voir plus
                                </Typography>
                                <SearchIcon className={"ms-0 ms-xl-1"}/>
                            </IconButton>
                        </Box>
                    </Box>
                    <Box className={"text-uppercase text-secondary"}
                         sx={{height: "4.5rem", textOverflow: "ellipsis", overflow: "hidden", display: "block"}}
                         fontSize={"0.75rem"}>
                        {
                            data.description
                        }
                    </Box>
                </Box>
            </Box>
            <RecruitmentModal
                handleOpen={(e) => {
                    setOpenModal(e);
                }} data={data} handle={openModal}/>
        </Box>
    )
}

export default RecruitmentItem;