import {Box, Tooltip, useTheme} from "@mui/material";

function AnnounceStatus({data}) {
    const theme = useTheme();
    return (
        <Tooltip className={"user-select-none"} title={`${data.status === "published" ? 'L\'offre est valable' : ''} 
                                       ${data.status === "waiting" ? 'L\'offre est en cours de négociation' : ''}
                                       ${data.status === "finished" ? 'L\'offre n\'est plus valable car terminée' : ''}
                                       ${data.status === "cancelled" ? 'L\'offre n\'est plus valable car annulée' : ''}`}>
            <Box className={`badge ${data.status === "published" ? 'bg-success' : ''} 
                                       ${data.status === "waiting" ? 'bg-warning' : ''}
                                       ${data.status === "finished" ? 'bg-primary' : ''}
                                       ${data.status === "cancelled" ? 'bg-danger' : ''} text-uppercase`}
                 sx={{color: theme.palette.dark.opacity75}}>
                {
                    data.status === "published" ? 'publiée' : ''
                }
                {
                    data.status === "waiting" ? 'en attente' : ''
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