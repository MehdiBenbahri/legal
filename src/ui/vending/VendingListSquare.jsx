import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import {getVending} from "../../services/VendingService.js";
import VendingItem from "./VendingItem.jsx";
import './Vending.css'
function VendingListSquare() {

    const [vending, setVending] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEl, setSelectedEl] = useState(false);

    useEffect(() => {
        if (vending.length === 0) {
            getVending().then(
                (res) => {
                    if (res.status === 200) {
                        setVending(res.data.data)
                        setTimeout(() => {
                            setLoading(false);
                        }, 250)
                    } else {
                        console.log(res)
                    }
                }
            )
        }
    }, [vending, loading])

    function handleSelection(el) {
        if (selectedEl){
            setSelectedEl('');
            setTimeout(() => {
                setSelectedEl(el);
            },200)
        }
        else{
            setSelectedEl(el);
        }
    }

    return (
        <Box className={"d-flex justify-content-center align-content-center"}>
            <Box className={"d-flex flex-wrap justify-content-around align-content-center align-content-center gap-5"}>
                {
                    vending.map((el,index) => {
                        return (
                            <VendingItem key={"vending-list-square-item-" + index} el={el} handleSelection={(el) => handleSelection(el)} isLoading={loading}/>
                        )
                    })
                }
            </Box>
        </Box>
    )
}

export default VendingListSquare;