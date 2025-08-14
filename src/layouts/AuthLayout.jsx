import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../components/Shared/NavBar/NavBar';

const AuthLayout = () => {
    return (
        <div>
            <NavBar/>
            <Outlet/>
        </div>
    );
};

export default AuthLayout;