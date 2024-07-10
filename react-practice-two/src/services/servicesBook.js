import axios from 'axios';
import { getToken } from './servicesUser';

const api = axios.create({
    baseURL: 'https://v1.slashapi.com/viet6/mongodb/goiDbyEVLd',
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
        return data;
    } catch (error) {
        return error;
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

export const getListBookById = async (listId) => {
    const dataListId = listId.map(item => '"' + item + '"').join(',')
    const queryById = `?q={"_id":{"$in":[${dataListId}]}}`
    try {
        const response = await api.get(`/books${queryById}`);
        const { data } = response.data
        return data;
    } catch (error) {
        console.error('Error get list book: ', error);
        return error;
    }
}