import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

    const token = localStorage.getItem("token");

    return token ? children : <Navigate to="http://localhost:3000/login" />;

};

export default ProtectedRoute;