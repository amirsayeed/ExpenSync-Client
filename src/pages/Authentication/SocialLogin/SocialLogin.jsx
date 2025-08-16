import React from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';

const SocialLogin = () => {
    const {googleSignIn,setUser} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const handleGoogleLogin = () =>{
        googleSignIn().then(result=>{
            setUser(result.user);
            navigate(`${location?.state ? location.state : '/'}`);
            toast.success('Login successful');
        })
        .catch(error=>{
            console.log(error);
            toast.error(error.message);
        })
    }

    return (
        <div className="space-y-3 mt-2">
            <button onClick={handleGoogleLogin} className="btn w-full bg-[#2dcfc4] text-white rounded-xl border-0">
            <FcGoogle size={20}/> Login with Google</button>
            <p className="px-6 text-sm text-center">Don't have an account yet?
            <Link to='/register' className="hover:underline text-[#2dcfc4]"> Sign up</Link>.
            </p>
        </div>
    );
};

export default SocialLogin;