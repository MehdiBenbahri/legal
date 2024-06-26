import {Box, Modal, Typography, useTheme} from "@mui/material";
import {motion} from "framer-motion";

function ImageModal({open, data, handleChangeImg, handle}) {
    const theme = useTheme();
    const imageOption = {quality: 100, withoutEnlargement: true, format: "webp"};
    return (
        <Modal open={open} className={"d-flex justify-content-evenly align-items-center align-content-center"}>
            <Box className={"p-3 rounded-3 col-11"} sx={{backgroundColor: theme.palette.light.opacity50,backdropFilter: "blur(5px)"}}>
                <button className={"btn btn-light bg-light m-1 rounded-circle position-absolute"}
                        onClick={() => handle()}
                        style={{top: 0, right: 0, zIndex: 1000}}
                >
                    <i className="fa-solid fa-xmark text-dark"></i>
                </button>
                <button className={"btn btn-light bg-light m-1 rounded-circle position-absolute"}
                        onClick={() => handleChangeImg(1)}
                        style={{top: "50%", right: 0, zIndex: 1000}}
                >
                    <i className="fa-solid fa-chevron-right text-dark"></i>
                </button>
                <button className={"btn btn-light bg-light m-1 rounded-circle position-absolute"}
                        onClick={() => handleChangeImg(-1)}
                        style={{top: "50%", left: 0, zIndex: 1000}}
                >
                    <i className="fa-solid fa-angle-left"></i>
                </button>
                <Box
                    className={"d-flex flex-column justify-content-center align-content-center align-items-center text-center"}>
                    {
                        data.announce_image_id ?
                            (
                                <motion.img
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.25}}
                                    draggable={false}
                                    style={{maxWidth: "125vh"}}
                                    src={import.meta.env.VITE_API_BASE + '/assets/' + data.announce_image_id.image + "?" + (new URLSearchParams(imageOption))}
                                    className={"object-fit-cover user-select-none col-sm-12 rounded"}
                                    alt={data.title + " image #" + data.id}/>
                            ) : ('')
                    }
                    <Box
                    >
                        <Typography className={"text-dark fw-bold"}
                                    fontSize={"1.5rem"}
                        >
                            {
                                data.announce_image_id.title
                            }
                        </Typography>
                        <Typography className={"text-dark"}
                        >
                            {
                                data.announce_image_id.description
                            }
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default ImageModal;