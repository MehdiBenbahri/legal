import {Box, Button} from "@mui/material";
import Slider from "react-slick";
import {useEffect, useState} from "react";
import {getAdvise} from "../../services/Advise.js";
import {motion} from "framer-motion";
import moment from "moment";

function Advise() {

    const [data, setData] = useState([]);
    const imageOption = {quality: 100, withoutEnlargement: true, format: "webp"};

    useEffect(() => {
        if (data.length === 0) {
            getAdvise().then((res) => {
                if (res.status === 200) {
                    setData(res.data.data);
                }
            });
        }
    }, [data])

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnFocus: true,
    };

    return (
        <>
            {
                data.filter(el => moment().isBetween(moment(el.start).add(-1, 'DAY'), moment(el.end))).length > 0 ?
                    (<Box className={"p-3"}>
                        <Slider {...settings}>
                            {
                                data.filter(el => moment().isBetween(moment(el.start).add(-1, 'DAY'), moment(el.end))).map((el) => {
                                    return (
                                        <Button href={(el.id_announce ? '/announce?id=' + el.id_announce : '#')}
                                                disableRipple={true} key={"advise-carousel-item" + el.id}
                                                className={"rounded-3"}>
                                            <motion.div
                                                initial={{opacity: 0}}
                                                animate={{opacity: 1}}
                                                exit={{opacity: 0}}
                                                transition={{duration: 0.25}}
                                                className={"rounded-3"}
                                                style={{
                                                    background: `url(${import.meta.env.VITE_API_BASE + '/assets/' + el.image + "?" + (new URLSearchParams(imageOption))})`,
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundPosition: "center",
                                                    backgroundSize: "contain",
                                                    height: "12rem",
                                                }}/>
                                        </Button>
                                    )
                                })
                            }
                        </Slider>
                    </Box>) :
                    ('')
            }

        </>
    )
}

export default Advise;