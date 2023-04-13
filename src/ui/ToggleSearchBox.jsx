import {Box, Button, TextField, useTheme} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useState} from "react";

function ToggleSearchBox({className}) {
    const theme = useTheme();
    const [openSearch, setOpenSearch] = useState(false);

    return (
        <Box className={className} sx={{backgroundColor: theme.palette.light.opacity75, backdropFilter: 'blur(5px)'}}>
            <Box>
                <Button className={"text-muted p-3"}
                        onClick={() => {
                            setOpenSearch(!openSearch);
                        }}
                        fontSize={"0.25rem"}
                        sx={{borderTopLeftRadius: '20rem', borderBottomLeftRadius: '20rem'}}>
                    <SearchIcon/>
                </Button>
            </Box>
            <TextField className={"w-100 pe-3"}
                       size={"small"}
                       placeholder={"Ex: Blanchiment d'argent, mercenariat, corruption"}
                       inputProps={
                           {
                               sx: {color: theme.palette.dark.main},
                           }
                       }
                       sx={{
                           backgroundColor: 'transparent'
                       }}
                       fullWidth/>
        </Box>
    )
}

export default ToggleSearchBox;