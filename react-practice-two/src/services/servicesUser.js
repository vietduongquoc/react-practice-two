import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const USERS_API_URL = 'https://v1.slashapi.com/vietttt/auth/54jifb3mRr';

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
            return { data, error: null };
        }
        return { data: null, error: 'Invalid response format' };
    } catch (error) {
        console.error('Error logging in:', error);
        return { data: null, error: error.response?.data?.message || error.message };
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

        if (response.data && response.data.token) {
            // Save the token to localStorage
            localStorage.setItem('authToken', response.data.token);
        }

        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error registering user:', error);
        return { data: null, error: error.message };
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
        console.log('response: ', response)
        localStorage.removeItem('authToken');
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error logging out:', error);
        return { data: null, error: error.response?.data?.message || error.message };
    }
};

export const getToken = () => {
    return localStorage.getItem('authToken');
};

export const getCurrentUserId = () => {
    return localStorage.getItem('userId')
};
