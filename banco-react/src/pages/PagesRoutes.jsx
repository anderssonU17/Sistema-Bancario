import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../components/Dashboard";
import { AddClient }  from "./addClient";
import { MPage } from "./mPage";

export const PagesRoutes =()=>{
    return (
        <>
            <section>
                <Dashboard />
                
                <article>
                    <Routes>
                        <Route path="/" element={<MPage />} />
                        <Route path="/addClient" element={<AddClient />} />
                    </Routes>
                </article>
            </section>
        </>
    );
};
