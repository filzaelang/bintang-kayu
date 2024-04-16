import React from 'react';
import useAuth from '../custom-hooks/useAuth';
import { Navigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {

    // const {currentUser} = useAuth();
    const currentUser = useSelector((state) => state.currentUser.data)

    return currentUser ? <Outlet /> : <Navigate to='/login' />;

}

export default ProtectedRoute;