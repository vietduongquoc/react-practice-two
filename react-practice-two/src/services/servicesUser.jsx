import axios from 'axios';
import config from '../configs/config-form'

// Create an instance of axios with the base URL from the config file
const api = axios.create({
    baseURL: config.apiBaseUrl,
});

// Example function to get user details
export const loginUser = async (userId) => {
    try {
        const response = await api.get(`/User/${userId}`);
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error fetching user details:', error);
        return { data: null, error: error.response ? error.response.data : error.message };
    }
};

// Example function to create a new user
export const createUser = async (userData) => {
    try {
        const response = await api.post('/User', userData);
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error creating user:', error);
        return { data: null, error: error.response ? error.response.data : error.message };
    }
};

// Example function to update a user
export const updateUser = async (userId, userData) => {
    try {
        const response = await api.put(`/User/${userId}`, userData);
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error updating user:', error);
        return { data: null, error: error.response ? error.response.data : error.message };
    }
};

// Example function to delete a user
export const deleteUser = async (userId) => {
    try {
        const response = await api.delete(`/User/${userId}`);
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error deleting user:', error);
        return { data: null, error: error.response ? error.response.data : error.message };
    }
};
