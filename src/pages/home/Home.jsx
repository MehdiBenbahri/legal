import {Box} from "@mui/material";
import "./Home.css"
import CategoriesList from "../../ui/CategoriesList.jsx";
import VendingListSquare from "../../ui/vending/VendingListSquare.jsx";
import {motion} from "framer-motion"

function Home() {

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <Box>
                <CategoriesList/>
            </Box>
            <Box>
                <VendingListSquare/>
            </Box>
        </motion.div>
    )
}

export default Home;