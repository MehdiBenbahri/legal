import {Box} from "@mui/material";
import "./Rules.css";
function Rules(){
    return (
        <Box className={"row"}>
            <Box className={"col-sm-12 col-md-11 col-lg-6 d-flex justify-content-evenly align-content-end"}>
                <img alt={"homme main sur bureau"} draggable={true} className={"w-75"} src={"/img/rule.png"} />
            </Box>
            <Box className={"col-sm-12 col-md-11 col-lg-6 d-flex justify-content-evenly align-content-center"}>
                <Box
                    sx={{backgroundColor: "rgba(111,111,111,0.15)", backdropFilter: "blur(5px)"}}
                    className={"w-100 mx-3"}
                >
                    aaaaa
                </Box>
            </Box>

        </Box>
    )
}
export default Rules;