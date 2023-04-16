import {Box, Tooltip, Typography} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import {useEffect, useState} from "react";
import {getAnnounceImage} from "../../services/Announce.js";
import {motion} from "framer-motion"
import AnnounceStatus from "./AnnounceStatus.jsx";

function AnnounceCard({data, index, handleClick}) {

    const imageOption = {quality: 50, width: "400", height: "400", withoutEnlargement: true, format: "webp"};
    const [isMainLoaded, setIsMainLoaded] = useState(false);
    const [mainImage, setMainImage] = useState('#');

    useEffect(() => {
        if (data.images_list.length > 0) {
            setTimeout(() => {
                getAnnounceImage(data.images_list[0].announce_image_id).then((res) => {
                    if (res.status === 200 && res.data.data[0]) {
                        setMainImage(res.data.data[0].image);
                        setIsMainLoaded(true);
                    } else {
                        setIsMainLoaded(false);
                    }
                });
            }, 200 + (index * 120));
        }
    }, [])

    return (
        <Box onClick={() => handleClick(data)}>
            {
                !isMainLoaded ?
                    (
                        <Skeleton variant={"rectangular"}
                                  className={"rounded"}
                                  width={250}
                                  height={250}>
                        </Skeleton>
                    ) :
                    (
                        <motion.img
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.25}}
                            draggable={false}
                            className={`object-fit-cover rounded-2 user-select-none ${data.status === 'finished' ? 'opacity-75' : ''}`}
                            src={import.meta.env.VITE_API_BASE + '/assets/' + mainImage + "?" + (new URLSearchParams(imageOption))}
                            width={250}
                            height={250}
                            alt={data.title + " image #" + data.id}/>
                    )
            }
            {
                data.is_company ? (
                        <Tooltip title={"Annonce sponsorisé par " + data.author_firstname} className={"top-0 end-0 position-absolute"}>
                            <motion.img
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{duration: 0.25}}
                                width={"30rem"}
                                height={"30rem"}
                                draggable={false}
                                src={import.meta.env.VITE_API_BASE + '/assets/' + data.author_identity_card + "?" + (new URLSearchParams(imageOption))}
                                className={"object-fit-cover user-select-none bg-light rounded-circle m-2 p-1"}
                                alt={data.title + " image #" + data.id}/>
                        </Tooltip>
                    )
                    :
                    ('')
            }

            <Box sx={{maxWidth: 250}}>
                <Typography className={"text-dark text-truncate  fw-bolder mt-2"}>
                    {data.title ? data.title : "----"}
                </Typography>
                <Typography className={"text-muted text-truncate"}
                            fontSize={"0.85rem"}>
                    {data.summary ? data.summary : "----"}
                </Typography>
                <Box className={"d-flex justify-content-between align-content-center align-items-center"}>
                    <Typography className={"text-dark text-truncate fw-bolder"}>
                        {data.price ? new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                        }).format(data.price) : "----"}
                    </Typography>
                    <AnnounceStatus data={data} />
                </Box>
            </Box>
        </Box>
    )
}

export default AnnounceCard;