import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles.css"
import  AddClient  from "./addClient";
import Dashboard from "./components/Dashboard";


export const Router =()=>{
    return (
        <>
            <section>
                <Dashboard 
                    li={[
                        ["Dashboard", "img/dashboard.svg"],
                        ["Dashboard", "img/dashboard.svg"],
                        ["Dashboard", "img/dashboard.svg"],
                        ["Dashboard", "img/dashboard.svg"]
                    ]}
                />
                <article>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<AddClient />}></Route>
                    </Routes>
                </BrowserRouter>
                </article>
            </section>
        </>
    );
};
