import {
    Box, Button, IconButton,
    Modal,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import Alert from "./ui/Alert.jsx";
import CloseIcon from '@mui/icons-material/Close';

function RegisterModal({handle}) {
    const theme = useTheme();
    return (
        <Modal open={handle} className={"d-flex justify-content-evenly align-content-center"}>
            <Box
                className={"d-flex flex-column justify-content-center align-items-center align-content-center"}
                sx={{
                    backgroundColor: theme.palette.dark.opacity25,
                    width: "100vw",
                }}
            >
                <Box className={"position-absolute top-0 right-0"}>
                    <Box>
                        <IconButton>
                            <CloseIcon color={"warning"}/>
                        </IconButton>
                    </Box>
                </Box>
                <Typography className={"text-center text-uppercase fw-bold text-light"} fontSize={"2rem"}>
                    Créer un compte Freelance
                </Typography>
                <Typography className={"text-center text-uppercase text-light opacity-75 mx-4"} fontSize={"0.75rem"}>
                    Les comptes Freelances permettent de répondre à des annonces d'organisations
                </Typography>
                <br/>
                <Alert className={'p-3 mx-3 rounded text-light col-sm-12 col-md-6'}
                       title={"Attention"}
                       textColor={theme.palette.light.main}
                       primeColor={theme.palette.warning.opacity25}
                       description={'Ces informations serviront à vous authentifier auprès des organisations. Si vos informations ne correspondent pas, force à vous.'}
                />
                <br/>
                <Box className={"col-sm-12 col-md-6"}>
                    <TextField variant={"outlined"}
                               sx={{backgroundColor: theme.palette.primary.opacity25, backdropFilter: "blur(5px)"}}
                               label={
                                   <Typography className={"text-primary"}>
                                       Pseudo
                                   </Typography>
                               }
                               InputProps={{style: {color: theme.palette.primary.main}}}
                               placeholder={"Votre dénomination avec laquelle les organisations vont vous identifier. (Ex: Cobra, Yaourt)"}
                               className={"w-100 my-2 rounded text-primary"}
                               color={"primary"}/>
                    <TextField variant={"outlined"}
                               sx={{backgroundColor: theme.palette.primary.opacity25, backdropFilter: "blur(5px)"}}
                               label={
                                   <Typography className={"text-primary"}>
                                       Téléphone (In-Game)
                                   </Typography>
                               }
                               InputProps={{style: {color: theme.palette.primary.main}}}
                               placeholder={"xxx-xxxx"}
                               className={"w-100 my-2 rounded text-primary"}
                               color={"primary"}/>
                    <TextField variant={"outlined"}
                               sx={{backgroundColor: theme.palette.primary.opacity25, backdropFilter: "blur(5px)"}}
                               label={
                                   <Typography className={"text-primary"}>
                                       Mot de passe
                                   </Typography>
                               }
                               InputProps={{style: {color: theme.palette.primary.main}}}
                               placeholder={"J'veux pas faire le forceur, mais minimum 10 caractères, une majuscule et des chiffres..."}
                               className={"w-100 my-2 rounded text-primary"}
                               color={"primary"}/>
                </Box>
            </Box>
        </Modal>
    )
}

export default RegisterModal;