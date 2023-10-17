import { Routes, Route, Link } from "react-router-dom";
import Home from '../components/Home';
import Login from '../components/Login';
import TableUsers from '../components/TableUsers';
import PrivateRoute from "./PrivateRoutes";

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/users"
                    element={
                        <PrivateRoute>
                            <TableUsers />
                        </PrivateRoute>
                    }
                />
            </Routes>

        </>
    )
}

export default AppRoutes;