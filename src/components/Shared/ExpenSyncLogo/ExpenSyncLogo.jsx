import React from 'react';
import logo from '../../../assets/logo.png'
const ExpenSyncLogo = () => {
    return (
        <div className='flex items-center gap-1'>
            <img src={logo} alt="" className='w-10 h-10 object-cover' />
            <h1 className='text-lg md:text-2xl font-bold'>ExpenSync</h1>
        </div>
    );
};

export default ExpenSyncLogo;