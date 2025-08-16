import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../../../assets/logo.png'
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { LuLogIn, LuLogOut } from 'react-icons/lu';
import { FaUserCircle } from 'react-icons/fa';
const NavBar = () => {
    const {user, logOut} = useAuth();

    const handleLogOut = () =>{
        logOut().then(()=>{
            toast.success('Successfully logged out');
        })
        .catch(error=>{
            toast.error(error.message);
        })
    }

    const links = <>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/addExpense'>Add Expense</NavLink></li>
                    <li><NavLink to='/expenseStats'>Expense Statistics</NavLink></li>
                  </>
    return (
    <div className='bg-base-200 sticky top-0 z-50 shadow-md'>
        <div className="navbar max-w-[1500px] mx-auto md:px-3">
        <div className="navbar-start">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-base font-medium">
                {links}
            </ul>
            </div>
            <div className='flex items-center gap-1'>
                <img src={logo} alt="" className='w-10 h-10 object-cover' />
                <h1 className='text-lg md:text-2xl font-bold'>ExpenSync</h1>
            </div>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-sm font-semibold">
                {links}
            </ul>
        </div>
        <div className="navbar-end">
            {user ? 
                    <div className='flex gap-2'>
                        <div className="tooltip tooltip-bottom" data-tip={user?.displayName}>
                            {user?.photoURL ? <img className='w-10 h-10 rounded-full' src={user.photoURL} alt="" /> : <FaUserCircle size={40} />}
                        </div> 
                        <button onClick={handleLogOut} className='btn flex bg-[#2dcfc4] text-white rounded-xl p-2'>
                            <span>Logout</span>
                            <span><LuLogOut size={15} /></span>
                        </button>
                    </div> 
                    : <Link to='/login'><button className="btn flex bg-[#2dcfc4] text-white rounded-xl p-2">
                        <span>Login</span>
                        <span><LuLogIn size={15} /></span>
                    </button></Link>
                }
        </div>
        </div>
    </div>
    );
};

export default NavBar;