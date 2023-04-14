import {Box, Button, Modal, Typography, useTheme} from "@mui/material";
import {motion} from "framer-motion";

function RecruitmentModal({data, handle, handleOpen}) {
    const theme = useTheme();
    const imageOption = {quality: 100, width: "750", height: "750", withoutEnlargement: true, format: "webp"};
    return (
        <Modal open={handle} sx={{backgroundColor: theme.palette.dark.opacity75}}
               className={"d-flex justify-content-evenly align-items-center align-content-center"}>
            <Box className={"p-3 rounded-3 col-11 col-md-8 col-lg-4"}
                 sx={{backgroundColor: theme.palette.light.main, backdropFilter: "blur(5px)"}}>
                <button className={"btn btn-light bg-danger m-1 rounded-circle position-absolute"}
                        onClick={() => handleOpen(false)}
                        style={{top: "-1rem", right: 0, zIndex: 1000}}
                >
                    <i className="fa-solid fa-xmark text-light"></i>
                </button>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.25}}
                    style={{
                        background: `url(${import.meta.env.VITE_API_BASE + '/assets/' + data.image + "?" + (new URLSearchParams(imageOption))})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100%",
                        height: "20vh",
                    }}/>
                <Box>
                    <Typography className={"text-uppercase fw-bolder"} fontSize={"2rem"}>
                        {
                            data.title
                        }
                    </Typography>
                    <Box className={"text-uppercase text-muted"}
                         sx={{height: "4.5rem", textOverflow: "ellipsis", overflow: "hidden", display: "block"}}
                         fontSize={"1rem"}>
                        {
                            data.description
                        }
                    </Box>
                    <Box sx={{maxHeight: "20rem", overflowY: "scroll"}} className={"my-2"} dangerouslySetInnerHTML={{__html: data.details}}>
                    </Box>
                    <Box className={"row"}>
                        <Box className={"col-sm-12 col-md-6 col-lg-6"}>
                            {
                                data.google_link ?
                                    (
                                        <Button
                                            className={"bg-danger text-light d-flex justify-content-evenly align-items-center align-content-center text-center fw-bolder rounded text-uppercase"}
                                            href={data.google_link}
                                            sx={{height: "6rem"}}>
                                            <Typography fontSize={"1.5rem"} className={"fw-bold"}>
                                                G-Doc à remplir
                                            </Typography>
                                        </Button>
                                    ) : (
                                        <Typography
                                            className={"bg-secondary opacity-25 text-light d-flex justify-content-evenly align-items-center align-content-center text-center fw-bolder rounded text-uppercase"}
                                            fontSize={"1.5rem"}
                                            sx={{height: "6rem"}}>
                                            Aucun formulaire à remplir
                                        </Typography>
                                    )
                            }
                        </Box>
                        <Box className={"col-sm-12 col-md-6 col-lg-6"}>
                            {
                                data.discord_link ?
                                    (
                                        <Button
                                            className={"bg-info text-light d-flex justify-content-evenly align-items-center align-content-center text-center fw-bolder rounded text-uppercase"}
                                            href={data.google_link}
                                            sx={{height: "6rem"}}>
                                            <Typography fontSize={"1.5rem"} className={"fw-bold"}>
                                                Discord
                                            </Typography>
                                        </Button>
                                    ) : (
                                        <Typography
                                            className={"bg-secondary opacity-25 text-light d-flex justify-content-evenly align-items-center align-content-center text-center fw-bolder rounded text-uppercase"}
                                            fontSize={"1.5rem"}
                                            sx={{height: "6rem"}}>
                                            Aucun discord disponible, revenez un peu plus tard...
                                        </Typography>
                                    )
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default RecruitmentModal;