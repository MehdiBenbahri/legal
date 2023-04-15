import {Box} from "@mui/material";
import Navbar from "./Navbar.jsx";
import Advise from "../ui/advise/Advise.jsx";

function Layout({children}) {
    return (
        <Box className={"row flex-column justify-content-start align-items-center align-content-between overflow-x-hidden"}>
            <Navbar />
            <Advise />
            <Box>
                {children}
            </Box>
        </Box>
    )
}

export default Layout;