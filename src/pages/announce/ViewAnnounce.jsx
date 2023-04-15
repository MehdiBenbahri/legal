import {Box} from "@mui/material";
import AnnounceDetails from "../../ui/announce/AnnounceDetails.jsx";
import {useEffect, useState} from "react";
import {getAnnounceById} from "../../services/Announce.js";

function ViewAnnounce(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
    const [data,setData] = useState({});

    useEffect(() => {
        if (id && !data.id){
            getAnnounceById(id).then(res => {
                if (res.status === 200){
                    setData(res.data.data[0]);
                }
            })
        }
        else{

        }
    },[data])

    return (
        <Box className={"d-flex justify-content-evenly align-content-center align-items-center"}>
            {
                data.id ?
                    (<AnnounceDetails fullPage={true} className={"bg-light-blur p-5 rounded-3 col-10 mt-3"} data={data} />) :
                    ('')
            }

        </Box>
    )
}
export default ViewAnnounce;