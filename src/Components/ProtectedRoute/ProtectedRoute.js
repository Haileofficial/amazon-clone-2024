import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { AuthContext } from './AuthContext';
import { DataContext } from '../DataProvider/DataProvider';

const ProtectedRoute = ({ children,msg,redirect }) => {
    const [{user}, dispatch] = useContext(DataContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/auth', { state: { msg ,redirect} });
        }
    }, [user, navigate, msg]);

    return children
};

export default ProtectedRoute;