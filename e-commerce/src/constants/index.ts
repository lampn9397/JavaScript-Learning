import axios from "axios";

export const host = process.env.NEXT_PUBLIC_API_HOST;

export const axiosClient = axios.create({
    baseURL: `${host}`
});