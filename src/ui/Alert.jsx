import {Box, Typography} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
function Alert({primeColor = 'rgba(232,232,232,0.25)',accentColor = 'rgb(232,232,232)',textColor = '#323232', title, description, className, icon = (<InfoIcon />) }){
    return (
        <Box className={className} sx={{backgroundColor: primeColor, borderColor: accentColor, backdropFilter: "blur(5px)"}}>
            <Box className={"d-flex justify-content-between align-items-center align-content-center"}>
                <Typography sx={{color: textColor}} className={"fw-bold"} fontSize={"1.25rem"}>
                    {
                        title
                    }
                </Typography>
                <Typography sx={{color: textColor}}  className={"fw-bold"} fontSize={"1.25rem"}>
                    {
                        icon
                    }
                </Typography>
            </Box>
            <hr/>
            <Typography sx={{color: textColor}}>
                {
                    description
                }
            </Typography>
        </Box>
    )
}
export default Alert;