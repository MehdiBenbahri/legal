import {Box, Tooltip, useTheme} from "@mui/material";

function AnnounceStatus({data}) {
    const theme = useTheme();
    return (
        <Tooltip className={"user-select-none shadow-sm"} title={`${data.status === "published" ? 'L\'offre est valable' : ''} 
                                       ${data.status === "waiting" ? 'L\'offre est en cours...' : ''}
                                       ${data.status === "finished" ? 'L\'offre n\'est plus valable car terminée' : ''}
                                       ${data.status === "cancelled" ? 'L\'offre n\'est plus valable car annulée' : ''}`}>
            <Box className={`badge ${data.status === "published" ? 'bg-success' : ''} 
                                       ${data.status === "waiting" ? 'bg-info text-light' : ''}
                                       ${data.status === "finished" ? 'bg-primary' : ''}
                                       ${data.status === "cancelled" ? 'bg-danger' : ''} text-uppercase`}
                 sx={{color: theme.palette.dark.opacity75}}>
                {
                    data.status === "published" ? 'publiée' : ''
                }
                {
                    data.status === "waiting" ? 'en cours' : ''
                }
                {
                    data.status === "finished" ? 'expirée' : ''
                }
                {
                    data.status === "cancelled" ? 'annulée' : ''
                }
            </Box>
        </Tooltip>
    )
}

export default AnnounceStatus;