import {Box, Button, Collapse, ImageList, ImageListItem, TextField, Typography, useTheme} from "@mui/material";
import moment from "moment";
import {useEffect, useState} from "react";
import {getAnnounceAllImage, getAnnounceImage} from "../../services/Announce.js";
import {motion} from "framer-motion";
import ImageModal from "../image/ImageModal.jsx";
import AnnounceStatus from "./AnnounceStatus.jsx";
import Skeleton from "@mui/material/Skeleton";

function AnnounceDetails({data, handle, fullPage = false, className}) {
    const theme = useTheme();
    const imageOption = {quality: 75, width: "400", height: "400", withoutEnlargement: false, format: "webp"};
    const [images, setImages] = useState([]);
    const [selectedImg, setSelectedImg] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState('');
    const [openImgModal, setOpenImgModal] = useState(false);
    const [openDescription, setOpenDescription] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);

    useEffect(() => {
        let shouldReset = false;
        images.map(el => {
            if (!shouldReset) {
                shouldReset = el.announce_id !== data.id
            }
        })
        if (shouldReset) {
            setImages([]);
        }
        if ((images.length === 0 && data.id) || shouldReset) {
            getAnnounceAllImage(data.id).then((res) => {
                if (res.status === 200) {
                    setImages(res.data.data);
                }
                shouldReset = false;
            });
        }
    }, [data]);

    return (
        <Box className={className} sx={{overflowY: fullPage ? 'auto' : "scroll", height: "auto"}}>
            <Box className={"d-flex flex-wrap justify-content-between align-content-center position-relative"}>
                <Box className={"d-flex flex-column justify-content-between align-content-center w-100"}>
                    <Box className={"d-flex flex-wrap justify-content-start align-items-center"}>
                        <Button color={"warning"}
                                size={"small"}
                                variant={"contained"}
                                onClick={() => handle()}
                                sx={{color: theme.palette.light.opacity75}}
                                className={"rounded-pill fw-bold me-2"}>
                            <span className={"d-none d-md-block"}>Fermer</span> <i className="fa-solid fa-xmark ms-0 ms-md-2"></i>
                        </Button>
                        <Button color={"info"}
                                size={"small"}
                                variant={"contained"}
                                onClick={() => navigator.clipboard.writeText(window.location.origin + "/announce?id=" + data.id)}
                                sx={{color: theme.palette.light.opacity75}}
                                className={"rounded-pill fw-bold ms-2"}>
                            <span className={"d-none d-md-block"}>Copier Lien</span> <i className="fa-solid fa-link ms-0 ms-md-2"></i>
                        </Button>
                        <Button color={"primary"}
                                size={"small"}
                                variant={"contained"}
                                href={'#contact-' + data.id}
                                sx={{color: theme.palette.light.opacity75}}
                                className={"rounded-pill fw-bold ms-2"}>
                            <span className={"d-none d-md-block"}>Contact</span> <i className="fa-solid fa-phone ms-0 ms-md-2"></i>
                        </Button>
                        <Box className={"mx-2"}>
                            <AnnounceStatus data={data}/>
                        </Box>
                        {
                            data.is_company ?
                                (
                                    <Box
                                        className={"d-flex justify-content-between align-content-center align-items-center"}>
                                        <Typography className={"me-2 text-muted fw-light fst-italic"}>
                                            Annonce sponsorisé par {data.author_firstname} {data.author_lastname}
                                        </Typography>
                                        <motion.img
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            exit={{opacity: 0}}
                                            transition={{duration: 0.25}}
                                            width={"35rem"}
                                            draggable={false}
                                            src={import.meta.env.VITE_API_BASE + '/assets/' + data.author_identity_card + "?" + (new URLSearchParams(imageOption))}
                                            className={"object-fit-cover rounded-circle user-select-none"}
                                            alt={data.title + " image #" + data.id}/>
                                    </Box>
                                ) : ('')
                        }
                    </Box>
                    <Typography className={"text-muted fw-bold mt-2"} fontSize={".75rem"}>

                        {
                            `Le : ${data.date_updated ? moment(data.date_updated).format('DD/MM/YYYY HH:mm') : moment(data.date_created).format('DD/MM/YYYY HH:mm')}`
                        }
                    </Typography>
                    <Box className={"d-flex justify-content-between align-items-center align-content-center"}>
                        <Box>
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
                        <Box
                            className={"d-flex flex-column justify-content-between align-content-end align-items-end "}>
                            <Typography className={"text-dark fw-bold text-uppercase "} fontSize={"1.5rem"}>
                                {
                                    data.price ? new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD'
                                    }).format(data.price) : "----"
                                }
                            </Typography>
                            <Typography className={"text-muted"} fontSize={"1rem"}>
                                {data.price_comment}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className={"d-flex flex-wrap justify-content-start align-content-center my-3"}>
                <ImageList cols={Math.round(images.length)}>
                    {
                        images.map((el, index) => {
                            return (
                                <ImageListItem variant="woven" onClick={() => {
                                    setSelectedIndex(index);
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
                                        src={import.meta.env.VITE_API_BASE + '/assets/' + el.announce_image_id.image + "?" + (new URLSearchParams(imageOption))}
                                        className={"object-fit-cover user-select-none"}
                                        width={"100%"}
                                        alt={data.title + " image #" + data.id}/>
                                </ImageListItem>
                            )
                        })
                    }
                </ImageList>
                {
                    selectedImg.announce_image_id ? (<ImageModal open={openImgModal}
                                                                 data={selectedImg}
                                                                 handleChangeImg={(e) => {
                                                                     if (e > 0){
                                                                         if (images.length > selectedIndex + e){
                                                                             setSelectedIndex(selectedIndex + e);
                                                                             setSelectedImg(images[selectedIndex + e]);
                                                                         }
                                                                         else{
                                                                             setSelectedIndex(0);
                                                                             setSelectedImg(images[0]);
                                                                         }
                                                                     }
                                                                     else{
                                                                         if (selectedIndex > 0){
                                                                             setSelectedIndex(selectedIndex + e);
                                                                             setSelectedImg(images[selectedIndex + e]);
                                                                         }
                                                                         else{
                                                                             setSelectedIndex(images.length - 1);
                                                                             setSelectedImg(images[images.length - 1]);
                                                                         }
                                                                     }
                                                                 }
                                                                 }
                                                                 handle={() => setOpenImgModal(false)}></ImageModal>) : ('')
                }
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
            {
                !data.is_company ? (
                    <Typography className={"text-dark fw-bold text-uppercase "} fontSize={"1.5rem"}>
                        Information propriétaire
                    </Typography>
                ) : ('')
            }

            <Box className={"d-flex justify-content-between align-items-center align-content-center"}>
                {
                    data.is_company ?
                        (
                            <Typography dangerouslySetInnerHTML={{__html: data.complement}}>
                            </Typography>
                        ) :
                        (
                            <>
                                <Box
                                    className={"d-flex flex-column justify-content-evenly align-items-center align-content-center w-50"}>
                                    <TextField disabled label={"Prénom"} className={"bg-light-blur my-1"}
                                               value={data.author_firstname}/>
                                    <TextField disabled label={"Nom"} className={"bg-light-blur my-1"}
                                               value={data.author_lastname}/>
                                </Box>
                                <Box className={!data.is_company ? "w-50" : 'w-100'}>
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
                            </>
                        )
                }
            </Box>
            <Typography className={"text-dark fw-bold text-uppercase "} fontSize={"1.5rem"}>
                {!data.is_company ? 'Contact' : 'Information complémentaire'}
            </Typography>
            {
                data.status === 'finished' || data.status === 'waiting' || data.status === 'cancelled' ?
                    (data.type !== 'tombola' ? 'L\'offre n\'est malheuresement plus disponible, toutefois en cas de problème nos opérateurs sont à l\'écoute.' : (
                        <Box dangerouslySetInnerHTML={{__html: data.complement}}/>
                    )) :
                    (<Box
                        id={'contact-' + data.id}
                        className={"d-flex flex-wrap justify-content-evenly align-content-center user-select-none mt-2"}>
                        <Box className={"border p-3 rounded bg-success"} sx={{color: theme.palette.dark.opacity75}}>
                            <Typography className={"fw-bolder text-uppercase"}>
                                {
                                    data.author_phone !== 'xxx-xxxxx' ? 'Pour plus d\'informations envoyez un SMS' : 'Pour plus d\'informations, rendez vous au'
                                }
                            </Typography>
                            <Box className={"text-center fw-bolder font-monospace user-select-all"}>
                                {
                                    data.author_phone !== 'xxx-xxxxx' ? data.author_phone : data.author_firstname + ' ' + data.author_lastname
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