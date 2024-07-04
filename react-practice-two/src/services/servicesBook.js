import axios from 'axios';
import { getToken } from './servicesUser';

const api = axios.create({
    baseURL: 'https://v1.slashapi.com/vietttt/mongodb/qJgs9vl5pt',
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

export const fetchBook = async () => {
    try {
        const token = await getToken()
        console.log('token: ', token)
        const response = await api.get('/books');
        const { data } = response.data;
        return { data };
    } catch (error) {
        console.error('Error fetching books:', error);
        return { data: null, error };
    }
};

export const fetchBookById = async (bookId) => {
    try {
        const response = await api.get(`/books/${bookId}`);
        const { data } = response.data
        return data
    } catch (error) {
        console.error(`Error fetching book with ID ${bookId}:`, error);
        return error
    }
};

export const updateBookStatus = async (bookId, updatedStatus) => {
    const params = {
        data: {
            bookId,
            status: updatedStatus
        }
    }
    try {
        const response = await api.patch(`/books/${bookId}`, params);
        const { data } = response.data
        return data;
    } catch (error) {
        console.error('Error updating book status:', error);
        return error;
    }
};
