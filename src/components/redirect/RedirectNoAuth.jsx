import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const RedirectNoAuth = ({ children }) => {
    const { lang } = useParams();
    const status = useSelector(state => state.authReducer.status);

    console.log(status);
    

    if (status === "loading") return null;

    if (status === "guest") {
        return <Navigate to={`/${lang}`} replace />;
    }

    return children;
};

export default RedirectNoAuth;