import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const USERS_API_URL = 'https://v1.slashapi.com/viet7/auth/QhjiDvx1sr';

export const loginUser = async (email, password, rememberMe) => {
    try {
        const response = await axios.post(`${USERS_API_URL}/login`, {
            email,
            password
        });

        const { data } = response.data || {};
        if (data) {
            const { token, custom_attributes } = data;
            const { id } = custom_attributes;

            if (rememberMe) {
                localStorage.setItem('authToken', token);
                localStorage.setItem('userId', id);
            } else {
                sessionStorage.setItem('authToken', token);
                sessionStorage.setItem('userId', id);
            }

            return { data };
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
            throw new Error("Required");
        }
        console.log("pass: ", data);
    } catch (error) {
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        await axios.post(`${USERS_API_URL}/logout`, {}, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            }
        });
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        sessionStorage.clear();
    } catch (error) {
        return error;
    }
};

export const getToken = () => {
    return sessionStorage.getItem('authToken') || localStorage.getItem('authToken');
};

export const getCurrentUserId = () => {
    return sessionStorage.getItem('userId') || localStorage.getItem('userId');
};
