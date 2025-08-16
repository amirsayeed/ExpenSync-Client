import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    const {user, logOut} = useAuth(); 

    axiosInstance.interceptors.request.use(config => {
        if (user?.accessToken) {
            config.headers.authorization = `Bearer ${user.accessToken}`;
        }
        return config;
    });

    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            const status = error.response?.status;

            if (status === 401) {
                logOut()
                    .then(() => console.log('User logged out due to 401'))
                    .catch(err => console.error(err));
            }

            if (status === 403) {
                console.warn('Forbidden access: check email mismatch or permissions.');
            }

            return Promise.reject(error);
        }
    );
    
    return axiosInstance;
};

export default useAxiosSecure;