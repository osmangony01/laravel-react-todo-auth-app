
import { Navigate, useLocation } from 'react-router-dom';

import { ColorRing } from 'react-loader-spinner';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    // const tk = localStorage.getItem('access_token');

    if (loading) {
        return <div className='spinner'>
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            /></div>;
    }

    if (user) {
        return children;
    }

    // useEffect(() => { }, [user]);
    console.log(user)
    return <Navigate  to={"/"} replace></Navigate>
};

export default PrivateRoute;