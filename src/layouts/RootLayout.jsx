import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../components/Shared/NavBar/NavBar';
import Footer from '../components/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <NavBar/>
            <div className='max-w-[1500px] mx-auto min-h-screen'>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default RootLayout;