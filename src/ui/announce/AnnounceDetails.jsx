import {Box, Button, Collapse, ImageList, ImageListItem, TextField, Typography, useTheme} from "@mui/material";
import moment from "moment";
import {useEffect, useState} from "react";
import {getAnnounceImage} from "../../services/Announce.js";
import {motion} from "framer-motion";
import ImageModal from "../image/ImageModal.jsx";
import AnnounceStatus from "./AnnounceStatus.jsx";
import Skeleton from "@mui/material/Skeleton";

function AnnounceDetails({data, handle, fullPage = false, className}) {
    const theme = useTheme();
    const imageOption = {quality: 75, width: "400", height: "400", withoutEnlargement: false, format: "webp"};
    const [images, setImages] = useState([]);
    const [selectedImg, setSelectedImg] = useState([]);
    const [openImgModal, setOpenImgModal] = useState(false);
    const [openDescription, setOpenDescription] = useState(false);

    useEffect(() => {
        if (data.id && data.images_list.length > images.length) {
            data.images_list.map((el, index) => {
                getAnnounceImage(el.announce_image_id).then((res) => {
                    if (res.status === 200) {
                        setImages((images) => [...images, res.data.data[0]]);
                    }
                })
            })
        }
    }, [data, images])

    return (
        <Box className={className} sx={{overflowY: fullPage ? 'auto' : "scroll", height: fullPage ? 'auto' : "80vh"}}>
            <Box className={"d-flex flex-wrap justify-content-between align-content-center position-relative"}>
                <Box className={"d-flex flex-column justify-content-between align-content-center"}>
                    <Box className={"d-flex justify-content-start align-items-center"}>
                        <Button color={"danger"}
                                size={"small"}
                                variant={"contained"}
                                onClick={() => handle()}
                                className={"rounded-pill text-light fw-bold me-2"}>
                            Fermer <i className="fa-solid fa-xmark mx-2"></i>
                        </Button>
                        <Button color={"info"}
                                size={"small"}
                                variant={"contained"}
                                onClick={() => navigator.clipboard.writeText(window.location.origin + "/announce?id=" + data.id)}
                                className={"rounded-pill fw-bold ms-2"}>
                            Copier Lien <i className="fa-solid fa-link mx-2"></i>
                        </Button>
                        <Box className={"mx-2"}>
                            <AnnounceStatus data={data}/>
                        </Box>
                    </Box>
                    <Typography className={"text-muted fw-bold mt-2"} fontSize={".75rem"}>

                        {
                            `Le : ${data.date_updated ? moment(data.date_updated).format('DD/MM/YYYY HH:mm') : moment(data.date_created).format('DD/MM/YYYY HH:mm')}`
                        }
                    </Typography>
                    <Typography className={"text-dark fw-bold text-uppercase "} fontSize={"1.5rem"}>
                        {
                            data.title
                        }
                    </Typography>
                    <Typography className={"text-muted"} fontSize={"1rem"}>
                        {
                            data.summary
                        }
                    </Typography>
                </Box>
            </Box>
            <Box className={"d-flex flex-wrap justify-content-start align-content-center my-3"}>
                <ImageList cols={Math.round(images.length)}>
                    {
                        images.map((el, index) => {
                            if (index < data.images_list.length) {
                                return (
                                    <ImageListItem variant="woven" onClick={() => {
                                        setSelectedImg(el)
                                        setOpenImgModal(true)
                                    }}
                                                   key={"image-" + el + "-" + data.id + "-" + index}>
                                        <motion.img
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            exit={{opacity: 0}}
                                            height={"100%"}
                                            transition={{duration: 0.25 + (index / 10), delay: 0.25 + (index / 10)}}
                                            draggable={false}
                                            src={import.meta.env.VITE_API_BASE + '/assets/' + el.image + "?" + (new URLSearchParams(imageOption))}
                                            className={"object-fit-cover user-select-none"}
                                            width={"100%"}
                                            alt={data.title + " image #" + data.id}/>
                                    </ImageListItem>
                                )
                            } else {
                                return ('');
                            }
                        })
                    }
                </ImageList>
                <ImageModal open={openImgModal} data={selectedImg} handle={() => setOpenImgModal(false)}></ImageModal>
            </Box>
            <Collapse collapsedSize={150}
                      in={openDescription}
                      className={"bg-light p-4 rounded-3"}>
                <Box dangerouslySetInnerHTML={{__html: data.description}}>
                </Box>
            </Collapse>
            <Box className={"d-flex justify-content-between align-content-center"}>
                <Button className={"fw-bold text-secondary bg-light my-2 px-2 rounded-pill"}
                        onClick={() => setOpenDescription(!openDescription)}
                >
                    {!openDescription ? 'Afficher plus' : 'Afficher moins'} <i
                    className="fa-solid fa-ellipsis px-2 m-2"></i>
                </Button>
            </Box>
            <Typography className={"text-dark fw-bold text-uppercase "} fontSize={"1.5rem"}>
                Information propriétaire
            </Typography>
            <Box className={"d-flex justify-content-between align-items-center align-content-center"}>
                <Box
                    className={"d-flex flex-column justify-content-evenly align-items-center align-content-center w-50"}>
                    <TextField disabled label={"Prénom"} className={"bg-light-blur my-1"}
                               value={data.author_firstname}/>
                    <TextField disabled label={"Nom"} className={"bg-light-blur my-1"} value={data.author_lastname}/>
                </Box>
                <Box className={"w-50"}>
                    {
                        data.author_identity_card ?
                            (
                                <motion.img
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.25}}
                                    width={"100%"}
                                    draggable={false}
                                    src={import.meta.env.VITE_API_BASE + '/assets/' + data.author_identity_card + "?" + (new URLSearchParams(imageOption))}
                                    className={"object-fit-cover rounded-2 user-select-none"}
                                    alt={data.title + " image #" + data.id}/>
                            ) :
                            (<Skeleton variant={"rectangular"}
                                       width={"100%"}
                                       className={"p-2 text-muted d-flex justify-content-center align-items-center align-content-center text-center"}
                                       height={225}>
                                Aucun document d'identité disponible pour cette annonce ! <br/>
                                Attention aux arnaques !
                            </Skeleton>)
                    }

                </Box>
            </Box>
            <Typography className={"text-dark fw-bold text-uppercase "} fontSize={"1.5rem"}>
                Contact
            </Typography>
            {
                data.status === 'finished' || data.status === 'waiting' || data.status === 'cancelled' ?
                    ('L\'offre n\'est malheuresement plus disponible, toutefois en cas de problème nos opérateurs sont à l\'écoute.') :
                    (<Box
                        className={"d-flex flex-wrap justify-content-evenly align-content-center user-select-none mt-2"}>
                        <Box className={"border p-3 rounded bg-success"} sx={{color: theme.palette.dark.opacity75}}>
                            <Typography className={"fw-bolder text-uppercase"}>
                                Pour plus d'informations envoyez un SMS
                            </Typography>
                            <Box className={"text-center fw-bolder font-monospace user-select-all"}>
                                {
                                    data.author_phone
                                }
                            </Box>
                        </Box>
                        {
                            data.author_discord ?
                                (
                                    <Box className={"border p-3 rounded bg-info"}>
                                        <Typography className={"text-light fw-bolder text-uppercase"}>
                                            Vous pouvez aussi contactez via Discord
                                        </Typography>
                                        <Box
                                            className={"text-info text-center fw-bolder font-monospace user-select-all text-light"}>
                                            {
                                                data.author_discord
                                            }
                                        </Box>
                                    </Box>
                                ) :
                                (
                                    <Box className={"border p-3 rounded bg-light opacity-50"}>
                                        <Typography className={"text-dark fw-bolder text-uppercase"}>
                                            Pas de discord disponible
                                        </Typography>
                                        <Box className={"text-info text-center fw-bolder font-monospace text-light"}>
                                            😔
                                        </Box>
                                    </Box>
                                )
                        }

                    </Box>)
            }
        </Box>
    )
}

export default AnnounceDetails;