import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddClient } from "./addClient";

export const Router =()=>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AddClient />}></Route>
            </Routes>
        </BrowserRouter>
    );
};