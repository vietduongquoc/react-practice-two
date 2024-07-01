// servicesUser.js
import axios from 'axios';

const USERS_API_URL = 'https://v1.slashapi.com/viet/auth/nyHhsMgpor';

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${USERS_API_URL}/login`, {
            email,
            password
        });

        const { data } = response.data || {};
        if (data) {
            const { token } = data;
            await localStorage.setItem('authToken', token);
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
                username
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
        const response = await axios.post(`${USERS_API_URL}/login`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('response: ', response)
        // localStorage.removeItem('authToken');
    } catch (error) {
        
    }
}

export const getToken = () => {
    return localStorage.getItem('authToken');
};