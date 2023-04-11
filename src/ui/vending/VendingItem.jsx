import {Box, Button, Fade, Typography, useTheme} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

function VendingItem({el, isLoading = true,handleSelection}) {
    const theme = useTheme();
    const imageOption = {quality:50, width: "400", height : "400",withoutEnlargement : true, format: "webp"};
    return (
        <Button className={"m-3"}
                disableRipple={true}
                href={"/vending?id=" + el.id}
                onClick={(el) => handleSelection(el)}>
            {
                isLoading ?
                    (
                        <Fade in={isLoading}>
                            <Box className={"d-flex flex-column justify-content-between align-content-center"}>
                                <Skeleton variant={"rectangular"} className={"rounded-2"}
                                          sx={{
                                              width: "18rem",
                                              height: "18rem",
                                              bgcolor: 'grey.800'
                                          }}>
                                </Skeleton>
                                <Box className={"d-flex justify-content-between align-items-center"}>
                                    <Skeleton sx={{bgcolor: 'grey.800'}} width={"50%"} height={30}/>
                                    <Skeleton sx={{bgcolor: 'grey.800'}} width={"25%"} height={30}/>
                                </Box>
                                <Box className={"d-flex justify-content-between align-items-center"}>
                                    <Skeleton sx={{bgcolor: 'grey.800'}} width={"100%"} height={15}/>
                                </Box>
                            </Box>
                        </Fade>
                    ) :
                    (
                        <Fade in={!isLoading}>
                            <Box className={"d-flex flex-column justify-content-between align-content-center"}>
                                <Box key={"vending-card-" + el.id} className={"bg-dark rounded-2 grid-item"}>
                                    <Box className={"grid-item"}>
                                        <img className={"object-fit-cover rounded-2 user-select-none"} width={"100%"}
                                             height={"100%"}
                                             alt={el.title}
                                             draggable={false}
                                             src={import.meta.env.VITE_API_BASE + '/assets/' + el.image_id + "?" + (new URLSearchParams(imageOption))}/>
                                    </Box>
                                    <Box className={"d-flex justify-content-between align-items-center mt-2 text-light"}>
                                        <Typography className={"fw-bold text-truncate"}>
                                            {el.title}
                                        </Typography>
                                        <Typography>
                                            {
                                                new Intl.NumberFormat("en-US", {
                                                    style: "currency",
                                                    currency: "USD"
                                                }).format(
                                                    el.price,
                                                )
                                            }
                                        </Typography>
                                    </Box>
                                    <Box className={"d-flex justify-content-between align-items-center"}>
                                        <Typography fontSize={"0.75rem"} className={"text-muted text-start font-monospace"}>
                                            {
                                                el.description
                                            }
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Fade>
                    )
            }
        </Button>
    )
}

export default VendingItem;