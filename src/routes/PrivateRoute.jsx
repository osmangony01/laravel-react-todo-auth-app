
import { Navigate, useLocation } from 'react-router-dom';

import { ColorRing } from 'react-loader-spinner';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    const tk = localStorage.getItem('access_token');

    if (user) {
        return children;
    }

    useEffect(() => { }, [user, tk]);
    console.log(user)
    return <Navigate  to={"/"} replace></Navigate>
};

export default PrivateRoute;