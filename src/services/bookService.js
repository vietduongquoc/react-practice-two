import axios from 'axios';
import { getToken } from './userService';

const api = axios.create({
    baseURL: 'https://v1.slashapi.com/viet8/mongodb/PCeMTONmxs',
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

export const fetchBook = async () => {
    try {
        const response = await api.get('/books');
        const { data } = response.data;
        if (!Array.isArray(data)) {
            throw new Error('Expected data to be an array');
        }
        return data;
    } catch (error) {
        return [];
    }
};

export const fetchBookById = async (bookId) => {
    try {
        const response = await api.get(`/books/${bookId}`);
        const { data } = response.data
        return data
    } catch (error) {
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
        return error;
    }
};

export const getListBookById = async (listId) => {
    const dataListId = listId.map(item => '"' + item + '"').join(',')
    const queryById = `?q={"_id":{"$in":[${dataListId}]}}`
    try {
        const response = await api.get(`/books${queryById}`);
        const { data } = response.data
        return data;
    } catch (error) {
        return error;
    }
}

export default api;