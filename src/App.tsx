import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomeContainer from "./Pages/Home/HomeContainer"
import NotFound from "./Pages/NotFound/NotFound"
import RepContainer from "./Pages/Rep/RepContainer"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeContainer/>} />
                <Route path="/rep/:owner/:repoName" element={<RepContainer/>} />
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    )
}

export default App
