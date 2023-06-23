import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles.css"
import  AddClient  from "./addClient";
import Dashboard from "./components/Dashboard";


export const Router =()=>{
    return (
        <>
            <Dashboard 
                li={[
                    ["Dashboard", "img/dashboard.svg"],
                    ["Dashboard", "img/dashboard.svg"],
                    ["Dashboard", "img/dashboard.svg"],
                    ["Dashboard", "img/dashboard.svg"]
                ]}
            />

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AddClient />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};