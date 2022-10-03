import React from "react";

// Page routing (the paging system)
import {BrowserRouter, Routes, Route} from "react-router-dom";

// Pages
import Home from './Pages/Home'
import Movies from "./Pages/Movies";
import Songs from "./Pages/Songs";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path={"movies"} element={<Movies />} />
                    <Route path={"songs"} element={<Songs />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
