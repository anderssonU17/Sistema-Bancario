import { Route, Routes } from "react-router-dom";
import { PagesRoutes } from "../pages/PagesRoutes";

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/*" element={<PagesRoutes />} />
            </Routes>
        </>
    )
}