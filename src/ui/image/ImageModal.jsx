import {Box, Button, Modal, Typography, useTheme} from "@mui/material";
import {motion} from "framer-motion";

function ImageModal({open, data, handle}) {
    const theme = useTheme();
    const imageOption = {quality: 100, width: 1000, height: 1000, withoutEnlargement: true, format: "png"};
    return (
        <Modal open={open} className={"d-flex justify-content-evenly align-items-center align-content-center"}>
            <Box>
                <button className={"btn btn-light bg-light m-1 rounded-circle position-absolute"}
                        onClick={() => handle()}
                        style={{top: 0, right: 0, zIndex: 1000}}
                >
                    <i className="fa-solid fa-xmark text-dark"></i>
                </button>
                <Box
                    className={"position-relative d-flex flex-column justify-content-center align-content-center align-items-center"}>
                    <motion.img
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.25}}
                        draggable={false}
                        style={{maxWidth: "50%"}}
                        src={import.meta.env.VITE_API_BASE + '/assets/' + data.image + "?" + (new URLSearchParams(imageOption))}
                        className={"object-fit-cover user-select-none"}
                        alt={data.title + " image #" + data.id}/>
                    <Box sx={{
                        height: "6rem",
                        maxWidth: "50%",
                        bottom: 0,
                        backgroundColor: theme.palette.light.opacity75,
                        backdropFilter: "blur(5px)",
                        overflowY: "scroll"
                    }}
                    >
                        <Typography className={"text-dark fw-bold px-2"}
                                    fontSize={"1.5rem"}
                        >
                            {
                                data.title
                            }
                        </Typography>
                        <Typography className={"text-muted px-2"}
                        >
                            {
                                data.description
                            }
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default ImageModal;