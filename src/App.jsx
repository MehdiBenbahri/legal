import './App.css'
import {Route, Routes, useLocation} from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import Home from "./pages/home/Home.jsx";
import Vending from "./pages/vending/Vending.jsx";
import Rules from "./pages/rules/Rules.jsx";
import Join from "./pages/join/Join.jsx";
import {AnimatePresence} from "framer-motion"

function App() {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route exact path="/" element={<Layout><Home/></Layout>}/>
                <Route exact path="/vending" element={<Layout><Vending/></Layout>}/>
                <Route exact path="/rules" element={<Layout><Rules/></Layout>}/>
                <Route exact path="/join" element={<Layout><Join/></Layout>}/>
            </Routes>
        </AnimatePresence>
    )
}

export default App
