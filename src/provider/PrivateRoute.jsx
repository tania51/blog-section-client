import { Navigate } from "react-router-dom";
import useAuth from "../Firebase/hooks/useAuth";


const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();

    if(loading) {
        return;
    }
    if(user) {
        return children;
    }

    return <Navigate to="/login" replace></Navigate>
};

export default PrivateRoute;