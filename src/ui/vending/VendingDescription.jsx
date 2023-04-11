import {Box, Grow, Tab, Tabs, Typography} from "@mui/material";
import {useState} from "react";

function VendingDescription({className,dataVending}){

    const [step,setStep] = useState('description');

    return (
        <Box className={className}>
            <Tabs value={step} scrollButtons="auto" variant={"scrollable"} onChange={(e,value) => setStep(value)}>
                <Tab value={"description"} label={(
                    <Typography color={"primary"}>
                        Détails
                    </Typography>
                )} />
                <Tab value={"contact"} label={(
                    <Typography color={"primary"}>
                        Contact
                    </Typography>
                )} />
                <Tab value={"help"} label={(
                    <Typography color={"primary"}>
                        Aide
                    </Typography>
                )} />
            </Tabs>
            <br/>
            {
                step ?
                    (
                        <Grow in={step === 'description'}>
                            <Box dangerouslySetInnerHTML={{__html: dataVending.details}}>
                            </Box>
                        </Grow>
                    ) :
                    (
                        step === 'contact' ?
                            (
                                <Grow in={step === 'contact'}>
                                    <Box dangerouslySetInnerHTML={{__html: dataVending.details}}>
                                    </Box>
                                </Grow>
                            ) : (
                                step === 'help' ?
                                    (
                                        <Grow in={step === 'help'}>
                                            <Box dangerouslySetInnerHTML={{__html: dataVending.details}}>
                                            </Box>
                                        </Grow>
                                    ) :
                                    ('')
                            )
                    )
            }



        </Box>
    )
}
export default VendingDescription;