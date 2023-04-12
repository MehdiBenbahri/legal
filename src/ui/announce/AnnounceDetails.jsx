import {Box, Typography} from "@mui/material";
import moment from "moment";
import {useEffect, useState} from "react";
import {getAnnounceImage} from "../../services/Announce.js";
import {motion} from "framer-motion";

function AnnounceDetails({data}){

    const [images,setImages] = useState([]);

    useEffect(() => {
        setImages([]);
        if (data.id){
            data.images_list.map((el,index) => {
                getAnnounceImage(el.announce_image_id).then((res) => {
                    if (res.status === 200){
                        setImages((images) =>[...images, res.data.data[0].image]);
                    }
                })
            })
        }
    },[data])

    return (
        <Box>
            <Box className={"d-flex flex-column justify-content-between align-content-center"}>
                <Typography className={"text-muted fw-bold"} fontSize={".75rem"}>

                    {
                        `Le : ${moment(data.date_created).format('DD/MM/YYYY HH:mm')}`
                    }
                </Typography>
                <Typography className={"text-dark fw-bold text-uppercase "} fontSize={"1.5rem"}>
                    {
                        data.title
                    }
                </Typography>
                <Typography className={"text-muted fw-bold text-uppercase "} fontSize={"1rem"}>
                    {
                        data.summary
                    }
                </Typography>
            </Box>
            <Box className={"d-flex flex-wrap justify-content-start align-content-center"}>
                {
                    images.map((el, index) => {
                            return (
                                <motion.img
                                    key={"image-" + el + "-" + data.id + "-" + index}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.25 + (index / 10), delay: 0.25 + (index / 10)}}
                                    draggable={false}
                                    src={import.meta.env.VITE_API_BASE + '/assets/' + el}
                                    className={"object-fit-cover user-select-none"}
                                    width={250}
                                    height={250}
                                    alt={data.title + " image #" + data.id}/>
                            )
                    })
                }
            </Box>
        </Box>
    )
}
export default AnnounceDetails;