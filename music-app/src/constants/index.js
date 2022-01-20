import React from 'react';
import axios from 'axios';

export const responseStatus = {
    OK: 'OK', // Success
};

export const axiosClient = axios.create({
    // baseURL: 'http://127.0.0.1:8000/api-admin'
    baseURL: 'https://shop-adidas.herokuapp.com/api-admin'
});