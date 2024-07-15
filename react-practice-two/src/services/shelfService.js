import axios from 'axios';
import { getToken } from './userService';

const api = axios.create({
    baseURL: 'https://v1.slashapi.com/viet8/mongodb/KzxkOcJVLy',
    withCredentials: false,
});

api.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Function to fetch all books in the shelf
export const fetchShelfBooks = async (userId) => {
    try {
        const response = await api.get(`/shelfbooks?q={"userId":"${userId}"}`);
        const { data } = response.data;
        return data;
    } catch (error) {
        return error;
    }
};

// Function to fetch a specific book by its ID from the shelf
export const getShelfBookDetail = async (bookId) => {
    try {
        const response = await api.get(`/shelfbooks?q={"bookId":"${bookId}"}`);
        const { data } = response.data;
        return data;
    } catch (error) {
        return error;
    }
};

// Function to add a book to the shelf
export const addBookToShelf = async (userId, bookId) => {
    const params = {
        data: {
            userId,
            bookId,
        }
    };
    try {
        const response = await api.post('/shelfbooks', params);
        const { data } = response.data
        return data
    } catch (error) {
        return error;
    }
};

export const deleteShelfBook = async (shelfId) => {
    try {
        const response = await api.delete(`/shelfbooks/${shelfId}`);
        const { data } = response.data;
        return data
    } catch (error) {
        return error;
    }
}