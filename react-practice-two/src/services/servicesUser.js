import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const USERS_API_URL = 'https://v1.slashapi.com/viet5/auth/REhGguBImp';

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${USERS_API_URL}/login`, {
            email,
            password
        });

        const { data } = response.data || {};
        if (data) {
            const { token, custom_attributes } = data;
            const { id } = custom_attributes;
            localStorage.setItem('authToken', token);
            localStorage.setItem('userId', id);
            return { data }
        }
        return { data };
    } catch (error) {
        return error;
    }
};

export const registerUser = async (username, email, password) => {
    const params = {
        data: {
            email,
            password,
            custom_attributes: {
                username,
                id: uuidv4()
            }
        }
    }
    try {
        const response = await axios.post(`${USERS_API_URL}/register`, params);
        const { data } = response;

        if (data === "") {
            throw new Error("Required")
        }
        console.log("pass: ", data);
    } catch (error) {
        throw error
    }
};

export const logoutUser = async () => {
    try {
        const response = await axios.post(`${USERS_API_URL}/logout`, {}, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            }
        });
        localStorage.removeItem('authToken');
        const { data } = response.data;
        return data;
    } catch (error) {
        return error;
    }
};

export const getToken = () => {
    return localStorage.getItem('authToken');
};

export const getCurrentUserId = () => {
    return localStorage.getItem('userId')
};
