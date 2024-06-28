// servicesUser.js
import axios from 'axios';

const USERS_API_URL = 'https://v1.slashapi.com/viet/auth/nyHhsMgpor';

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${USERS_API_URL}/login`, {
            email,
            password
        });
        const { data } = response.data || {}

        console.log('response: ', response.data.data)
        if (data) {
            // Save the token to localStorage
            const { token } = data
            localStorage.setItem('authToken', token);
        }

        return { data: data, error: null };
    } catch (error) {
        console.error('Error logging in:', error);
        return { data: null, error: error.message };
    }
};

export const registerUser = async (name, email, password) => {
    try {
        const response = await axios.post(`${USERS_API_URL}/register`, {
            name,
            email,
            password
        });

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

export const getToken = () => {
    return localStorage.getItem('authToken');
};

export const logoutUser = () => {
    localStorage.removeItem('authToken');
};