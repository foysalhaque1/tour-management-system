// useAxiosInstanceSecure.js
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import axios from 'axios';

const useAxiosInstanceSecure = () => {
    const { user } = useAuth();

    const axiosSecureInstance = axios.create({
        baseURL: `https://tour-management-server-final.vercel.app`
    });

    useEffect(() => {
        if (user?.accessToken) {
            axiosSecureInstance.interceptors.request.use(config => {
                config.headers.Authorization = `Bearer ${user.accessToken}`;
                return config;
            }, error => {
                return Promise.reject(error);
            });
        }
    }, [user?.accessToken]);

    return axiosSecureInstance;
};

export default useAxiosInstanceSecure;
