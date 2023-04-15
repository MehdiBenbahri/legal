import './App.css'
import {Route, Routes, useLocation} from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import Home from "./pages/home/Home.jsx";
import {AnimatePresence} from "framer-motion"
import ViewAnnounce from "./pages/announce/ViewAnnounce.jsx";
import Recruitment from "./pages/recruitment/Recruitment.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route exact path="/" element={<Layout><Home/></Layout>}/>
                <Route exact path="/recruitment" element={<Layout><Recruitment/></Layout>}/>
                <Route exact path="/announce" element={<Layout><ViewAnnounce/></Layout>}/>
            </Routes>
        </AnimatePresence>
    )
}

export default App
