import React from 'react';
import axios from 'axios'

const axiosSecure = axios.create({
    baseURL:`https://tour-management-server-final.vercel.app`
})

const useAxiosSecure = () => {

    
    return axiosSecure
};

export default useAxiosSecure;