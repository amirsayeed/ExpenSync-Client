import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaUserPlus } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {

const {signUp,setUser,updateUser} = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const handleRegister = e =>{
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        //console.log(name,photo,email,password);

        const passRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
        if(!passRegex.test(password)){
            const msg = 'Password must contain at least one uppercase letter, one lowercase letter and be at least 6 characters long.';
            toast.error(msg);
            return;
        }

         signUp(email,password).then(result=>{
            const user = result.user;
            
            updateUser({ displayName: name, photoURL: photo })
            .then(()=>{
            setUser({...user, displayName: name, photoURL: photo});
            toast.success("Registration successful!");
            navigate('/');
            })
            .catch(error=>{
                toast.error(error);
                setUser(user);
            })
        })
        .catch(error=>{
            console.log(error);
            toast.error(error.message);
        })
    }


    return (
         <>
        <title>ExpenSync | Register</title>
        <div className='my-20'>
            <div className="flex flex-col mx-auto max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-100 dark:text-gray-800">
            <h1 className="my-3 text-4xl font-bold text-center">Register</h1>
                
            <form onSubmit={handleRegister} className="fieldset">
                <label className="text-sm">Name*</label>
                <input type="text" name="name" id="name" placeholder="Enter your name" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" required/>

                <label className="text-sm mt-2">Photo URL</label>
                <input type="text" name="photo" id="photo" placeholder="Photo URL" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />

                <label className="text-sm mt-2">Email address*</label>
                <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" required/>
                    
                
                <label className="text-sm mt-2">Password*</label>       
                <div className='relative'>      
                <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    className="input w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                    placeholder="Password" required />
                    <span onClick={() => { setShowPassword(!showPassword) }}
                        className='absolute top-3 right-8'>
                    {
                        showPassword ? <FaEyeSlash size={20}/>: <FaEye size={20}/>
                    }
                    </span>
                </div>

                <p className="my-1 text-sm text-center dark:text-gray-600">Already have an account?
                <Link to='/login' className="hover:underline text-[#2dcfc4]"> Login</Link>
                </p>
                
                <button type='submit' className="btn flex bg-[#2dcfc4] text-white rounded-xl w-full border-0">
                    <span>Register</span>
                    <span><FaUserPlus size={15} /></span>
                </button>
            </form>
            <SocialLogin/>
        </div>
        </div>
        </>
    );
};

export default Register;